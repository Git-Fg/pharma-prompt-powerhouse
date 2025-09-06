import { expect, test } from '@playwright/test'

test.describe('Footer Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('footer displays 12-column layout on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1400, height: 800 })

    // Wait for footer to be visible using data test ID
    const footer = page.locator('[data-testid="layout-footer"]')
    await expect(footer).toBeVisible()

    // Check desktop footer is visible
    const desktopFooter = page.locator('[data-testid="desktop-footer"]')
    await expect(desktopFooter).toBeVisible()

    // Check mobile footer is hidden
    const mobileFooter = page.locator('[data-testid="mobile-footer"]')
    await expect(mobileFooter).toBeHidden()

    // Check grid layout
    const grid = footer.locator('.grid').first()
    await expect(grid).toHaveClass(/md:grid-cols-12/)

    // Verify brand section is present
    const brandSection = page.locator('[data-testid="footer-brand-section"]')
    await expect(brandSection).toBeVisible()

    // Verify navigation sections are present
    const navSection = page.locator('[data-testid="footer-navigation-section"]')
    const legalSection = page.locator('[data-testid="footer-legal-section"]')
    const workflowsSection = page.locator('[data-testid="footer-workflows-section"]')

    await expect(navSection).toBeVisible()
    await expect(legalSection).toBeVisible()
    await expect(workflowsSection).toBeVisible()

    // Check grid template columns (should be 12 equal columns at xl breakpoint)
    const gridStyles = await grid.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        gridTemplateColumns: computed.gridTemplateColumns,
        gap: computed.gap,
      }
    })

    // Should have 12 columns at xl breakpoint
    expect(gridStyles.gridTemplateColumns.split(' ')).toHaveLength(12)
  })

  test('footer displays 12-column layout on tablet', async ({ page }) => {
    // Set tablet viewport (below xl breakpoint but above mobile)
    await page.setViewportSize({ width: 768, height: 1024 })

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    const grid = footer.locator('.grid').first()
    await expect(grid).toHaveClass(/md:grid-cols-12/)

    // Check grid template columns (should be 12 columns at md breakpoint)
    const gridStyles = await grid.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return computed.gridTemplateColumns
    })

    // Should have 12 columns at md breakpoint
    expect(gridStyles.split(' ')).toHaveLength(12)
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

  test('footer links display in 2-column layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Find the links wrapper (should have grid-cols-2 on mobile)
    const linksWrapper = footer.locator('.xl\\:col-span-7').first()
    await expect(linksWrapper).toBeVisible()
    await expect(linksWrapper).toHaveClass(/grid-cols-2/)

    // Verify the wrapper creates 2 columns for links on mobile
    const wrapperStyles = await linksWrapper.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns
    })

    // Should have 2 columns for links on mobile
    expect(wrapperStyles.split(' ')).toHaveLength(2)
  })

  test('brand section spans 5 columns on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 800 })

    const brandSection = page.locator('footer').locator('.xl\\:col-span-5').first()
    await expect(brandSection).toBeVisible()
    await expect(brandSection).toHaveClass(/xl:col-span-5/)
  })

  test('all footer sections have proper content', async ({ page }) => {
    const footer = page.locator('[data-testid="layout-footer"]')

    // Brand section - use data test ID
    const brandSection = page.locator('[data-testid="footer-brand-section"]')
    await expect(brandSection).toBeVisible()
    await expect(brandSection.locator('[data-testid="nav-logo"]')).toBeVisible()
    
    const brandDescription = page.locator('[data-testid="footer-brand-description"]')
    await expect(brandDescription).toBeVisible()
    await expect(brandDescription).toContainText('Mon carnet de notes personnel')

    // Navigation section
    const navSection = page.locator('[data-testid="footer-navigation-section"]')
    await expect(navSection).toBeVisible()
    await expect(navSection.locator('h3')).toContainText('Navigation')
    
    // Test navigation links with data test IDs
    await expect(footer.locator('[data-testid="nav-link-Accueil"]')).toBeVisible()
    await expect(footer.locator('[data-testid="nav-link-Par où commencer"]')).toBeVisible()
    await expect(footer.locator('[data-testid="nav-link-Workflows Stratégiques"]').nth(1)).toBeVisible() // Footer link
    await expect(footer.locator('[data-testid="nav-link-L\'Arsenal IA 2025"]')).toBeVisible()
    await expect(footer.locator('[data-testid="nav-link-Hub de Concepts"]').nth(1)).toBeVisible() // Footer link

    // Legal section
    const legalSection = page.locator('[data-testid="footer-legal-section"]')
    await expect(legalSection).toBeVisible()
    await expect(legalSection.locator('h3')).toContainText('Sécurité & Légal')
    await expect(legalSection.locator('[data-testid="nav-link-Confidentialité"]')).toBeVisible()

    // Workflows section
    const workflowsSection = page.locator('[data-testid="footer-workflows-section"]')
    await expect(workflowsSection).toBeVisible()
    await expect(workflowsSection.locator('h3')).toContainText('Workflows')
    await expect(workflowsSection.locator('[data-testid="nav-link-Voir tous les workflows"]')).toBeVisible()
  })

  test('footer workflows section displays recent workflows', async ({ page }) => {
    const workflowsSection = page.locator('[data-testid="footer-workflows-section"]')

    // Should have workflow links (at least 1, max 3)
    const workflowLinks = workflowsSection.locator('a[href^="/workflows/"]:not([data-testid*="Voir tous"])')
    const linkCount = await workflowLinks.count()
    expect(linkCount).toBeGreaterThan(0)
    expect(linkCount).toBeLessThanOrEqual(3)

    // Each workflow link should be clickable and have proper href
    for (let i = 0; i < linkCount; i++) {
      const link = workflowLinks.nth(i)
      await expect(link).toBeVisible()

      const href = await link.getAttribute('href')
      expect(href).toMatch(/^\/workflows\/[a-z0-9-]+$/)

      // Check that workflow links have data test IDs
      const testId = await link.getAttribute('data-testid')
      expect(testId).toMatch(/^nav-link-/)
    }
  })

  test('footer semantic utilities are applied correctly', async ({ page }) => {
    // Check that prose-slogan class is applied to brand description
    const brandDescription = page.locator('[data-testid="footer-brand-description"]')
    await expect(brandDescription).toBeVisible()
    await expect(brandDescription).toContainText('Mon carnet de notes personnel')
    await expect(brandDescription).toHaveClass(/prose-slogan/)

    // Check that semantic utility width classes are applied to brand text container
    const desktopWidthContainer = page.locator('[data-testid="footer-brand-section"]').locator('.dialog-content-width')
    const mobileWidthContainer = page.locator('[data-testid="mobile-footer-description"]')

    // Check that either desktop or mobile width class is present (depending on viewport)
    const hasDesktopWidth = await desktopWidthContainer.count() > 0
    const hasMobileWidth = await mobileWidthContainer.count() > 0

    expect(hasDesktopWidth || hasMobileWidth).toBe(true)
  })

  test('footer copyright shows current year', async ({ page }) => {
    const currentYear = new Date().getFullYear()
    const copyright = page.locator('[data-testid="footer-copyright"]')
    await expect(copyright).toBeVisible()
    await expect(copyright).toContainText(`© ${currentYear} Pharma Prompt Powerhouse`)
  })

  test('footer links are keyboard accessible', async ({ page }) => {
    const footer = page.locator('[data-testid="layout-footer"]')

    // Tab through footer links and ensure they're focusable
    const links = footer.locator('a[data-testid^="nav-link-"]')
    const linkCount = await links.count()

    // Focus first link
    await links.first().focus()
    await expect(links.first()).toBeFocused()

    // Tab through a few links to ensure keyboard navigation works
    for (let i = 0; i < Math.min(3, linkCount - 1); i++) {
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toHaveAttribute('data-testid', /^nav-link-/)
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
