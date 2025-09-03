// Source unique de vérité pour le typage des blocs
export type KnownBlock =
  | { type: "markdown"; content: string }
  | { type: "alert"; variant?: "default"|"destructive"; title?: string; content: string }
  | { type: "toolRecommendation"; slug?: string; reason?: string }
  | { type: "guideRecommendation"; slug?: string; reason?: string }
  | { type: "conceptRecommendation"; slug?: string; reason?: string }
  | { type: "codeBlock"; language: string; filename?: string; showLineNumbers?: boolean; content: string }
  | { type: "card"; title?: string; description?: string; content: string }
  | { type: "tabs"; defaultValue?: string; tabs: Array<{ value: string; title: string; content: KnownBlock[] }> };
import { z } from 'zod';

// Base schemas for primitive types - made permissive for content flexibility
const slugSchema = z.string();
const difficultySchema = z.string(); // Allow any difficulty level
const categorySchema = z.string(); // Allow any category

// --- Block Schemas for Content Structure ---

export const markdownBlockSchema = z.object({
  type: z.literal('markdown'),
  content: z.string(),
});

export const alertBlockSchema = z.object({
  type: z.literal('alert'),
  variant: z.enum(['default', 'destructive']).default('default'),
  title: z.string().optional(),
  content: z.string(),
});


export const toolRecommendationBlockSchema = z.object({
  type: z.literal('toolRecommendation'),
  slug: z.string().optional(),
  reason: z.string().optional(),
}).strict();

export const guideRecommendationBlockSchema = z.object({
  type: z.literal('guideRecommendation'),
  slug: z.string().optional(),
  reason: z.string().optional(),
}).strict();

export const conceptRecommendationBlockSchema = z.object({
  type: z.literal('conceptRecommendation'),
  slug: z.string().optional(),
  reason: z.string().optional(),
}).strict();

export const codeBlockSchema = z.object({
  type: z.literal('codeBlock'),
  language: z.string(),
  filename: z.string().optional(),
  showLineNumbers: z.boolean().optional(),
  content: z.string(),
}).strict();

export const cardBlockSchema = z.object({
  type: z.literal('card'),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string(),
}).strict();

type TabsBlock = {
  type: 'tabs';
  defaultValue?: string;
  tabs: Array<{
    value: string;
    title: string;
    content: ContentBlock[];
  }>;
};

export const tabsBlockSchema: z.ZodType<TabsBlock> = z.object({
  type: z.literal('tabs'),
  defaultValue: z.string().optional(),
  tabs: z.array(z.object({
    value: z.string(),
    title: z.string(),
    content: z.array(z.lazy(() => contentBlockSchema as z.ZodType<ContentBlock>)),
  }).strict()),
}).strict();

export const contentBlockSchema: z.ZodType<KnownBlock> = z.union([
  markdownBlockSchema,
  alertBlockSchema,
  toolRecommendationBlockSchema,
  guideRecommendationBlockSchema,
  conceptRecommendationBlockSchema,
  codeBlockSchema,
  cardBlockSchema,
  tabsBlockSchema,
]);

export type ContentBlock = z.infer<typeof contentBlockSchema>;

// --- Main Content Collection Schemas ---

const baseContentSchema = z.object({
  slug: slugSchema,
  title: z.string(),
  description: z.string().min(20, 'Description must be at least 20 characters long'),
  isFavorite: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const conceptSchema = baseContentSchema.extend({
  category: categorySchema,
  difficulty: difficultySchema,
  keyTakeaways: z.array(z.string()).min(1, 'Must have at least one key takeaway'),
  mainGuideSlug: slugSchema.optional(),
  icon: z.string().optional(),
  conceptSlugs: z.array(slugSchema).optional(),
  content: z.array(contentBlockSchema),
}).strict();

export const guideSchema = baseContentSchema.extend({
  category: categorySchema,
  difficulty: difficultySchema,
  estimatedTime: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  isWorkflow: z.boolean().default(false),
  conceptSlugs: z.array(slugSchema).optional(),
  icon: z.string().optional(),
  content: z.array(contentBlockSchema),
}).strict();

export const promptSchema = baseContentSchema.extend({
  category: categorySchema,
  difficulty: difficultySchema,
  promptContent: z.string().optional(),
  systemPromptContent: z.string().optional(),
  variables: z.array(z.string()).optional(),
  conceptSlugs: z.array(slugSchema).optional(),
  content: z.array(contentBlockSchema),
}).strict();

export const externalToolSchema = baseContentSchema.extend({
  url: z.string().url(),
  logo: z.string().optional(),
  category: categorySchema, 
}).strict();

export const objectifSchema = baseContentSchema.extend({
  masterPrompt: z.object({
    description: z.string(),
    prompt: promptSchema,
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
}).strict();


// --- Type Inference for Frontend Usage ---

export type Guide = z.infer<typeof guideSchema>;
export type Concept = z.infer<typeof conceptSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type ExternalTool = z.infer<typeof externalToolSchema>;
export type Objectif = z.infer<typeof objectifSchema>;
export type Workflow = z.infer<typeof workflowSchema>;

// --- Enriched Types for Loader Output ---

export type EnrichedGuide = Guide & {
  concepts: Concept[];
};

export type EnrichedConcept = Concept & {
  guide?: EnrichedGuide;
};
