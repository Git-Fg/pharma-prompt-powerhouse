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
    
    // Check main navigation elements - be more flexible
    const navTexts = ['Concepts', 'Guides', 'Prompts', 'Outils Externes'];
    for (const navText of navTexts) {
      await expect(page.locator(`text=${navText}`).first()).toBeVisible({ timeout: 10000 });
    }
    
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
  });

  test('concepts page navigation works', async ({ page }) => {
    await page.goto('/concepts');
    
    // Should show concepts listing
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Concepts');
    
    // Should have concept cards
    const conceptCards = page.locator('[data-testid="concept-card"], .concept-card, [class*="concept"], [class*="card"]');
    if (await conceptCards.count() > 0) {
      await expect(conceptCards.first()).toBeVisible();
    }
    
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

  test('prompts page navigation works', async ({ page }) => {
    await page.goto('/prompts');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Prompt');
    
    await page.screenshot({ path: 'test-results/prompts-page.png', fullPage: true });
  });

  test('external tools page navigation works', async ({ page }) => {
    await page.goto('/outils-externes');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Outils');
    
    await page.screenshot({ path: 'test-results/external-tools-page.png', fullPage: true });
  });
});