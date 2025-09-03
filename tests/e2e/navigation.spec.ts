import { test, expect } from '@playwright/test';

test.describe('Core Site Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    // Increase timeout for homepage
    test.setTimeout(10000);
    
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');
    
    // Check main title is present - use the actual title
    await expect(page).toHaveTitle(/Pharma Prompt Powerhouse/i);
    
    // Check main navigation elements - updated for new structure
    const navElements = ['Par où commencer ?', 'Workflows Stratégiques', 'L\'Arsenal IA', 'Concepts'];
    for (const navItem of navElements) {
      // Use more flexible text matching
      await expect(page.locator(`text=${navItem}`).first()).toBeVisible({ timeout: 10000 });
    }
    
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
  });

  test('concepts page navigation works', async ({ page }) => {
    await page.goto('/concepts');
    
    // Should show concepts listing
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Concepts');
    
    // Should have concept cards using data-testid
    const conceptCards = page.locator('[data-testid="concept-card"]');
    await expect(conceptCards.first()).toBeVisible();
    
    await page.screenshot({ path: 'test-results/concepts-page.png', fullPage: true });
  });

  test('guides page navigation works', async ({ page }) => {
    await page.goto('/guides');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // The actual title is "Mes Fiches & Méthodes" not "Guides"
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Mes Fiches');
    
    // Should have guide listings - check for actual content
    const guideElements = page.locator('a[href*="/guides/"]');
    if (await guideElements.count() > 0) {
      await expect(guideElements.first()).toBeVisible();
    } else {
      // If no guide links, check for guide content
      await expect(page.locator('text=guide, text=Guide').first()).toBeVisible();
    }
    
    await page.screenshot({ path: 'test-results/guides-page.png', fullPage: true });
  });

  test('workflows page navigation works', async ({ page }) => {
    await page.goto('/workflows');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Workflow');
    
    await page.screenshot({ path: 'test-results/workflows-page.png', fullPage: true });
  });

  test('arsenal IA page navigation works', async ({ page }) => {
    await page.goto('/l-arsenal-ia');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Arsenal IA');
    
    await page.screenshot({ path: 'test-results/arsenal-ia-page.png', fullPage: true });
  });

  test('par où commencer page navigation works', async ({ page }) => {
    await page.goto('/par-ou-commencer');
    
    // This page should exist and load
    await expect(page.locator('main h1, article h1, .content h1').first()).toBeVisible();
    
    await page.screenshot({ path: 'test-results/par-ou-commencer-page.png', fullPage: true });
  });
});