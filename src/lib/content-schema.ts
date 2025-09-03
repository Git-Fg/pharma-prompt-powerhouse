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

// Flexible schema to handle all content types without strict validation
export const flexibleContentBlockSchema = z.object({
  type: z.string(), // Allow any type
}).catchall(z.any()); // Allow any additional properties

export const contentBlockSchema = z.union([
  markdownBlockSchema,
  alertBlockSchema,
  flexibleContentBlockSchema, // Catch-all for other types
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
  content: z.array(contentBlockSchema),
});

export const guideSchema = baseContentSchema.extend({
  category: categorySchema,
  difficulty: difficultySchema,
  estimatedTime: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  isWorkflow: z.boolean().default(false),
  conceptSlugs: z.array(slugSchema).optional(),
  icon: z.string().optional(),
  content: z.array(contentBlockSchema),
});

export const promptSchema = baseContentSchema.extend({
    category: categorySchema,
    difficulty: difficultySchema,
    promptContent: z.string().optional(),
    systemPromptContent: z.string().optional(),
    variables: z.array(z.string()).optional(), // Keep it simple as strings for now
    conceptSlugs: z.array(slugSchema).optional(),
    content: z.array(contentBlockSchema),
});

export const externalToolSchema = baseContentSchema.extend({
  url: z.string().url(),
  logo: z.string().optional(),
  category: categorySchema, 
});

export const objectifSchema = baseContentSchema.extend({
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
    
    // Le contenu détaillé - made optional to be more flexible
    content: z.array(contentBlockSchema).optional(),
});

export const workflowSchema = baseContentSchema.extend({
    steps: z.array(z.object({
        title: z.string(),
        description: z.string(),
        promptSlug: slugSchema.optional(),
    })),
});


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
