// src/lib/content-schema.ts
import { z } from 'zod';
import {
  allDifficulties,
  allCategories
} from './constants';
import { lucideIconNames } from './icon-constants';

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

const codeBlockSchema = z.object({
  type: z.literal('codeBlock'),
  language: z.string().optional(),
  filename: z.string().optional(),
  showLineNumbers: z.boolean().default(false),
  content: z.string(),
});

const cardBlockSchema = z.object({
  type: z.literal('card'),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string(), // Markdown content
  variant: z.enum(['default', 'outline']).default('default'),
});

// Union des blocs de base (sans onglets pour éviter la circularité)
const basicContentBlockSchema = z.union([
  markdownBlockSchema,
  alertBlockSchema,
  toolRecommendationBlockSchema,
  guideRecommendationBlockSchema,
  conceptRecommendationBlockSchema,
  codeBlockSchema,
  cardBlockSchema,
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
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().min(10, "La description doit faire au moins 10 caractères."),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
  keyTakeaways: z.array(z.string()).optional(), // Reste optionnel ici, sera rendu obligatoire si besoin
  conceptSlugs: z.array(z.string()).default([]),
  content: z.array(contentBlockSchema).min(1, "Le contenu ne peut pas être vide."), // Doit contenir au moins un bloc
}).strict(); // NOUVEAU : Interdit les champs inconnus

export const guideSchema = baseContentSchema.extend({
  difficulty: z.enum(allDifficulties),
  icon: z.enum(lucideIconNames), // DEVIENT OBLIGATOIRE : Un guide doit avoir une icône
  category: z.enum(allCategories),
  estimatedTime: z.string(), // DEVIENT OBLIGATOIRE : Un guide doit avoir un temps de lecture estimé
  isWorkflow: z.boolean().default(false),
}).refine(data => data.keyTakeaways && data.keyTakeaways.length > 0, {
  message: "Un guide doit avoir au moins un 'keyTakeaway'.",
  path: ["keyTakeaways"],
}).strict();

export const conceptSchema = baseContentSchema.extend({
  difficulty: z.enum(allDifficulties),
  icon: z.enum(lucideIconNames), // DEVIENT OBLIGATOIRE : Un concept doit avoir une icône
  category: z.enum(allCategories), // DEVIENT OBLIGATOIRE : Un concept doit avoir une catégorie
  mainGuideSlug: z.string().optional(),
}).refine(data => data.keyTakeaways && data.keyTakeaways.length > 0, {
  message: "Un concept doit avoir au moins un 'keyTakeaway'.",
  path: ["keyTakeaways"], // Indique quel champ est en erreur
}).strict();

export const promptSchema = baseContentSchema.extend({
  difficulty: z.enum(allDifficulties),
  icon: z.enum(lucideIconNames), // DEVIENT OBLIGATOIRE : Un prompt doit avoir une icône
  category: z.enum(allCategories),
  targetTool: z.string().optional(),
  variables: z.array(z.string()).optional(),
  domain: z.string().optional(),
  useCase: z.string().optional(),
  example: z.string().optional(),
  promptContent: z.string().min(1, "Le contenu principal du prompt (promptContent) est requis."), // DEVIENT OBLIGATOIRE
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
}).strict();

export const externalToolSchema = baseContentSchema.extend({
  url: z.string().url(),
  category: z.enum(allCategories),
  pricing: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  use_cases: z.array(z.string()).min(1, "Au moins un cas d'usage est requis"),
  color: z.string().min(1, "La couleur est requise"),
  tldr: z.string().min(20, "Le TLDR doit être concis mais informatif"), // DEVIENT OBLIGATOIRE
}).strict();

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
export type CodeBlockType = z.infer<typeof codeBlockSchema>;
export type CardBlock = z.infer<typeof cardBlockSchema>;
export type TabsBlock = z.infer<typeof tabsBlockSchema>;

// === SCHÉMA POUR LES OBJECTIFS ===

export const objectifSchema = z.object({
  slug: z.string(),
  title: z.string().min(1),
  description: z.string().min(10),
  icon: z.enum(lucideIconNames),
  
  // La solution clé en main
  masterPrompt: z.object({
    description: z.string(),
    prompt: promptSchema, // Réutilise le schéma de prompt existant !
  }),

  // La section d'auto-évaluation
  beforeAfter: z.object({
    beforePrompt: z.string(),
    afterPrompt: z.string(),
    // On utilise des chemins relatifs vers /public pour les images
    beforeImageSrc: z.string().optional(),
    afterImageSrc: z.string().optional(),
  }),
  
 checklist: z.array(z.string()).min(1),

  // Les liens vers l'approfondissement
  relatedConcepts: z.array(z.string()),
  relatedGuides: z.array(z.string()),
}).strict();

// Types inférés de Zod
export type Objectif = z.infer<typeof objectifSchema>;