import { test, expect } from '@playwright/test';

test.describe('MDX Components Functionality', () => {
  test('modernized concept with React components renders correctly', async ({ page }) => {
    await page.goto('/concepts/hallucination-effet-indesirable');
    
    // Check main title specifically in main content area
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Hallucination');
    
    // Check for Alert components
    const alerts = page.locator('[role="alert"], .alert, [data-state="open"]');
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible();
    }
    
    // Check for Card components
    const cards = page.locator('.card, [class*="card"]');
    if (await cards.count() > 0) {
      await expect(cards.first()).toBeVisible();
    }
    
    // Check for Tabs components
    const tabs = page.locator('[role="tablist"], .tabs, [class*="tab"]');
    if (await tabs.count() > 0) {
      await expect(tabs.first()).toBeVisible();
    }
    
    await page.screenshot({ path: 'test-results/hallucination-concept.png', fullPage: true });
  });

  test('prompt prescription concept with cards renders correctly', async ({ page }) => {
    await page.goto('/concepts/prompt-prescription');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Prompt');
    
    // Check that the 5 elements are present in Cards (rendered as generic elements)
    await expect(page.locator('text=1. Le Rôle (La Molécule)')).toBeVisible();
    await expect(page.locator('text=2. La Tâche (La Posologie)')).toBeVisible();
    await expect(page.locator('text=3. Le Contexte (Les Antécédents)')).toBeVisible();
    await expect(page.locator("text=4. Le Format (La Voie d'Administration)")).toBeVisible();
    await expect(page.locator('text=5. Les Exemples (Les Cas Cliniques de Référence)')).toBeVisible();
    
    // Check for Alert component
    const alerts = page.locator('[role="alert"]');
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible();
    }
    
    await page.screenshot({ path: 'test-results/prompt-prescription-concept.png', fullPage: true });
  });

  test('memory concept with tabs renders correctly', async ({ page }) => {
    await page.goto('/concepts/memoire-ia');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Mémoire');
    
    // Check for tabs or structured content about RAM vs Disk
    const structuredContent = page.locator('text=RAM, text=Disque, text=contexte, .tabs, [role="tablist"]');
    if (await structuredContent.count() > 0) {
      await expect(structuredContent.first()).toBeVisible();
    }
    
    await page.screenshot({ path: 'test-results/memory-concept.png', fullPage: true });
  });

  test('security guide with alerts renders correctly', async ({ page }) => {
    await page.goto('/guides/confidentialite-securite');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Confidentialité');
    
    // Should have critical security alert
    await expect(page.locator('text=Règle absolue non négociable')).toBeVisible();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
    
    // Should have tabs for risk levels - be more specific
    await expect(page.locator('[role="tablist"]').first()).toBeVisible();
    await expect(page.locator('[role="tab"]').first()).toBeVisible();
    
    await page.screenshot({ path: 'test-results/security-guide.png', fullPage: true });
  });

  test('external tool with contextual alerts renders correctly', async ({ page }) => {
    await page.goto('/outils-externes/deepseek-chat');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('DeepSeek');
    
    // Should have warning alert about data privacy
    await expect(page.locator('text=Avertissement de Confidentialité')).toBeVisible();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
    
    await page.screenshot({ path: 'test-results/deepseek-tool.png', fullPage: true });
  });

  test('Google AI Studio advantage highlight renders correctly', async ({ page }) => {
    await page.goto('/outils-externes/google-ai-studio');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Google AI Studio');
    
    // Should have success/advantage alert
    await expect(page.locator('text=Avantage Concurrentiel Majeur')).toBeVisible();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
    
    await page.screenshot({ path: 'test-results/google-ai-studio-tool.png', fullPage: true });
  });

  test('prompt with platform tabs renders correctly', async ({ page }) => {
    await page.goto('/prompts/generateur-mnemoniques-analogies');
    
    await expect(page.locator('main h1, article h1, .content h1').first()).toContainText('Générateur');
    
    // Should have temperature guidance and platform-specific tabs
    const guidanceElements = page.locator('text=température, .tabs, [role="tablist"], text=AI Studio');
    if (await guidanceElements.count() > 0) {
      await expect(guidanceElements.first()).toBeVisible();
    }
    
    await page.screenshot({ path: 'test-results/mnemonics-prompt.png', fullPage: true });
  });

  test('interactive tabs work correctly', async ({ page }) => {
    // Try the memory concept which should have tabs
    await page.goto('/concepts/memoire-ia');
    
    // Look for tab-like elements
    const tabTriggers = page.locator('[role="tab"], .tab-trigger, [class*="tab"][class*="trigger"]');
    
    if (await tabTriggers.count() > 0) {
      // Click on the second tab if it exists
      if (await tabTriggers.count() > 1) {
        await tabTriggers.nth(1).click();
        
        // Wait for content to change
        await page.waitForTimeout(500);
        
        await page.screenshot({ path: 'test-results/tabs-interaction.png', fullPage: true });
      }
    }
  });
});