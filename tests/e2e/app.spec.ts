import { test, expect } from '@playwright/test';

test.describe('Application E2E Tests', () => {

  test('homepage loads and displays key content', async ({ page }) => {
    await page.goto('/');
    
    // Check page loads
    await expect(page).toHaveTitle(/Pharma Prompt Powerhouse/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Pharma Prompt Powerhouse');
    
    // Check workflows section exists (replaces objectifs)
    await expect(page.locator('text=Workflows')).toBeVisible();
    
    // Check navigation is working
    await expect(page.locator('text=Arsenal IA')).toBeVisible();
  });

  test('concepts page navigation and content', async ({ page }) => {
    await page.goto('/concepts');
    
    // Check concepts page loads
    await expect(page.locator('h1')).toContainText('Hub de Concepts');
    
    // Check concepts are displayed
    await expect(page.locator('text=Context Engineering')).toBeVisible();
    
    // Test concept navigation
    await page.click('text=Context Engineering');
    await expect(page).toHaveURL(/\/concepts\/context-engineering/);
    await expect(page.locator('h1')).toContainText('Context Engineering');
  });

  test('guides page functionality', async ({ page }) => {
    await page.goto('/guides');
    
    // Check guides page loads
    await expect(page.locator('h1')).toContainText('Mes Fiches & Méthodes');
    
    // Check search functionality exists
    await expect(page.locator('input[placeholder*="Rechercher"]')).toBeVisible();
    
    // Check at least one guide is visible
    await expect(page.locator('text=Commencer')).toBeVisible();
  });

  test('workflows page displays correctly', async ({ page }) => {
    await page.goto('/workflows');
    
    // Check workflows page loads
    await expect(page.locator('h1')).toContainText('Workflows');
    
    // Check workflow cards are visible
    await expect(page.locator('a[href*="/workflows/"]')).toBeVisible();
  });

  test('arsenal IA page loads', async ({ page }) => {
    await page.goto('/l-arsenal-ia');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Arsenal IA');
    
    // Check comparative table exists
    await expect(page.locator('text=Tableau Comparatif')).toBeVisible();
    
    // Check tool cards/rows exist
    await expect(page.locator('text=ChatGPT')).toBeVisible();
  });

  test('par où commencer page loads', async ({ page }) => {
    await page.goto('/par-ou-commencer');
    
    // Check page loads
    await expect(page.locator('h1')).toBeVisible();
  });

  test('no console errors on main pages', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Test main pages for console errors - updated routes
    const pagesToTest = ['/', '/concepts', '/guides', '/workflows', '/l-arsenal-ia', '/par-ou-commencer'];
    
    for (const path of pagesToTest) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }
    
    // Filter out known development warnings that are not actual errors
    const actualErrors = errors.filter(error => 
      !error.includes('Download the React DevTools') &&
      !error.includes('[Fast Refresh]') &&
      !error.includes('metadataBase property')
    );
    
    expect(actualErrors).toHaveLength(0);
  });

});