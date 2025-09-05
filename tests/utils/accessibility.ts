import { axe } from 'vitest-axe'
import type { RenderResult } from '@testing-library/react'
import { expect } from 'vitest'

/**
 * Test helper for accessibility validation using axe-core
 * Provides standardized accessibility testing across components
 */
export async function testAccessibility(
  renderResult: RenderResult,
  options?: {
    rules?: Record<string, { enabled: boolean }>
    tags?: string[]
  }
) {
  const { container } = renderResult
  
  // Default axe configuration optimized for our use case
  const axeOptions = {
    rules: {
      // Disable color-contrast for testing environment
      'color-contrast': { enabled: false },
      // Focus on structural accessibility
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: false }, // Allow for component testing
      'region': { enabled: true },
      ...options?.rules,
    },
    tags: options?.tags || ['wcag2a', 'wcag2aa', 'wcag21aa'],
  }

  const results = await axe(container, axeOptions)
  
  if (results.violations.length > 0) {
    console.log('Accessibility violations found:')
    results.violations.forEach(violation => {
      console.log(`- ${violation.id}: ${violation.description}`)
      violation.nodes.forEach(node => {
        console.log(`  Element: ${node.target.join(', ')}`)
        console.log(`  Message: ${node.any[0]?.message || node.failureSummary}`)
      })
    })
  }

  expect(results.violations).toHaveLength(0)
  return results
}

/**
 * Test helper for keyboard navigation
 * Validates that components can be navigated using keyboard only
 */
export function testKeyboardNavigation(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  return {
    focusableCount: focusableElements.length,
    elements: Array.from(focusableElements),
    hasProperTabOrder: () => {
      // Check if elements have proper tab order
      const tabIndexes = Array.from(focusableElements).map(el => 
        parseInt((el as HTMLElement).getAttribute('tabindex') || '0')
      )
      return tabIndexes.every((index, i) => i === 0 || index >= (tabIndexes[i - 1] || 0))
    }
  }
}

/**
 * Test helper for ARIA attributes validation
 */
export function validateAriaAttributes(element: HTMLElement) {
  const ariaErrors: string[] = []
  
  // Check for required ARIA labels on interactive elements
  const interactiveElements = element.querySelectorAll('button, [role="button"], input, select, textarea')
  interactiveElements.forEach(el => {
    const hasLabel = el.hasAttribute('aria-label') || 
                    el.hasAttribute('aria-labelledby') || 
                    el.textContent?.trim() ||
                    el.querySelector('span.sr-only')
    
    if (!hasLabel) {
      ariaErrors.push(`Interactive element missing accessible label: ${el.tagName}`)
    }
  })
  
  // Check for proper ARIA relationships
  const elementsWithDescribedBy = element.querySelectorAll('[aria-describedby]')
  elementsWithDescribedBy.forEach(el => {
    const describedBy = el.getAttribute('aria-describedby')
    if (describedBy && !document.getElementById(describedBy)) {
      ariaErrors.push(`aria-describedby references non-existent element: ${describedBy}`)
    }
  })
  
  return {
    isValid: ariaErrors.length === 0,
    errors: ariaErrors
  }
}