import { defineCollection, defineConfig, Context } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

// ============================================================================
// SCHÉMAS ZOD & TYPES INFERES
// ============================================================================

const baseSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z
    .string()
    .min(10, "La description doit faire au moins 10 caractères."),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
  difficulty: z.enum(["débutant", "intermédiaire", "avancé"]), // Rendu obligatoire
  keyTakeaways: z.array(z.string()).optional(),
  conceptSlugs: z.array(z.string()).default([]),
});

type BaseDoc = z.infer<typeof baseSchema>;

type Meta = {
  path: string;
  fileName: string;
  directory: string;
  filePath: string;
  extension: string;
  mtime?: number;
  content: string;
};

// ============================================================================
// TAXONOMIE CENTRALISÉE
// ============================================================================

const TAG_TAXONOMY = {
  technique: [
    "prompting",
    "context-engineering",
    "xml-prompting",
    "chain-of-thought",
    "tree-of-thought",
    "rag",
    "self-consistency",
    "auto-critique",
    "template",
    "variables",
    "deep-research",
    "image-edit",
    "web-dev",
    "raisonnement",
    "confidentialite",
    "deep-think",
    "multimodal",
    "opensource",
  ],
  domaine: [
    "pharmacie",
    "clinique",
    "recherche",
    "pedagogie",
    "pharmacovigilance",
    "geriatrie",
    "cardiologie",
  ],
  niveau: ["debutant", "intermediaire", "avance"],
  format: [
    "guide",
    "tutoriel",
    "workflow",
    "fiche-revision",
    "qcm",
    "cas-clinique",
    "tableau",
    "mnemonique",
    "synthese",
    "comparatif",
    "exemple-code",
  ],
  outils: [
    "chatgpt",
    "claude",
    "gemini",
    "perplexity",
    "z-ai",
    "aistudio",
    "deepseek",
    "qwen",
    "alibaba",
  ],
  pharma: [
    "posologie",
    "effets-indesirables",
    "monitoring",
    "observance",
    "interactions",
  ],
};

// ============================================================================
// VALIDATION PERSONNALISÉE DES RÉFÉRENCES
// ============================================================================

type ValidationError = {
  document: string;
  field: string;
  value: string;
  message: string;
};

const validationErrors: ValidationError[] = [];

const validateConceptReferences = async (
  doc: BaseDoc & { _meta: Meta; mainGuideSlug?: string },
  ctx: Context
) => {
  if (doc.mainGuideSlug) {
    const allGuides = await ctx.documents(guides);
    const linkedGuide = allGuides.find(
      (g) => g._meta.path === doc.mainGuideSlug
    );
    if (!linkedGuide) {
      validationErrors.push({
        document: doc._meta.path,
        field: "mainGuideSlug",
        value: doc.mainGuideSlug,
        message: `Le guide référencé '${doc.mainGuideSlug}' n'existe pas dans la collection 'guides'.`,
      });
    }
  }
};

// ============================================================================
// FONCTIONS D'ENRICHISSEMENT (TRANSFORM HELPERS)
// ============================================================================

const addComputedFields = <T extends BaseDoc>(doc: T & { _meta: Meta; content?: string }) => {
  const content = doc.content || "";
  const wordCount = content.trim().split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    ...doc,
    slug: doc._meta.path,
    wordCount,
    readingTime: `${Math.max(1, readingTime)} min`,
    hasKeyTakeaways: (doc.keyTakeaways?.length || 0) > 0,
  };
};

const resolveConceptRelations = async (
  doc: { conceptSlugs?: string[] },
  ctx: Context
) => {
  if (!doc.conceptSlugs || doc.conceptSlugs.length === 0) {
    return { concepts: [] };
  }

  const allConcepts = await ctx.documents(concepts);
  const relatedConcepts = allConcepts
    .filter((concept) => doc.conceptSlugs!.includes(concept._meta.path))
    .map((concept) => ({
      slug: concept._meta.path,
      title: concept.title,
      icon: concept.icon,
      category: concept.category,
    }));

  return { concepts: relatedConcepts };
};

const processTags = (doc: { tags?: string[] }) => {
  if (!doc.tags || doc.tags.length === 0) {
    return { tags: [] };
  }

  const processedTags = doc.tags.map((tagName) => {
    let category: string = "inconnu";
    for (const cat in TAG_TAXONOMY) {
      if (
        TAG_TAXONOMY[cat as keyof typeof TAG_TAXONOMY].includes(
          tagName.toLowerCase()
        )
      ) {
        category = cat;
        break;
      }
    }
    return {
      name: tagName,
      category: category,
      isValid: category !== "inconnu",
    };
  });

  return {
    tags: processedTags,
    tagCount: processedTags.length,
    tagCategories: [...new Set(processedTags.map((tag) => tag.category))],
  };
};

// ============================================================================
// DÉFINITION DES COLLECTIONS
// ============================================================================

const conceptSchema = baseSchema.extend({
  icon: z.string().optional(),
  mainGuideSlug: z.string().optional(),
  category: z.string().optional(),
});
type ConceptDoc = z.infer<typeof conceptSchema> & { _meta: Meta; content?: string };

