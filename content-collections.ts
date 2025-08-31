import { defineCollection, defineConfig, type Context } from "@content-collections/core";
import { z } from "zod";

// ============================================================================
// SCHÉMAS ZOD & TYPES INFERES
// ============================================================================

// Schéma de base réutilisable pour tous nos contenus.
const baseSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().min(10, "La description doit faire au moins 10 caractères."),
  content: z.string().min(100, "Le contenu doit faire au moins 100 caractères."),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
  difficulty: z.enum(["débutant", "intermédiaire", "avancé"]).optional(),
  keyTakeaways: z.array(z.string()).optional(),
  // On rend les champs relationnels optionnels, car ils seront ajoutés par `transform`.
  concepts: z.array(z.string()).default([]),
});

// Inférence des types AVANT transformation. C'est crucial pour la sécurité de type dans `transform`.
type BaseDoc = z.infer<typeof baseSchema>;

// Type pour les métadonnées
type Meta = {
  path: string;
  fileName: string;
 directory: string;
};

// ============================================================================
// FONCTIONS D'ENRICHISSEMENT (TRANSFORM HELPERS)
// ============================================================================

/**
 * Ajoute des champs calculés communs à tous les documents (temps de lecture, slug...).
 * C'est notre fonction "boilerplate killer".
 */
const addComputedFields = <T extends BaseDoc>(doc: T & { _meta: Meta }) => {
  const wordCount = doc.content?.trim().split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200); // 200 mots par minute
  
  // Calcul de la complexité basé sur le nombre de mots
  const complexity = 
    wordCount > 2000 ? "avancé" : 
    wordCount > 100 ? "intermédiaire" : 
    "débutant";
  
  return {
    ...doc,
    slug: doc._meta.path,
    wordCount,
    readingTime: `${Math.max(1, readingTime)} min`,
    complexity,
    hasKeyTakeaways: (doc.keyTakeaways?.length || 0) > 0,
  };
};

/**
 * Résout les relations avec les concepts.
 * Remplace un tableau de slugs `string[]` par un tableau d'objets `Concept[]`.
 */
const resolveConceptRelations = async (doc: { concepts?: string[] }, ctx: Context, conceptsCollection: Parameters<Context["documents"]>[0]) => {
    if (!doc.concepts || doc.concepts.length === 0) {
        return { relatedConcepts: [] };
    }
    
    // Récupération de toutes les collections de concepts
    const allConcepts = await ctx.documents(conceptsCollection);
    const relatedConcepts = allConcepts
        .filter((concept) => doc.concepts!.includes(concept._meta.path))
        .map((concept) => ({
            slug: concept._meta.path,
            title: concept.title,
            icon: concept.icon,
            category: concept.category
        })); // On ne garde que l'essentiel
    
    return { relatedConcepts };
};

// ============================================================================
// DÉFINITION DES COLLECTIONS
// ============================================================================

// On définit les concepts en premier car d'autres collections en dépendent.
const concepts = defineCollection({
  name: "concepts",
  directory: "src/content/concepts",
  include: "*.mdx",
  schema: baseSchema.extend({
    icon: z.string().optional(),
    mainGuideSlug: z.string().optional(),
    category: z.string().optional(),
  }),
  transform: (doc) => {
    // Les concepts n'ont pas de dépendances, on ajoute juste les champs calculés.
    return addComputedFields(doc);
  },
});

const guides = defineCollection({
  name: "guides",
  directory: "src/content/guides",
  include: "*.mdx",
  schema: baseSchema.extend({
    category: z.string(),
    progress: z.number().optional(),
    targetAudience: z.array(z.string()).default([]),
    estimatedTime: z.string().optional(),
  }),
  transform: async (doc, ctx) => {
    const computed = addComputedFields(doc);
    const relations = await resolveConceptRelations(doc, ctx, concepts);
    
    // Ajustement de la complexité pour les guides
    const complexity = 
      computed.wordCount > 5000 ? "avancé" : 
      computed.wordCount > 2000 ? "intermédiaire" : 
      "débutant";
    
    return {
      ...computed,
      ...relations,
      complexity,
      hasProgress: typeof doc.progress === "number",
      isLongForm: computed.wordCount > 3000,
      estimatedReadingTime: doc.estimatedTime || computed.readingTime,
    };
  },
});

const prompts = defineCollection({
    name: "prompts",
    directory: "src/content/prompts",
    include: "*.mdx",
    schema: baseSchema.extend({
        category: z.string(),
        targetTool: z.string().optional(),
        variables: z.array(z.string()).optional(),
        domain: z.string().optional(),
        useCase: z.string().optional(),
        example: z.string().optional(),
        estimatedTime: z.string().optional(),
    }),
    transform: async (doc, ctx) => {
        const computed = addComputedFields(doc);
        const relations = await resolveConceptRelations(doc, ctx, concepts);

        // Ajustement de la complexité pour les prompts
        const complexity = 
          computed.wordCount > 1000 ? "avancé" : 
          computed.wordCount > 500 ? "intermédiaire" : 
          "débutant";

        return {
            ...computed,
            ...relations,
            complexity,
            hasVariables: (doc.variables?.length || 0) > 0,
            variableCount: doc.variables?.length || 0,
            isTemplate: (doc.variables?.length || 0) > 0,
            estimatedTokens: Math.ceil(computed.wordCount * 1.3), // Approximation pour l'IA
        };
    },
});

const externalTools = defineCollection({
    name: "externalTools",
    directory: "src/content/external-tools",
    include: "*.mdx",
    schema: baseSchema.extend({
        url: z.string().url(),
        category: z.string(),
        pricing: z.string().optional(),
        capabilities: z.array(z.string()).default([]),
    }),
    transform: async (doc, ctx) => {
        const computed = addComputedFields(doc);
        const relations = await resolveConceptRelations(doc, ctx, concepts);

        // Ajustement de la complexité pour les outils externes
        const complexity = 
          computed.wordCount > 2000 ? "avancé" : 
          computed.wordCount > 1000 ? "intermédiaire" : 
          "débutant";

        return {
            ...computed,
            ...relations,
            complexity,
            hasPricing: !!doc.pricing,
            capabilityCount: doc.capabilities.length,
            isFree:
                doc.pricing?.toLowerCase().includes("gratuit") ||
                doc.pricing?.toLowerCase().includes("free"),
        };
    },
});

// ============================================================================
// CONFIGURATION FINALE
// ============================================================================
export default defineConfig({
  collections: [concepts, guides, prompts, externalTools],
});