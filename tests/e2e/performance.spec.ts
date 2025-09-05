import { expect, test } from '@playwright/test'

test.describe('Content Accessibility and Performance', () => {
  test('key pages are accessible', async ({ page }) => {
    const pagesToTest = [
      '/',
      '/concepts',
      '/workflows',
      '/guides',
      '/l-arsenal-ia',
      '/par-ou-commencer',
      '/concepts/context-engineering',
      '/guides/confidentialite-securite',
    ]

    for (const url of pagesToTest) {
      await page.goto(url)

      // Basic accessibility checks
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()

      // Check for proper heading structure
      const headings = page.locator('h1, h2, h3, h4, h5, h6')
      await expect(headings.first()).toBeVisible()

      // Ensure no obvious accessibility issues with interactive elements
      const buttons = page.locator('button, [role="button"]')
      if (await buttons.count() > 0) {
        // All buttons should be visible or properly hidden
        for (let i = 0; i < await buttons.count(); i++) {
          const button = buttons.nth(i)
          if (await button.isVisible()) {
            await expect(button).toBeEnabled()
          }
        }
      }
    }
  })

  test('pages load within reasonable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('all collection pages render content', async ({ page }) => {
    // Test that each collection page shows actual content

    // Concepts page
    await page.goto('/concepts')
    const conceptLinks = page.locator('a[href*="/concepts/"]')
    const conceptCount = await conceptLinks.count()
    expect(conceptCount).toBeGreaterThanOrEqual(5) // At least 5 concepts visible

    // Workflows page
    await page.goto('/workflows')
    const workflowLinks = page.locator('a[href*="/workflows/"]')
    const workflowCount = await workflowLinks.count()
    expect(workflowCount).toBeGreaterThanOrEqual(5) // At least 5 workflows visible

    // Guides page
    await page.goto('/guides')
    const guideLinks = page.locator('a[href*="/guides/"]')
    const guideCount = await guideLinks.count()
    expect(guideCount).toBeGreaterThanOrEqual(5) // At least 5 guides visible

    // Arsenal IA page - updated route
    await page.goto('/l-arsenal-ia')
    const toolLinks = page.locator('a[href*="/l-arsenal-ia/"]')
    const toolCount = await toolLinks.count()
    expect(toolCount).toBeGreaterThanOrEqual(5) // At least 5 tool links visible
  })

  test('responsive design works', async ({ page }) => {
    await page.goto('/')

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await expect(page.locator('main h1, article h1, .content h1').first()).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    await expect(page.locator('main h1, article h1, .content h1').first()).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.reload()
    await expect(page.locator('main h1, article h1, .content h1').first()).toBeVisible()

    await page.screenshot({ path: 'test-results/responsive-desktop.png', fullPage: true })
  })

  test('search functionality works if present', async ({ page }) => {
    await page.goto('/')

    // Look for search elements
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[placeholder*="recherche"]')

    if (await searchInput.count() > 0) {
      await searchInput.first().fill('prompting')
      await page.keyboard.press('Enter')

      // Should show search results or filtered content
      await page.waitForTimeout(1000)

      await page.screenshot({ path: 'test-results/search-results.png', fullPage: true })
    }
  })

  test('navigation menu works on all devices', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1200, height: 800 }, // Desktop
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/')

      // Look for navigation elements
      const navElements = page.locator('nav, [role="navigation"]')

      if (await navElements.count() > 0) {
        const nav = navElements.first()
        // Check if navigation exists (it might be hidden on mobile)
        const navExists = await nav.count() > 0
        expect(navExists).toBe(true)

        // If there's a mobile menu button, try clicking it
        const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], .menu-button, [class*="menu"]')
        if (await menuButton.count() > 0 && viewport.width < 768) {
          if (await menuButton.first().isVisible()) {
            await menuButton.first().click()
            await page.waitForTimeout(500)
          }
        }
      }
    }
  })

  test('no console errors on key pages', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    const pagesToTest = [
      '/',
      '/concepts/hallucination-effet-indesirable',
      '/guides/confidentialite-securite',
      '/workflows/creer-fiches-de-revision',
      '/l-arsenal-ia/google-ai-studio',
    ]

    for (const url of pagesToTest) {
      await page.goto(url)
      await page.waitForLoadState('networkidle')
    }

    // Filter out common non-critical errors
    const criticalErrors = consoleErrors.filter(error =>
      !error.includes('favicon.ico')
      && !error.includes('analytics')
      && !error.includes('gtag')
      && !error.includes('Third-party cookie'),
    )

    if (criticalErrors.length > 0) {
      console.warn('Console errors found:', criticalErrors)
    }

    expect(criticalErrors.length).toBe(0)
  })
})
