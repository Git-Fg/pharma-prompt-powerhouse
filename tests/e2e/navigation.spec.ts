import { expect, test } from '@playwright/test'

test.describe('Core Site Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    // Increase timeout for homepage
    test.setTimeout(10000)

    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded')

    // Check main title is present - use the actual title
    await expect(page).toHaveTitle(/Pharma Prompt Powerhouse/i)

    // Check main navigation elements - updated for new structure
    const navElements = ['Par où commencer ?', 'Workflows Stratégiques', 'L\'Arsenal IA', 'Concepts']
    for (const navItem of navElements) {
      // Use more flexible text matching with getByRole
      await expect(page.getByRole('link', { name: new RegExp(navItem, 'i') }).first()).toBeVisible({ timeout: 10000 })
    }

    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true })
  })

  test('concepts page navigation works', async ({ page }) => {
    await page.goto('/concepts')

    // Should show concepts listing - correct title
    await expect(page.getByRole('heading', { name: 'Hub de Concepts' })).toBeVisible()

    // Should have concept content or links - use more flexible selector
    const conceptContent = page.locator('a[href*="/concepts/"], .concept, [class*="concept"], main a')
    await expect(conceptContent.first()).toBeVisible()

    await page.screenshot({ path: 'test-results/concepts-page.png', fullPage: true })
  })

  test('guides page navigation works', async ({ page }) => {
    await page.goto('/guides')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    // The actual title is "Mes Fiches & Méthodes" not "Guides"
    await expect(page.getByRole('heading', { name: /Mes Fiches/ })).toBeVisible()

    // Should have guide listings - check for actual content
    const guideElements = page.locator('a[href*="/guides/"]')
    if (await guideElements.count() > 0) {
      await expect(guideElements.first()).toBeVisible()
    }
    else {
      // If no guide links, check for guide content
      await expect(page.locator('text=guide, text=Guide').first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/guides-page.png', fullPage: true })
  })

  test('workflows page navigation works', async ({ page }) => {
    await page.goto('/workflows')

    // Updated to match actual title
    await expect(page.getByRole('heading', { name: /Workflows Stratégiques/ })).toBeVisible()

    await page.screenshot({ path: 'test-results/workflows-page.png', fullPage: true })
  })

  test('arsenal IA page navigation works', async ({ page }) => {
    await page.goto('/l-arsenal-ia')

    // Updated to match actual title - "L'Arsenal IA 2025"
    await expect(page.getByRole('heading', { name: 'L\'Arsenal IA 2025' })).toBeVisible()

    await page.screenshot({ path: 'test-results/arsenal-ia-page.png', fullPage: true })
  })

  test('par où commencer page navigation works', async ({ page }) => {
    await page.goto('/par-ou-commencer')

    // This page should exist and load
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await page.screenshot({ path: 'test-results/par-ou-commencer-page.png', fullPage: true })
  })
})