const concepts = defineCollection({
  name: "concepts",
  directory: "src/content/concepts",
  include: "*.mdx",
  schema: conceptSchema,
  transform: async (doc: ConceptDoc, ctx: Context) => {
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    await validateConceptReferences(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      mdxCode,
    };
  },
});

const guideSchema = baseSchema.extend({
  category: z.string(),
  progress: z.number().optional(),
  targetAudience: z.array(z.string()).default([]),
  estimatedTime: z.string().optional(),
});
type GuideDoc = z.infer<typeof guideSchema> & { _meta: Meta; content?: string };

const guides = defineCollection({
  name: "guides",
  directory: "src/content/guides",
  include: "*.mdx",
  schema: guideSchema,
  transform: async (doc: GuideDoc, ctx: Context) => {
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    const relations = await resolveConceptRelations(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...doc, // Renvoyer le document original tel quel
      ...computed,
      ...processedTags,
      ...relations,
      mdxCode,
      hasProgress: typeof doc.progress === "number",
      isLongForm: computed.wordCount > 3000,
      estimatedReadingTime: doc.estimatedTime || computed.readingTime,
    };
  },
});

const promptSchema = baseSchema.extend({
  category: z.string(),
  targetTool: z.string().optional(),
  variables: z.array(z.string()).optional(),
  domain: z.string().optional(),
  useCase: z.string().optional(),
  example: z.string().optional(),
  estimatedTime: z.string().optional(),
  promptContent: z.string().optional(),
  alternativeVersions: z.array(z.object({ name: z.string(), content: z.string() })).optional(),
  systemPromptContent: z.string().optional(), // NOUVEAU CHAMP
});
type PromptDoc = z.infer<typeof promptSchema> & { _meta: Meta; content?: string };

const prompts = defineCollection({
  name: "prompts",
  directory: "src/content/prompts",
  include: "*.mdx",
  schema: promptSchema,
  transform: async (doc: PromptDoc, ctx: Context) => {
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    const relations = await resolveConceptRelations(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...doc, // Renvoyer le document original tel quel
      ...computed,
      ...processedTags,
      ...relations,
      mdxCode,
      hasVariables: (doc.variables?.length || 0) > 0,
      variableCount: doc.variables?.length || 0,
      isTemplate: (doc.variables?.length || 0) > 0,
      estimatedTokens: Math.ceil(computed.wordCount * 1.3),
      hasSystemPrompt: !!doc.systemPromptContent, // NOUVEAU CHAMP CALCULE
    };
  },
});

const externalToolSchema = baseSchema.extend({
  url: z.string().url(),
  category: z.string(),
  pricing: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  use_cases: z.array(z.string()).optional(),
  color: z.string().optional(),
});
type ExternalToolDoc = z.infer<typeof externalToolSchema> & { _meta: Meta; content?: string };

const externalTools = defineCollection({
  name: "externalTools",
  directory: "src/content/external-tools",
  include: "*.mdx",
  schema: externalToolSchema,
  transform: async (doc: ExternalToolDoc, ctx: Context) => {
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    const relations = await resolveConceptRelations(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    let use_cases: string[] = [];
    let color = "bg-gray-500";
    switch (doc._meta.path) {
        case "google-ai-studio":
            use_cases = ["Analyse clinique précise", "Test de prompts avancés", "Raisonnement multi-étapes"];
            color = "bg-blue-500";
            break;
        case "claude-ai":
            use_cases = ["Analyse de longs PDF", "Synthèse de cours", "Dialogue avec un document"];
            color = "bg-orange-500";
            break;
        case "perplexity-ai":
            use_cases = ["Recherche bibliographique", "Vérification de faits", "Veille scientifique"];
            color = "bg-green-500";
            break;
        case "z-ai":
            use_cases = ["Création de présentations", "Génération de schémas", "Projets créatifs"];
            color = "bg-purple-500";
            break;
    }

    return {
      ...computed,
      ...processedTags,
      ...relations,
      mdxCode,
      isFree:
        doc.pricing?.toLowerCase().includes("gratuit") ||
        doc.pricing?.toLowerCase().includes("free"),
      use_cases,
      color,
    };
  },
});

// ============================================================================
// CONFIGURATION FINALE & VALIDATION GLOBALE
// ============================================================================
export default defineConfig({
  collections: [concepts, guides, prompts, externalTools],
  onSuccess: async () => {
    if (validationErrors.length > 0) {
      console.error("\n🚨 ERREURS DE VALIDATION DES RÉFÉRENCES CROISÉES 🚨\n");
      validationErrors.forEach((error) => {
        console.error(`📄 Document: ${error.document}`);
        console.error(`🔧 Champ: ${error.field}`);
        console.error(`💬 Valeur: "${error.value}"`);
        console.error(`❌ ${error.message}`);
        console.error("---");
      });
      console.error(
        `\n❌ Total: ${validationErrors.length} erreur(s) de validation`
      );
      console.error("Veuillez corriger ces erreurs avant de continuer.\n");
      process.exit(1);
    } else {
      console.log("✅ Toutes les références croisées sont valides");
    }
  },
});
