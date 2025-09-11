/**
 * Design System Variants
 *
 * Unified variant system using tailwind-variants for all UI components.
 * This is the single source of truth for all component styling variants.
 *
 * Migrated from:
 * - /src/components/ui/variants.ts (existing variants)
 * - /src/components/ui/button-variants.ts (migrated from cva to tv)
 * - /src/components/ui/badge-variants.ts (migrated from cva to tv)
 * - /src/components/ui/card.tsx (migrated from cva to tv)
 */

import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

// Re-export all existing variants from the main variants file
// This maintains backward compatibility while centralizing exports
export {
  actionChecklistVariants,
  badgeVariants,
  buttonVariants,
  contentCardVariants,
  difficultyBadgeVariants,
  drawerVariants,
  iconVariants,
  interactiveCardVariants,
  loadingSpinnerVariants,
  sectionBlockVariants,
  skeletonVariants,
  statusBadgeVariants,
} from '@/components/ui/variants'

// Re-export all types
export type {
  ActionChecklistVariants,
  BadgeVariants,
  ButtonVariants,
  ContentCardVariants,
  DifficultyBadgeVariants,
  DrawerVariants,
  IconVariants,
  InteractiveCardVariants,
  LoadingSpinnerVariants,
  SectionBlockVariants,
  SkeletonVariants,
  StatusBadgeVariants,
} from '@/components/ui/variants'

// =================================================================
// NEW CORE VARIANTS - Essential components that were missing
// =================================================================

// Input Variants
export const inputVariants = tv({
  base: 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-9 px-3 text-sm',
      lg: 'h-10 px-4 text-base',
    },
    state: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
      success: 'border-green-500 focus-visible:ring-green-500',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
    fullWidth: true,
  },
})

// Container Variants (semantic containers to avoid Tailwind v4 max-width bugs)
export const containerVariants = tv({
  base: 'w-full mx-auto',
  variants: {
    size: {
      'sm': 'container-sm', // 24rem - 384px
      'md': 'container-md', // 28rem - 448px
      'lg': 'container-lg', // 32rem - 512px
      'xl': 'container-xl', // 36rem - 576px
      '2xl': 'container-2xl', // 42rem - 672px
      '3xl': 'container-3xl', // 48rem - 768px
      '4xl': 'container-4xl', // 56rem - 896px
      '5xl': 'container-5xl', // 64rem - 1024px
      'prose': 'container-prose', // 65rem - 1040px
      'full': 'container-full', // 100%
    },
    center: {
      true: 'mx-auto',
      false: '',
    },
    padding: {
      none: '',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
    },
  },
  defaultVariants: {
    size: 'lg',
    center: true,
    padding: 'md',
  },
})

// Typography Variants (semantic text variants)
export const typographyVariants = tv({
  base: '',
  variants: {
    variant: {
      // Heading variants
      h1: 'text-3xl font-bold tracking-tight lg:text-4xl',
      h2: 'text-2xl font-semibold tracking-tight lg:text-3xl',
      h3: 'text-xl font-semibold tracking-tight lg:text-2xl',
      h4: 'text-lg font-semibold tracking-tight',
      h5: 'text-base font-semibold tracking-tight',
      h6: 'text-sm font-semibold tracking-tight uppercase',

      // Body variants
      body: 'text-base leading-relaxed',
      bodySm: 'text-sm leading-relaxed',
      bodyLg: 'text-lg leading-relaxed',

      // Semantic variants
      title: 'prose-title text-2xl font-bold leading-tight',
      slogan: 'prose-slogan text-sm leading-relaxed',
      heading: 'prose-heading text-lg font-semibold leading-tight',
      description: 'prose-description text-base leading-relaxed',
      caption: 'prose-caption text-sm leading-relaxed text-muted-foreground',

      // Special variants
      lead: 'text-xl text-muted-foreground',
      muted: 'text-sm text-muted-foreground',
      error: 'text-sm text-destructive',
      success: 'text-sm text-green-600',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tracking: {
      tight: 'tracking-tighter',
      normal: 'tracking-normal',
      wide: 'tracking-wider',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'normal',
    tracking: 'normal',
  },
})

// Form Field Variants
export const formFieldVariants = tv({
  base: 'space-y-2',
  variants: {
    layout: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row items-center gap-4',
    },
    state: {
      default: '',
      error: 'text-destructive',
      success: 'text-green-600',
    },
    required: {
      true: 'after:content-[\'*\"] after:text-destructive after:ml-1',
      false: '',
    },
  },
  defaultVariants: {
    layout: 'vertical',
    state: 'default',
    required: false,
  },
})

// Loading Variants
export const loadingVariants = tv({
  base: 'inline-flex items-center justify-center',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    },
    variant: {
      spinner: 'animate-spin rounded-full border-2 border-current border-t-transparent',
      dots: 'flex gap-1',
      pulse: 'animate-pulse',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'spinner',
    color: 'primary',
  },
})

// Empty State Variants
export const emptyStateVariants = tv({
  base: 'flex flex-col items-center justify-center p-8 text-center',
  variants: {
    size: {
      sm: 'p-4 space-y-2',
      md: 'p-8 space-y-4',
      lg: 'p-12 space-y-6',
    },
    variant: {
      default: '',
      subtle: 'text-muted-foreground',
      bordered: 'border-2 border-dashed border-border rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

// Navigation Variants
export const navigationVariants = tv({
  base: 'flex',
  variants: {
    direction: {
      horizontal: 'flex-row space-x-1',
      vertical: 'flex-col space-y-1',
    },
    variant: {
      default: '',
      pills: 'bg-muted p-1 rounded-lg',
      tabs: 'border-b border-border',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    variant: 'default',
    size: 'md',
  },
})

// =================================================================
// NEW TYPES FOR TYPESCRIPT INTEGRATION
// =================================================================

export type InputVariants = VariantProps<typeof inputVariants>
export type ContainerVariants = VariantProps<typeof containerVariants>
export type TypographyVariants = VariantProps<typeof typographyVariants>
export type FormFieldVariants = VariantProps<typeof formFieldVariants>
export type LoadingVariants = VariantProps<typeof loadingVariants>
export type EmptyStateVariants = VariantProps<typeof emptyStateVariants>
export type NavigationVariants = VariantProps<typeof navigationVariants>

// =================================================================
// HELPER TYPES AND UTILITIES
// =================================================================

// Utility type for component variant props
export type ComponentVariants<T extends Record<string, unknown>> = VariantProps<T>

// Common variant combinations
export type CommonSize = 'sm' | 'md' | 'lg' | 'xl'
export type CommonVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline'
export type CommonState = 'default' | 'error' | 'success' | 'warning'

// Component variant mapping
export const componentVariants = {
  button: buttonVariants,
  badge: badgeVariants,
  input: inputVariants,
  container: containerVariants,
  typography: typographyVariants,
  formField: formFieldVariants,
  loading: loadingVariants,
  emptyState: emptyStateVariants,
  navigation: navigationVariants,
  // Legacy variants (re-exported for compatibility)
  contentCard: contentCardVariants,
  actionChecklist: actionChecklistVariants,
  interactiveCard: interactiveCardVariants,
  sectionBlock: sectionBlockVariants,
  skeleton: skeletonVariants,
  icon: iconVariants,
  drawer: drawerVariants,
  loadingSpinner: loadingSpinnerVariants,
} as const

export type ComponentVariantName = keyof typeof componentVariants
export type ComponentVariantProps<T extends ComponentVariantName>
  = VariantProps<typeof componentVariants[T]>
