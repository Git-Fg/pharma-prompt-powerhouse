import { defineCollection, defineConfig, Context } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { isValidIcon } from "./src/types/icon-taxonomy";

// Helper function to create a simplified object for linking
const toLink = (doc: { _meta: { path: string }, title: string, description: string }) => ({
  slug: doc._meta.path,
  title: doc.title,
  description: doc.description,
});

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
    "outils",
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

const generateAlternativeVersions = (doc: PromptDoc) => {
  // If alternative versions are already provided, return them as-is
  if (doc.alternativeVersions) {
    return doc.alternativeVersions;
  }

  // Auto-generate alternative versions if we have systemPromptContent and promptContent
  if (doc.systemPromptContent && doc.promptContent) {
    return {
      standard: `${doc.systemPromptContent}\n\n${doc.promptContent}`,
      xml: doc.promptContent.includes('<') ? doc.promptContent : 
        `<role>\n${doc.systemPromptContent}\n</role>\n\n<task>\n${doc.promptContent}\n</task>`,
      aiStudio: {
        systemPrompt: doc.systemPromptContent,
        userPrompt: doc.promptContent,
      }
    };
  }

  // Fallback: only standard version available
  return {
    standard: doc.promptContent || doc.systemPromptContent || '',
  };
};

const generateRecommendedTools = (doc: PromptDoc) => {
  // If tools are already specified, return them
  if (doc.recommendedTools) {
    return doc.recommendedTools;
  }

  // Auto-generate based on prompt characteristics
  const hasSystemPrompt = !!doc.systemPromptContent;
  const hasXMLStructure = doc.promptContent?.includes('<') || false;

  return {
    standard: ['ChatGPT', 'Claude.ai', 'Gemini'],
    xml: hasXMLStructure ? ['Claude.ai', 'ChatGPT', 'DeepSeek'] : ['Claude.ai'],
    aiStudio: hasSystemPrompt ? ['Google AI Studio', 'OpenAI Playground'] : ['Google AI Studio'],
  };
};

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

const concepts = defineCollection({
  name: "concepts",
  directory: "src/content/concepts",
  include: "*.mdx",
  schema: conceptSchema,
  transform: async (doc: ConceptDoc, ctx: Context) => {
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    validateIconExists(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
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
    validateIconExists(doc, ctx);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...doc, // Renvoyer le document original tel quel
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
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
  systemPromptContent: z.string().optional(),
  // Multi-format support
  alternativeVersions: z.object({
    standard: z.string().optional(), // Simple version for chat interfaces
    xml: z.string().optional(), // Structured XML version for Claude
    aiStudio: z.object({
      systemPrompt: z.string().optional(),
      userPrompt: z.string().optional(),
    }).optional(), // Optimized for Google AI Studio with separate system prompt
  }).optional(),
  recommendedTools: z.object({
    standard: z.array(z.string()).optional(), // Tools for standard version
    xml: z.array(z.string()).optional(), // Tools for XML version  
    aiStudio: z.array(z.string()).optional(), // Tools for AI Studio version
  }).optional(),
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
    validateIconExists(doc, ctx);
    
    // Generate alternative versions and recommended tools
    const alternativeVersions = generateAlternativeVersions(doc);
    const recommendedTools = generateRecommendedTools(doc);
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...doc, // Renvoyer le document original tel quel
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
      hasVariables: (doc.variables?.length || 0) > 0,
      variableCount: doc.variables?.length || 0,
      isTemplate: (doc.variables?.length || 0) > 0,
      estimatedTokens: Math.ceil(computed.wordCount * 1.3),
      hasSystemPrompt: !!doc.systemPromptContent,
      // New fields for multi-format support
      alternativeVersions,
      recommendedTools,
      hasMultipleVersions: !!(alternativeVersions.standard && (alternativeVersions.xml || alternativeVersions.aiStudio)),
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
    
    // Compile MDX content at build time
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
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
