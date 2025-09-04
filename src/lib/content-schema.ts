import { z } from 'zod'

// =================================================================
// 1. DÉFINITION DES SCHÉMAS DE BLOCS DE CONTENU
// =================================================================

const markdownBlockSchema = z.object({ type: z.literal('markdown'), content: z.string() })
const alertBlockSchema = z.object({ type: z.literal('alert'), variant: z.enum(['default', 'destructive']).optional(), title: z.string().optional(), content: z.string() })
const toolRecommendationBlockSchema = z.object({ type: z.literal('toolRecommendation'), slug: z.string(), reason: z.string() })
const guideRecommendationBlockSchema = z.object({ type: z.literal('guideRecommendation'), slug: z.string(), reason: z.string() })
const conceptRecommendationBlockSchema = z.object({ type: z.literal('conceptRecommendation'), slug: z.string(), reason: z.string() })
const codeBlockSchema = z.object({ type: z.literal('codeBlock'), language: z.string(), filename: z.string().optional(), showLineNumbers: z.boolean().optional(), content: z.string() })
const cardBlockSchema = z.object({ type: z.literal('card'), title: z.string().optional(), description: z.string().optional(), content: z.string(), variant: z.enum(['default', 'outline']).optional() })
const multiFormatPromptBlockSchema = z.object({
  type: z.literal('multiFormatPrompt'),
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
  variables: z.array(z.string()).optional(),
})

// Additional block types supported by ContentRenderer
const keyTakeawaysBlockSchema = z.object({
  type: z.literal('keyTakeaways'),
  points: z.array(z.string()),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const accordionBlockSchema: z.ZodType<any> = z.lazy(() => z.object({
  type: z.literal('accordion'),
  items: z.array(z.object({
    title: z.string(),
    content: z.array(contentBlockSchema),
  })),
}))

const tableBlockSchema = z.object({
  type: z.literal('table'),
  caption: z.string().optional(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tabsBlockSchema: z.ZodType<any> = z.lazy(() => z.object({
  type: z.literal('tabs'),
  defaultValue: z.string().optional(),
  tabs: z.array(z.object({
    value: z.string(),
    title: z.string(),
    content: z.array(contentBlockSchema),
  })),
}))

export const contentBlockSchema = z.union([
  markdownBlockSchema,
  alertBlockSchema,
  toolRecommendationBlockSchema,
  guideRecommendationBlockSchema,
  conceptRecommendationBlockSchema,
  codeBlockSchema,
  cardBlockSchema,
  tabsBlockSchema,
  multiFormatPromptBlockSchema,
  keyTakeawaysBlockSchema,
  accordionBlockSchema,
  tableBlockSchema,
])

// Type TypeScript inféré pour un bloc de contenu
export type ContentBlock = z.infer<typeof contentBlockSchema>

// =================================================================
// 2. DÉFINITION DES SCHÉMAS POUR LES COLLECTIONS
// =================================================================

const slugSchema = z.string()
const baseContentSchema = z.object({
  slug: slugSchema,
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isFavorite: z.boolean().default(false),
  conceptSlugs: z.array(slugSchema).optional(),
})

export const conceptSchema = baseContentSchema.extend({
  category: z.string(),
  difficulty: z.string(),
  keyTakeaways: z.array(z.string()).min(1),
  content: z.array(contentBlockSchema),
})

export const guideSchema = baseContentSchema.extend({
  category: z.string(),
  difficulty: z.string(),
  estimatedTime: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  isWorkflow: z.boolean().default(false),
  content: z.array(contentBlockSchema),
})

export const workflowSchema = baseContentSchema.extend({
  category: z.string(),
  difficulty: z.string(),
  estimatedTime: z.string().optional(),
  problem: z.array(contentBlockSchema),
  initialApproach: z.array(contentBlockSchema),
  optimizedStrategy: z.array(contentBlockSchema),
  toolComparison: z.array(contentBlockSchema),
  finalPrompt: z.array(contentBlockSchema),
  keyTakeaways: z.array(z.string()).min(1),
  content: z.array(contentBlockSchema).optional(), // For additional content sections
})

// Enhanced external tool schema for L'Arsenal IA
export const externalToolSchema = baseContentSchema.extend({
  url: z.string().url(),
  category: z.string(),
  personalReview: z.string(), // "Mon Avis en Bref" - mandatory for quality assurance
  strongPoints: z.array(z.string()).min(1), // "Points Forts (selon mon expérience)" - mandatory
  vigilancePoints: z.array(z.string()).min(1), // "Points de Vigilance" - mandatory
  confidenceScore: z.number().min(1).max(5), // Score de Confiance sur 5 - mandatory
  confidenceJustification: z.string(), // Justification du score - mandatory
  freeVsPaidOffer: z.string(), // Tableau comparatif en Markdown - mandatory
  tldr: z.string().optional(),
  color: z.string().optional(),
  use_cases: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  keyTakeaways: z.array(z.string()).optional(),
  content: z.array(contentBlockSchema),
})

// =================================================================
// 3. EXPORTATION DES TYPES - BASE ET ENRICHIS EXPLICITES
// =================================================================

// Types de base correspondant exactement au contenu des fichiers
export type BaseConcept = z.infer<typeof conceptSchema>
export type BaseGuide = z.infer<typeof guideSchema>
export type BaseWorkflow = z.infer<typeof workflowSchema>
export type BaseExternalTool = z.infer<typeof externalToolSchema>

// Types enrichis résultant du content-loader - explicites pour la sécurité de type
export type EnrichedConcept = BaseConcept // Les concepts ne sont pas enrichis actuellement

export type EnrichedGuide = BaseGuide & {
  concepts: BaseConcept[]
  relatedGuides: Omit<BaseGuide, 'content' | 'conceptSlugs'>[]
}

export type EnrichedWorkflow = BaseWorkflow & {
  concepts: BaseConcept[]
  relatedWorkflows: Omit<BaseWorkflow, 'problem' | 'initialApproach' | 'optimizedStrategy' | 'toolComparison' | 'finalPrompt' | 'content' | 'conceptSlugs'>[]
}

// Aliases pour compatibilité descendante - seront dépréciés progressivement
export type Concept = BaseConcept
export type Guide = BaseGuide
export type Workflow = BaseWorkflow
export type ExternalTool = BaseExternalTool
