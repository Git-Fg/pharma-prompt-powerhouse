/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { 
  guideSchema, 
  conceptSchema, 
  promptSchema, 
  markdownBlockSchema,
  alertBlockSchema,
  contentBlockSchema
} from '@/lib/content-schema';
import { mockValidGuide, mockValidConcept, mockValidPrompt } from '../__mocks__/content.mock';

describe('Content Schemas Validation', () => {

  describe('guideSchema', () => {
    it('should successfully parse a valid guide object', () => {
      const result = guideSchema.safeParse(mockValidGuide);
      expect(result.success, `Validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true);
    });

    it('should fail parsing if title is missing', () => {
      const { title, ...invalidGuide } = mockValidGuide;
      const result = guideSchema.safeParse(invalidGuide);
      expect(result.success).toBe(false);
    });
  });

  describe('markdownBlockSchema', () => {
    it('should parse a valid markdown block', () => {
      const block = { type: 'markdown', content: 'Valid markdown' };
      const result = markdownBlockSchema.safeParse(block);
      expect(result.success).toBe(true);
    });

    it('should fail if content is not a string', () => {
      const block = { type: 'markdown', content: 123 };
      const result = markdownBlockSchema.safeParse(block);
      expect(result.success).toBe(false);
    });
  });

  describe('alertBlockSchema', () => {
    it('should parse a valid alert block with default variant', () => {
      const block = { type: 'alert', content: 'This is an alert.' };
      const result = alertBlockSchema.safeParse(block);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.variant).toBe('default');
      }
    });

    it('should parse a valid destructive alert block', () => {
      const block = { type: 'alert', variant: 'destructive', content: 'Danger!' };
      const result = alertBlockSchema.safeParse(block);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.variant).toBe('destructive');
      }
    });
  });

  describe('contentBlockSchema', () => {
    it('should parse a valid markdown block', () => {
      const block = { type: 'markdown', content: 'Valid markdown' };
      const result = contentBlockSchema.safeParse(block);
      expect(result.success, `Validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true);
    });

    it('should reject a block with an invalid type', () => {
      const block = { type: 'invalid-type', content: 'Some content' };
      const result = contentBlockSchema.safeParse(block);
      expect(result.success).toBe(false);
      if (!result.success) {
        const formattedError = result.error.format();
        expect(formattedError._errors[0]).toContain('Invalid discriminator value');
      }
    });
  });

  describe('conceptSchema', () => {
    it('should successfully parse a valid concept object', () => {
      const result = conceptSchema.safeParse(mockValidConcept);
      expect(result.success, `Validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true);
    });

    it('should fail parsing if description is too short', () => {
      const invalidConcept = { ...mockValidConcept, description: 'short' };
      const result = conceptSchema.safeParse(invalidConcept);
      expect(result.success).toBe(false);
      if (!result.success) {
        const formattedError = result.error.format();
        expect(formattedError.description?._errors[0]).toContain('at least 20 characters');
      }
    });
  });

  describe('promptSchema', () => {
    it('should successfully parse a valid prompt object', () => {
      const result = promptSchema.safeParse(mockValidPrompt);
      expect(result.success, `Validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true);
    });

    it('should fail if slug is invalid', () => {
      const invalidPrompt = { ...mockValidPrompt, slug: 'invalid slug' };
      const result = promptSchema.safeParse(invalidPrompt);
      expect(result.success).toBe(false);
       if (!result.success) {
        const formattedError = result.error.format();
        expect(formattedError.slug?._errors[0]).toContain('Invalid slug format');
      }
    });
  });

});
