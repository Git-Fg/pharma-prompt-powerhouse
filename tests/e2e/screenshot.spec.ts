import { test } from '@playwright/test';

test.describe('Core Site Screenshots', () => {
  const pages = [
    { name: 'homepage', path: '/' },
    { name: 'concepts', path: '/concepts' },
    { name: 'guides', path: '/guides' },
    { name: 'prompts', path: '/prompts' },
    { name: 'external-tools', path: '/outils-externes' },
    { name: 'single-concept', path: '/concepts/token-acide-amine' },
    { name: 'single-guide', path: '/guides/les-5-piliers-dun-prompt-pharmaceutique-efficace' },
    { name: 'single-prompt', path: '/prompts/generateur-questions-examen' },
    { name: 'single-external-tool', path: '/outils-externes/chatgpt' },
  ];

  for (const pageInfo of pages) {
    test(`screenshot for ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `e2e_image/${pageInfo.name}.png`, fullPage: true });
    });
  }
});
