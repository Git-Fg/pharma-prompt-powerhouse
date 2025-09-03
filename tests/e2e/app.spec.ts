import { test, expect } from '@playwright/test';

test.describe('Application E2E Tests', () => {

  test('homepage loads and displays key content', async ({ page }) => {
    await page.goto('/');
    
    // Check page loads
    await expect(page).toHaveTitle(/Pharma Prompt Powerhouse/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Pharma Prompt Powerhouse');
    
    // Check objectifs section exists
    await expect(page.locator('text=Objectifs d\'Apprentissage')).toBeVisible();
    
    // Check navigation is working
    await expect(page.locator('text=Ressources')).toBeVisible();
    await expect(page.locator('text=Outils')).toBeVisible();
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

  test('prompts page displays correctly', async ({ page }) => {
    await page.goto('/prompts');
    
    // Check prompts page loads
    await expect(page.locator('h1')).toContainText('La Banque de Prompts');
    
    // Check search functionality
    await expect(page.locator('input[placeholder*="Rechercher"]')).toBeVisible();
    
    // Check copy functionality exists
    await expect(page.locator('button:has-text("Copier")')).toBeVisible();
  });

  test('external tools page loads', async ({ page }) => {
    await page.goto('/outils-externes');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Outils Externes');
    
    // Check tool categories exist
    await expect(page.locator('h2')).toBeVisible();
  });

  test('workflows page functionality', async ({ page }) => {
    await page.goto('/workflows');
    
    // Check workflows page loads  
    await expect(page.locator('h1')).toContainText('Workflows & Guides Pratiques');
    
    // Check tab functionality
    await expect(page.locator('text=Workflows')).toBeVisible();
    await expect(page.locator('text=Guides Pratiques')).toBeVisible();
  });

  test('no console errors on main pages', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Test main pages for console errors
    const pagesToTest = ['/', '/concepts', '/guides', '/prompts', '/workflows', '/outils-externes'];
    
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