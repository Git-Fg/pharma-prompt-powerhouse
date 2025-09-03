/**
 * Unit Tests for Content Loader
 * 
 * This suite tests the content loader's functionality without complex mocking.
 * It focuses on testing the actual content loading and enrichment logic.
 */
import { describe, it, expect } from 'vitest';
import { content } from '@/lib/content-loader';

describe('Unit: Content Loader Functionality', () => {

  it('should load all content collections', () => {
    expect(content).toBeDefined();
    expect(content.concepts).toBeDefined();
    expect(content.guides).toBeDefined();
    expect(content.prompts).toBeDefined();
    expect(content.externalTools).toBeDefined();
    expect(content.objectifs).toBeDefined();
  });

  it('should enrich guides with related concepts', () => {
    const guidesWithConcepts = content.guides.filter(guide => guide.conceptSlugs && guide.conceptSlugs.length > 0);
    
    if (guidesWithConcepts.length > 0) {
      const guide = guidesWithConcepts[0];
      expect(guide.concepts).toBeDefined();
      
      if (guide.conceptSlugs && guide.conceptSlugs.length > 0) {
        const conceptSlug = guide.conceptSlugs[0];
        const concept = content.concepts.find(c => c.slug === conceptSlug);
        
        if (concept) {
          expect(guide.concepts).toContain(concept);
        }
      }
    }
  });

  it('should enrich concepts with related guides', () => {
    const conceptsWithGuides = content.concepts.filter(concept => 
      content.guides.some(guide => guide.conceptSlugs?.includes(concept.slug))
    );
    
    if (conceptsWithGuides.length > 0) {
      const concept = conceptsWithGuides[0];
      const relatedGuides = content.guides.filter(guide => guide.conceptSlugs?.includes(concept.slug));
      
      if (relatedGuides.length > 0) {
        expect(concept.guide).toBeDefined();
        expect(relatedGuides).toContain(concept.guide);
      }
    }
  });

  it('should have consistent data structure', () => {
    // Test that all concepts have required properties
    content.concepts.forEach(concept => {
      expect(concept.slug).toBeDefined();
      expect(concept.title).toBeDefined();
      expect(concept.description).toBeDefined();
      expect(concept.category).toBeDefined();
      expect(concept.difficulty).toBeDefined();
    });

    // Test that all guides have required properties
    content.guides.forEach(guide => {
      expect(guide.slug).toBeDefined();
      expect(guide.title).toBeDefined();
      expect(guide.description).toBeDefined();
      expect(guide.category).toBeDefined();
      expect(guide.difficulty).toBeDefined();
      expect(guide.concepts).toBeDefined(); // Should be enriched
    });

    // Test that all prompts have required properties
    content.prompts.forEach(prompt => {
      expect(prompt.slug).toBeDefined();
      expect(prompt.title).toBeDefined();
      expect(prompt.description).toBeDefined();
      expect(prompt.category).toBeDefined();
      expect(prompt.difficulty).toBeDefined();
    });
  });

});
