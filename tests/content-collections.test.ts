/**
 * TypeScript Content System Structure Tests
 * Verify the integrity of the new TypeScript content system
 */

import path from 'path';
import fs from 'fs';
import { content } from '@/lib/content-loader';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

describe('TypeScript Content System Structure', () => {
  describe('Collection Directories', () => {
    test('all expected collection directories exist', () => {
      const expectedDirs = ['concepts', 'guides', 'external-tools', 'prompts'];
      
      for (const dir of expectedDirs) {
        const dirPath = path.join(CONTENT_ROOT, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.lstatSync(dirPath).isDirectory()).toBe(true);
      }
    });
  });

  describe('Concepts Collection', () => {
    test('has at least 5 concept files', () => {
      expect(content.concepts.length).toBeGreaterThanOrEqual(5);
    });

    test('all concept files have valid structure', () => {
      for (const concept of content.concepts) {
        // Required fields
        expect(concept.title).toBeDefined();
        expect(typeof concept.title).toBe('string');
        expect(concept.title.length).toBeGreaterThan(0);
        
        expect(concept.description).toBeDefined();
        expect(typeof concept.description).toBe('string');
        expect(concept.description.length).toBeGreaterThan(10);
        
        expect(concept.difficulty).toBeDefined();
        expect(['débutant', 'intermédiaire', 'avancé']).toContain(concept.difficulty);
        
        expect(concept.slug).toBeDefined();
        expect(typeof concept.slug).toBe('string');
        
        expect(Array.isArray(concept.content)).toBe(true);
        
        // Optional but common fields
        if (concept.tags) {
          expect(Array.isArray(concept.tags)).toBe(true);
        }
        
        if (concept.keyTakeaways) {
          expect(Array.isArray(concept.keyTakeaways)).toBe(true);
          expect(concept.keyTakeaways.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Guides Collection', () => {
    test('has at least 10 guide files', () => {
      expect(content.guides.length).toBeGreaterThanOrEqual(10);
    });

    test('all guide files have valid structure', () => {
      for (const guide of content.guides) {
        expect(guide.title).toBeDefined();
        expect(guide.description).toBeDefined();
        expect(guide.category).toBeDefined();
        expect(guide.difficulty).toBeDefined();
        expect(['débutant', 'intermédiaire', 'avancé']).toContain(guide.difficulty);
        expect(guide.slug).toBeDefined();
        expect(Array.isArray(guide.content)).toBe(true);
        expect(Array.isArray(guide.conceptSlugs)).toBe(true);
      }
    });
  });

  describe('External Tools Collection', () => {
    test('all external tool files have URL field', () => {
      expect(content.externalTools.length).toBeGreaterThan(0);
      
      for (const tool of content.externalTools) {
        expect(tool.url).toBeDefined();
        expect(typeof tool.url).toBe('string');
        expect(tool.url).toMatch(/^https?:\/\/.+/);
        expect(tool.slug).toBeDefined();
        expect(Array.isArray(tool.content)).toBe(true);
      }
    });
  });

  describe('Prompts Collection', () => {
    test('all prompt files have required structure', () => {
      expect(content.prompts.length).toBeGreaterThan(0);
      
      for (const prompt of content.prompts) {
        expect(prompt.title).toBeDefined();
        expect(prompt.category).toBeDefined();
        expect(prompt.difficulty).toBeDefined();
        expect(prompt.slug).toBeDefined();
        expect(Array.isArray(prompt.content)).toBe(true);
        
        if (prompt.variables) {
          expect(Array.isArray(prompt.variables)).toBe(true);
        }
        
        if (prompt.promptContent) {
          expect(typeof prompt.promptContent).toBe('string');
          expect(prompt.promptContent.length).toBeGreaterThan(0);
        }
      }
    });
  });
});