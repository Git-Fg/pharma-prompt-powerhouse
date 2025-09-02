import { z } from 'zod';

// Base schemas for primitive types to ensure consistency
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format');
const difficultySchema = z.enum(['débutant', 'intermédiaire', 'avancé']);
const categorySchema = z.enum(['techniques-de-base', 'prompts-avancés', 'bonnes-pratiques', 'outils-et-workflows']);

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

export const contentBlockSchema = z.discriminatedUnion('type', [
  markdownBlockSchema,
  alertBlockSchema,
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
  difficulty: difficultySchema,
  keyTakeaways: z.array(z.string()).min(1, 'Must have at least one key takeaway'),
  mainGuideSlug: slugSchema.optional(),
  content: z.array(contentBlockSchema),
});

export const guideSchema = baseContentSchema.extend({
  category: categorySchema,
  difficulty: difficultySchema,
  conceptSlugs: z.array(slugSchema).optional(),
  content: z.array(contentBlockSchema),
});

export const promptSchema = baseContentSchema.extend({
    promptContent: z.string().optional(),
    variables: z.array(z.object({ name: z.string(), description: z.string() })).optional(),
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
    
    // Le contenu détaillé
    content: z.array(contentBlockSchema).min(1, "Le contenu ne peut pas être vide."),
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
