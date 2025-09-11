import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

/**
 * =================================================================
 * SOURCE DE VÉRITÉ UNIQUE POUR LES VARIANTES DE STYLE
 * =================================================================
 * Ce fichier centralise toutes les variantes de style des composants UI
 * en utilisant `tailwind-variants`.
 *
 * Philosophie :
 * - Un composant ne doit PAS contenir de logique de style (classes conditionnelles).
 * - Il doit importer et utiliser sa recette de variantes depuis ce fichier.
 * - Cela garantit la cohérence, la maintenabilité et la lisibilité du Design System.
 */

// =================================================================
// MODERNIZED CONTENT CARD VARIANTS - Using tailwind-variants
// =================================================================

export const contentCardVariants = tv({
  base: [
    'group flex flex-col transition-all hover:-translate-y-1',
    'rounded-lg border bg-card text-card-foreground shadow-sm',
  ],
  variants: {
    variant: {
      concept: 'border-l-4 border-l-blue-500 hover:shadow-lg hover:border-l-blue-600',
      guide: 'border-l-4 border-l-green-500 hover:shadow-lg hover:border-l-green-600',
      workflow: 'border-l-4 border-l-purple-500 hover:shadow-lg hover:border-l-purple-600',
      tool: 'border-l-4 border-l-orange-500 hover:shadow-lg hover:border-l-orange-600',
      security: 'border-l-4 border-l-red-500 hover:shadow-lg hover:border-l-red-600',
      advanced: 'border-l-4 border-l-purple-500 hover:shadow-lg hover:border-l-purple-600',
      default: 'hover:shadow-md',
    },
    size: {
      default: 'p-6',
      compact: 'p-4',
      large: 'p-8',
    },
    interactive: {
      true: 'cursor-pointer hover:shadow-xl transform-gpu',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    interactive: true,
  },
})

// =================================================================
// MODERNIZED STATUS BADGES - Enhanced with semantic colors
// =================================================================

export const statusBadgeVariants = tv({
  base: [
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  variants: {
    status: {
      'available': [
        'bg-green-50 text-green-700 border border-green-200',
        'dark:bg-green-950/50 dark:text-green-400 dark:border-green-800',
      ],
      'coming-soon': [
        'bg-yellow-50 text-yellow-700 border border-yellow-200',
        'dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-800',
      ],
      'development': [
        'bg-blue-50 text-blue-700 border border-blue-200',
        'dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800',
      ],
      'deprecated': [
        'bg-red-50 text-red-700 border border-red-200',
        'dark:bg-red-950/50 dark:text-red-400 dark:border-red-800',
      ],
      'experimental': [
        'bg-purple-50 text-purple-700 border border-purple-200',
        'dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800',
      ],
      'beta': [
        'bg-indigo-50 text-indigo-700 border border-indigo-200',
        'dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800',
      ],
    },
  },
  defaultVariants: {
    status: 'available',
  },
})

// =================================================================
// ENHANCED DIFFICULTY BADGES - Semantic pharmaceutical context
// =================================================================

export const difficultyBadgeVariants = tv({
  base: [
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
    'transition-all duration-200 hover:scale-105',
  ],
  variants: {
    difficulty: {
      débutant: [
        'bg-emerald-100 text-emerald-800 border border-emerald-200',
        'dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700',
        'hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
      ],
      intermédiaire: [
        'bg-amber-100 text-amber-800 border border-amber-200',
        'dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700',
        'hover:bg-amber-200 dark:hover:bg-amber-900/50',
      ],
      avancé: [
        'bg-red-100 text-red-800 border border-red-200',
        'dark:bg-red-900/30 dark:text-red-400 dark:border-red-700',
        'hover:bg-red-200 dark:hover:bg-red-900/50',
      ],
    },
  },
  defaultVariants: {
    difficulty: 'débutant',
  },
})

// =================================================================
// ENHANCED CATEGORY BADGES - Professional pharmaceutical styling
// =================================================================

export const categoryBadgeVariants = tv({
  base: [
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
    'transition-all duration-200 hover:scale-105 cursor-default',
  ],
  variants: {
    category: {
      'fondamentaux': [
        'bg-blue-50 text-blue-700 border border-blue-200',
        'dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
      ],
      'methodologie': [
        'bg-green-50 text-green-700 border border-green-200',
        'dark:bg-green-950/50 dark:text-green-300 dark:border-green-800',
      ],
      'ressources': [
        'bg-purple-50 text-purple-700 border border-purple-200',
        'dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
      ],
      'techniques-avancees': [
        'bg-orange-50 text-orange-700 border border-orange-200',
        'dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
      ],
      'cas-pratiques': [
        'bg-red-50 text-red-700 border border-red-200',
        'dark:bg-red-950/50 dark:text-red-300 dark:border-red-800',
      ],
      'prompting': [
        'bg-cyan-50 text-cyan-700 border border-cyan-200',
        'dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800',
      ],
      'security': [
        'bg-yellow-50 text-yellow-700 border border-yellow-200',
        'dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800',
      ],
      'optimization': [
        'bg-pink-50 text-pink-700 border border-pink-200',
        'dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800',
      ],
      'bonnes-pratiques': [
        'bg-indigo-50 text-indigo-700 border border-indigo-200',
        'dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
      ],
    },
  },
  defaultVariants: {
    category: 'fondamentaux',
  },
})

// =================================================================
// ENHANCED CONFIDENCE BADGES - Professional trust indicators
// =================================================================

export const confidenceBadgeVariants = tv({
  base: [
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
    'transition-all duration-200 hover:scale-105',
  ],
  variants: {
    confidence: {
      1: [
        'bg-red-50 text-red-700 border border-red-200',
        'dark:bg-red-950/50 dark:text-red-300 dark:border-red-800',
      ],
      2: [
        'bg-orange-50 text-orange-700 border border-orange-200',
        'dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
      ],
      3: [
        'bg-yellow-50 text-yellow-700 border border-yellow-200',
        'dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800',
      ],
      4: [
        'bg-blue-50 text-blue-700 border border-blue-200',
        'dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
      ],
      5: [
        'bg-green-50 text-green-700 border border-green-200',
        'dark:bg-green-950/50 dark:text-green-300 dark:border-green-800',
      ],
    },
  },
  defaultVariants: {
    confidence: 3,
  },
})

// =================================================================
// ENHANCED INTERACTIVE ELEMENTS - Modern micro-interactions
// =================================================================

export const interactiveElementVariants = tv({
  base: 'transition-all duration-200 ease-out',
  variants: {
    variant: {
      button: [
        'hover:scale-105 active:scale-95',
        'hover:shadow-lg active:shadow-md',
        'transform-gpu',
      ],
      card: [
        'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5',
        'active:translate-y-0 active:shadow-lg',
        'transform-gpu',
      ],
      link: [
        'hover:text-primary hover:underline underline-offset-4',
        'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
      ],
      icon: [
        'hover:scale-110 hover:rotate-3 hover:text-primary',
        'transform-gpu',
      ],
      magnetic: [
        'hover:scale-105 hover:shadow-2xl hover:shadow-primary/10',
        'transition-all duration-300 ease-out transform-gpu',
        'hover:z-10 relative',
      ],
    },
    disabled: {
      true: [
        'opacity-50 cursor-not-allowed pointer-events-none',
        'hover:scale-100 hover:shadow-none hover:translate-y-0',
      ],
      false: '',
    },
  },
  defaultVariants: {
    variant: 'button',
    disabled: false,
  },
})

// =================================================================
// TYPES FOR TYPESCRIPT INTEGRATION
// =================================================================

export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>
export type DifficultyBadgeVariants = VariantProps<typeof difficultyBadgeVariants>
export type CategoryBadgeVariants = VariantProps<typeof categoryBadgeVariants>
export type ConfidenceBadgeVariants = VariantProps<typeof confidenceBadgeVariants>
export type InteractiveElementVariants = VariantProps<typeof interactiveElementVariants>

// =================================================================
// UTILITY FUNCTIONS - Type-safe variant selection
// =================================================================

const validCategories = [
  'fondamentaux',
  'methodologie',
  'ressources',
  'techniques-avancees',
  'cas-pratiques',
  'prompting',
  'security',
  'optimization',
  'bonnes-pratiques',
] as const

const validDifficulties = ['débutant', 'intermédiaire', 'avancé'] as const

export function getCategoryVariant(category: string) {
  return (validCategories as readonly string[]).includes(category)
    ? (category as typeof validCategories[number])
    : 'fondamentaux' as const
}

export function getDifficultyVariant(difficulty: string) {
  return (validDifficulties as readonly string[]).includes(difficulty)
    ? (difficulty as typeof validDifficulties[number])
    : 'débutant' as const
}

export function getConfidenceVariant(score: number) {
  const validScore = Math.max(1, Math.min(5, Math.round(score))) as 1 | 2 | 3 | 4 | 5
  return validScore
}

// =================================================================
// MODERN TAILWIND V4 INTEGRATION UTILITIES
// =================================================================

/**
 * Get semantic CSS class from category using design tokens
 */
export function getCategoryClass(category: string) {
  const variant = getCategoryVariant(category)
  return categoryBadgeVariants({ category: variant })
}

/**
 * Get semantic CSS class from difficulty using design tokens
 */
export function getDifficultyClass(difficulty: string) {
  const variant = getDifficultyVariant(difficulty)
  return difficultyBadgeVariants({ difficulty: variant })
}

/**
 * Get semantic CSS class from confidence score using design tokens
 */
export function getConfidenceClass(score: number) {
  const variant = getConfidenceVariant(score)
  return confidenceBadgeVariants({ confidence: variant })
}

// =================================================================
// ACTION CHECKLIST VARIANTS - Centralized checklist styling
// =================================================================

export const actionChecklistItemVariants = tv({
  base: 'flex items-start gap-3 p-3 rounded-lg border transition-all',
  variants: {
    isChecked: {
      true: 'bg-green-50/50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
      false: 'bg-background hover:bg-accent/50',
    },
    allowChecking: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    isChecked: false,
    allowChecking: true,
  },
})

export const actionChecklistTitleVariants = tv({
  base: 'font-medium text-sm',
  variants: {
    isChecked: {
      true: 'line-through text-muted-foreground',
      false: '',
    },
    priority: {
      high: 'text-red-600 dark:text-red-400',
      medium: 'text-orange-600 dark:text-orange-400',
      low: 'text-blue-600 dark:text-blue-400',
      default: 'text-foreground',
    },
  },
  defaultVariants: {
    isChecked: false,
    priority: 'default',
  },
})

export const actionChecklistPriorityBadgeVariants = tv({
  base: 'text-xs px-2 py-1 rounded-full border',
  variants: {
    priority: {
      high: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300',
      medium: 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300',
      low: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300',
    },
  },
})

export const actionChecklistSummaryVariants = tv({
  base: 'mt-4 p-3 rounded-lg border',
  variants: {
    hasCompleted: {
      true: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
      false: '',
    },
  },
})

// =================================================================
// SECTION BLOCK VARIANTS - Centralized section styling
// =================================================================

export const sectionBlockVariants = tv({
  base: 'my-6 transition-all duration-300 hover:shadow-md',
  variants: {
    type: {
      'introduction': 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800',
      'analogy': 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800',
      'section': 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800',
      'definition': 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 border-slate-200 dark:border-slate-800',
      'conclusion': 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800',
      'key-points': 'bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 border-cyan-200 dark:border-cyan-800',
      'examples': 'bg-gradient-to-r from-yellow-50 to-lime-50 dark:from-yellow-950/20 dark:to-lime-950/20 border-yellow-200 dark:border-yellow-800',
      'warning': 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-800',
    },
    variant: {
      default: '',
      highlighted: 'shadow-lg border-2',
      subtle: 'border-opacity-50 bg-opacity-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const sectionBlockTitleVariants = tv({
  base: 'text-base leading-tight',
  variants: {
    type: {
      'introduction': 'text-blue-700 dark:text-blue-300',
      'analogy': 'text-purple-700 dark:text-purple-300',
      'section': 'text-green-700 dark:text-green-300',
      'definition': 'text-slate-700 dark:text-slate-300',
      'conclusion': 'text-orange-700 dark:text-orange-300',
      'key-points': 'text-cyan-700 dark:text-cyan-300',
      'examples': 'text-yellow-700 dark:text-yellow-300',
      'warning': 'text-red-700 dark:text-red-300',
    },
    variant: {
      default: '',
      highlighted: 'font-bold text-lg',
      subtle: 'font-medium',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const sectionBlockIconVariants = tv({
  base: 'text-2xl',
  variants: {
    type: {
      'introduction': '💡',
      'analogy': '🔗',
      'section': '📋',
      'definition': '📖',
      'conclusion': '🎯',
      'key-points': '⭐',
      'examples': '💼',
      'warning': '⚠️',
    },
  },
})

export const sectionBlockBadgeVariants = tv({
  base: 'text-xs',
  variants: {
    type: {
      'introduction': 'Introduction',
      'analogy': 'Analogie',
      'section': 'Section',
      'definition': 'Définition',
      'conclusion': 'Conclusion',
      'key-points': 'Points Clés',
      'examples': 'Exemples',
      'warning': 'Attention',
    },
  },
})

// =================================================================
// MULTI FORMAT PROMPT VARIANTS - Centralized prompt styling
// =================================================================

export const multiFormatPromptCodeVariants = tv({
  base: 'whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm',
  variants: {
    promptType: {
      system: 'border-l-4 border-blue-500',
      user: 'border-l-4 border-green-500',
      standard: '',
      xml: 'border-l-4 border-purple-500',
    },
    variant: {
      default: '',
      compact: 'p-3 text-xs',
      large: 'p-6 text-base',
    },
  },
  defaultVariants: {
    promptType: 'standard',
    variant: 'default',
  },
})

export const multiFormatPromptCardVariants = tv({
  base: 'transition-all duration-200 hover:shadow-md',
  variants: {
    format: {
      standard: 'border-l-4 border-l-blue-500',
      xml: 'border-l-4 border-l-purple-500',
      aiStudio: 'border-l-4 border-l-green-500',
    },
    variant: {
      default: '',
      elevated: 'shadow-lg hover:shadow-xl',
      subtle: 'border-opacity-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// =================================================================
// KEY TAKEAWAYS VARIANTS - Centralized key takeaways styling
// =================================================================

export const keyTakeawaysVariants = tv({
  base: 'my-8',
  variants: {
    variant: {
      default: 'bg-primary/5 border-primary/20',
      highlighted: 'bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg',
      compact: 'bg-muted/30 border-l-4 border-l-primary/60',
      featured: 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/40 shadow-xl relative overflow-hidden',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const keyTakeawaysTitleVariants = tv({
  base: 'flex items-center gap-3 text-lg',
  variants: {
    variant: {
      default: 'text-primary',
      highlighted: 'text-primary font-bold text-xl',
      compact: 'text-sm text-foreground font-medium text-base',
      featured: 'text-primary font-bold text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const keyTakeawaysIconVariants = tv({
  base: 'flex items-center justify-center rounded-lg text-primary',
  variants: {
    variant: {
      default: 'w-6 h-6 bg-primary/20',
      highlighted: 'w-6 h-6 bg-primary/20',
      compact: 'w-4 h-4 bg-primary/15',
      featured: 'w-10 h-10 bg-primary/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const keyTakeawaysItemsVariants = tv({
  base: '',
  variants: {
    variant: {
      default: 'space-y-3',
      highlighted: 'space-y-4',
      compact: 'space-y-2',
      featured: 'space-y-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const keyTakeawaysItemVariants = tv({
  base: 'flex items-start gap-3 group',
  variants: {
    variant: {
      default: '',
      highlighted: '',
      compact: '',
      featured: 'p-3 rounded-lg hover:bg-background/30 transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const keyTakeawaysItemIconVariants = tv({
  base: 'flex items-center justify-center rounded-full flex-shrink-0 bg-green-100 dark:bg-green-900/30',
  variants: {
    variant: {
      default: 'w-5 h-5 mt-1',
      highlighted: 'w-5 h-5 mt-1',
      compact: 'w-4 h-4 mt-1',
      featured: 'w-5 h-5 mt-1 bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const keyTakeawaysItemTextVariants = tv({
  base: 'text-muted-foreground leading-relaxed',
  variants: {
    variant: {
      default: 'text-base',
      highlighted: 'text-base',
      compact: 'text-sm',
      featured: 'text-foreground font-medium text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// =================================================================
// UPDATED TYPES FOR TYPESCRIPT INTEGRATION
// =================================================================

export type ActionChecklistItemVariants = VariantProps<typeof actionChecklistItemVariants>
export type ActionChecklistTitleVariants = VariantProps<typeof actionChecklistTitleVariants>
export type ActionChecklistPriorityBadgeVariants = VariantProps<typeof actionChecklistPriorityBadgeVariants>
export type SectionBlockVariants = VariantProps<typeof sectionBlockVariants>
export type SectionBlockTitleVariants = VariantProps<typeof sectionBlockTitleVariants>
export type MultiFormatPromptCodeVariants = VariantProps<typeof multiFormatPromptCodeVariants>
export type MultiFormatPromptCardVariants = VariantProps<typeof multiFormatPromptCardVariants>
export type KeyTakeawaysVariants = VariantProps<typeof keyTakeawaysVariants>
export type KeyTakeawaysTitleVariants = VariantProps<typeof keyTakeawaysTitleVariants>
export type KeyTakeawaysIconVariants = VariantProps<typeof keyTakeawaysIconVariants>
export type KeyTakeawaysItemsVariants = VariantProps<typeof keyTakeawaysItemsVariants>
export type KeyTakeawaysItemVariants = VariantProps<typeof keyTakeawaysItemVariants>
export type KeyTakeawaysItemIconVariants = VariantProps<typeof keyTakeawaysItemIconVariants>
export type KeyTakeawaysItemTextVariants = VariantProps<typeof keyTakeawaysItemTextVariants>

// =================================================================
// SKELETON VARIANTS - Centralized loading state styling
// =================================================================

export const skeletonVariants = tv({
  base: 'skeleton',
  variants: {
    size: {
      'xs': 'skeleton-h-xs',
      'sm': 'skeleton-h-sm',
      'md': 'skeleton-h-md',
      'lg': 'skeleton-h-lg',
      'xl': 'skeleton-h-xl',
      '2xl': 'skeleton-h-2xl',
      '3xl': 'skeleton-h-3xl',
    },
    width: {
      'full': 'skeleton-w-full',
      '3xs': 'skeleton-w-3xs',
      '2xs': 'skeleton-w-2xs',
      'xs': 'skeleton-w-xs',
      'sm': 'skeleton-w-sm',
      'md': 'skeleton-w-md',
      'lg': 'skeleton-w-lg',
      'xl': 'skeleton-w-xl',
      '2xl': 'skeleton-w-2xl',
      '3xl': 'skeleton-w-3xl',
      '4xl': 'skeleton-w-4xl',
      '5xl': 'skeleton-w-5xl',
    },
    shape: {
      rectangle: '',
      circle: 'rounded-full',
      rounded: 'rounded-lg',
    },
    animated: {
      true: '',
      false: 'animate-none',
    },
  },
  defaultVariants: {
    size: 'md',
    width: 'full',
    shape: 'rectangle',
    animated: true,
  },
})

// =================================================================
// ICON VARIANTS - Centralized icon styling with design tokens
// =================================================================

export const iconVariants = tv({
  base: 'flex-shrink-0',
  variants: {
    size: {
      'xs': 'icon-size-xs',
      'sm': 'icon-size-sm',
      'md': 'icon-size-md',
      'lg': 'icon-size-lg',
      'xl': 'icon-size-xl',
      '2xl': 'icon-size-2xl',
      '3xl': 'icon-size-3xl',
    },
    spacing: {
      none: '',
      xs: 'icon-spacing-xs',
      sm: 'icon-spacing-sm',
      md: 'icon-spacing-md',
      lg: 'icon-spacing-lg',
      xl: 'icon-spacing-xl',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-orange-600 dark:text-orange-400',
      error: 'text-red-600 dark:text-red-400',
    },
    interactive: {
      true: 'transition-colors hover:text-primary cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    spacing: 'none',
    color: 'default',
    interactive: false,
  },
})

// =================================================================
// DRAWER/SHEET VARIANTS - Mobile-first drawer styling
// =================================================================

export const drawerVariants = tv({
  base: 'fixed bottom-0 left-0 right-0 bg-card border-t rounded-t-xl shadow-lg z-[var(--z-modal)]',
  variants: {
    size: {
      mobile: 'h-[var(--drawer-height-mobile)]',
      tablet: 'h-[var(--drawer-height-tablet)]',
      desktop: 'h-[var(--drawer-height-desktop)]',
    },
    position: {
      bottom: 'bottom-0 top-auto rounded-t-xl',
      top: 'top-0 bottom-auto rounded-b-xl',
      left: 'left-0 right-auto w-[var(--sheet-width-mobile)] h-full rounded-r-xl',
      right: 'right-0 left-auto w-[var(--sheet-width-mobile)] h-full rounded-l-xl',
    },
    variant: {
      default: '',
      glass: 'glass backdrop-blur-[var(--blur-amount-xl)]',
      elevated: 'shadow-2xl',
    },
  },
  defaultVariants: {
    size: 'mobile',
    position: 'bottom',
    variant: 'default',
  },
})

// =================================================================
// LOADING SPINNER VARIANTS - Centralized loading animations
// =================================================================

export const loadingSpinnerVariants = tv({
  base: 'animate-spin rounded-full border-2 border-muted border-t-primary',
  variants: {
    size: {
      sm: 'w-[var(--loading-spinner-size-sm)] h-[var(--loading-spinner-size-sm)]',
      md: 'w-[var(--loading-spinner-size-md)] h-[var(--loading-spinner-size-md)]',
      lg: 'w-[var(--loading-spinner-size-lg)] h-[var(--loading-spinner-size-lg)]',
      xl: 'w-[var(--loading-spinner-size-xl)] h-[var(--loading-spinner-size-xl)]',
    },
    variant: {
      default: '',
      dots: 'border-dashed',
      pulse: 'animate-pulse',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

// =================================================================
// MIGRATED BUTTON VARIANTS - Converted from class-variance-authority to tailwind-variants
// =================================================================

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-spring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover-lift active:scale-95',
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive:
        'bg-destructive text-white shadow hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      outline:
        'border bg-background shadow hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
      secondary:
        'bg-secondary text-secondary-foreground shadow hover:bg-secondary/80',
      ghost:
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-9 px-4 py-2 has-[>svg]:px-3',
      sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
      lg: 'h-10 rounded-lg px-8',
      xl: 'h-12 rounded-xl px-10 text-base',
      icon: 'h-9 w-9',
    },
    animation: {
      none: '',
      subtle: 'hover-scale',
      bounce: 'hover:animate-bounce-subtle',
      glow: 'hover-glow',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    animation: 'subtle',
  },
})

// =================================================================
// MIGRATED BADGE VARIANTS - Converted from class-variance-authority to tailwind-variants
// =================================================================

export const badgeVariants = tv({
  base: 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none overflow-hidden',
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'bg-destructive text-white shadow hover:bg-destructive/90 focus:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      outline:
        'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      success: 'bg-green-500 text-white shadow hover:bg-green-600',
      warning: 'bg-yellow-500 text-white shadow hover:bg-yellow-600',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      default: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

// =================================================================
// UPDATED TYPES FOR TYPESCRIPT INTEGRATION
// =================================================================

export type SkeletonVariants = VariantProps<typeof skeletonVariants>
export type IconVariants = VariantProps<typeof iconVariants>
export type DrawerVariants = VariantProps<typeof drawerVariants>
export type LoadingSpinnerVariants = VariantProps<typeof loadingSpinnerVariants>
export type ButtonVariants = VariantProps<typeof buttonVariants>
export type BadgeVariants = VariantProps<typeof badgeVariants>
