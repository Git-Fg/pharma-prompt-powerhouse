import { cva, type VariantProps } from "class-variance-authority"
import type { Category, Difficulty } from "@/lib/constants"

// =================================================================
// VARIANTES POUR LES CARTES DE CONTENU
// =================================================================

export const contentCardVariants = cva(
  "group flex flex-col transition-all duration-300 hover:-translate-y-1 rounded-lg border bg-card text-card-foreground shadow-sm",
  {
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
  }
)

// =================================================================
// VARIANTES POUR LES BADGES DE STATUT
// =================================================================

export const statusBadgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      status: {
        available: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        "coming-soon": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        development: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        deprecated: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        experimental: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        beta: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      }
    },
    defaultVariants: {
      status: "available",
    },
  }
)

// =================================================================
// VARIANTES POUR LES BADGES DE DIFFICULTÉ
// =================================================================

export const difficultyBadgeVariants = cva(
  "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
  {
    variants: {
      difficulty: {
        "débutant": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        "intermédiaire": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        "avancé": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      }
    },
    defaultVariants: {
      difficulty: "débutant",
    },
  }
)

// =================================================================
// VARIANTES POUR LES BADGES DE CATÉGORIE
// =================================================================

export const categoryBadgeVariants = cva(
  "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
  {
    variants: {
      category: {
        fondamentaux: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        methodologie: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        ressources: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        "techniques-avancees": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        "cas-pratiques": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        prompting: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
        security: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        optimization: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
        "bonnes-pratiques": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      }
    },
    defaultVariants: {
      category: "fondamentaux",
    },
  }
)

// =================================================================
// VARIANTES POUR LES INDICATEURS DE CONFIANCE
// =================================================================

export const confidenceBadgeVariants = cva(
  "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
  {
    variants: {
      confidence: {
        1: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        2: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        4: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        5: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      }
    },
    defaultVariants: {
      confidence: 3,
    },
  }
)

// =================================================================
// VARIANTES POUR LES ÉLÉMENTS INTERACTIFS
// =================================================================

export const interactiveElementVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        button: "hover:scale-105 active:scale-95",
        card: "hover:-translate-y-1 hover:shadow-lg",
        link: "hover:underline hover:text-primary",
        icon: "hover:scale-110 hover:rotate-3",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      }
    },
    defaultVariants: {
      variant: "button",
      disabled: false,
    },
  }
)

// =================================================================
// TYPES D'EXPORT POUR TYPESCRIPT
// =================================================================

export type ContentCardVariants = VariantProps<typeof contentCardVariants>
export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>
export type DifficultyBadgeVariants = VariantProps<typeof difficultyBadgeVariants>
export type CategoryBadgeVariants = VariantProps<typeof categoryBadgeVariants>
export type ConfidenceBadgeVariants = VariantProps<typeof confidenceBadgeVariants>
export type InteractiveElementVariants = VariantProps<typeof interactiveElementVariants>

// Utility functions to get variant value with proper typing
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