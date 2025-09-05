import { expect, test } from '@playwright/test'

test.describe('Homepage Duplicate Keys Fix', () => {
  test('homepage does not have React duplicate key errors', async ({ page }) => {
    // Listen for console errors
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('Encountered two children with the same key')) {
        consoleErrors.push(msg.text())
      }
    })

    // Navigate to homepage
    await page.goto('/')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Verify no duplicate key errors occurred
    expect(consoleErrors).toHaveLength(0)

    // Additional verification: check that workflows section renders correctly
    const workflowCards = page.locator('h2:contains("Workflows"), .text-lg, [role="heading"]')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const visibleCards = await workflowCards.count()

    // Just verify the section exists without requiring specific card count
    // since that can vary based on content
    const workflowSection = await page.locator('h2:has-text("Workflows"), h2:has-text("Derniers")').first()
    await expect(workflowSection).toBeVisible()
  })

  test('workflow keys are unique in featured section', async ({ page }) => {
    await page.goto('/')

    // Get all workflow cards and their data attributes or unique identifiers
    const workflowCards = page.locator('a[href^="/workflows/"]:has(h3, .text-lg)')
    const cardCount = await workflowCards.count()

    if (cardCount > 0) {
      const hrefs: string[] = []

      // Collect all workflow hrefs
      for (let i = 0; i < cardCount; i++) {
        const href = await workflowCards.nth(i).getAttribute('href')
        if (href && href.startsWith('/workflows/')) {
          hrefs.push(href)
        }
      }

      // Verify all hrefs are unique (no duplicates)
      const uniqueHrefs = new Set(hrefs)
      expect(uniqueHrefs.size).toBe(hrefs.length)
    }
  })

  test('console shows no React errors during navigation', async ({ page }) => {
    const reactErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error' && (
        msg.text().includes('React')
        || msg.text().includes('key')
        || msg.text().includes('Warning:')
      )) {
        reactErrors.push(msg.text())
      }
    })

    // Navigate through key pages
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.goto('/workflows')
    await page.waitForLoadState('networkidle')

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Filter out non-React warnings (like service worker 404)
    const actualReactErrors = reactErrors.filter(error =>
      !error.includes('Service Worker')
      && !error.includes('bad HTTP response code')
      && !error.includes('React DevTools'),
    )

    expect(actualReactErrors).toHaveLength(0)
  })
})
