import { test, expect } from '@playwright/test';

test.describe('Core Site Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check main title is present
    await expect(page).toHaveTitle(/Pharmainfo/i);
    
    // Check main navigation elements
    await expect(page.locator('text=Concepts')).toBeVisible();
    await expect(page.locator('text=Guides')).toBeVisible();
    await expect(page.locator('text=Prompts')).toBeVisible();
    await expect(page.locator('text=Outils Externes')).toBeVisible();
    
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
  });

  test('concepts page navigation works', async ({ page }) => {
    await page.goto('/concepts');
    
    // Should show concepts listing
    await expect(page.locator('h1')).toContainText('Concepts');
    
    // Should have concept cards
    const conceptCards = page.locator('[data-testid="concept-card"], .concept-card, [class*="concept"], [class*="card"]').first();
    await expect(conceptCards).toBeVisible();
    
    await page.screenshot({ path: 'test-results/concepts-page.png', fullPage: true });
  });

  test('guides page navigation works', async ({ page }) => {
    await page.goto('/guides');
    
    await expect(page.locator('h1')).toContainText('Guides');
    
    // Should have guide listings
    const guideElements = page.locator('[data-testid="guide"], .guide, [class*="guide"]').first();
    await expect(guideElements).toBeVisible();
    
    await page.screenshot({ path: 'test-results/guides-page.png', fullPage: true });
  });

  test('prompts page navigation works', async ({ page }) => {
    await page.goto('/prompts');
    
    await expect(page.locator('h1')).toContainText('Prompt');
    
    await page.screenshot({ path: 'test-results/prompts-page.png', fullPage: true });
  });

  test('external tools page navigation works', async ({ page }) => {
    await page.goto('/outils-externes');
    
    await expect(page.locator('h1')).toContainText('Outils');
    
    await page.screenshot({ path: 'test-results/external-tools-page.png', fullPage: true });
  });
});