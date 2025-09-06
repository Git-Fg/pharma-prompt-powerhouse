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
  variant: z.enum(['default', 'highlighted', 'compact', 'featured']).optional(),
  contentType: z.enum(['guide', 'concept', 'workflow', 'tool']).optional(),
})

const prerequisitesBlockSchema = z.object({
  type: z.literal('prerequisites'),
  items: z.array(z.object({
    type: z.enum(['concept', 'guide', 'workflow', 'external']),
    slug: z.string().optional(),
    title: z.string().optional(),
    url: z.string().optional(),
    reason: z.string(),
  })),
})

const actionChecklistBlockSchema = z.object({
  type: z.literal('actionChecklist'),
  title: z.string().optional(),
  description: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(['high', 'medium', 'low']).optional(),
  })),
  variant: z.enum(['default', 'card', 'alert']).optional(),
  allowChecking: z.boolean().optional(),
})

const pointsBlockSchema = z.object({
  type: z.literal('points'),
  title: z.string().optional(),
  points: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
})

const definedTermBlockSchema = z.object({
  type: z.literal('definedTerm'),
  term: z.string(),
  children: z.string(),
  variant: z.enum(['inline', 'button']).optional(),
  showIcon: z.boolean().optional(),
})

const citationBlockSchema = z.object({
  type: z.literal('citation'),
  source: z.string(),
  title: z.string().optional(),
  url: z.string().url().optional(),
  citationType: z.enum(['article', 'book', 'website', 'study', 'guideline', 'other']).optional(),
  author: z.string().optional(),
  year: z.string().optional(),
  doi: z.string().optional(),
  journal: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  abstract: z.string().optional(),
  variant: z.enum(['inline', 'card', 'compact']).optional(),
})

const exampleBlockSchema = z.object({
  type: z.literal('example'),
  title: z.string(),
  description: z.string().optional(),
  content: z.string(),
  exampleType: z.enum(['prompt', 'code', 'workflow', 'scenario', 'other']).optional(),
  language: z.string().optional(),
  filename: z.string().optional(),
  outcome: z.string().optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  warnings: z.array(z.string()).optional(),
  variant: z.enum(['card', 'inline', 'compact']).optional(),
})

const sectionBlockSchema = z.object({
  type: z.enum(['introduction', 'analogy', 'section', 'conclusion', 'key-points', 'examples', 'warning']),
  title: z.string(),
  content: z.string(),
  variant: z.enum(['default', 'highlighted', 'subtle']).optional(),
})

// Recursive schemas need to be declared with z.lazy for circular references
// eslint-disable-next-line ts/no-explicit-any -- Schéma récursif Zod, limitation TypeScript pour les références circulaires
const accordionBlockSchema: z.ZodType<any> = z.lazy(() => z.object({
  type: z.literal('accordion'),
  items: z.array(z.object({
    title: z.string(),
    // eslint-disable-next-line ts/no-use-before-define
    content: z.array(contentBlockSchema),
  })),
}))

const tableBlockSchema = z.object({
  type: z.literal('table'),
  caption: z.string().optional(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
})

// eslint-disable-next-line ts/no-explicit-any -- Schéma récursif Zod, limitation TypeScript pour les références circulaires
const tabsBlockSchema: z.ZodType<any> = z.lazy(() => z.object({
  type: z.literal('tabs'),
  defaultValue: z.string().optional(),
  tabs: z.array(z.object({
    value: z.string(),
    title: z.string(),
    // eslint-disable-next-line ts/no-use-before-define
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
  prerequisitesBlockSchema,
  actionChecklistBlockSchema,
  pointsBlockSchema,
  definedTermBlockSchema,
  citationBlockSchema,
  exampleBlockSchema,
  sectionBlockSchema,
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
  cover: z.string().optional(),
  estimatedTime: z.string().optional(),
  keyTakeaways: z.array(z.string()).min(1),
  content: z.array(contentBlockSchema),
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

export type EnrichedGuide = BaseGuide & {
  concepts: BaseConcept[]
  relatedItems: Array<{
    slug: string
    title: string
    description: string
    type: 'guide' | 'workflow' | 'concept' | 'tool'
    score: number
  }>
}

export type EnrichedWorkflow = BaseWorkflow & {
  concepts: BaseConcept[]
  relatedItems: Array<{
    slug: string
    title: string
    description: string
    type: 'guide' | 'workflow' | 'concept' | 'tool'
    score: number
  }>
}

export type EnrichedConcept = BaseConcept & {
  relatedItems: Array<{
    slug: string
    title: string
    description: string
    type: 'guide' | 'workflow' | 'concept' | 'tool'
    score: number
  }>
}

// Aliases pour compatibilité descendante - seront dépréciés progressivement
export type Concept = BaseConcept
export type Guide = BaseGuide
export type Workflow = BaseWorkflow
export type ExternalTool = BaseExternalTool
