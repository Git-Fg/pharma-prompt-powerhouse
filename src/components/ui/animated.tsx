'use client'

import type { HTMLMotionProps, Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { LayoutGroup, LazyMotion, motion } from 'framer-motion'

// Lazy load animations for better performance
const loadFeatures = () => import('framer-motion').then(res => res.domAnimation)

// Modern easing curves - 2025 best practices
export const easings = {
  spring: [0.16, 1, 0.3, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.4, 0, 0.2, 1],
  snappy: [0.4, 0, 0.6, 1],
} as const

// Animation variants following 2025 patterns
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
}

export const slideUpVariants: Variants = {
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

export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
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

export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
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

// Core animated components with performance optimization
interface AnimatedProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'scale'
  className?: string
}

export function Animated({ ref, children, variant = 'fade', className = '', ...props }: AnimatedProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const variants = {
    fade: fadeInVariants,
    slideUp: slideUpVariants,
    slideDown: slideDownVariants,
    scale: scaleVariants,
  }[variant]

  return (
    <LazyMotion features={loadFeatures}>
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    </LazyMotion>
  )
}

Animated.displayName = 'Animated'

// Staggered container for list animations
interface AnimatedListProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function AnimatedList({ ref, children, className = '', staggerDelay = 0.1, ...props }: AnimatedListProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <LazyMotion features={loadFeatures}>
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: 0.1,
            },
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    </LazyMotion>
  )
}

AnimatedList.displayName = 'AnimatedList'

// Individual list items
interface AnimatedItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedItem({ ref, children, className = '', delay = 0, ...props }: AnimatedItemProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
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
            delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

AnimatedItem.displayName = 'AnimatedItem'

// Layout animation wrapper
interface AnimatedLayoutProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  id?: string
}

export function AnimatedLayout({ ref, children, className = '', id, ...props }: AnimatedLayoutProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <LazyMotion features={loadFeatures}>
      <LayoutGroup id={id}>
        <motion.div
          ref={ref}
          className={className}
          layout
          transition={{
            duration: 0.3,
            ease: easings.spring,
          }}
          {...props}
        >
          {children}
        </motion.div>
      </LayoutGroup>
    </LazyMotion>
  )
}

AnimatedLayout.displayName = 'AnimatedLayout'

// Hover and interaction animations
interface InteractiveProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  hoverScale?: number
  tapScale?: number
  hoverY?: number
}

export function Interactive({ ref, children, className = '', hoverScale = 1.02, tapScale = 0.98, hoverY = -2, ...props }: InteractiveProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <LazyMotion features={loadFeatures}>
      <motion.div
        ref={ref}
        className={className}
        whileHover={{
          scale: hoverScale,
          y: hoverY,
          transition: {
            duration: 0.2,
            ease: easings.spring,
          },
        }}
        whileTap={{
          scale: tapScale,
          transition: {
            duration: 0.1,
            ease: easings.snappy,
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    </LazyMotion>
  )
}

Interactive.displayName = 'Interactive'

// Scroll-triggered animations
interface ScrollAnimatedProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'slideUp' | 'scale'
  once?: boolean
  threshold?: number
}

export function ScrollAnimated({ ref, children, className = '', variant = 'slideUp', once = true, threshold = 0.1, ...props }: ScrollAnimatedProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const variants = {
    fade: fadeInVariants,
    slideUp: slideUpVariants,
    scale: scaleVariants,
  }[variant]

  return (
    <LazyMotion features={loadFeatures}>
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once,
          amount: threshold,
        }}
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    </LazyMotion>
  )
}

ScrollAnimated.displayName = 'ScrollAnimated'
