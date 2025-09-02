/**
 * Content Structure Tests
 * Verify the integrity of the TypeScript content system
 */

import { content } from '@/lib/content-loader';

describe('TypeScript Content System', () => {
  describe('Content Collections', () => {
    test('all content collections are properly loaded', () => {
      expect(content.guides).toBeDefined();
      expect(content.concepts).toBeDefined();
      expect(content.prompts).toBeDefined();
      expect(content.tools).toBeDefined();
      
      expect(Array.isArray(content.guides)).toBe(true);
      expect(Array.isArray(content.concepts)).toBe(true);
      expect(Array.isArray(content.prompts)).toBe(true);
      expect(Array.isArray(content.tools)).toBe(true);
    });

    test('content has proper structure', () => {
      const guide = content.guides[0];
      if (guide) {
        expect(guide).toHaveProperty('slug');
        expect(guide).toHaveProperty('title');
        expect(guide).toHaveProperty('description');
        expect(guide).toHaveProperty('content');
        expect(Array.isArray(guide.content)).toBe(true);
      }
    });

    test('content blocks have valid types', () => {
      const allContent = [...content.guides, ...content.concepts, ...content.prompts, ...content.tools];
      
      allContent.forEach(item => {
        item.content.forEach(block => {
          expect(['markdown', 'alert', 'toolRecommendation', 'guideRecommendation', 'conceptRecommendation', 'tabs', 'codeBlock', 'card']).toContain(block.type);
        });
      });
    });
  });
});