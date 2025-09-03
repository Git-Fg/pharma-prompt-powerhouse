'use client'

import { ReactNode } from 'react'
import { PageTransition } from '@/components/ui/transitions'

interface AppTransitionWrapperProps {
  children: ReactNode
}

export function AppTransitionWrapper({ children }: AppTransitionWrapperProps) {
  return (
    <PageTransition
      variant="slide"
      className="min-h-screen"
    >
      {children}
    </PageTransition>
  )
}