// src/components/layout/ResponsiveGrid.tsx
import { ReactNode } from 'react'
import { grid } from '@/lib/design-system'

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
  const mobileClass = cols.mobile === 2 ? grid.mobile.cols2 : grid.mobile.cols1
  const tabletClass = cols.tablet === 4 ? grid.tablet.cols4 : 
                     cols.tablet === 3 ? grid.tablet.cols3 : grid.tablet.cols2
  const desktopClass = cols.desktop === 6 ? grid.desktop.cols6 : 
                      cols.desktop === 4 ? grid.desktop.cols4 : grid.desktop.cols3

  return (
    <div className={`grid ${mobileClass} ${tabletClass} ${desktopClass} ${grid.mobile.gap} ${grid.tablet.gap} ${grid.desktop.gap} ${className}`}>
      {children}
    </div>
  )
}