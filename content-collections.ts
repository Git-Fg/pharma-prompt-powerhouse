import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { extractSlug } from "@/lib/content-utils";

// ============================================================================
// SCHÉMAS CENTRALISÉS - Source unique de vérité
// ============================================================================

// Schéma de base unifié et enrichi pour tous les types de contenu
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string().optional(), // Rendu optionnel pour la compatibilité
  date: z.string().optional(), // Validation plus simple
  tags: z.array(z.string()).default([]), // Valeur par défaut
  isFavorite: z.boolean().default(false), // Valeur par défaut
  // Champs communs uniformisés - rendus optionnels pour la flexibilité
  difficulty: z.enum(["débutant", "intermédiaire", "avancé"]).optional(),
  estimatedTime: z.string().optional(),
  concepts: z.array(z.string()).default([]), // NOUVEAU : Lien vers les concepts

  // NOUVEL AJOUT : Points clés à retenir
  keyTakeaways: z
    .array(z.string())
    .max(3, { message: "Il ne peut y avoir plus de 3 points clés." })
    .optional(),
});

// Schéma pour les guides, étendant la base avec ses champs spécifiques
export const guideSchema = baseSchema.extend({
  category: z.enum([
    "prompting",
    "methodologie",
    "tools",
    "security",
    "optimization",
    "ia-modernes",
    "cas-pratiques",
    "ressources",
    "fondamentaux",
    "techniques-avancees",
  ]), // Suppression de .optional() - maintenant obligatoire
  progress: z.number().optional(),
  targetAudience: z.array(z.string()).default([]),
});

// Schéma pour les prompts - ÉPURÉ
export const promptSchema = baseSchema.extend({
  category: z.enum([
    "technique",
    "analyse",
    "créatif",
    "documentation",
    "recherche",
    "pharmacologie",
    "cas-cliniques",
    "révision",
    "diagnostic",
  ]),
  targetTool: z.enum([
    "chatgpt",
    "claude",
    "perplexity",
    "ai.dev",
    "z.ai",
    "gemini",
    "gemini-deep-research",
    "vertex-ai",
    "notebooklm",
    "glass-ia",
  ]),
  variables: z.array(z.string()).optional(),
  domain: z
    .enum([
      "général",
      "pharmacologie",
      "chimie-médicinale",
      "pharmacie-hospitalière",
      "officine",
      "recherche",
    ])
    .optional(),
  useCase: z.string().optional(),
  example: z.string().optional(),
  // Le champ difficulty est hérité de baseSchema et sera donc disponible
});

// Schéma pour les outils externes - MIS À JOUR
export const externalToolSchema = baseSchema.extend({
  url: z.string().url(),
  category: z.enum([
    "Moteur de Recherche IA",
    "Analyse de Documents",
    "LLM Généraliste",
    "Développement IA",
    "Spécialisé Santé",
  ]),
  pricing: z.enum(["Gratuit", "Freemium", "Payant", "Étudiant"]),
  capabilities: z.array(z.string()),
  slug: z.string().optional(), // Ajouté automatiquement par la fonction transform
  // Le champ 'content' est maintenant hérité de baseSchema et sera rempli par le corps du MDX
});

// ============================================================================
// Schéma pour les Concepts (pivot central)
// ============================================================================
export const conceptSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(), // Nom de l'icône Lucide
  content: z.string(),
  keyTakeaways: z
    .array(z.string())
    .max(3, { message: "Il ne peut y avoir plus de 3 points clés." })
    .optional(),

  // NOUVEAUX CHAMPS
  mainGuideSlug: z.string().optional(), // Slug du guide principal pour ce concept
  category: z
    .enum(["Fondamentaux", "Techniques Avancées", "Méthodologie"])
    .optional(),
});

// ============================================================================
// TYPES GÉNÉRÉS AUTOMATIQUEMENT - Pas de duplication !
// ============================================================================
export type Guide = z.infer<typeof guideSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type ExternalTool = z.infer<typeof externalToolSchema>;
export type Concept = z.infer<typeof conceptSchema>;

// ============================================================================
// DÉFINITION DES COLLECTIONS
// ============================================================================

export const guides = defineCollection({
  name: "guides",
  directory: "src/content/guides",
  include: "*.mdx", // Changement de "**/*.mdx" à "*.mdx" pour ne chercher que dans le dossier racine
  schema: guideSchema,
  transform: ({ _meta, ...data }) => {
    // Simplification totale de la transformation
    return {
      ...data,
      slug: extractSlug(_meta.path), // Le slug est maintenant plat
    };
  },
});

export const prompts = defineCollection({
  name: "prompts",
  directory: "src/content/prompts",
  include: "*.mdx",
  schema: promptSchema,
  transform: ({ _meta, ...data }) => ({
    ...data,
    slug: extractSlug(_meta.path),
  }),
});

export const externalTools = defineCollection({
  name: "externalTools",
  directory: "src/content/external-tools",
  include: "*.mdx",
  schema: externalToolSchema,
  // On ajoute une transformation pour créer un slug propre
  transform: ({ _meta, ...data }) => {
    const path = _meta?.path || "";
    return {
      ...data,
      slug: extractSlug(path), // Ex: gemini-deep-research
    };
  },
});

// ============================================================================
// Définition de la collection "concepts" (pivot central)
// ============================================================================
export const concepts = defineCollection({
  name: "concepts",
  directory: "src/content/concepts",
  include: "*.mdx",
  schema: conceptSchema,
  transform: ({ _meta, ...data }) => ({
    ...data,
    slug: extractSlug(_meta.path),
  }),
});

export default defineConfig({
  // SUPPRESSION de 'principles' de la liste
  collections: [guides, prompts, externalTools, concepts],
});
