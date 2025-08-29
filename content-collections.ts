import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

// ============================================================================
// SCHÉMAS CENTRALISÉS - Source unique de vérité
// ============================================================================

// Schéma de base commun pour tous les types de contenu
const baseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  date: z.string().optional(),
  isFavorite: z.boolean().optional(),
  author: z.string().optional(),
  readingTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Schéma pour les guides
export const guideSchema = baseContentSchema.extend({
  content: z.string(),
  category: z.enum([
    "prompting",
    "methodology",
    "tools",
    "security",
    "optimization",
    "ia-modernes",
    "cas-pratiques",
  ]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedTime: z.string(),
  progress: z.number().optional(),
  relatedPrompts: z.array(z.string()).optional(),
  relatedTools: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
});

// Schéma pour la philosophie
export const philosophySchema = baseContentSchema.extend({
  content: z.string(),
  principles: z.array(z.string()).optional(),
  relatedConcepts: z.array(z.string()).optional(),
  category: z.enum(["fondements", "applications", "methodologie"]).optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  estimatedTime: z.string().optional(),
});

// Schéma pour les principes
export const principleSchema = baseContentSchema.extend({
  content: z.string(),
  analogy: z.string().optional(),
  practicalApplications: z.array(z.string()).optional(),
  category: z
    .enum(["techniques", "methodologiques", "fondamentaux"])
    .optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  estimatedTime: z.string().optional(),
});

// Schéma pour les prompts
export const promptSchema = baseContentSchema.extend({
  content: z.string(),
  promptDescription: z.string().optional(),
  category: z.enum([
    "technical",
    "analysis",
    "creative",
    "documentation",
    "research",
    "pharmacologie",
    "cas-cliniques",
    "revision",
    "diagnostic",
  ]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
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
    "glass-ai",
  ]),
  estimatedTime: z.string(),
  variables: z.array(z.string()).optional(),
  domain: z
    .enum([
      "general",
      "pharmacologie",
      "chimie-medicinale",
      "pharmacie-hospitaliere",
      "officine",
      "recherche",
    ])
    .optional(),
  useCase: z.string().optional(),
  example: z.string().optional(),
});

// Schéma pour les outils externes
export const externalToolSchema = baseContentSchema.extend({
  content: z.string(),
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
  guideSlug: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  estimatedTime: z.string().optional(),
});

// ============================================================================
// TYPES GÉNÉRÉS AUTOMATIQUEMENT - Pas de duplication !
// ============================================================================

// Types principaux
export type Guide = z.infer<typeof guideSchema>;
export type Philosophy = z.infer<typeof philosophySchema>;
export type Principle = z.infer<typeof principleSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type ExternalTool = z.infer<typeof externalToolSchema>;

// Types d'entrée (pour la création/modification)
export type GuideInput = z.input<typeof guideSchema>;
export type PhilosophyInput = z.input<typeof philosophySchema>;
export type PrincipleInput = z.input<typeof principleSchema>;
export type PromptInput = z.input<typeof promptSchema>;
export type ExternalToolInput = z.input<typeof externalToolSchema>;

// Types utilitaires
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type GuideCategory = z.infer<typeof guideSchema>["category"];
export type PromptCategory = z.infer<typeof promptSchema>["category"];
export type TargetTool = z.infer<typeof promptSchema>["targetTool"];

// ============================================================================
// DÉFINITION DES COLLECTIONS
// ============================================================================

export const guides = defineCollection({
  name: "guides",
  directory: "src/content/guides",
  include: "*.mdx",
  schema: guideSchema,
});

export const philosophy = defineCollection({
  name: "philosophy",
  directory: "src/content/philosophy",
  include: "*.mdx",
  schema: philosophySchema,
});

export const principles = defineCollection({
  name: "principles",
  directory: "src/content/principles",
  include: "*.mdx",
  schema: principleSchema,
});

export const prompts = defineCollection({
  name: "prompts",
  directory: "src/content/prompts",
  include: "*.mdx",
  schema: promptSchema,
});

export const externalTools = defineCollection({
  name: "externalTools",
  directory: "src/content/external-tools",
  include: "*.mdx",
  schema: externalToolSchema,
});

export default defineConfig({
  collections: [guides, philosophy, principles, prompts, externalTools],
});
