// src/components/ui/recipes/typography-recipe.ts
import { tv } from "tailwind-variants";

/**
 * Typography Recipes - Systematic text styling with design tokens
 * Replaces manual font classes with consistent typography system
 */

export const headingRecipe = tv({
  base: [
    "font-semibold tracking-tight",
    "text-balance title-flow" // Modern text wrapping
  ],
  variants: {
    level: {
      1: "text-3xl md:text-4xl lg:text-5xl",
      2: "text-2xl md:text-3xl lg:text-4xl", 
      3: "text-xl md:text-2xl lg:text-3xl",
      4: "text-lg md:text-xl lg:text-2xl",
      5: "text-base md:text-lg",
      6: "text-sm md:text-base"
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      gradient: [
        "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      ]
    },
    spacing: {
      tight: "leading-tight",
      normal: "leading-normal", 
      relaxed: "leading-relaxed"
    }
  },
  defaultVariants: {
    level: 2,
    variant: "default", 
    spacing: "tight"
  }
});

export const textRecipe = tv({
  base: [
    "text-pretty paragraph-flow" // Modern text wrapping with flow control
  ],
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base", 
      lg: "text-lg",
      xl: "text-xl"
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    },
    leading: {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose"
    }
  },
  defaultVariants: {
    size: "base",
    variant: "default",
    weight: "normal",
    leading: "normal"
  }
});

export const linkRecipe = tv({
  base: [
    "underline-offset-4 transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ],
  variants: {
    variant: {
      default: "text-primary hover:text-primary/80 underline",
      subtle: "text-muted-foreground hover:text-foreground hover:underline",
      accent: "text-accent-foreground hover:text-accent-foreground/80",
      ghost: "hover:text-primary hover:underline"
    },
    underline: {
      always: "underline",
      hover: "hover:underline",
      never: "no-underline"
    }
  },
  defaultVariants: {
    variant: "default",
    underline: "always"
  }
});

export const codeRecipe = tv({
  base: [
    "font-mono text-sm rounded px-1.5 py-0.5",
    "bg-muted text-muted-foreground"
  ],
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground",
      accent: "bg-accent text-accent-foreground",
      destructive: "bg-destructive/10 text-destructive"
    },
    size: {
      xs: "text-xs px-1 py-0.5",
      sm: "text-sm px-1.5 py-0.5",
      base: "text-base px-2 py-1"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "sm"
  }
});

export const badgeRecipe = tv({
  base: [
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", 
      destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
      outline: "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      success: "bg-green-500 text-white shadow hover:bg-green-600",
      warning: "bg-yellow-500 text-white shadow hover:bg-yellow-600"
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      default: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export type HeadingVariants = Parameters<typeof headingRecipe>[0];
export type TextVariants = Parameters<typeof textRecipe>[0];
export type LinkVariants = Parameters<typeof linkRecipe>[0];
export type CodeVariants = Parameters<typeof codeRecipe>[0];
export type BadgeVariants = Parameters<typeof badgeRecipe>[0];