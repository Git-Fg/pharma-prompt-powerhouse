import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
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
  conceptSlugs: z.array(z.string()).default([]),
});

// Inférence des types AVANT transformation. C'est crucial pour la sécurité de type dans `transform`.
type BaseDoc = z.infer<typeof baseSchema>;

// Type pour les métadonnées
type Meta = {
  path: string;
  fileName: string;
  directory: string;
  mtime?: number; // Rendre mtime optionnel
};

// ============================================================================
// TAXONOMIE CENTRALISÉE
// ============================================================================

const TAG_TAXONOMY = {
  // Techniques et concepts clés
  technique: [
    "prompting",
    "context-engineering",
    "xml-prompting",
    "chain-of-thought",
    "tree-of-thought",
    "rag", // Retrieval-Augmented Generation
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
  // Domaine d'application
  domaine: [
    "pharmacie",
    "clinique",
    "recherche",
    "pedagogie",
    "pharmacovigilance",
    "geriatrie",
    "cardiologie",
  ],
  // Niveau de difficulté ou de complexité
  niveau: ["debutant", "intermediaire", "avance"],
  // Type de contenu ou de tâche
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
  // Outils logiciels mentionnés
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
  // Concepts pharmaceutiques spécifiques
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
  document: string; // Chemin du document contenant l'erreur (doc._meta.path)
  field: string;   // Nom du champ problématique
  value: string;   // Valeur du champ problématique
  message: string; // Message d'erreur détaillé
};

const validationErrors: ValidationError[] = [];

/**
 * Valide les références croisées dans un document de la collection `concepts`.
 * Vérifie que `mainGuideSlug` pointe vers un guide existant.
 */
const validateConceptReferences = async (doc: BaseDoc & { _meta: Meta; mainGuideSlug?: string }, ctx: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  // --- Validation de mainGuideSlug ---
  if (doc.mainGuideSlug) {
    const allGuides = await ctx.documents(guides);
    // Trouver un guide dont le slug correspond à mainGuideSlug
    const linkedGuide = allGuides.find((g: any) => g.slug === doc.mainGuideSlug); // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!linkedGuide) {
       validationErrors.push({
        document: doc._meta.path,
        field: "mainGuideSlug",
        value: doc.mainGuideSlug,
        message: `Le guide référencé '${doc.mainGuideSlug}' n'existe pas dans la collection 'guides'.`
      });
    }
  }
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
    wordCount > 1000 ? "intermédiaire" : 
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
const resolveConceptRelations = async (doc: { conceptSlugs?: string[] }, ctx: any, conceptsCollection: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!doc.conceptSlugs || doc.conceptSlugs.length === 0) {
        return { concepts: [] };
    }
    
    // Récupération de toutes les collections de concepts
    const allConcepts = await ctx.documents(conceptsCollection);
    const concepts = allConcepts
        .filter((concept: any) => doc.conceptSlugs!.includes(concept._meta.path)) // eslint-disable-line @typescript-eslint/no-explicit-any
        .map((concept: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
            slug: concept._meta.path,
            title: concept.title,
            icon: concept.icon,
            category: concept.category
        })); // On ne garde que l'essentiel
    
    return { concepts };
};

// ============================================================================
// FONCTIONS UTILITAIRES SIMPLIFIÉES POUR LES TAGS
// ============================================================================

/**
 * Valide et enrichit les tags manuels fournis dans le frontmatter.
 * Transforme un tableau de strings en un tableau d'objets structurés.
 */
