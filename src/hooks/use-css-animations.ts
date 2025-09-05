'use client'

import { useEffect, useRef } from 'react'

/**
 * Modern CSS-native animation hook with Intersection Observer
 * Replaces heavy Framer Motion for scroll-triggered animations
 */
export function useAnimateOnView(options?: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            
            // If triggerOnce is true, stop observing after first trigger
            if (options?.triggerOnce !== false) {
              observer.unobserve(entry.target)
            }
          } else if (options?.triggerOnce === false) {
            // Re-trigger animation when element leaves view
            entry.target.classList.remove('in-view')
          }
        })
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce])

  return elementRef
}

/**
 * Optimized magnetic hover effect using CSS transforms
 * Replaces Framer Motion Interactive for performance
 */
export function useMagneticHover(intensity: 'subtle' | 'normal' | 'strong' = 'normal') {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      const multiplier = {
        subtle: 0.1,
        normal: 0.2,
        strong: 0.3,
      }[intensity]
      
      const moveX = x * multiplier
      const moveY = y * multiplier
      
      element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`
    }

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px) scale(1)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity])

  return elementRef
}

/**
 * Performance-optimized stagger animation
 * Uses CSS custom properties for dynamic timing
 */
export function useStaggerAnimation(delay = 100) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Set the stagger delay as a CSS custom property
    container.style.setProperty('--stagger-delay', `${delay}ms`)

    // Trigger animation when element comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return containerRef
}