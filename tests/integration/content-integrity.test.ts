/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { content } from '@/lib/content-loader';

describe('Data Integrity Between Collections', () => {
  const allConceptSlugs = new Set(content.concepts.map(c => c.slug));
  const allGuideSlugs = new Set(content.guides.map(g => g.slug));
  const allPromptSlugs = new Set(content.prompts.map(p => p.slug));

  describe('Guides', () => {
    it.each(content.guides)('Guide "$title" should have valid concept references', (guide) => {
      if (guide.conceptSlugs) {
        guide.conceptSlugs.forEach(slug => {
          expect(allConceptSlugs.has(slug), `Concept slug "${slug}" in guide "${guide.slug}" does not exist.`).toBe(true);
        });
      }
    });
  });

  describe('Concepts', () => {
    it.each(content.concepts)('Concept "$title" should have a valid mainGuideSlug if defined', (concept) => {
      if (concept.mainGuideSlug) {
        expect(allGuideSlugs.has(concept.mainGuideSlug), `Guide slug "${concept.mainGuideSlug}" in concept "${concept.slug}" does not exist.`).toBe(true);
      }
    });
  });

  describe('Prompts', () => {
    it.each(content.prompts)('Prompt "$title" should have valid concept references', (prompt) => {
      if (prompt.conceptSlugs) {
        prompt.conceptSlugs.forEach((slug: string) => {
          expect(allConceptSlugs.has(slug), `Concept slug "${slug}" in prompt "${prompt.slug}" does not exist.`).toBe(true);
        });
      }
    });
  });

  describe('Workflows', () => {
    it.each(content.workflows)('Workflow "$title" should have valid prompt references in steps', (workflow) => {
      workflow.steps.forEach(step => {
        if (step.promptSlug) {
          expect(allPromptSlugs.has(step.promptSlug), `Prompt slug "${step.promptSlug}" in workflow "${workflow.slug}" does not exist.`).toBe(true);
        }
      });
    });
  });

  describe('Enrichment', () => {
    it('should enrich guides with concept objects', () => {
      const guideWithConcepts = content.guides.find(g => g.slug === 'maitriser-le-prompt-engineering');
      expect(guideWithConcepts).toBeDefined();
      expect(guideWithConcepts!.concepts.length).toBeGreaterThan(0);
      expect(guideWithConcepts!.concepts[0].title).toBe('Comprendre le RAG (Retrieval-Augmented Generation)');
    });

    it('should enrich concepts with a guide object', () => {
        const conceptWithGuide = content.concepts.find(c => c.slug === 'compreprendre-le-rag');
        expect(conceptWithGuide).toBeDefined();
        expect(conceptWithGuide!.guide).toBeDefined();
        expect(conceptWithGuide!.guide!.title).toBe('Maîtriser le Prompt Engineering');
    });
  });
});
