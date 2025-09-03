import { cva, type VariantProps } from "class-variance-authority"

// Variant pour les cartes de contenu
export const contentCardVariants = cva(
  "group flex flex-col transition-all duration-300 hover:-translate-y-1",
  {
    variants: {
      variant: {
        concept: "border-l-4 border-l-blue-500 hover:shadow-lg",
        guide: "border-l-4 border-l-green-500 hover:shadow-lg", 
        workflow: "border-l-4 border-l-purple-500 hover:shadow-lg",
        tool: "border-l-4 border-l-orange-500 hover:shadow-lg",
      },
      size: {
        default: "p-6",
        compact: "p-4",
      }
    },
    defaultVariants: {
      variant: "concept",
      size: "default",
    },
  }
)

// Variant pour les badges de statut
export const statusBadgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
  {
    variants: {
      status: {
        available: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        "coming-soon": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        development: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        deprecated: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      }
    },
    defaultVariants: {
      status: "available",
    },
  }
)

export type ContentCardVariants = VariantProps<typeof contentCardVariants>
export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>