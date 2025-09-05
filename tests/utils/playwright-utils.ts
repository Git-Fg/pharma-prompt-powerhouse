/**
 * Modern Playwright Utilities for 2025
 * User-centric testing with network mocking and performance insights
 */

import type { Locator, Page } from '@playwright/test'
import { test as base, expect } from '@playwright/test'

/**
 * Extended test fixture with modern utilities
 */
export const test = base.extend<{
  /**
   * Enhanced page object with user-centric locators
   */
  userPage: UserPage
  /**
   * Network mocking utilities
   */
  networkMocker: NetworkMocker
  /**
   * Accessibility testing utilities
   */
  a11yTester: A11yTester
  /**
   * Performance monitoring
   */
  perfMonitor: PerformanceMonitor
}>({
  userPage: async ({ page }, use) => {
    const userPage = new UserPage(page)
    await use(userPage)
  },

  networkMocker: async ({ page }, use) => {
    const networkMocker = new NetworkMocker(page)
    await use(networkMocker)
  },

  a11yTester: async ({ page }, use) => {
    const a11yTester = new A11yTester(page)
    await use(a11yTester)
  },

  perfMonitor: async ({ page }, use) => {
    const perfMonitor = new PerformanceMonitor(page)
    await use(perfMonitor)
  },
})

/**
 * User-centric page object
 * Prioritizes locators by accessibility and user intent
 */
export class UserPage {
  constructor(private page: Page) {}

  /**
   * Find elements by their accessible role and name
   * This is the most reliable locator strategy
   */
  getByRole(role: string, options?: { name?: string | RegExp, exact?: boolean }) {
    return this.page.getByRole(role as any, options)
  }

  /**
   * Find elements by text content that users can see
   */
  getByText(text: string | RegExp, options?: { exact?: boolean }) {
    return this.page.getByText(text, options)
  }

  /**
   * Find elements by their accessible label
   */
  getByLabel(label: string | RegExp, options?: { exact?: boolean }) {
    return this.page.getByLabel(label, options)
  }

  /**
   * Find elements by their test ID (fallback option)
   */
  getByTestId(testId: string) {
    return this.page.getByTestId(testId)
  }

  /**
   * Navigate and wait for the page to be ready
   */
  async goto(url: string, options?: { waitForLoadState?: 'load' | 'domcontentloaded' | 'networkidle' }) {
    await this.page.goto(url)
    await this.page.waitForLoadState(options?.waitForLoadState || 'networkidle')
  }

  /**
   * Take a screenshot with automatic naming
   */
  async screenshot(name?: string) {
    const testInfo = test.info()
    const screenshotName = name || `${testInfo.title.replace(/\s+/g, '-').toLowerCase()}`
    return this.page.screenshot({
      path: `test-results/screenshots/${screenshotName}.png`,
      fullPage: true,
    })
  }

  /**
   * Wait for an element to be visible and stable
   */
  async waitForElement(locator: Locator, options?: { timeout?: number }) {
    await locator.waitFor({ state: 'visible', timeout: options?.timeout })
    // Wait for animations to complete
    await this.page.waitForTimeout(100)
  }

  /**
   * Simulate user typing with realistic delays
   */
  async typeRealistic(locator: Locator, text: string) {
    await locator.focus()
    await locator.type(text, { delay: 50 }) // Realistic typing speed
  }

  /**
   * Check if element is visible to users (not just in DOM)
   */
  async isVisibleToUser(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 1000 })
      const box = await locator.boundingBox()
      return box !== null && box.width > 0 && box.height > 0
    }
    catch {
      return false
    }
  }

  /**
   * Test keyboard navigation
   */
  async testTabOrder(expectedElements: string[]) {
    for (const elementText of expectedElements) {
      await this.page.keyboard.press('Tab')
      const focusedElement = await this.page.locator(':focus').textContent()
      expect(focusedElement).toContain(elementText)
    }
  }
}

/**
 * Network mocking utilities for reliable testing
 */
export class NetworkMocker {
  constructor(private page: Page) {}

