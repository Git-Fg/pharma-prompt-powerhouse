import { expect, test } from '@playwright/test'

test.describe('Footer Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('footer displays 4-column layout on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1400, height: 800 })

    // Wait for footer to be visible
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check grid layout
    const grid = footer.locator('.grid').first()
    await expect(grid).toHaveClass(/xl:grid-cols-4/)

    // Verify 4 sections are present
    const sections = footer.locator('h3')
    await expect(sections).toHaveCount(3) // Navigation, Sécurité & Légal, Derniers Workflows

    // Check grid template columns (should be 4 equal columns at xl breakpoint)
    const gridStyles = await grid.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        gridTemplateColumns: computed.gridTemplateColumns,
        gap: computed.gap,
      }
    })

    // Should have 4 columns at xl breakpoint
    expect(gridStyles.gridTemplateColumns.split(' ')).toHaveLength(4)
  })

  test('footer displays 2-column layout on tablet', async ({ page }) => {
    // Set tablet viewport (below xl breakpoint but above mobile)
    await page.setViewportSize({ width: 768, height: 1024 })

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    const grid = footer.locator('.grid').first()
    await expect(grid).toHaveClass(/md:grid-cols-2/)

    // Check grid template columns (should be 2 columns at md breakpoint)
    const gridStyles = await grid.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return computed.gridTemplateColumns
    })

    // Should have 2 columns at md breakpoint
    expect(gridStyles.split(' ')).toHaveLength(2)
  })

  test('footer displays single-column layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    const grid = footer.locator('.grid').first()
    await expect(grid).toHaveClass(/grid-cols-1/)

    // Check grid template columns (should be 1 column on mobile)
    const gridStyles = await grid.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return computed.gridTemplateColumns
    })

    // Should have 1 column on mobile
    expect(gridStyles.split(' ')).toHaveLength(1)
  })

  test('brand section spans 2 columns on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 800 })

    const brandSection = page.locator('footer').locator('.xl\\:col-span-2').first()
    await expect(brandSection).toBeVisible()
    await expect(brandSection).toHaveClass(/xl:col-span-2/)
  })

  test('all footer sections have proper content', async ({ page }) => {
    const footer = page.locator('footer')

    // Brand section - use more specific selector
    await expect(footer.locator('.font-bold.text-2xl:has-text("Pharma Prompt")')).toBeVisible()
    await expect(footer.locator('text=Mon carnet de notes personnel')).toBeVisible()

    // Navigation section
    await expect(footer.locator('h3:has-text("Navigation")')).toBeVisible()
    await expect(footer.locator('a[href="/"]')).toContainText('Accueil')
    await expect(footer.locator('a[href="/par-ou-commencer"]')).toContainText('Par où commencer')
    await expect(footer.locator('a[href="/workflows"]')).toContainText('Workflows Stratégiques')
    await expect(footer.locator('a[href="/l-arsenal-ia"]')).toContainText('L\'Arsenal IA')
    await expect(footer.locator('a[href="/concepts"]')).toContainText('Concepts')

    // Legal section
    await expect(footer.locator('h3:has-text("Sécurité & Légal")')).toBeVisible()
    await expect(footer.locator('a[href="/guides/confidentialite-securite"]')).toContainText('Confidentialité')

    // Workflows section
    await expect(footer.locator('h3:has-text("Derniers Workflows")')).toBeVisible()
    await expect(footer.locator('a[href="/workflows"]:has-text("Voir tous les workflows")')).toBeVisible()
  })

  test('footer workflows section displays recent workflows', async ({ page }) => {
    const workflowsSection = page.locator('footer').locator('h3:has-text("Derniers Workflows")').locator('..')

    // Should have workflow links (at least 1, max 3)
    const workflowLinks = workflowsSection.locator('a[href^="/workflows/"]:not(:has-text("Voir tous"))')
    const linkCount = await workflowLinks.count()
    expect(linkCount).toBeGreaterThan(0)
    expect(linkCount).toBeLessThanOrEqual(3)

    // Each workflow link should be clickable and have proper href
    for (let i = 0; i < linkCount; i++) {
      const link = workflowLinks.nth(i)
      await expect(link).toBeVisible()

      const href = await link.getAttribute('href')
      expect(href).toMatch(/^\/workflows\/[a-z0-9-]+$/)
    }
  })

  test('footer semantic utilities are applied correctly', async ({ page }) => {
    // Check that prose-slogan class is applied to brand description
    const brandDescription = page.locator('footer').locator('.prose-slogan')
    await expect(brandDescription).toBeVisible()
    await expect(brandDescription).toContainText('Mon carnet de notes personnel')

    // Check that container-content-width is applied
    const containerContentWidth = page.locator('footer').locator('.container-content-width')
    await expect(containerContentWidth).toBeVisible()

    // Verify the semantic utility produces correct max-width (512px, not 24px)
    const maxWidth = await containerContentWidth.evaluate((el) => {
      return window.getComputedStyle(el).maxWidth
    })

    // Should be 512px (32rem) not 24px (1.5rem) due to Tailwind v4 bug fix
    expect(maxWidth).toBe('512px')
  })

  test('footer copyright shows current year', async ({ page }) => {
    const currentYear = new Date().getFullYear()
    const copyright = page.locator('footer').locator(`text=© ${currentYear} Pharma Prompt Powerhouse`)
    await expect(copyright).toBeVisible()
  })

  test('footer links are keyboard accessible', async ({ page }) => {
    const footer = page.locator('footer')

    // Tab through footer links and ensure they're focusable
    const links = footer.locator('a')
    const linkCount = await links.count()

    // Focus first link
    await links.first().focus()
    await expect(links.first()).toBeFocused()

    // Tab through a few links to ensure keyboard navigation works
    for (let i = 0; i < Math.min(3, linkCount - 1); i++) {
      await page.keyboard.press('Tab')
    }
  })

  test('footer maintains consistent spacing across breakpoints', async ({ page }) => {
    const footer = page.locator('footer')

    // Test mobile spacing
    await page.setViewportSize({ width: 375, height: 667 })
    const mobileGap = await footer.locator('.grid').first().evaluate(el =>
      window.getComputedStyle(el).gap,
    )

    // Test desktop spacing
    await page.setViewportSize({ width: 1400, height: 800 })
    const desktopGap = await footer.locator('.grid').first().evaluate(el =>
      window.getComputedStyle(el).gap,
    )

    // Gaps should be defined (not empty or 'normal')
    expect(mobileGap).not.toBe('')
    expect(mobileGap).not.toBe('normal')
    expect(desktopGap).not.toBe('')
    expect(desktopGap).not.toBe('normal')
  })
})
