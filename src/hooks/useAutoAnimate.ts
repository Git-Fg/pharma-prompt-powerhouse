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

/**
 * Hook for grid animations with custom options
 */
export function useAutoAnimateGrid(options?: {
  duration?: number
  easing?: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const [enabledRef] = useAutoAnimate({
    duration: options?.duration || 300,
    easing: options?.easing || 'ease-out',
  })

  return prefersReducedMotion ? null : enabledRef
}

/**
 * Hook for animations with full configuration options
 */
export function useAutoAnimateWithConfig(options?: {
  duration?: number
  easing?: string
  disrespectUserMotionPreference?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()

  // Use the options as provided, with defaults for required properties
  const config = options
    ? {
        ...options,
        duration: options.duration ?? 250,
        easing: options.easing ?? 'ease-in-out',
      }
    : {
        duration: 250,
        easing: 'ease-in-out',
      }

  const [enabledRef] = useAutoAnimate(config)

  // Return null if user prefers reduced motion and we should respect that preference
  const shouldDisableAnimation = prefersReducedMotion && !options?.disrespectUserMotionPreference
  return shouldDisableAnimation ? null : enabledRef
}
