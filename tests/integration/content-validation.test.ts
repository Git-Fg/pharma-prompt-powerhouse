/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { content } from '@/lib/content-loader';
import type { Guide, Concept, Prompt, Objectif, ExternalTool, Workflow } from '@/lib/content-schema';

describe('Content Collections Validation', () => {
  type Collection<T> = {
    name: string;
    data: T[];
    slug: (item: T) => string;
  }

  const collections: Collection<any>[] = [
    { name: 'guides', data: content.guides, slug: (item: Guide) => item.slug },
    { name: 'concepts', data: content.concepts, slug: (item: Concept) => item.slug },
    { name: 'prompts', data: content.prompts, slug: (item: Prompt) => item.slug },
    { name: 'objectives', data: content.objectives, slug: (item: Objectif) => item.slug },
    { name: 'externalTools', data: content.externalTools, slug: (item: ExternalTool) => item.slug },
    { name: 'workflows', data: content.workflows, slug: (item: Workflow) => item.slug },
  ];

  it.each(collections)('should have at least one item in a collection $name', ({ data }) => {
    expect(data.length).toBeGreaterThan(0);
  });

  describe.each(collections)('Collection: $name', ({ name, data, slug }) => {
    it('should have unique slugs', () => {
      const slugs = data.map(slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it.each(data.map(item => [slug(item), item]))('item %s should have non-empty required fields', (slug, item) => {
        expect(item.title).not.toBeFalsy();
        expect(item.description).not.toBeFalsy();
        if (name !== 'workflows') {
            expect(item.content || item.steps).toBeTruthy();
        }
    });
  });

  describe('Guides', () => {
    it.each(content.guides.filter(g => g.conceptSlugs))('guide $slug should have valid conceptSlugs', (guide) => {
        guide.conceptSlugs?.forEach(slug => {
            const conceptExists = content.concepts.some(c => c.slug === slug);
            expect(conceptExists, `Concept with slug "${slug}" not found in guide "${guide.slug}"`).toBe(true);
        });
    });
  });
});
