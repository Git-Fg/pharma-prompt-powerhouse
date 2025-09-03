// Source unique de vérité pour le typage des blocs
import { z } from 'zod';

// =================================================================
// 1. DÉFINITION DES SCHÉMAS DE BLOCS DE CONTENU (SOURCE DE VÉRITÉ)
// =================================================================

const markdownBlockSchema = z.object({
  type: z.literal('markdown'),
  content: z.string(),
});

const alertBlockSchema = z.object({
  type: z.literal('alert'),
  variant: z.enum(['default', 'destructive']).default('default').optional(),
  title: z.string().optional(),
  content: z.string(),
});

const toolRecommendationBlockSchema = z.object({
  type: z.literal('toolRecommendation'),
  slug: z.string().optional(),
  reason: z.string().optional(),
}).strict();

const guideRecommendationBlockSchema = z.object({
  type: z.literal('guideRecommendation'),
  slug: z.string().optional(),
  reason: z.string().optional(),
}).strict();

const conceptRecommendationBlockSchema = z.object({
  type: z.literal('conceptRecommendation'),
  slug: z.string().optional(),
  reason: z.string().optional(),
}).strict();

const codeBlockSchema = z.object({
  type: z.literal('codeBlock'),
  language: z.string(),
  filename: z.string().optional(),
  showLineNumbers: z.boolean().optional(),
  content: z.string(),
}).strict();

const cardBlockSchema = z.object({
  type: z.literal('card'),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string(),
  variant: z.enum(['default', 'outline']).optional(),
}).strict();

const multiFormatPromptBlockSchema = z.object({
  type: z.literal('multiFormatPrompt'),
  alternativeVersions: z.record(z.string(), z.object({
    systemPrompt: z.string().optional(),
    userPrompt: z.string().optional(), // Rendu optionnel pour flexibilité
  })).optional(),
  recommendedTools: z.record(z.string(), z.array(z.string())).optional(),
  variables: z.array(z.string()).optional(),
}).strict();

// Schéma récursif pour les onglets
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tabsBlockSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.literal('tabs'),
    defaultValue: z.string().optional(),
    tabs: z.array(
      z.object({
        value: z.string(),
        title: z.string(),
        content: z.array(z.lazy(() => contentBlockSchema)),
      }).strict()
    ),
  }).strict()
);

// Union de tous les blocs de contenu possibles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contentBlockSchema: z.ZodType<any> = z.union([
  markdownBlockSchema,
  alertBlockSchema,
  toolRecommendationBlockSchema,
  guideRecommendationBlockSchema,
  conceptRecommendationBlockSchema,
  codeBlockSchema,
  cardBlockSchema,
  tabsBlockSchema,
  multiFormatPromptBlockSchema,
]);

// Type TypeScript inféré pour un bloc de contenu
export type ContentBlock = z.infer<typeof contentBlockSchema>;


// =================================================================
// 2. DÉFINITION DES SCHÉMAS POUR LES COLLECTIONS DE CONTENU
// =================================================================

const slugSchema = z.string();

const baseContentSchema = z.object({
  slug: slugSchema,
  title: z.string(),
  description: z.string().min(20, 'Description must be at least 20 characters long'),
  icon: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
});

export const conceptSchema = baseContentSchema.extend({
  category: z.string(),
 difficulty: z.string(),
  keyTakeaways: z.array(z.string()).min(1, 'Must have at least one key takeaway'),
  mainGuideSlug: slugSchema.optional(),
  conceptSlugs: z.array(slugSchema).optional(),
  content: z.array(contentBlockSchema),
}).strict();

export const guideSchema = baseContentSchema.extend({
  category: z.string(),
  difficulty: z.string(),
 estimatedTime: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  isWorkflow: z.boolean().default(false),
  conceptSlugs: z.array(slugSchema).optional(),
  content: z.array(contentBlockSchema),
}).strict();

export const promptSchema = baseContentSchema.extend({
  category: z.string(),
  difficulty: z.string(),
  promptContent: z.string().optional(),
  systemPromptContent: z.string().optional(),
  variables: z.array(z.string()).optional(),
  targetTool: z.string().optional(),
  alternativeVersions: z.record(z.string(), z.object({
    standard: z.string().optional(),
    xml: z.string().optional(),
    aiStudio: z.object({
      systemPrompt: z.string().optional(),
      userPrompt: z.string().optional(),
    }).optional(),
  })).optional(),
  recommendedTools: z.record(z.string(), z.array(z.string())).optional(),
  conceptSlugs: z.array(slugSchema).optional(),
  content: z.array(contentBlockSchema),
}).strict();

export const externalToolSchema = baseContentSchema.extend({
  url: z.string().url(),
  logo: z.string().optional(),
  category: z.string(), 
  tldr: z.string().optional(),
  color: z.string().optional(),
  use_cases: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  content: z.array(contentBlockSchema).optional(),
}).strict();

// Note: Le prompt dans l'objectif est une dépendance circulaire si on type fortement.
// On le laisse en `z.any()` pour la simplicité ou on peut le typer plus précisément.
export const objectifSchema = baseContentSchema.extend({
  masterPrompt: z.object({
    description: z.string(),
    prompt: z.any(), // Pour éviter une dépendance circulaire complexe avec le loader
  }),
  beforeAfter: z.object({
    beforePrompt: z.string(),
    afterPrompt: z.string(),
    beforeImageSrc: z.string().optional(),
    afterImageSrc: z.string().optional(),
  }),
  checklist: z.array(z.string()).min(1),
  relatedConcepts: z.array(z.string()),
  relatedGuides: z.array(z.string()),
 content: z.array(contentBlockSchema).optional(),
}).strict();

export const workflowSchema = baseContentSchema.extend({
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    promptSlug: slugSchema.optional(),
  })),
  content: z.array(contentBlockSchema).optional(),
}).strict();


// =================================================================
// 3. EXPORTATION DES TYPES TYPESCRIPT INFÉRÉS
// =================================================================

export type Concept = z.infer<typeof conceptSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type ExternalTool = z.infer<typeof externalToolSchema>;
export type Objectif = z.infer<typeof objectifSchema>;
export type Workflow = z.infer<typeof workflowSchema>;

// Types enrichis pour le loader
export type EnrichedGuide = Guide & {
  concepts: Concept[];
};

export type EnrichedConcept = Concept & {
  guide?: EnrichedGuide;
};

// Exporter aussi le schéma de bloc de contenu pour une utilisation directe
export { contentBlockSchema };
