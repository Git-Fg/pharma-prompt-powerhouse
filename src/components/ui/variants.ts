import { tv, type VariantProps } from "tailwind-variants"
import type { Category, Difficulty } from "@/lib/constants"

// =================================================================
// MODERNIZED CONTENT CARD VARIANTS - Using tailwind-variants
// =================================================================

export const contentCardVariants = tv({
  base: [
    "group flex flex-col transition-all duration-300 hover:-translate-y-1",
    "rounded-lg border bg-card text-card-foreground shadow-sm"
  ],
  variants: {
    variant: {
      concept: "border-l-4 border-l-blue-500 hover:shadow-lg hover:border-l-blue-600",
      guide: "border-l-4 border-l-green-500 hover:shadow-lg hover:border-l-green-600", 
      workflow: "border-l-4 border-l-purple-500 hover:shadow-lg hover:border-l-purple-600",
      tool: "border-l-4 border-l-orange-500 hover:shadow-lg hover:border-l-orange-600",
      default: "hover:shadow-md",
    },
    size: {
      default: "p-6",
      compact: "p-4",
      large: "p-8",
    },
    interactive: {
      true: "cursor-pointer hover:shadow-xl transform-gpu",
      false: "",
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    interactive: true,
  },
})

// =================================================================
// MODERNIZED STATUS BADGES - Enhanced with semantic colors
// =================================================================

export const statusBadgeVariants = tv({
  base: [
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  ],
  variants: {
    status: {
      available: [
        "bg-green-50 text-green-700 border border-green-200",
        "dark:bg-green-950/50 dark:text-green-400 dark:border-green-800"
      ],
      "coming-soon": [
        "bg-yellow-50 text-yellow-700 border border-yellow-200",
        "dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-800"
      ],
      development: [
        "bg-blue-50 text-blue-700 border border-blue-200",
        "dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800"
      ],
      deprecated: [
        "bg-red-50 text-red-700 border border-red-200",
        "dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
      ],
      experimental: [
        "bg-purple-50 text-purple-700 border border-purple-200",
        "dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800"
      ],
      beta: [
        "bg-indigo-50 text-indigo-700 border border-indigo-200",
        "dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800"
      ],
    }
  },
  defaultVariants: {
    status: "available",
  },
})

// =================================================================
// ENHANCED DIFFICULTY BADGES - Semantic pharmaceutical context
// =================================================================

export const difficultyBadgeVariants = tv({
  base: [
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
    "transition-all duration-200 hover:scale-105"
  ],
  variants: {
    difficulty: {
      "débutant": [
        "bg-emerald-100 text-emerald-800 border border-emerald-200",
        "dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700",
        "hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
      ],
      "intermédiaire": [
        "bg-amber-100 text-amber-800 border border-amber-200",
        "dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700",
        "hover:bg-amber-200 dark:hover:bg-amber-900/50"
      ],
      "avancé": [
        "bg-red-100 text-red-800 border border-red-200", 
        "dark:bg-red-900/30 dark:text-red-400 dark:border-red-700",
        "hover:bg-red-200 dark:hover:bg-red-900/50"
      ],
    }
  },
  defaultVariants: {
    difficulty: "débutant",
  },
})

// =================================================================
// ENHANCED CATEGORY BADGES - Professional pharmaceutical styling
// =================================================================

export const categoryBadgeVariants = tv({
  base: [
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
    "transition-all duration-200 hover:scale-105 cursor-default"
  ],
  variants: {
    category: {
      fondamentaux: [
        "bg-blue-50 text-blue-700 border border-blue-200",
        "dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
      ],
      methodologie: [
        "bg-green-50 text-green-700 border border-green-200", 
        "dark:bg-green-950/50 dark:text-green-300 dark:border-green-800"
      ],
      ressources: [
        "bg-purple-50 text-purple-700 border border-purple-200",
        "dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800"
      ],
      "techniques-avancees": [
        "bg-orange-50 text-orange-700 border border-orange-200",
        "dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800"
      ],
      "cas-pratiques": [
        "bg-red-50 text-red-700 border border-red-200",
        "dark:bg-red-950/50 dark:text-red-300 dark:border-red-800"
      ],
      prompting: [
        "bg-cyan-50 text-cyan-700 border border-cyan-200",
        "dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800"
      ],
      security: [
        "bg-yellow-50 text-yellow-700 border border-yellow-200",
        "dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800"
      ],
      optimization: [
        "bg-pink-50 text-pink-700 border border-pink-200",
        "dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800"
      ],
      "bonnes-pratiques": [
        "bg-indigo-50 text-indigo-700 border border-indigo-200",
        "dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800"
      ],
    }
  },
  defaultVariants: {
    category: "fondamentaux",
  },
})

// =================================================================
// ENHANCED CONFIDENCE BADGES - Professional trust indicators
// =================================================================

export const confidenceBadgeVariants = tv({
  base: [
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
    "transition-all duration-200 hover:scale-105"
  ],
  variants: {
    confidence: {
      1: [
        "bg-red-50 text-red-700 border border-red-200",
        "dark:bg-red-950/50 dark:text-red-300 dark:border-red-800"
      ],
      2: [
        "bg-orange-50 text-orange-700 border border-orange-200",
        "dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800"
      ],
      3: [
        "bg-yellow-50 text-yellow-700 border border-yellow-200",
        "dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800"
      ],
      4: [
        "bg-blue-50 text-blue-700 border border-blue-200",
        "dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
      ],
      5: [
        "bg-green-50 text-green-700 border border-green-200",
        "dark:bg-green-950/50 dark:text-green-300 dark:border-green-800"
      ],
    }
  },
  defaultVariants: {
    confidence: 3,
  },
})

// =================================================================
// ENHANCED INTERACTIVE ELEMENTS - Modern micro-interactions
// =================================================================

export const interactiveElementVariants = tv({
  base: "transition-all duration-200 ease-out",
  variants: {
    variant: {
      button: [
        "hover:scale-105 active:scale-95",
        "hover:shadow-lg active:shadow-md",
        "transform-gpu"
      ],
      card: [
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        "active:translate-y-0 active:shadow-lg",
        "transform-gpu"
      ],
      link: [
        "hover:text-primary hover:underline underline-offset-4",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
      ],
      icon: [
        "hover:scale-110 hover:rotate-3 hover:text-primary",
        "transform-gpu"
      ],
      magnetic: [
        "hover:scale-105 hover:shadow-2xl hover:shadow-primary/10",
        "transition-all duration-300 ease-out transform-gpu",
        "hover:z-10 relative"
      ]
    },
    disabled: {
      true: [
        "opacity-50 cursor-not-allowed pointer-events-none",
        "hover:scale-100 hover:shadow-none hover:translate-y-0"
      ],
      false: "",
    }
  },
  defaultVariants: {
    variant: "button",
    disabled: false,
  },
})

// =================================================================
// TYPES FOR TYPESCRIPT INTEGRATION
// =================================================================

export type ContentCardVariants = VariantProps<typeof contentCardVariants>
export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>
export type DifficultyBadgeVariants = VariantProps<typeof difficultyBadgeVariants>
export type CategoryBadgeVariants = VariantProps<typeof categoryBadgeVariants>
export type ConfidenceBadgeVariants = VariantProps<typeof confidenceBadgeVariants>
export type InteractiveElementVariants = VariantProps<typeof interactiveElementVariants>

// =================================================================
// UTILITY FUNCTIONS - Type-safe variant selection
// =================================================================

const validCategories = [
  'fondamentaux', 'methodologie', 'ressources', 'techniques-avancees', 
  'cas-pratiques', 'prompting', 'security', 'optimization', 'bonnes-pratiques'
] as const;

const validDifficulties = ['débutant', 'intermédiaire', 'avancé'] as const;

export function getCategoryVariant(category: string) {
  return (validCategories as readonly string[]).includes(category) 
    ? (category as typeof validCategories[number])
    : 'fondamentaux' as const;
}

export function getDifficultyVariant(difficulty: string) {
  return (validDifficulties as readonly string[]).includes(difficulty)
    ? (difficulty as typeof validDifficulties[number])
    : 'débutant' as const;
}

export function getConfidenceVariant(score: number) {
  const validScore = Math.max(1, Math.min(5, Math.round(score))) as 1 | 2 | 3 | 4 | 5;
  return validScore;
}

// =================================================================
// MODERN TAILWIND V4 INTEGRATION UTILITIES
// =================================================================

/**
 * Get semantic CSS class from category using design tokens
 */
export function getCategoryClass(category: string) {
  const variant = getCategoryVariant(category);
  return categoryBadgeVariants({ category: variant });
}

/**
 * Get semantic CSS class from difficulty using design tokens
 */
export function getDifficultyClass(difficulty: string) {
  const variant = getDifficultyVariant(difficulty);
  return difficultyBadgeVariants({ difficulty: variant });
}

/**
 * Get semantic CSS class from confidence score using design tokens  
 */
export function getConfidenceClass(score: number) {
  const variant = getConfidenceVariant(score);
  return confidenceBadgeVariants({ confidence: variant });
}