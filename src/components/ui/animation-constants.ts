import type { Variants } from 'framer-motion'

// Modern easing curves - 2025 best practices
export const easings = {
  spring: [0.16, 1, 0.3, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.4, 0, 0.2, 1],
  snappy: [0.4, 0, 0.6, 1],
} as const

// Animation variants following 2025 patterns - optimized timing (150-300ms)
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: easings.spring,
    },
  },
}

export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: easings.spring,
    },
  },
}

export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: easings.spring,
    },
  },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.spring,
    },
  },
}

// Additional standardized variants for common UI patterns
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: easings.spring,
    },
  },
}

export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: easings.spring,
    },
  },
}

export const pulseVariants: Variants = {
  hidden: {
    opacity: 0.8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

export const bounceInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.bounce,
    },
  },
}

// Hover and interaction variants
export const hoverScaleVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

export const pressScaleVariants: Variants = {
  rest: {
    scale: 1,
  },
  press: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: easings.snappy,
    },
  },
}

// Stagger configurations for different use cases
export const staggerConfigs = {
  fast: { staggerChildren: 0.05, delayChildren: 0.05 },
  normal: { staggerChildren: 0.1, delayChildren: 0.1 },
  slow: { staggerChildren: 0.15, delayChildren: 0.15 },
  cascade: { staggerChildren: 0.08, delayChildren: 0 },
} as const
