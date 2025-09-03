// src/components/layout/ResponsiveGrid.tsx
import { ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    mobile?: 1 | 2
    tablet?: 2 | 3 | 4
    desktop?: 3 | 4 | 6
  }
}

export function ResponsiveGrid({ 
  children, 
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3 }
}: ResponsiveGridProps) {
  // Generate responsive grid classes using Tailwind utilities
  const mobileClass = cols.mobile === 2 ? 'grid-cols-2' : 'grid-cols-1'
  const tabletClass = cols.tablet === 4 ? 'md:grid-cols-4' : 
                     cols.tablet === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  const desktopClass = cols.desktop === 6 ? 'lg:grid-cols-6' : 
                      cols.desktop === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <div className={`content-grid ${mobileClass} ${tabletClass} ${desktopClass} ${className}`}>
      {children}
    </div>
  )
}