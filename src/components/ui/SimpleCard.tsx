'use client'

import type { ReactNode } from 'react'
import { useMagneticHover } from '@/hooks/use-css-animations'
import { cn } from '@/lib/utils'

interface SimpleCardProps {
  children: ReactNode
  className?: string
  intensity?: 'subtle' | 'normal' | 'strong'
}

export function SimpleCard({ children, className, intensity = 'normal' }: SimpleCardProps) {
  const ref = useMagneticHover(intensity)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'bg-card text-card-foreground border rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50',
        className
      )}
    >
      {children}
    </div>
  )
}

SimpleCard.displayName = 'SimpleCard'