const processTags = (doc: { tags?: string[] }) => {
  if (!doc.tags || doc.tags.length === 0) {
    return { tags: [] };
  }

  const processedTags = doc.tags.map(tagName => {
    let category: string = "inconnu";
    // Trouve la catégorie du tag dans notre taxonomie
    for (const cat in TAG_TAXONOMY) {
      if (TAG_TAXONOMY[cat as keyof typeof TAG_TAXONOMY].includes(tagName.toLowerCase())) {
        category = cat;
        break;
      }
    }
    return {
      name: tagName,
      category: category,
      // On valide si le tag est bien dans notre taxonomie
      isValid: category !== "inconnu",
    };
  });

  return {
    tags: processedTags,
    tagCount: processedTags.length,
    tagCategories: [...new Set(processedTags.map(tag => tag.category))],
  };
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
  transform: async (doc, ctx) => {
    // Compilation MDX au build
    const mdx = await compileMDX(ctx, doc);
    
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    const relations = await resolveConceptRelations(doc, ctx, concepts);
    
    // --- Validation personnalisée : mainGuideSlug ---
    await validateConceptReferences(doc, ctx);
    // ----------------------------------------------------

    return {
      ...computed,
      ...processedTags,
      ...relations,
      mdx, // Ajout du contenu MDX compilé
    };
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
    // Compilation MDX au build
    const mdx = await compileMDX(ctx, doc);
    
    const computed = addComputedFields(doc);
    const processedTags = processTags(doc);
    const relations = await resolveConceptRelations(doc, ctx, concepts);
    
    // Ajustement de la complexité pour les guides
    const complexity =
      computed.wordCoun > 5000 ? "avancé" :
      computed.wordCount > 2000 ? "intermédiaire" :
      "débutant";
    
    return {
      ...computed,
      ...processedTags,
      ...relations,
      mdx, // Ajout du contenu MDX compilé
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
        // Nouveaux champs pour séparer le prompt du contexte
        promptContent: z.string().optional(),
        alternativeVersions: z.array(z.object({
            name: z.string(),
            content: z.string()
        })).optional(),
    }),
    transform: async (doc, ctx) => {
        // Compilation MDX au build
        const mdx = await compileMDX(ctx, doc);
        
        const computed = addComputedFields(doc);
        const processedTags = processTags(doc);
        const relations = await resolveConceptRelations(doc, ctx, concepts);

        // Ajustement de la complexité pour les prompts
        const complexity =
          computed.wordCount > 1000 ? "avancé" :
          computed.wordCount > 500 ? "intermédiaire" :
          "débutant";

        return {
            ...computed,
            ...processedTags,
            ...relations,
            mdx, // Ajout du contenu MDX compilé
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
        // Compilation MDX au build
        const mdx = await compileMDX(ctx, doc);
        
        const computed = addComputedFields(doc);
        const processedTags = processTags(doc);
        const relations = await resolveConceptRelations(doc, ctx, concepts);

        // Ajustement de la complexité pour les outils externes
        const complexity =
          computed.wordCount > 2000 ? "avancé" :
          computed.wordCount > 1000 ? "intermédiaire" :
          "débutant";

        return {
            ...computed,
            ...processedTags,
            ...relations,
            mdx, // Ajout du contenu MDX compilé
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
// CONFIGURATION FINALE & VALIDATION GLOBALE
// ============================================================================
export default defineConfig({
  collections: [concepts, guides, prompts, externalTools],
  onSuccess: async (_allDocuments: any[]) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Afficher les erreurs de validation
    if (validationErrors.length > 0) {
      console.error("\n🚨 ERREURS DE VALIDATION DES RÉFÉRENCCCES CROISÉES 🚨\n");
      validationErrors.forEach(error => {
        console.error(`📄 Document: ${error.document}`);
        console.error(`🔧 Champ: ${error.field}`);
        console.error(`💬 Valeur: "${error.value}"`);
        console.error(`❌ ${error.message}`);
        console.error("---");
      });
      console.error(`\n❌ Total: ${validationErrors.length} erreur(s) de validation`);
      console.error("Veuillez corriger ces erreurs avant de continuer.\n");
      
      // Arrêter le build avec un code d'erreur
      process.exit(1);
    } else {
      console.log("✅ Toutes les références croisées sont valides");
    }
  },
});