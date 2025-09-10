'use client'

import type { ElementType, ReactNode } from 'react'
import { useAnimateOnView } from '@/hooks/use-css-animations'
import { cn } from '@/lib/utils'

interface AnimateProps {
  children: ReactNode
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'scaleDown'
  delay?: number // en ms
  className?: string
  as?: ElementType
  triggerOnce?: boolean
  threshold?: number
  staggerIndex?: number // pour les animations en cascade
}

export function Animate({
  children,
  variant = 'fadeIn',
  delay = 0,
  className,
  as: Component = 'div',
  triggerOnce = true,
  threshold = 0.1,
  staggerIndex,
  ...props
}: AnimateProps) {
  const ref = useAnimateOnView({ triggerOnce, threshold })

  // Calcul du délai total (delay de base + stagger si fourni)
  const totalDelay = staggerIndex !== undefined ? delay + (staggerIndex * 100) : delay
  const style = {
    '--animation-delay': `${totalDelay}ms`,
    '--stagger-index': staggerIndex?.toString() || '0'
  } as React.CSSProperties

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'animate-on-view',
        `animate-${variant}`,
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

Animate.displayName = 'Animate'

// Composant spécialisé pour les conteneurs avec animation stagger
interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number // délai entre chaque élément en ms
  as?: ElementType
  triggerOnce?: boolean
}

export function StaggeredContainer({
  children,
  className,
  staggerDelay = 100,
  as: Component = 'div',
  triggerOnce = true,
  ...props
}: StaggeredContainerProps) {
  const ref = useAnimateOnView({ triggerOnce })
  const style = { '--stagger-delay': `${staggerDelay}ms` } as React.CSSProperties

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('stagger-container', className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

StaggeredContainer.displayName = 'StaggeredContainer'
