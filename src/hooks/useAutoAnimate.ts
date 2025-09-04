'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useReducedMotion } from '@/hooks/use-animations'

/**
 * Hook that provides auto-animate functionality while respecting user motion preferences
 * Returns null for animation ref when user prefers reduced motion
 */
export function useAutoAnimateIfEnabled() {
  const prefersReducedMotion = useReducedMotion()
  const [enabledRef] = useAutoAnimate({
    duration: 250,
    easing: 'ease-out',
  })

  // Return null to disable animations if user prefers reduced motion
  return prefersReducedMotion ? null : enabledRef
}

/**
 * Hook for list animations with custom options
 */
export function useAutoAnimateList(options?: {
  duration?: number
  easing?: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const [enabledRef] = useAutoAnimate({
    duration: options?.duration || 200,
    easing: options?.easing || 'ease-out',
  })

  return prefersReducedMotion ? null : enabledRef
}

/**
 * Hook for layout animations (showing/hiding elements)
 */
export function useAutoAnimateLayout() {
  const prefersReducedMotion = useReducedMotion()
  const [enabledRef] = useAutoAnimate({
    duration: 150,
    easing: 'ease-in-out',
  })

  return prefersReducedMotion ? null : enabledRef
}
