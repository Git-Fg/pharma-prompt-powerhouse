// src/lib/performance-monitoring.ts
'use client'

import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
  inp?: number // Interaction to Next Paint
}

interface PerformanceThresholds {
  good: number
  needsImprovement: number
  poor: number
}

const thresholds: Record<keyof PerformanceMetrics, PerformanceThresholds> = {
  fcp: { good: 1800, needsImprovement: 3000, poor: Infinity },
  lcp: { good: 2500, needsImprovement: 4000, poor: Infinity },
  fid: { good: 100, needsImprovement: 300, poor: Infinity },
  cls: { good: 0.1, needsImprovement: 0.25, poor: Infinity },
  ttfb: { good: 800, needsImprovement: 1800, poor: Infinity },
  inp: { good: 200, needsImprovement: 500, poor: Infinity },
}

function getMetricRating(metric: keyof PerformanceMetrics, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[metric]
  if (value <= threshold.good) {
    return 'good'
  }
  if (value <= threshold.needsImprovement) {
    return 'needs-improvement'
  }
  return 'poor'
}

function logMetric(metric: keyof PerformanceMetrics, value: number) {
  const rating = getMetricRating(metric, value)

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console -- Development logging
    console.log(`📊 ${metric.toUpperCase()}: ${value}ms (${rating})`)
  }

  // Send to analytics service if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'web_vitals', {
      metric,
      value,
      rating,
      custom_parameter_1: rating,
    })
  }
}

export function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          logMetric('lcp', lastEntry.startTime)
        }
      })

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      }
      catch (e) {
        console.warn('LCP monitoring not supported:', e)
      }
    }

    // First Input Delay / Interaction to Next Paint
    if ('PerformanceObserver' in window) {
      const interactionObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Check for INP support
          if ('interactionId' in entry) {
            logMetric('inp', entry.duration)
          }
          else {
            logMetric('fid', entry.duration)
          }
        }
      })

      try {
        interactionObserver.observe({ entryTypes: ['first-input', 'event'] })
      }
      catch (e) {
        console.warn('Interaction monitoring not supported:', e)
      }
    }

    // Cumulative Layout Shift
    let clsValue = 0
    if ('PerformanceObserver' in window) {
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // eslint-disable-next-line ts/no-explicit-any -- LayoutShiftEntry type not available in Performance API
          const layoutEntry = entry as any
          if (!layoutEntry.hadRecentInput) {
            clsValue += layoutEntry.value
          }
        }
        logMetric('cls', clsValue)
      })

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      }
      catch (e) {
        console.warn('CLS monitoring not supported:', e)
      }
    }

    // First Contentful Paint
    const navigationEntries = performance.getEntriesByType('navigation')
    if (navigationEntries.length > 0) {
      const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming
      if (navigationEntry.responseStart) {
        logMetric('ttfb', navigationEntry.responseStart - navigationEntry.requestStart)
      }
    }

    // Cleanup
    return () => {
      // Observers will be undefined if they weren't created
      // eslint-disable-next-line unused-imports/no-unused-vars -- Cleanup function placeholder for future observer cleanup
      const cleanup = () => {
        // Observers are scoped to this useEffect
      }
    }
  }, [])
}

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      if (renderTime > 16) { // Log if render takes longer than one frame
        // eslint-disable-next-line no-console -- Development performance logging
        console.log(`⚡ ${componentName} render time: ${renderTime.toFixed(2)}ms`)
      }
    }
  }, [componentName])
}

// Utility to measure function performance
export function measurePerformance<T>(fn: () => T, name: string): T {
  if (process.env.NODE_ENV !== 'development') {
    return fn()
  }

  const start = performance.now()
  const result = fn()
  const end = performance.now()

  // eslint-disable-next-line no-console -- Development performance logging
  console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`)
  return result
}

// Types for global augmentation
declare global {
  interface Window {
    // eslint-disable-next-line ts/no-explicit-any -- Google Analytics global type definition
    gtag?: (command: string, event: string, params: any) => void
  }
}
