// src/components/layout/ResponsiveContainer.tsx
import { ReactNode } from 'react'

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  size?: 'mobile' | 'tablet' | 'desktop' | 'content'
}

export function ResponsiveContainer({ 
  children, 
  className = '',
  size = 'desktop'
}: ResponsiveContainerProps) {
  const containerClass = size === 'content' ? 'container-content' : 'container'
  
  return (
    <div className={`${containerClass} ${className}`}>
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
    <section className={`section-spacing ${className}`}>
      {children}
    </section>
  )
}