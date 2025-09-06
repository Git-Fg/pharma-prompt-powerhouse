import { expect, test } from '@playwright/test'

test.describe('Application E2E Tests', () => {
  test('homepage loads and displays key content', async ({ page }) => {
    await page.goto('/')

    // Check page loads
    await expect(page).toHaveTitle(/Pharma Prompt Powerhouse/)

    // Check main heading - it's split across lines with "Bienvenue sur" and "Pharma Prompt Powerhouse"
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Pharma Prompt Powerhouse')

    // Check workflows section exists (replaces objectifs)
    await expect(page.getByRole('heading', { name: /Workflows/ })).toBeVisible()

    // Check navigation is working using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    const arsenalLink = page.locator('[data-testid="nav-link-l-arsenal-ia"]')
    await expect(arsenalLink).toBeVisible()
  })

  test('concepts page navigation and content', async ({ page }) => {
    await page.goto('/concepts')

    // Check concepts page loads - correct title is "Hub de Concepts"
    await expect(page.getByRole('heading', { name: 'Hub de Concepts' })).toBeVisible()

    // Check concepts are displayed using test ID for navigation
    const conceptsLink = page.locator('[data-testid="nav-link-concepts"]')
    await expect(conceptsLink).toBeVisible()

    // Check page header using test ID
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Test concept navigation - keep existing link navigation as it's content-specific
    await expect(page.getByRole('link', { name: /Context Engineering/ })).toBeVisible()
    await page.getByRole('link', { name: /Context Engineering/ }).click()
    await expect(page).toHaveURL(/\/concepts\/context-engineering/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Context Engineering')
  })

  test('guides page functionality', async ({ page }) => {
    await page.goto('/guides')

    // Check guides page loads
    await expect(page.getByRole('heading', { name: 'Mes Fiches & Méthodes' })).toBeVisible()

    // Check navigation using test IDs
    const guidesLink = page.locator('[data-testid="nav-link-guides"]')
    await expect(guidesLink).toBeVisible()

    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Check search functionality exists
    await expect(page.getByPlaceholder(/Rechercher/)).toBeVisible()

    // Check at least one guide is visible
    await expect(page.getByRole('button', { name: /Lire le guide/ })).toBeVisible()
  })

  test('workflows page displays correctly', async ({ page }) => {
    await page.goto('/workflows')

    // Check workflows page loads - updated to match actual title
    await expect(page.getByRole('heading', { name: /Workflows Stratégiques/ })).toBeVisible()

    // Check navigation using test IDs
    const workflowsLink = page.locator('[data-testid="nav-link-workflows-stratégiques"]')
    await expect(workflowsLink).toBeVisible()

    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Check workflow cards are visible
    await expect(page.locator('a[href*="/workflows/"]').first()).toBeVisible()
  })

  test('arsenal IA page loads', async ({ page }) => {
    await page.goto('/l-arsenal-ia')

    // Check page loads - correct title is "L'Arsenal IA 2025"
    await expect(page.getByRole('heading', { name: 'L\'Arsenal IA 2025' })).toBeVisible()

    // Check navigation using test IDs
    const arsenalLink = page.locator('[data-testid="nav-link-l-arsenal-ia"]')
    await expect(arsenalLink).toBeVisible()

    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()

    // Check comparative table exists
    await expect(page.getByRole('heading', { name: /Tableau Comparatif/ })).toBeVisible()

    // Check tool cards/rows exist
    await expect(page.getByText('ChatGPT')).toBeVisible()
  })

  test('par où commencer page loads', async ({ page }) => {
    await page.goto('/par-ou-commencer')

    // Check page loads
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // Check navigation using test IDs
    const header = page.locator('[data-testid="layout-header"]')
    await expect(header).toBeVisible()
  })

  test('no console errors on main pages', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    // Test main pages for console errors - updated routes
    const pagesToTest = ['/', '/concepts', '/guides', '/workflows', '/l-arsenal-ia', '/par-ou-commencer']

    for (const path of pagesToTest) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
    }

    // Filter out known development warnings that are not actual errors
    const actualErrors = errors.filter(error =>
      !error.includes('Download the React DevTools')
      && !error.includes('[Fast Refresh]')
      && !error.includes('metadataBase property'),
    )

    expect(actualErrors).toHaveLength(0)
  })
})
