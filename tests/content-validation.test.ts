/**
 * Content Validation Tests
 * Validate Zod schemas and content metadata
 */
import { describe, it, expect } from 'vitest';
import { 
  guideSchema, 
  conceptSchema, 
  promptSchema, 
  externalToolSchema 
} from '@/lib/content-schema';
import { content } from '@/lib/content-loader';
import {
  allCategories
} from '@/lib/constants';

describe('Content Validation', () => {
  
  describe('Schema Validation', () => {
    it('should validate all guides successfully', () => {
      content.guides.forEach((guide, index) => {
        const result = guideSchema.safeParse(guide);
        expect(result.success, `Guide at index ${index} failed validation: ${JSON.stringify(result.error)}`).toBe(true);
      });
    });

    it('should validate all concepts successfully', () => {
      content.concepts.forEach((concept, index) => {
        const result = conceptSchema.safeParse(concept);
        expect(result.success, `Concept at index ${index} failed validation: ${JSON.stringify(result.error)}`).toBe(true);
      });
    });

    it('should validate all prompts successfully', () => {
      content.prompts.forEach((prompt, index) => {
        const result = promptSchema.safeParse(prompt);
        expect(result.success, `Prompt at index ${index} failed validation: ${JSON.stringify(result.error)}`).toBe(true);
      });
    });

    it('should validate all external tools successfully', () => {
      content.externalTools.forEach((tool, index) => {
        const result = externalToolSchema.safeParse(tool);
        expect(result.success, `Tool at index ${index} failed validation: ${JSON.stringify(result.error)}`).toBe(true);
      });
    });
  });

  describe('Category Validation', () => {
    it('should have valid guide categories', () => {
      content.guides.forEach(guide => {
        expect(allCategories).toContain(guide.category);
      });
    });

    it('should have valid concept categories', () => {
      content.concepts.forEach(concept => {
        expect(allCategories).toContain(concept.category);
      });
    });

    it('should have valid prompt categories', () => {
      content.prompts.forEach(prompt => {
        expect(allCategories).toContain(prompt.category);
      });
    });

    it('should have valid tool categories', () => {
      content.externalTools.forEach(tool => {
        expect(allCategories).toContain(tool.category);
      });
    });
  });

  describe('Content Structure', () => {
    it('should have proper content structure', () => {
      const allContent = [...content.guides, ...content.concepts, ...content.prompts, ...content.externalTools];
      
      allContent.forEach(item => {
        expect(item).toHaveProperty('slug');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('content');
        expect(Array.isArray(item.content)).toBe(true);
        expect(item.content.length).toBeGreaterThan(0);
      });
    });

    it('should have valid difficulty levels', () => {
      const validDifficulties = ['débutant', 'intermédiaire', 'avancé'];
      const allContent = [...content.guides, ...content.concepts, ...content.prompts];
      
      allContent.forEach(item => {
        expect(validDifficulties).toContain(item.difficulty);
      });
    });
  });
});