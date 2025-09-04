// src/components/ui/recipes/index.ts

/**
 * Component Recipes - Centralized design system with tailwind-variants
 * 
 * This module provides systematic component variants using design tokens.
 * It replaces custom CSS classes with maintainable, token-based system.
 * 
 * Usage:
 * ```tsx
 * import { buttonRecipe } from "@/components/ui/recipes"
 * 
 * function MyButton() {
 *   return (
 *     <button className={buttonRecipe({ variant: "secondary", size: "lg" })}>
 *       Click me
 *     </button>
 *   )
 * }
 * ```
 */

// Button system
export * from "./button-recipe";

// Card system  
export * from "./card-recipe";

// Layout system
export * from "./layout-recipe";

// Typography system
export * from "./typography-recipe";

// Re-export all variant types for TypeScript
export type {
  ButtonVariants,
} from "./button-recipe";

export type {
  CardVariants,
  CardHeaderVariants,
  CardContentVariants,
  CardFooterVariants,
} from "./card-recipe";

export type {
  ContainerVariants,
  SectionVariants,
  GridVariants,
  StackVariants,
  FlexVariants,
} from "./layout-recipe";

export type {
  HeadingVariants,
  TextVariants,
  LinkVariants,
  CodeVariants,
  BadgeVariants,
} from "./typography-recipe";