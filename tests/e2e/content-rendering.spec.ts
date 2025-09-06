import { expect, test } from '@playwright/test'

test.describe('Content Rendering Functionality', () => {
  test('modernized concept with React components renders correctly', async ({ page }) => {
    await page.goto('/concepts/hallucination-effet-indesirable')

    // Check main title specifically in main content area - updated title
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Hallucination : Effet Indésirable')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Check for Alert components using test IDs
    const alerts = page.locator('[data-testid^="alert-"]')
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible()
    }

    // Check for Card components using test IDs
    const cards = page.locator('[data-testid^="card-"]')
    if (await cards.count() > 0) {
      await expect(cards.first()).toBeVisible()
    }

    // Check for Tabs components using test IDs
    const tabs = page.locator('[data-testid^="tabs-"]')
    if (await tabs.count() > 0) {
      await expect(tabs.first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/hallucination-concept.png', fullPage: true })
  })

  test('context engineering concept renders correctly', async ({ page }) => {
    await page.goto('/concepts/context-engineering')

    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Context Engineering')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Check that the concept content is visible
    await expect(page.locator('text=Optimisez la fenêtre de contexte')).toBeVisible()
    await expect(page.locator('text=Pourquoi c\'est crucial ?')).toBeVisible()
    await expect(page.locator('text=Principes clés')).toBeVisible()

    // Check for key takeaways using test IDs
    const keyTakeaways = page.locator('[data-testid^="key-takeaways-"]')
    if (await keyTakeaways.count() > 0) {
      await expect(keyTakeaways.first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/context-engineering-concept.png', fullPage: true })
  })

  test('memory concept with tabs renders correctly', async ({ page }) => {
    await page.goto('/concepts/memoire-ia')

    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Mémoire')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Check for tabs using test IDs
    const tabs = page.locator('[data-testid^="tabs-"]')
    if (await tabs.count() > 0) {
      await expect(tabs.first()).toBeVisible()
    }

    // Check for structured content about RAM vs Disk
    const structuredContent = page.locator('text=RAM, text=Disque, text=contexte')
    if (await structuredContent.count() > 0) {
      await expect(structuredContent.first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/memory-concept.png', fullPage: true })
  })

  test('security guide with alerts renders correctly', async ({ page }) => {
    await page.goto('/guides/confidentialite-securite')

    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Confidentialité')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Should have critical security alert using test IDs
    await expect(page.locator('text=Règle absolue non négociable')).toBeVisible()
    const alerts = page.locator('[data-testid^="alert-"]')
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible()
    }

    // Should have tabs for risk levels using test IDs
    const tabs = page.locator('[data-testid^="tabs-"]')
    if (await tabs.count() > 0) {
      await expect(tabs.first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/security-guide.png', fullPage: true })
  })

  test('external tool with contextual alerts renders correctly', async ({ page }) => {
    await page.goto('/l-arsenal-ia/deepseek-chat')

    // Wait for page load
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('DeepSeek')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Should have warning alert about data privacy using test IDs
    await expect(page.locator('text=Avertissement de Confidentialité')).toBeVisible()
    const alerts = page.locator('[data-testid^="alert-"]')
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/deepseek-tool.png', fullPage: true })
  })

  test('Google AI Studio advantage highlight renders correctly', async ({ page }) => {
    await page.goto('/l-arsenal-ia/google-ai-studio')

    // Wait for page load
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Google AI Studio')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Should have success/advantage alert with Core Kit Quotidien using test IDs
    await expect(page.locator('text=🚀 Core Kit Quotidien')).toBeVisible()
    const alerts = page.locator('[data-testid^="alert-"]')
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible()
    }

    await page.screenshot({ path: 'test-results/google-ai-studio-tool.png', fullPage: true })
  })

  test('interactive tabs work correctly', async ({ page }) => {
    // Try the memory concept which should have tabs
    await page.goto('/concepts/memoire-ia')

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Look for tab-like elements using test IDs
    const tabTriggers = page.locator('[data-testid^="tab-trigger-"]')

    if (await tabTriggers.count() > 0) {
      // Click on the second tab if it exists
      if (await tabTriggers.count() > 1) {
        await tabTriggers.nth(1).click()

        // Wait for content to change
        await page.waitForTimeout(500)

        await page.screenshot({ path: 'test-results/tabs-interaction.png', fullPage: true })
      }
    }
  })
})
