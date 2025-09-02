/**
 * Modern TypeScript Content System Tests
 * Verify modern features and TypeScript content structure
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { content } from '@/lib/content-loader';

describe('Modern TypeScript Content System', () => {
  test('external tools have structured content blocks', () => {
    expect(content.externalTools.length).toBeGreaterThan(0);
    
    // Check that external tools have content with proper structure
    content.externalTools.forEach(tool => {
      expect(Array.isArray(tool.content)).toBe(true);
      expect(tool.content.length).toBeGreaterThan(0);
      
      // At least one content block should exist
      expect(tool.content.some(block => block.type === 'markdown' || block.type === 'alert')).toBe(true);
    });
  });

  test('content schema configuration is modernized', () => {
    const schemaPath = join(process.cwd(), 'src', 'lib', 'content-schema.ts');
    expect(existsSync(schemaPath)).toBe(true);
    
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    
    // Check for modern TypeScript content features
    expect(schemaContent).toContain('z.object');
    expect(schemaContent).toContain('ContentBlock');
    expect(schemaContent).toContain('markdownBlockSchema');
    expect(schemaContent).toContain('alertBlockSchema');
  });

  test('content loader provides enriched data', () => {
    const loaderPath = join(process.cwd(), 'src', 'lib', 'content-loader.ts');
    expect(existsSync(loaderPath)).toBe(true);
    
    const loaderContent = readFileSync(loaderPath, 'utf-8');
    
    // Check for enrichment features
    expect(loaderContent).toContain('enrichedGuides');
    expect(loaderContent).toContain('relatedConcepts');
    expect(loaderContent).toContain('conceptsMap');
  });

  test('structured content blocks are properly validated', () => {
    // Test that all content follows the structured content block pattern
    const allContent = [
      ...content.guides,
      ...content.concepts,
      ...content.prompts,
      ...content.externalTools
    ];

    allContent.forEach(item => {
      expect(Array.isArray(item.content)).toBe(true);
      
      item.content.forEach(block => {
        expect(block.type).toBeDefined();
        expect(['markdown', 'alert', 'tabs', 'toolRecommendation', 'guideRecommendation', 'conceptRecommendation'].includes(block.type)).toBe(true);
      });
    });
  });

  test('workflows page component exists', () => {
    const workflowPagePath = join(process.cwd(), 'src/app/workflows/page.tsx');
    expect(existsSync(workflowPagePath)).toBe(true);
    
    const content = readFileSync(workflowPagePath, 'utf8');
    expect(content.includes('Tabs')).toBe(true);
  });

  test('enhanced related components exist', () => {
    const components = [
      'ToolRecommendation.tsx',
      'ConceptRecommendation.tsx', 
      'GuideRecommendation.tsx'
    ];
    
    components.forEach(component => {
      const componentPath = join(process.cwd(), 'src/components/shared', component);
      expect(existsSync(componentPath)).toBe(true);
    });
  });
});