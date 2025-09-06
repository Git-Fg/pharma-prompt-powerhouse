import { expect, test } from '@playwright/test'

test.describe('Data Test ID Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Layout Components', () => {
    test('header has correct data test IDs', async ({ page }) => {
      const header = page.locator('[data-testid="layout-header"]')
      await expect(header).toBeVisible()

      // Test navigation links
      const logo = page.locator('[data-testid="nav-logo"]')
      await expect(logo).toBeVisible()
      await expect(logo).toHaveAttribute('href', '/')

      // Test theme toggle
      const themeToggle = page.locator('[data-testid="nav-theme-toggle"]')
      await expect(themeToggle).toBeVisible()
      await expect(themeToggle).toHaveAttribute('type', 'button')
    })

    test('footer has correct data test IDs', async ({ page }) => {
      const footer = page.locator('[data-testid="layout-footer"]')
      await expect(footer).toBeVisible()

      // Test desktop footer
      const desktopFooter = page.locator('[data-testid="desktop-footer"]')
      await expect(desktopFooter).toBeVisible()

      // Test mobile footer (hidden on desktop)
      const mobileFooter = page.locator('[data-testid="mobile-footer"]')
      await expect(mobileFooter).toBeHidden()

      // Test brand section
      const brandSection = page.locator('[data-testid="footer-brand-section"]')
      await expect(brandSection).toBeVisible()

      // Test navigation sections
      const navSection = page.locator('[data-testid="footer-navigation-section"]')
      const legalSection = page.locator('[data-testid="footer-legal-section"]')
      const workflowsSection = page.locator('[data-testid="footer-workflows-section"]')

      await expect(navSection).toBeVisible()
      await expect(legalSection).toBeVisible()
      await expect(workflowsSection).toBeVisible()

      // Test copyright
      const copyright = page.locator('[data-testid="footer-copyright"]')
      await expect(copyright).toBeVisible()
      await expect(copyright).toContainText(new Date().getFullYear().toString())
    })

    test('footer responsive behavior with data test IDs', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      const desktopFooter = page.locator('[data-testid="desktop-footer"]')
      const mobileFooter = page.locator('[data-testid="mobile-footer"]')

      await expect(desktopFooter).toBeHidden()
      await expect(mobileFooter).toBeVisible()

      // Test mobile brand section
      const mobileBrand = page.locator('[data-testid="mobile-footer-brand"]')
      await expect(mobileBrand).toBeVisible()

      const mobileDescription = page.locator('[data-testid="mobile-footer-description"]')
      await expect(mobileDescription).toBeVisible()
    })
  })

  test.describe('Navigation Links', () => {
    test('navigation links have correct data test IDs', async ({ page }) => {
      // Test main navigation links
      const workflowsLink = page.locator('[data-testid="nav-link-Workflows Stratégiques"]')
      const conceptsLink = page.locator('[data-testid="nav-link-Hub de Concepts"]')
      const guidesLink = page.locator('[data-testid="nav-link-Mes Fiches & Méthodes"]')

      await expect(workflowsLink).toBeVisible()
      await expect(conceptsLink).toBeVisible()
      await expect(guidesLink).toBeVisible()

      // Test link hrefs
      await expect(workflowsLink).toHaveAttribute('href', '/workflows')
      await expect(conceptsLink).toHaveAttribute('href', '/concepts')
      await expect(guidesLink).toHaveAttribute('href', '/guides')
    })

    test('footer navigation links have correct data test IDs', async ({ page }) => {
      // Scroll to footer to ensure it's visible
      await page.locator('[data-testid="layout-footer"]').scrollIntoViewIfNeeded()

      // Test footer navigation links
      const footerWorkflowsLink = page.locator('[data-testid="nav-link-Workflows Stratégiques"]').nth(1) // Second occurrence in footer
      const footerConceptsLink = page.locator('[data-testid="nav-link-Hub de Concepts"]').nth(1)
      const footerGuidesLink = page.locator('[data-testid="nav-link-Mes Fiches & Méthodes"]').nth(1)

      await expect(footerWorkflowsLink).toBeVisible()
      await expect(footerConceptsLink).toBeVisible()
      await expect(footerGuidesLink).toBeVisible()
    })
  })

  test.describe('Collection Pages', () => {
    const collectionPages = [
      { url: '/workflows', title: 'Workflows Stratégiques' },
      { url: '/concepts', title: 'Hub de Concepts' },
      { url: '/guides', title: 'Mes Fiches & Méthodes' },
    ]

    collectionPages.forEach(({ url, title }) => {
      test(`collection page ${url} has data test IDs for filtering`, async ({ page }) => {
        await page.goto(url)

        // Test search input
        const searchInput = page.locator('[data-testid="form-input-search"]')
        await expect(searchInput).toBeVisible()

        // Test filters section
        const filtersSection = page.locator('[data-testid="content-section-filters"]')
        await expect(filtersSection).toBeVisible()

        // Test content grid
        const contentGrid = page.locator('[data-testid="content-section-grid"]')
        await expect(contentGrid).toBeVisible()

        // Test category filter if present
        const categorySelect = page.locator('[data-testid="form-select-category"]')
        if (await categorySelect.count() > 0) {
          await expect(categorySelect).toBeVisible()
        }

        // Test difficulty filter if present
        const difficultySelect = page.locator('[data-testid="form-select-difficulty"]')
        if (await difficultySelect.count() > 0) {
          await expect(difficultySelect).toBeVisible()
        }
      })

      test(`collection page ${url} cards have data test IDs`, async ({ page }) => {
        await page.goto(url)

        // Wait for content to load
        await page.waitForSelector('[data-testid^="card-"]')

        // Test that cards have data test IDs
        const cards = page.locator('[data-testid^="card-"]')
        const cardCount = await cards.count()
        expect(cardCount).toBeGreaterThan(0)

        // Test first card has proper data test ID
        if (cardCount > 0) {
          const firstCard = cards.first()
          const testId = await firstCard.getAttribute('data-testid')
          expect(testId).toMatch(/^card-(concept|guide|workflow|tool)-/)
        }
      })
    })
  })

  test.describe('Interactive Elements', () => {
    test('theme toggle works with data test ID', async ({ page }) => {
      const themeToggle = page.locator('[data-testid="nav-theme-toggle"]')
      await expect(themeToggle).toBeVisible()

      // Click theme toggle
      await themeToggle.click()

      // Verify the theme changed (check for dark mode class)
      const html = page.locator('html')
      await expect(html).toHaveClass(/dark/)

      // Click again to toggle back
      await themeToggle.click()
      await expect(html).not.toHaveClass(/dark/)
    })

    test('search input is interactive with data test ID', async ({ page }) => {
      await page.goto('/concepts')

      const searchInput = page.locator('[data-testid="form-input-search"] input')
      await expect(searchInput).toBeVisible()

      // Type in search
      await searchInput.fill('test')

      // Verify the input has the typed value
      await expect(searchInput).toHaveValue('test')

      // Clear the search
      await searchInput.clear()
      await expect(searchInput).toHaveValue('')
    })

    test('filter buttons work with data test IDs', async ({ page }) => {
      await page.goto('/workflows')

      // Test category filter
      const categorySelect = page.locator('[data-testid="form-select-category"]')
      if (await categorySelect.count() > 0) {
        await expect(categorySelect).toBeVisible()
        await categorySelect.click()

        // Select a category option
        const option = page.locator('[data-testid="form-select-category"] [role="option"]').first()
        if (await option.count() > 0) {
          await option.click()
        }
      }

      // Test difficulty filter
      const difficultySelect = page.locator('[data-testid="form-select-difficulty"]')
      if (await difficultySelect.count() > 0) {
        await expect(difficultySelect).toBeVisible()
        await difficultySelect.click()

        // Select a difficulty option
        const option = page.locator('[data-testid="form-select-difficulty"] [role="option"]').first()
        if (await option.count() > 0) {
          await option.click()
        }
      }
    })
  })

  test.describe('Empty State', () => {
    test('empty state has correct data test IDs', async ({ page }) => {
      await page.goto('/concepts')

      const searchInput = page.locator('[data-testid="form-input-search"] input')
      await expect(searchInput).toBeVisible()

      // Search for something that doesn't exist
      await searchInput.fill('nonexistentterm123')

      // Wait for empty state
      await page.waitForSelector('[data-testid="content-section-empty-state"]')

      const emptyState = page.locator('[data-testid="content-section-empty-state"]')
      await expect(emptyState).toBeVisible()

      // Test reset button
      const resetButton = page.locator('[data-testid="button-reset-filters"]')
      await expect(resetButton).toBeVisible()

      // Click reset button
      await resetButton.click()

      // Verify empty state is gone
      await expect(emptyState).toBeHidden()
    })
  })

  test.describe('Accessibility', () => {
    test('data test IDs do not interfere with accessibility', async ({ page }) => {
      const header = page.locator('[data-testid="layout-header"]')
      const footer = page.locator('[data-testid="layout-footer"]')

      // Test that elements with data test IDs are still accessible
      await expect(header).toBeVisible()
      await expect(footer).toBeVisible()

      // Test keyboard navigation
      const logo = page.locator('[data-testid="nav-logo"]')
      await logo.focus()
      await expect(logo).toBeFocused()

      // Test tab navigation through interactive elements
      await page.keyboard.press('Tab')
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })
  })
})