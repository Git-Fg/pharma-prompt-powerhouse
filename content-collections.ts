import { defineCollection, defineConfig, Context } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { isValidIcon } from "./src/types/icon-taxonomy";

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

const validateIconExists = (doc: { icon?: string; _meta: Meta }, _ctx: Context) => {
  if (doc.icon && !isValidIcon(doc.icon)) {
    validationErrors.push({
      document: doc._meta.path,
      field: "icon",
      value: doc.icon,
      message: `L'icône '${doc.icon}' n'existe pas dans Lucide React. Utilisez une icône valide de la taxonomie.`,
    });
  }
};

// Note: validateConceptReferences will be defined after collections to avoid circular dependencies

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

const resolveRelatedContent = async (
  doc: { conceptSlugs?: string[]; _meta: Meta },
  ctx: Context
): Promise<{ 
  relatedGuides: Array<{ slug: string; title: string; description: string }>; 
  relatedPrompts: Array<{ slug: string; title: string; description: string }>; 
}> => {
  if (!doc.conceptSlugs || doc.conceptSlugs.length === 0) {
    return { relatedGuides: [], relatedPrompts: [] };
  }

  // Get all documents of each type
  const allGuides = await ctx.documents(guides);
  const allPrompts = await ctx.documents(prompts);

  // Find related guides that share at least one concept
  const relatedGuides = allGuides
    .filter((guide: any) =>
      guide._meta.path !== doc._meta.path &&
      guide.conceptSlugs?.some((conceptSlug: string) => doc.conceptSlugs!.includes(conceptSlug))
    )
    .slice(0, 2)
    .map((guide: any) => ({
      slug: guide._meta.path,
      title: guide.title,
      description: guide.description,
    }));

  // Find related prompts that share at least one concept
  const relatedPrompts = allPrompts
    .filter((prompt: any) =>
      prompt._meta.path !== doc._meta.path &&
      prompt.conceptSlugs?.some((conceptSlug: string) => doc.conceptSlugs!.includes(conceptSlug))
    )
    .slice(0, 2)
    .map((prompt: any) => ({
      slug: prompt._meta.path,
      title: prompt.title,
      description: prompt.description,
    }));

  return { relatedGuides, relatedPrompts };
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
  icon: z.string().refine(
    (val) => !val || isValidIcon(val), 
    { message: "L'icône doit être un nom valide d'icône Lucide React" }
  ).optional(),
  mainGuideSlug: z.string().optional(),
  category: z.string().optional(),
});
type ConceptDoc = z.infer<typeof conceptSchema> & { _meta: Meta; content?: string };

// Define validateConceptReferences after collection definitions to avoid circular dependencies
const validateConceptReferences = async (
  doc: BaseDoc & { _meta: Meta; mainGuideSlug?: string },
  ctx: Context
) => {
  if (doc.mainGuideSlug) {
    const allGuides = await ctx.documents(guides);
    const linkedGuide = allGuides.find(
      (g: any) => g._meta.path === doc.mainGuideSlug
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

const concepts = defineCollection({
  name: "concepts",
  directory: "src/content/concepts",
  include: "*.mdx",
  schema: conceptSchema,
  transform: async (doc: ConceptDoc, ctx: Context) => {
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    validateIconExists(doc, ctx);
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
  icon: z.string().refine(
    (val) => !val || isValidIcon(val), 
    { message: "L'icône doit être un nom valide d'icône Lucide React" }
  ).optional(),
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
    const relatedContent = await resolveRelatedContent(doc, ctx);
    validateIconExists(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...doc, // Renvoyer le document original tel quel
      ...computed,
      ...processedTags,
      ...relations,
      ...relatedContent,
      mdxCode,
      hasProgress: typeof doc.progress === "number",
      isLongForm: computed.wordCount > 3000,
      estimatedReadingTime: doc.estimatedTime || computed.readingTime,
    };
  },
});

const promptSchema = baseSchema.extend({
  category: z.string(),
  icon: z.string().refine(
    (val) => !val || isValidIcon(val), 
    { message: "L'icône doit être un nom valide d'icône Lucide React" }
  ).optional(),
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
    const relatedContent = await resolveRelatedContent(doc, ctx);
    validateIconExists(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...doc, // Renvoyer le document original tel quel
      ...computed,
      ...processedTags,
      ...relations,
      ...relatedContent,
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
  use_cases: z.array(z.string()).min(1, "Au moins un cas d'usage est requis"),
  color: z.string().min(1, "La couleur est requise"),
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
    const relatedContent = await resolveRelatedContent(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      ...relations,
      ...relatedContent,
      mdxCode,
      isFree:
        doc.pricing?.toLowerCase().includes("gratuit") ||
        doc.pricing?.toLowerCase().includes("free"),
      use_cases: doc.use_cases, // Now comes from frontmatter
      color: doc.color, // Now comes from frontmatter
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