  /**
   * Mock API responses for consistent testing
   */
  async mockApiResponse(url: string | RegExp, response: any, status = 200) {
    await this.page.route(url, async (route) => {
      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(response),
      })
    })
  }

  /**
   * Simulate network delays for performance testing
   */
  async simulateSlowNetwork(delayMs = 1000) {
    await this.page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, delayMs))
      await route.continue()
    })
  }

  /**
   * Mock external resources (fonts, analytics, etc.)
   */
  async mockExternalResources() {
    // Mock Google Fonts
    await this.page.route('**/*fonts.googleapis.com/**', route =>
      route.abort('blocked'))

    // Mock analytics
    await this.page.route('**/*analytics*/**', route =>
      route.abort('blocked'))

    // Mock social media embeds
    await this.page.route('**/*facebook.com/**', route =>
      route.abort('blocked'))
    await this.page.route('**/*twitter.com/**', route =>
      route.abort('blocked'))
  }

  /**
   * Simulate offline mode
   */
  async goOffline() {
    await this.page.context().setOffline(true)
  }

  /**
   * Restore online mode
   */
  async goOnline() {
    await this.page.context().setOffline(false)
  }
}

/**
 * Accessibility testing utilities
 */
export class A11yTester {
  constructor(private page: Page) {}

  /**
   * Run axe-core accessibility audit
   */
  async auditPage(options?: { rules?: string[], tags?: string[] }) {
    // Inject axe-core into the page
    await this.page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.10.0/axe.min.js',
    })

    // Run axe scan
    const results = await this.page.evaluate((config) => {
      return (window as any).axe.run(document, config)
    }, {
      rules: options?.rules,
      tags: options?.tags || ['wcag2a', 'wcag2aa', 'wcag21aa'],
    })

    // Assert no violations
    if (results.violations.length > 0) {
      console.error('Accessibility violations found:', results.violations)
      throw new Error(`Found ${results.violations.length} accessibility violations`)
    }

    return results
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    // Test tab navigation
    const focusableElements = await this.page.locator('[tabindex]:not([tabindex="-1"]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]').all()

    for (let i = 0; i < focusableElements.length; i++) {
      await this.page.keyboard.press('Tab')
      const activeElement = this.page.locator(':focus')
      await expect(activeElement).toBeVisible()
    }
  }

  /**
   * Test screen reader compatibility
   */
  async testScreenReaderContent() {
    // Check for proper headings hierarchy
    const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').all()
    let currentLevel = 0

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName)
      const level = Number.parseInt(tagName.charAt(1))

      if (currentLevel === 0) {
        expect(level).toBe(1) // First heading should be h1
      }
      else {
        expect(level).toBeLessThanOrEqual(currentLevel + 1) // No skipping levels
      }

      currentLevel = level
    }

    // Check for alt text on images
    const images = await this.page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeDefined()
    }
  }

  /**
   * Test color contrast
   */
  async testColorContrast() {
    // This would require a more sophisticated implementation
    // For now, we'll check that elements have sufficient opacity
    const textElements = await this.page.locator('p, span, div, h1, h2, h3, h4, h5, h6').all()

    for (const element of textElements) {
      const styles = await element.evaluate((el) => {
        const computed = getComputedStyle(el)
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          opacity: computed.opacity,
        }
      })

      expect(Number.parseFloat(styles.opacity)).toBeGreaterThan(0.7)
    }
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  constructor(private page: Page) {}

  /**
   * Measure page load performance
   */
  async measurePageLoad() {
    const startTime = Date.now()

    await this.page.goto(this.page.url())
    await this.page.waitForLoadState('networkidle')

    const endTime = Date.now()
    const loadTime = endTime - startTime

    // Get Web Vitals
    const metrics = await this.page.evaluate(() => {
      return new Promise((resolve) => {
        if ('web-vital' in window) {
          resolve((window as any)['web-vital'])
        }
        else {
          // Fallback metrics
          resolve({
            FCP: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime,
            LCP: 0, // Would need proper LCP measurement
            CLS: 0, // Would need proper CLS measurement
          })
        }
      })
    })

    return {
      loadTime,
      metrics,
      // Performance budgets
      expectations: {
        loadTimeShouldBeLessThan: 3000,
        fcpShouldBeLessThan: 1800,
      },
    }
  }

  /**
   * Monitor memory usage
   */
  async measureMemoryUsage() {
    const metrics = await this.page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory
      }
      return null
    })

    return metrics
  }

  /**
   * Test animation performance
   */
  async measureAnimationPerformance(animationSelector: string) {
    const startTime = Date.now()

    await this.page.locator(animationSelector).hover()
    await this.page.waitForTimeout(500) // Wait for animation

    const endTime = Date.now()
    const animationTime = endTime - startTime

    // Animation should complete within reasonable time
    expect(animationTime).toBeLessThan(1000)

    return animationTime
  }
}

// Export enhanced expect for convenience
export { expect }
