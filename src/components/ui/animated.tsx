'use client'

import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { LayoutGroup, LazyMotion, motion } from 'framer-motion'
import {
  easings,
  fadeInVariants,
  scaleVariants,
  slideDownVariants,
  slideUpVariants,
} from './animation-constants'

// Lazy load animations for better performance
const loadFeatures = () => import('framer-motion').then(res => res.domAnimation)

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
