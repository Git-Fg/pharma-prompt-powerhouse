import { test, expect } from '@playwright/test';

test.describe('Content Accessibility and Performance', () => {
  test('key pages are accessible', async ({ page }) => {
    const pagesToTest = [
      '/',
      '/concepts',
      '/guides', 
      '/prompts',
      '/outils-externes',
      '/concepts/hallucination-effet-indesirable',
      '/guides/confidentialite-securite',
    ];

    for (const url of pagesToTest) {
      await page.goto(url);
      
      // Basic accessibility checks
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for proper heading structure
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      await expect(headings.first()).toBeVisible();
      
      // Ensure no obvious accessibility issues with interactive elements
      const buttons = page.locator('button, [role="button"]');
      if (await buttons.count() > 0) {
        // All buttons should be visible or properly hidden
        for (let i = 0; i < await buttons.count(); i++) {
          const button = buttons.nth(i);
          if (await button.isVisible()) {
            await expect(button).toBeEnabled();
          }
        }
      }
    }
  });

  test('pages load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('all collection pages render content', async ({ page }) => {
    // Test that each collection page shows actual content
    
    // Concepts page
    await page.goto('/concepts');
    const conceptLinks = page.locator('a[href*="/concepts/"]');
    const conceptCount = await conceptLinks.count();
    expect(conceptCount).toBeGreaterThan(5);
    
    // Guides page
    await page.goto('/guides');
    const guideLinks = page.locator('a[href*="/guides/"]');
    const guideCount = await guideLinks.count();
    expect(guideCount).toBeGreaterThan(10);
    
    // Prompts page
    await page.goto('/prompts');
    const promptLinks = page.locator('a[href*="/prompts/"]');
    const promptCount = await promptLinks.count();
    expect(promptCount).toBeGreaterThan(3);
    
    // External tools page
    await page.goto('/outils-externes');
    const toolLinks = page.locator('a[href*="/outils-externes/"]');
    const toolCount = await toolLinks.count();
    expect(toolCount).toBeGreaterThan(5);
  });

  test('responsive design works', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    
    await page.screenshot({ path: 'test-results/responsive-desktop.png', fullPage: true });
  });

  test('search functionality works if present', async ({ page }) => {
    await page.goto('/');
    
    // Look for search elements
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[placeholder*="recherche"]');
    
    if (await searchInput.count() > 0) {
      await searchInput.first().fill('prompting');
      await page.keyboard.press('Enter');
      
      // Should show search results or filtered content
      await page.waitForTimeout(1000);
      
      await page.screenshot({ path: 'test-results/search-results.png', fullPage: true });
    }
  });

  test('navigation menu works on all devices', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1200, height: 800 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      // Look for navigation elements (could be hamburger menu on mobile)
      const navElements = page.locator('nav, [role="navigation"], .navigation, .nav, button[aria-label*="menu"], button[aria-label*="Menu"]');
      
      if (await navElements.count() > 0) {
        const nav = navElements.first();
        await expect(nav).toBeVisible();
        
        // If there's a mobile menu button, try clicking it
        const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], .menu-button, [class*="menu"]');
        if (await menuButton.count() > 0 && viewport.width < 768) {
          await menuButton.first().click();
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('no console errors on key pages', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const pagesToTest = [
      '/',
      '/concepts/hallucination-effet-indesirable',
      '/guides/confidentialite-securite',
      '/prompts/generateur-mnemoniques-analogies',
      '/outils-externes/google-ai-studio'
    ];

    for (const url of pagesToTest) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
    }

    // Filter out common non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon.ico') &&
      !error.includes('analytics') &&
      !error.includes('gtag') &&
      !error.includes('Third-party cookie')
    );

    if (criticalErrors.length > 0) {
      console.warn('Console errors found:', criticalErrors);
    }
    
    expect(criticalErrors.length).toBe(0);
  });
});