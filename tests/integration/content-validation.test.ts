/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { content } from '@/lib/content-loader';
import type { Guide, Concept, Prompt, Objectif, ExternalTool } from '@/lib/content-schema';

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
    { name: 'objectifs', data: content.objectifs, slug: (item: Objectif) => item.slug },
    { name: 'externalTools', data: content.externalTools, slug: (item: ExternalTool) => item.slug },
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

    it('should have basic required properties', () => {
      data.forEach((item: any) => {
        expect(item.slug).toBeDefined();
        expect(item.title).toBeDefined();
        expect(item.description).toBeDefined();
      });
    });
  });

  describe('Guides', () => {
    it('should have valid concept references', () => {
      const guidesWithConcepts = content.guides.filter(g => g.conceptSlugs && g.conceptSlugs.length > 0);
      
      guidesWithConcepts.forEach(guide => {
        guide.conceptSlugs?.forEach(conceptSlug => {
          const conceptExists = content.concepts.some(c => c.slug === conceptSlug);
          expect(conceptExists, `Concept with slug "${conceptSlug}" not found in guide "${guide.slug}"`).toBe(true);
        });
      });
    });
  });

});
