'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Hook for list animations with FLIP technique
 *
 * NOTE: This is the ONLY JavaScript animation library we keep.
 * AutoAnimate solves the complex FLIP (First, Last, Invert, Play) problem
 * for dynamic list animations which would be extremely complex to implement in pure CSS.
 * The library is extremely lightweight (~2.2kB) and provides significant UX value.
 *
 * Usage: Perfect for FilterableContentGrid where items are added/removed/reordered.
 */
export function useListAnimation(options?: {
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
export function useLayoutAnimation() {
  const prefersReducedMotion = useReducedMotion()
  const [enabledRef] = useAutoAnimate({
    duration: 150,
    easing: 'ease-in-out',
  })

  return prefersReducedMotion ? null : enabledRef
}

/**
 * @deprecated Use useListAnimation for better semantic clarity
 */
export function useAutoAnimateIfEnabled() {
  return useListAnimation({ duration: 250, easing: 'ease-out' })
}

/**
 * @deprecated Use useListAnimation for better semantic clarity
 */
export function useAutoAnimateList(options?: {
  duration?: number
  easing?: string
}) {
  return useListAnimation(options)
}

/**
 * @deprecated Use useLayoutAnimation for better semantic clarity
 */
export function useAutoAnimateLayout() {
  return useLayoutAnimation()
}
