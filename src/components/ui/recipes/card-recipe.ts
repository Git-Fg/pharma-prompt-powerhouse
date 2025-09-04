// src/components/ui/recipes/card-recipe.ts
import { tv } from "tailwind-variants";

/**
 * Card Recipe - Systematic card variants for consistent design
 * Replaces manual card styling with token-based system
 */
export const cardRecipe = tv({
  base: [
    "bg-card text-card-foreground shadow-sm border rounded-lg",
    "transition-all duration-200 ease-spring"
  ],
  variants: {
    variant: {
      default: "shadow-sm hover-lift",
      elevated: "shadow-md hover-glow",
      flat: "border-0 bg-muted/30",
      ghost: "border-0 shadow-none bg-transparent",
      interactive: "hover-scale cursor-pointer hover:shadow-md"
    },
    padding: {
      none: "",
      sm: "p-3",
      default: "p-4",
      lg: "p-6",
      xl: "p-8"
    },
    spacing: {
      none: "",
      default: "space-y-4",
      sm: "space-y-2",
      lg: "space-y-6"
    }
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
    spacing: "default"
  }
});

export const cardHeaderRecipe = tv({
  base: "flex flex-col space-y-1.5",
  variants: {
    padding: {
      none: "",
      default: "p-6 pb-4",
      sm: "p-4 pb-2",
      lg: "p-8 pb-6"
    }
  },
  defaultVariants: {
    padding: "default"
  }
});

export const cardContentRecipe = tv({
  base: "",
  variants: {
    padding: {
      none: "",
      default: "p-6 pt-0",
      sm: "p-4 pt-0", 
      lg: "p-8 pt-0"
    }
  },
  defaultVariants: {
    padding: "default"
  }
});

export const cardFooterRecipe = tv({
  base: "flex items-center",
  variants: {
    padding: {
      none: "",
      default: "p-6 pt-4",
      sm: "p-4 pt-2",
      lg: "p-8 pt-6"
    },
    layout: {
      default: "justify-between",
      start: "justify-start gap-2",
      center: "justify-center gap-2",
      end: "justify-end gap-2"
    }
  },
  defaultVariants: {
    padding: "default",
    layout: "default"
  }
});

export type CardVariants = Parameters<typeof cardRecipe>[0];
export type CardHeaderVariants = Parameters<typeof cardHeaderRecipe>[0];
export type CardContentVariants = Parameters<typeof cardContentRecipe>[0];
export type CardFooterVariants = Parameters<typeof cardFooterRecipe>[0];