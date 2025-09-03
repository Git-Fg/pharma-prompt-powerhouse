// src/components/layout/ResponsiveContainer.tsx
import { ReactNode } from 'react'
import { container } from '@/lib/design-system'

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  size?: keyof typeof container
}

export function ResponsiveContainer({ 
  children, 
  className = '',
  size = 'desktop'
}: ResponsiveContainerProps) {
  return (
    <div className={`container mx-auto px-4 ${container[size]} ${className}`}>
      {children}
    </div>
  )
}

// Pour les sections avec marges adaptatives
export function ResponsiveSection({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-8 md:py-12 lg:py-16 ${className}`}>
      {children}
    </section>
  )
}