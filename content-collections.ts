import { defineCollection, defineConfig, Context } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { isValidIcon } from "./src/types/icon-taxonomy";

// ============================================================================
// ENHANCED SCHEMAS WITH MODERN VALIDATION (React 19 + Next.js 15 Compatible)
// ============================================================================

const baseSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z
    .string()
    .min(10, "La description doit faire au moins 10 caractères"),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
  difficulty: z.enum(["débutant", "intermédiaire", "avancé"]),
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
// MODERN TRANSFORM HELPERS (Build-Time Optimization)
// ============================================================================

/**
 * Enhanced content processing with better performance
 */
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

/**
 * Process tags with enhanced validation
 */
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

/**
 * Generate alternative prompt versions  
 */
const generateAlternativeVersions = (doc: PromptDoc) => {
  if (doc.alternativeVersions) {
    return doc.alternativeVersions;
  }

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

  return {
    standard: doc.promptContent || doc.systemPromptContent || '',
  };
};

/**
 * Generate recommended tools
 */
const generateRecommendedTools = (doc: PromptDoc) => {
  if (doc.recommendedTools) {
    return doc.recommendedTools;
  }

  const hasSystemPrompt = !!doc.systemPromptContent;
  const hasXMLStructure = doc.promptContent?.includes('<') || false;

  return {
    standard: ['ChatGPT', 'Claude.ai', 'Gemini'],
    xml: hasXMLStructure ? ['Claude.ai', 'ChatGPT', 'DeepSeek'] : ['Claude.ai'],
    aiStudio: hasSystemPrompt ? ['Google AI Studio', 'OpenAI Playground'] : ['Google AI Studio'],
  };
};

// ============================================================================
// ENHANCED VALIDATION SYSTEM
// ============================================================================

type ValidationError = {
  document: string;
  field: string;
  value: string;
  message: string;
  severity: 'error' | 'warning';
};

const validationErrors: ValidationError[] = [];

const validateIconExists = (doc: { icon?: string; _meta: Meta }, _ctx: Context) => {
  if (doc.icon && !isValidIcon(doc.icon)) {
    validationErrors.push({
      document: doc._meta.path,
      field: "icon",
      value: doc.icon,
      message: `L'icône '${doc.icon}' n'existe pas dans Lucide React. Utilisez une icône valide de la taxonomie.`,
      severity: 'error'
    });
  }
};

// ============================================================================
// COLLECTION DEFINITIONS (Modern React 19 + Next.js 15 Compatible)
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
    
    // Modern build-time MDX compilation
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
    
    // Modern build-time MDX compilation
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
      hasProgress: typeof doc.progress === "number",
      isLongForm: computed.wordCount > 3000,
      estimatedReadingTime: doc.estimatedTime || computed.readingTime,
      // Enhanced workflow detection for unified workflow/guide system
      isWorkflow: doc.title.toLowerCase().includes('workflow') ||
                  doc.description.toLowerCase().includes('étape par étape') ||
                  processedTags.tags.some(tag => ['workflow', 'processus', 'methodologie'].includes(tag.name.toLowerCase())),
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
  alternativeVersions: z.object({
    standard: z.string().optional(),
    xml: z.string().optional(),
    aiStudio: z.object({
      systemPrompt: z.string().optional(),
      userPrompt: z.string().optional(),
    }).optional(),
  }).optional(),
  recommendedTools: z.object({
    standard: z.array(z.string()).optional(),
    xml: z.array(z.string()).optional(),
    aiStudio: z.array(z.string()).optional(),
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
    
    // Enhanced prompt processing
    const alternativeVersions = generateAlternativeVersions(doc);
    const recommendedTools = generateRecommendedTools(doc);
    
    // Modern build-time MDX compilation
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
      hasVariables: (doc.variables?.length || 0) > 0,
      variableCount: doc.variables?.length || 0,
      isTemplate: (doc.variables?.length || 0) > 0,
      estimatedTokens: Math.ceil(computed.wordCount * 1.3),
      hasSystemPrompt: !!doc.systemPromptContent,
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
  // Enhanced TLDR field for better UX
  tldr: z.string().min(20, "Le TLDR doit être concis mais informatif").optional(),
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
    
    // Modern build-time MDX compilation
    const mdxCode = await compileMDX(ctx, { ...doc, content: doc.content || "" });

    return {
      ...computed,
      ...processedTags,
      mdxCode,
      slug: doc._meta.path,
      isFree: doc.pricing?.toLowerCase().includes("gratuit") ||
              doc.pricing?.toLowerCase().includes("free"),
      use_cases: doc.use_cases,
      color: doc.color,
      // Enhanced TLDR for concise recommendations
      tldr: doc.tldr || computed.description,
    };
  },
});

// ============================================================================
// MODERN CONFIGURATION (React 19 + Next.js 15 Enhanced)
// ============================================================================

export default defineConfig({
  collections: [concepts, guides, prompts, externalTools],
  onSuccess: async (allDocuments: any[]) => {
    // Enhanced validation and reporting
    if (validationErrors.length > 0) {
      const errors = validationErrors.filter(e => e.severity === 'error');
      const warnings = validationErrors.filter(e => e.severity === 'warning');
      
      if (errors.length > 0) {
        console.error("\n🚨 ERREURS CRITIQUES 🚨\n");
        errors.forEach((error) => {
          console.error(`📄 ${error.document}: ${error.message}`);
        });
        console.error(`\n❌ Total: ${errors.length} erreur(s) critique(s)`);
        process.exit(1);
      }
      
      if (warnings.length > 0) {
        console.warn(`\n⚠️ ${warnings.length} avertissement(s) de qualité`);
      }
    }

    // Success metrics
    const totalDocs = allDocuments.length;
    const conceptsCount = allDocuments.filter(doc => 
      doc._meta.directory.includes('concepts')).length;
    const guidesCount = allDocuments.filter(doc => 
      doc._meta.directory.includes('guides')).length;
    const promptsCount = allDocuments.filter(doc => 
      doc._meta.directory.includes('prompts')).length;
    const toolsCount = allDocuments.filter(doc => 
      doc._meta.directory.includes('external-tools')).length;
    
    console.log("\n✅ BUILD RÉUSSI - CONFIGURATION MODERNE\n");
    console.log(`📊 Total: ${totalDocs} documents`);
    console.log(`🧠 Concepts: ${conceptsCount} | 📚 Guides: ${guidesCount} | 💡 Prompts: ${promptsCount} | 🔧 Outils: ${toolsCount}`);
    console.log("🚀 Optimisé pour React 19 + Next.js 15 - Production Ready\n");
  },
});
