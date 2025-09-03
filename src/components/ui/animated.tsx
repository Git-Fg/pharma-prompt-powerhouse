'use client'

import { motion, LazyMotion, domAnimation, LayoutGroup, Variants, HTMLMotionProps } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'

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
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3, 
      ease: easings.smooth 
    } 
  },
}

export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: easings.spring 
    } 
  },
}

export const slideDownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: easings.spring 
    } 
  },
}

export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.3, 
      ease: easings.spring 
    } 
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
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: easings.spring 
    } 
  },
}

// Core animated components with performance optimization
interface AnimatedProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'scale'
  className?: string
}

export const Animated = forwardRef<HTMLDivElement, AnimatedProps>(
  ({ children, variant = 'fade', className = '', ...props }, ref) => {
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
)

Animated.displayName = 'Animated'

// Staggered container for list animations
interface AnimatedListProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  ({ children, className = '', staggerDelay = 0.1, ...props }, ref) => {
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
)

AnimatedList.displayName = 'AnimatedList'

// Individual list items
interface AnimatedItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  delay?: number
}

export const AnimatedItem = forwardRef<HTMLDivElement, AnimatedItemProps>(
  ({ children, className = '', delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={{
          hidden: { 
            opacity: 0, 
            y: 20 
          },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.4, 
              ease: easings.spring,
              delay 
            } 
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedItem.displayName = 'AnimatedItem'

// Layout animation wrapper
interface AnimatedLayoutProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  id?: string
}

export const AnimatedLayout = forwardRef<HTMLDivElement, AnimatedLayoutProps>(
  ({ children, className = '', id, ...props }, ref) => {
    return (
      <LazyMotion features={loadFeatures}>
        <LayoutGroup id={id}>
          <motion.div
            ref={ref}
            className={className}
            layout
            transition={{ 
              duration: 0.3, 
              ease: easings.spring 
            }}
            {...props}
          >
            {children}
          </motion.div>
        </LayoutGroup>
      </LazyMotion>
    )
  }
)

AnimatedLayout.displayName = 'AnimatedLayout'

// Hover and interaction animations
interface InteractiveProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  hoverScale?: number
  tapScale?: number
  hoverY?: number
}

export const Interactive = forwardRef<HTMLDivElement, InteractiveProps>(
  ({ 
    children, 
    className = '', 
    hoverScale = 1.02, 
    tapScale = 0.98, 
    hoverY = -2,
    ...props 
  }, ref) => {
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
              ease: easings.spring 
            } 
          }}
          whileTap={{ 
            scale: tapScale,
            transition: { 
              duration: 0.1, 
              ease: easings.snappy 
            } 
          }}
          {...props}
        >
          {children}
        </motion.div>
      </LazyMotion>
    )
  }
)

Interactive.displayName = 'Interactive'

// Scroll-triggered animations
interface ScrollAnimatedProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'slideUp' | 'scale'
  once?: boolean
  threshold?: number
}

export const ScrollAnimated = forwardRef<HTMLDivElement, ScrollAnimatedProps>(
  ({ 
    children, 
    className = '', 
    variant = 'slideUp', 
    once = true, 
    threshold = 0.1,
    ...props 
  }, ref) => {
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
            amount: threshold 
          }}
          variants={variants}
          {...props}
        >
          {children}
        </motion.div>
      </LazyMotion>
    )
  }
)

ScrollAnimated.displayName = 'ScrollAnimated'