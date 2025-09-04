/**
 * Design System Tokens - TypeScript definitions and utilities
 * Provides type-safe access to design tokens defined in globals.css
 * 
 * 2025 Best Practices:
 * - Centralized design tokens
 * - Type-safe token access
 * - Runtime validation
 * - Token composition utilities
 */

// Type definitions for design tokens
export type SpacingToken = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type ColorToken = 
  | 'background' | 'foreground' | 'primary' | 'primary-foreground'
  | 'secondary' | 'secondary-foreground' | 'muted' | 'muted-foreground'
  | 'accent' | 'accent-foreground' | 'destructive' | 'destructive-foreground'
  | 'card' | 'card-foreground' | 'popover' | 'popover-foreground'
  | 'border' | 'input' | 'ring';

export type FontSizeToken = 
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'kbd';

export type RadiusToken = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type ShadowToken = 
  | 'sm' | 'md' | 'lg' | 'xl';

export type ZIndexToken = 
  | 'dropdown' | 'sticky' | 'fixed' | 'modal-backdrop' 
  | 'modal' | 'popover' | 'tooltip' | 'toast';

export type AnimationToken = 
  | 'accordion-down' | 'accordion-up' | 'fade-in' | 'slide-up' 
  | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up' 
  | 'scale-down' | 'bounce-subtle' | 'pulse-subtle' | 'shimmer' 
  | 'float' | 'glow';

export type DurationToken = 
  | 'instant' | 'fast' | 'normal' | 'slow' | 'slower';

export type EasingToken = 
  | 'spring' | 'bounce' | 'smooth' | 'snappy';

export type IconSizeToken = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ContentWidthToken = 
  | 'narrow' | 'normal' | 'wide';

// Design token utilities
export const designTokens = {
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': 'var(--spacing-3xl)',
  },
  
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: 'hsl(var(--primary))',
    'primary-foreground': 'hsl(var(--primary-foreground))',
    secondary: 'hsl(var(--secondary))',
    'secondary-foreground': 'hsl(var(--secondary-foreground))',
    muted: 'hsl(var(--muted))',
    'muted-foreground': 'hsl(var(--muted-foreground))',
    accent: 'hsl(var(--accent))',
    'accent-foreground': 'hsl(var(--accent-foreground))',
    destructive: 'hsl(var(--destructive))',
    'destructive-foreground': 'hsl(var(--destructive-foreground))',
    card: 'hsl(var(--card))',
    'card-foreground': 'hsl(var(--card-foreground))',
    popover: 'hsl(var(--popover))',
    'popover-foreground': 'hsl(var(--popover-foreground))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
  
  fontSize: {
    xs: 'var(--text-xs)',
    sm: 'var(--text-sm)',
    base: 'var(--text-base)',
    lg: 'var(--text-lg)',
    xl: 'var(--text-xl)',
    '2xl': 'var(--text-2xl)',
    '3xl': 'var(--text-3xl)',
    '4xl': 'var(--text-4xl)',
    kbd: 'var(--text-kbd)',
  },
  
  borderRadius: {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },
  
  boxShadow: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
  
  zIndex: {
    dropdown: 'var(--z-dropdown)',
    sticky: 'var(--z-sticky)',
    fixed: 'var(--z-fixed)',
    'modal-backdrop': 'var(--z-modal-backdrop)',
    modal: 'var(--z-modal)',
    popover: 'var(--z-popover)',
    tooltip: 'var(--z-tooltip)',
    toast: 'var(--z-toast)',
  },
  
  duration: {
    instant: 'var(--duration-instant)',
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
  },
  
  easing: {
    spring: 'var(--ease-spring)',
    bounce: 'var(--ease-bounce)',
    smooth: 'var(--ease-smooth)',
    snappy: 'var(--ease-snappy)',
  },
  
  iconSize: {
    xs: 'var(--icon-xs)',
    sm: 'var(--icon-sm)',
    md: 'var(--icon-md)',
    lg: 'var(--icon-lg)',
    xl: 'var(--icon-xl)',
  },
  
  contentWidth: {
    narrow: 'var(--content-width-narrow)',
    normal: 'var(--content-width-normal)',
    wide: 'var(--content-width-wide)',
  },
} as const;

// Utility functions for token access
export function getSpacing(token: SpacingToken): string {
  return designTokens.spacing[token];
}

export function getColor(token: ColorToken): string {
  return designTokens.colors[token];
}

export function getFontSize(token: FontSizeToken): string {
  return designTokens.fontSize[token];
}

export function getBorderRadius(token: RadiusToken): string {
  return designTokens.borderRadius[token];
}

export function getBoxShadow(token: ShadowToken): string {
  return designTokens.boxShadow[token];
}

export function getZIndex(token: ZIndexToken): string {
  return designTokens.zIndex[token];
}

export function getDuration(token: DurationToken): string {
  return designTokens.duration[token];
}

export function getEasing(token: EasingToken): string {
  return designTokens.easing[token];
}

export function getIconSize(token: IconSizeToken): string {
  return designTokens.iconSize[token];
}

export function getContentWidth(token: ContentWidthToken): string {
  return designTokens.contentWidth[token];
}

// Composition utilities
export function createTransition(
  property: string | string[] = 'all',
  duration: DurationToken = 'normal',
  easing: EasingToken = 'smooth'
): string {
  const props = Array.isArray(property) ? property.join(', ') : property;
  return `${props} ${getDuration(duration)} ${getEasing(easing)}`;
}

export function createAnimation(
  name: string,
  duration: DurationToken = 'normal',
  easing: EasingToken = 'smooth',
  fillMode: 'forwards' | 'backwards' | 'both' | 'none' = 'both'
): string {
  return `${name} ${getDuration(duration)} ${getEasing(easing)} ${fillMode}`;
}

// Breakpoint utilities
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;

export function getBreakpoint(token: BreakpointToken): string {
  return breakpoints[token];
}

export function mediaQuery(breakpoint: BreakpointToken): string {
  return `(min-width: ${getBreakpoint(breakpoint)})`;
}

// Validation utilities
export function isValidSpacingToken(token: string): token is SpacingToken {
  return token in designTokens.spacing;
}

export function isValidColorToken(token: string): token is ColorToken {
  return token in designTokens.colors;
}

export function isValidFontSizeToken(token: string): token is FontSizeToken {
  return token in designTokens.fontSize;
}

// Development utilities
export function getAllTokens() {
  return {
    spacing: Object.keys(designTokens.spacing),
    colors: Object.keys(designTokens.colors),
    fontSize: Object.keys(designTokens.fontSize),
    borderRadius: Object.keys(designTokens.borderRadius),
    boxShadow: Object.keys(designTokens.boxShadow),
    zIndex: Object.keys(designTokens.zIndex),
    duration: Object.keys(designTokens.duration),
    easing: Object.keys(designTokens.easing),
    iconSize: Object.keys(designTokens.iconSize),
    contentWidth: Object.keys(designTokens.contentWidth),
    breakpoints: Object.keys(breakpoints),
  };
}

// Export all tokens for runtime usage
export { designTokens as tokens };
export default designTokens;