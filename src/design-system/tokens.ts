/**
 * Design System Tokens Export
 *
 * Central export of all CSS custom properties used throughout the application.
 * This serves as the single source of truth for all design tokens.
 *
 * Generated from /src/app/globals.css
 */

// Spacing Tokens
export const spacingTokens = {
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  xl2: 'var(--spacing-2xl)',
  xl3: 'var(--spacing-3xl)',
  xl4: 'var(--spacing-4xl)',
} as const

// Typography Tokens
export const typographyTokens = {
  fontSize: {
    xs: 'var(--text-xs)',
    sm: 'var(--text-sm)',
    base: 'var(--text-base)',
    lg: 'var(--text-lg)',
    xl: 'var(--text-xl)',
    xl2: 'var(--text-2xl)',
    xl3: 'var(--text-3xl)',
    xl4: 'var(--text-4xl)',
  },
  lineHeight: {
    tight: 'var(--line-height-tight)',
    snug: 'var(--line-height-snug)',
    normal: 'var(--line-height-normal)',
    relaxed: 'var(--line-height-relaxed)',
    loose: 'var(--line-height-loose)',
  },
  letterSpacing: {
    tight: 'var(--letter-spacing-tight)',
    normal: 'var(--letter-spacing-normal)',
    wide: 'var(--letter-spacing-wide)',
  },
} as const

// Color Tokens
export const colorTokens = {
  foreground: {
    DEFAULT: 'var(--foreground)',
    muted: 'var(--muted-foreground)',
    accent: 'var(--accent-foreground)',
  },
  background: {
    DEFAULT: 'var(--background)',
    muted: 'var(--muted)',
    accent: 'var(--accent)',
    card: 'var(--card)',
    popover: 'var(--popover)',
  },
  border: {
    DEFAULT: 'var(--border)',
    input: 'var(--input)',
  },
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)',
  },
  secondary: {
    DEFAULT: 'var(--secondary)',
    foreground: 'var(--secondary-foreground)',
  },
  destructive: {
    DEFAULT: 'var(--destructive)',
    foreground: 'var(--destructive-foreground)',
  },
} as const

// Border Radius Tokens
export const radiusTokens = {
  none: 'var(--radius-none)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  full: 'var(--radius-full)',
} as const

// Shadow Tokens
export const shadowTokens = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
} as const

// Animation Tokens
export const animationTokens = {
  duration: {
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
  },
  easing: {
    linear: 'var(--ease-linear)',
    in: 'var(--ease-in)',
    out: 'var(--ease-out)',
    inOut: 'var(--ease-in-out)',
    bounce: 'var(--ease-bounce)',
    spring: 'var(--ease-spring)',
  },
} as const

// Container Tokens (avoiding Tailwind v4 max-width bugs)
export const containerTokens = {
  sm: 'var(--container-sm)', // 24rem - 384px
  md: 'var(--container-md)', // 28rem - 448px
  lg: 'var(--container-lg)', // 32rem - 512px
  xl: 'var(--container-xl)', // 36rem - 576px
  xl2: 'var(--container-2xl)', // 42rem - 672px
  xl3: 'var(--container-3xl)', // 48rem - 768px
  xl4: 'var(--container-4xl)', // 56rem - 896px
  xl5: 'var(--container-5xl)', // 64rem - 1024px
  prose: 'var(--prose-max-width)', // 65rem - 1040px
  full: 'var(--container-full)', // 100%
} as const

// Icon Size Tokens
export const iconTokens = {
  xs: 'var(--icon-size-xs)',
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
} as const

// Transform Distance Tokens
export const transformTokens = {
  sm: 'var(--transform-distance-sm)',
  md: 'var(--transform-distance-md)',
  lg: 'var(--transform-distance-lg)',
} as const

// Blur Amount Tokens
export const blurTokens = {
  none: 'var(--blur-none)',
  sm: 'var(--blur-sm)',
  md: 'var(--blur-md)',
  lg: 'var(--blur-lg)',
  xl: 'var(--blur-xl)',
} as const

// Toast Duration Tokens
export const toastTokens = {
  short: 'var(--toast-duration-short)',
  medium: 'var(--toast-duration-medium)',
  long: 'var(--toast-duration-long)',
} as const

// Export all tokens for easy import
export const designTokens = {
  spacing: spacingTokens,
  typography: typographyTokens,
  color: colorTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  animation: animationTokens,
  container: containerTokens,
  icon: iconTokens,
  transform: transformTokens,
  blur: blurTokens,
  toast: toastTokens,
} as const

// Type definitions for TypeScript
export type SpacingToken = keyof typeof spacingTokens
export type TypographyToken = keyof typeof typographyTokens
export type ColorToken = keyof typeof colorTokens
export type RadiusToken = keyof typeof radiusTokens
export type ShadowToken = keyof typeof shadowTokens
export type AnimationToken = keyof typeof animationTokens
export type ContainerToken = keyof typeof containerTokens
export type IconToken = keyof typeof iconTokens
export type TransformToken = keyof typeof transformTokens
export type BlurToken = keyof typeof blurTokens
export type ToastToken = keyof typeof toastTokens
