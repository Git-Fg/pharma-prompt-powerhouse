// src/lib/content-schema.ts
import { z } from 'zod';

// === BLOCS DE CONTENU ATOMIQUES ===
// Chaque partie de votre contenu sera un de ces blocs.

const markdownBlockSchema = z.object({
  type: z.literal('markdown'),
  content: z.string(),
});

const alertBlockSchema = z.object({
  type: z.literal('alert'),
  variant: z.enum(['default', 'destructive']).default('default'),
  title: z.string().optional(),
  content: z.string(), // Contenu de l'alerte en Markdown
});

const recommendationSchema = z.object({
  slug: z.string(),
  reason: z.string(),
});

const toolRecommendationBlockSchema = recommendationSchema.extend({
  type: z.literal('toolRecommendation'),
});

const guideRecommendationBlockSchema = recommendationSchema.extend({
  type: z.literal('guideRecommendation'),
});

const conceptRecommendationBlockSchema = recommendationSchema.extend({
  type: z.literal('conceptRecommendation'),
});

// Union des blocs de base (sans onglets pour éviter la circularité)
const basicContentBlockSchema = z.union([
  markdownBlockSchema,
  alertBlockSchema,
  toolRecommendationBlockSchema,
  guideRecommendationBlockSchema,
  conceptRecommendationBlockSchema,
]);

// Bloc pour les onglets utilisant les blocs de base
const tabsBlockSchema = z.object({
  type: z.literal('tabs'),
  defaultValue: z.string(),
  tabs: z.array(z.object({
    value: z.string(),
    title: z.string(),
    content: z.array(basicContentBlockSchema), // Utilise les blocs de base uniquement
  }))
});

// Union complète incluant les onglets
const contentBlockSchema = z.union([
  basicContentBlockSchema,
  tabsBlockSchema,
]);

// === SCHÉMAS DES COLLECTIONS DE CONTENU ===

const baseContentSchema = z.object({
  slug: z.string(),
  title: z.string().min(1),
  description: z.string().min(10),
  difficulty: z.enum(["débutant", "intermédiaire", "avancé"]),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
  keyTakeaways: z.array(z.string()).optional(),
  conceptSlugs: z.array(z.string()).default([]),
  content: z.array(contentBlockSchema), // Le contenu est maintenant un tableau de blocs
});

export const guideSchema = baseContentSchema.extend({
  icon: z.string().optional(),
  category: z.string(),
  estimatedTime: z.string().optional(),
  isWorkflow: z.boolean().default(false),
});

export const conceptSchema = baseContentSchema.extend({
  icon: z.string().optional(),
  category: z.string().optional(),
  mainGuideSlug: z.string().optional(),
});

export const promptSchema = baseContentSchema.extend({
  icon: z.string().optional(),
  category: z.string(),
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

export const externalToolSchema = baseContentSchema.extend({
  url: z.string().url(),
  category: z.string(),
  pricing: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  use_cases: z.array(z.string()).min(1, "Au moins un cas d'usage est requis"),
  color: z.string().min(1, "La couleur est requise"),
  tldr: z.string().min(20, "Le TLDR doit être concis mais informatif").optional(),
});

// Types inférés de Zod
export type Guide = z.infer<typeof guideSchema>;
export type Concept = z.infer<typeof conceptSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type ExternalTool = z.infer<typeof externalToolSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type MarkdownBlock = z.infer<typeof markdownBlockSchema>;
export type AlertBlock = z.infer<typeof alertBlockSchema>;
export type ToolRecommendationBlock = z.infer<typeof toolRecommendationBlockSchema>;
export type GuideRecommendationBlock = z.infer<typeof guideRecommendationBlockSchema>;
export type ConceptRecommendationBlock = z.infer<typeof conceptRecommendationBlockSchema>;
export type TabsBlock = z.infer<typeof tabsBlockSchema>;