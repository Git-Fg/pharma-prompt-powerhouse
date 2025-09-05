/**
 * Modern Testing Utilities for React 19 + Next.js 15
 * Implements the "New Test Pyramid" with focus on Server Components
 */

import type { RenderOptions, RenderResult } from '@testing-library/react'
import type { AxeResults } from 'jest-axe'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

// Extend jest-dom matchers
import '@testing-library/jest-dom'

/**
 * Server Component Testing Utilities
 * Treats Server Components as async functions
 */
export async function renderServerComponent<T>(
  Component: () => Promise<ReactElement> | ReactElement,
  props?: T,
): Promise<RenderResult> {
  // Handle both sync and async Server Components
  const element = await Component()
  return render(element)
}

/**
 * Accessibility Testing with axe-core
 * Automated a11y validation for every component
 */
export async function testAccessibility(
  renderResult: RenderResult,
  options?: {
    rules?: Record<string, { enabled: boolean }>
    tags?: string[]
  },
): Promise<AxeResults> {
  const { container } = renderResult

  const results = await axe(container, {
    rules: {
      // Enable specific rules for our use case
      'dialog-title': { enabled: true },
      'aria-live-region': { enabled: true },
      'keyboard-navigation': { enabled: true },
      ...options?.rules,
    },
    tags: options?.tags || ['wcag2a', 'wcag2aa', 'wcag21aa'],
  })

  // Auto-fail tests if accessibility violations are found
  expect(results).toHaveNoViolations()

  return results
}

/**
 * Keyboard Navigation Testing
 * Validates tab order and keyboard interactions
 */
export function testKeyboardNavigation(element: HTMLElement) {
  const user = userEvent.setup()

  return {
    async tabForward() {
      await user.tab()
      return document.activeElement
    },

    async tabBackward() {
      await user.tab({ shift: true })
      return document.activeElement
    },

    async pressEnter() {
      await user.keyboard('{Enter}')
    },

    async pressEscape() {
      await user.keyboard('{Escape}')
    },

    async pressSpace() {
      await user.keyboard(' ')
    },

    getFocusableElements() {
      return element.querySelectorAll([
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', '))
    },

    hasProperTabOrder() {
      const focusable = this.getFocusableElements()
      let hasValidOrder = true

      focusable.forEach((el, index) => {
        const tabIndex = el.getAttribute('tabindex')
        if (tabIndex && Number.parseInt(tabIndex) > 0) {
          // Positive tabindex should be avoided in most cases
          console.warn(`Element at index ${index} has positive tabindex: ${tabIndex}`)
          hasValidOrder = false
        }
      })

      return hasValidOrder
    },
  }
}

/**
 * Modern Component Testing Setup
 * Enhanced render function with common providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Include theme provider for styled components
   */
  withTheme?: boolean
  /**
   * Mock router for Next.js navigation testing
   */
  withRouter?: boolean
  /**
   * Initial route for router testing
   */
  initialRoute?: string
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {},
) {
  const {
    withTheme = true,
    withRouter = false,
    initialRoute = '/',
    ...renderOptions
  } = options

  function Wrapper({ children }: { children: React.ReactNode }) {
    let wrappedChildren = children

    // Add theme provider if needed
    if (withTheme) {
      const { ThemeProvider } = require('@/components/theme-provider')
      wrappedChildren = React.createElement(
        ThemeProvider,
        { attribute: 'class', defaultTheme: 'light' },
        wrappedChildren,
      )
    }

    // Add router mock if needed
    if (withRouter) {
      // Mock Next.js router for testing
      const mockRouter = {
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        pathname: initialRoute,
        query: {},
        asPath: initialRoute,
      }

      // Note: In a real implementation, you'd use next-router-mock
      // or similar testing utilities for Next.js router mocking
    }

    return wrappedChildren
  }

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions })

  return {
    ...renderResult,
    user: userEvent.setup(),
  }
}

/**
 * Performance Testing Utilities
 * Measure component render performance
 */
export function measureRenderPerformance<T extends (...args: any[]) => any>(
  renderFunction: T,
  iterations = 10,
) {
  const times: number[] = []

  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    renderFunction()
    const end = performance.now()
    times.push(end - start)
  }

  const average = times.reduce((sum, time) => sum + time, 0) / times.length
  const min = Math.min(...times)
  const max = Math.max(...times)

  return {
    average,
    min,
    max,
    times,
    // Fail test if average render time is too slow
    expectFastRender(maxMs = 16) {
      expect(average).toBeLessThan(maxMs)
    },
  }
}

/**
 * Animation Testing Utilities
 * Test CSS animations and transitions
 */
export function testAnimations(element: HTMLElement) {
  return {
    async waitForAnimation(animationName: string, timeout = 1000) {
      return new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`Animation ${animationName} did not complete within ${timeout}ms`))
        }, timeout)

        const handleAnimationEnd = (e: AnimationEvent) => {
          if (e.animationName === animationName) {
            clearTimeout(timer)
            element.removeEventListener('animationend', handleAnimationEnd)
            resolve()
          }
        }

        element.addEventListener('animationend', handleAnimationEnd)
      })
    },

    hasReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },

    expectNoAnimationWhenReducedMotion() {
      if (this.hasReducedMotion()) {
        const computedStyle = getComputedStyle(element)
        expect(computedStyle.animationDuration).toBe('0.01ms')
      }
    },
  }
}

/**
 * Mock utilities for testing
 */
export const mockUtils = {
  /**
   * Mock intersection observer for scroll animations
   */
  mockIntersectionObserver() {
    const mockIntersectionObserver = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: mockIntersectionObserver,
    })

    return mockIntersectionObserver
  },

  /**
   * Mock ResizeObserver for responsive components
   */
  mockResizeObserver() {
    const mockResizeObserver = vi.fn()
    mockResizeObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: mockResizeObserver,
    })

    return mockResizeObserver
  },

  /**
   * Mock clipboard API for copy functionality
   */
  mockClipboard() {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
      readText: vi.fn().mockResolvedValue(''),
    }

    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: mockClipboard,
    })

    return mockClipboard
  },
}
