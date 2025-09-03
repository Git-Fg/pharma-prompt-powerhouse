/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { content } from '@/lib/content-loader';

describe('Content Loader Functional Tests', () => {

  describe('content loading', () => {
    it('should load all content collections successfully', () => {
      expect(content).toBeDefined();
      expect(content.concepts).toBeDefined();
      expect(content.guides).toBeDefined();
      expect(content.prompts).toBeDefined();
      expect(content.externalTools).toBeDefined();
      expect(content.objectifs).toBeDefined();
    });

    it('should load concepts with required fields', () => {
      const concepts = content.concepts;
      expect(concepts.length).toBeGreaterThan(0);
      
      const firstConcept = concepts[0];
      expect(firstConcept).toHaveProperty('slug');
      expect(firstConcept).toHaveProperty('title');
      expect(firstConcept).toHaveProperty('description');
      expect(firstConcept).toHaveProperty('category');
      expect(firstConcept).toHaveProperty('difficulty');
    });

    it('should load guides with required fields', () => {
      const guides = content.guides;
      expect(guides.length).toBeGreaterThan(0);
      
      const firstGuide = guides[0];
      expect(firstGuide).toHaveProperty('slug');
      expect(firstGuide).toHaveProperty('title');
      expect(firstGuide).toHaveProperty('description');
      expect(firstGuide).toHaveProperty('category');
      expect(firstGuide).toHaveProperty('difficulty');
    });

    it('should load prompts with required fields', () => {
      const prompts = content.prompts;
      expect(prompts.length).toBeGreaterThan(0);
      
      const firstPrompt = prompts[0];
      expect(firstPrompt).toHaveProperty('slug');
      expect(firstPrompt).toHaveProperty('title');
      expect(firstPrompt).toHaveProperty('description');
      expect(firstPrompt).toHaveProperty('category');
      expect(firstPrompt).toHaveProperty('difficulty');
    });
  });

  describe('content relationships', () => {
    it('should have valid concept-guide relationships', () => {
      const guidesWithConcepts = content.guides.filter(guide => guide.conceptSlugs && guide.conceptSlugs.length > 0);
      
      if (guidesWithConcepts.length > 0) {
        const guide = guidesWithConcepts[0];
        const conceptSlug = guide.conceptSlugs![0];
        const concept = content.concepts.find(c => c.slug === conceptSlug);
        
        expect(concept).toBeDefined();
      }
    });
  });

  describe('content structure integrity', () => {
    it('should have unique slugs in each collection', () => {
      const conceptSlugs = content.concepts.map(c => c.slug);
      const guideSlugs = content.guides.map(g => g.slug);
      const promptSlugs = content.prompts.map(p => p.slug);
      
      expect(new Set(conceptSlugs).size).toBe(conceptSlugs.length);
      expect(new Set(guideSlugs).size).toBe(guideSlugs.length);
      expect(new Set(promptSlugs).size).toBe(promptSlugs.length);
    });
  });

});
