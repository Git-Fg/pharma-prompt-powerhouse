'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * CSS-only staggered animation component
 * Replaces Framer Motion for better performance
 */
interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  /**
   * Delay between each item animation in milliseconds
   * @default 100
   */
  staggerDelay?: number
  /**
   * Enable animation only when element enters viewport
   * @default true
   */
  triggerOnView?: boolean
}

export function StaggeredContainer({ 
  children, 
  className, 
  staggerDelay = 100,
  triggerOnView = true 
}: StaggeredContainerProps) {
  // Generate custom CSS variables for dynamic stagger timing
  const style = {
    '--stagger-delay': `${staggerDelay}ms`,
  } as React.CSSProperties

  return (
    <div 
      className={cn(
        'stagger-container',
        triggerOnView && 'stagger-on-view',
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

/**
 * CSS-only fade and slide animation
 * Modern replacement for basic Framer Motion animations
 */
interface AnimatedElementProps {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'scale'
  delay?: number
}

export function AnimatedElement({ 
  children, 
  className, 
  variant = 'slideUp',
  delay = 0 
}: AnimatedElementProps) {
  const style = {
    '--animation-delay': `${delay}ms`,
  } as React.CSSProperties

  return (
    <div 
      className={cn(
        'animate-on-view',
        `animate-${variant}`,
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

/**
 * CSS-only magnetic hover effect
 * Replaces Framer Motion Interactive component for simple hover effects
 */
interface MagneticHoverProps {
  children: ReactNode
  className?: string
  intensity?: 'subtle' | 'normal' | 'strong'
}

export function MagneticHover({ 
  children, 
  className, 
  intensity = 'normal' 
}: MagneticHoverProps) {
  const intensityClass = {
    subtle: 'magnetic-hover-subtle',
    normal: 'magnetic-hover',
    strong: 'magnetic-hover-strong',
  }[intensity]

  return (
    <div className={cn(intensityClass, className)}>
      {children}
    </div>
  )
}