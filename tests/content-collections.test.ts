/**
 * Content Collections Structure Tests
 * Verify the integrity of the content collections and their data structure
 */

import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

describe('Content Collections Structure', () => {
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
    const conceptsDir = path.join(CONTENT_ROOT, 'concepts');
    
    test('has at least 5 concept files', () => {
      const files = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.mdx'));
      expect(files.length).toBeGreaterThanOrEqual(5);
    });

    test('all concept files have valid frontmatter', () => {
      const files = fs.readdirSync(conceptsDir).filter(file => file.endsWith('.mdx'));
      
      for (const file of files) {
        const filePath = path.join(conceptsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        // Required fields
        expect(data.title).toBeDefined();
        expect(typeof data.title).toBe('string');
        expect(data.title.length).toBeGreaterThan(0);
        
        expect(data.description).toBeDefined();
        expect(typeof data.description).toBe('string');
        expect(data.description.length).toBeGreaterThan(10);
        
        expect(data.difficulty).toBeDefined();
        expect(['débutant', 'intermédiaire', 'avancé']).toContain(data.difficulty);
        
        // Optional but common fields
        if (data.tags) {
          expect(Array.isArray(data.tags)).toBe(true);
        }
        
        if (data.keyTakeaways) {
          expect(Array.isArray(data.keyTakeaways)).toBe(true);
          expect(data.keyTakeaways.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Guides Collection', () => {
    const guidesDir = path.join(CONTENT_ROOT, 'guides');
    
    test('has at least 10 guide files', () => {
      const files = fs.readdirSync(guidesDir).filter(file => file.endsWith('.mdx'));
      expect(files.length).toBeGreaterThanOrEqual(10);
    });

    test('all guide files have valid frontmatter', () => {
      const files = fs.readdirSync(guidesDir).filter(file => file.endsWith('.mdx'));
      
      for (const file of files) {
        const filePath = path.join(guidesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        expect(data.title).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.category).toBeDefined();
        expect(data.difficulty).toBeDefined();
        expect(['débutant', 'intermédiaire', 'avancé']).toContain(data.difficulty);
      }
    });
  });

  describe('External Tools Collection', () => {
    const toolsDir = path.join(CONTENT_ROOT, 'external-tools');
    
    test('all external tool files have URL field', () => {
      const files = fs.readdirSync(toolsDir).filter(file => file.endsWith('.mdx'));
      expect(files.length).toBeGreaterThan(0);
      
      for (const file of files) {
        const filePath = path.join(toolsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        expect(data.url).toBeDefined();
        expect(typeof data.url).toBe('string');
        expect(data.url).toMatch(/^https?:\/\/.+/);
      }
    });
  });

  describe('Prompts Collection', () => {
    const promptsDir = path.join(CONTENT_ROOT, 'prompts');
    
    test('all prompt files have required structure', () => {
      const files = fs.readdirSync(promptsDir).filter(file => file.endsWith('.mdx'));
      expect(files.length).toBeGreaterThan(0);
      
      for (const file of files) {
        const filePath = path.join(promptsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        expect(data.title).toBeDefined();
        expect(data.category).toBeDefined();
        expect(data.difficulty).toBeDefined();
        
        if (data.variables) {
          expect(Array.isArray(data.variables)).toBe(true);
        }
        
        if (data.promptContent) {
          expect(typeof data.promptContent).toBe('string');
          expect(data.promptContent.length).toBeGreaterThan(0);
        }
      }
    });
  });
});