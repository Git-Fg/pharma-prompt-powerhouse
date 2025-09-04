// src/components/ui/recipes/layout-recipe.ts
import { tv } from "tailwind-variants";

/**
 * Layout Recipes - Systematic layout components with design tokens
 * Replaces custom utility classes with consistent layout system
 */

export const containerRecipe = tv({
  base: "mx-auto w-full",
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md", 
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      content: "max-w-prose",
      full: "max-w-full"
    },
    padding: {
      none: "",
      default: "px-4",
      sm: "px-2",
      lg: "px-6",
      xl: "px-8"
    }
  },
  defaultVariants: {
    size: "xl",
    padding: "default"
  }
});

export const sectionRecipe = tv({
  base: "",
  variants: {
    spacing: {
      none: "",
      sm: "py-8",
      default: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-20 md:py-32"
    },
    background: {
      none: "",
      muted: "bg-muted/30",
      accent: "bg-accent/10",
      gradient: "gradient-mesh"
    }
  },
  defaultVariants: {
    spacing: "default",
    background: "none"
  }
});

export const gridRecipe = tv({
  base: "grid",
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
      "auto-sm": "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
      "auto-lg": "grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"
    },
    gap: {
      none: "",
      sm: "gap-3",
      default: "gap-4 md:gap-6", 
      lg: "gap-6 md:gap-8",
      xl: "gap-8 md:gap-12"
    }
  },
  defaultVariants: {
    cols: "auto",
    gap: "default"
  }
});

export const stackRecipe = tv({
  base: "flex flex-col",
  variants: {
    gap: {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    }
  },
  defaultVariants: {
    gap: "default",
    align: "stretch"
  }
});

export const flexRecipe = tv({
  base: "flex",
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse"
    },
    align: {
      start: "items-start",
      center: "items-center", 
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline"
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    },
    gap: {
      none: "",
      xs: "gap-1",
      sm: "gap-2", 
      default: "gap-4",
      lg: "gap-6",
      xl: "gap-8"
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse"
    }
  },
  defaultVariants: {
    direction: "row",
    align: "center",
    justify: "start",
    gap: "default",
    wrap: "nowrap"
  }
});

export type ContainerVariants = Parameters<typeof containerRecipe>[0];
export type SectionVariants = Parameters<typeof sectionRecipe>[0];
export type GridVariants = Parameters<typeof gridRecipe>[0];
export type StackVariants = Parameters<typeof stackRecipe>[0];
export type FlexVariants = Parameters<typeof flexRecipe>[0];