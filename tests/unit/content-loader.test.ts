import type { BaseConcept, BaseGuide } from '@/lib/content-schema'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Import the actual content loader functions for testing
import {
  content,
  getContentItem,
  getContentTypeToRouteMapping,
  getRouteToContentTypeMapping,
  isValidContentType,
} from '@/lib/content-loader'

// Mock content data
const mockGuide: BaseGuide = {
  slug: 'test-guide',
  title: 'Test Guide',
  description: 'A test guide',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  isWorkflow: false,
  content: [],
  conceptSlugs: ['test-concept'],
}

const mockConcept: BaseConcept = {
  slug: 'test-concept',
  title: 'Test Concept',
  description: 'A test concept',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  keyTakeaways: ['Key point 1'],
  content: [],
}

// Mock content modules
vi.mock('@/content/guides', () => ({
  allGuides: [mockGuide],
}))

vi.mock('@/content/concepts', () => ({
  allConcepts: [mockConcept],
}))

vi.mock('@/content/workflows', () => ({
  allWorkflows: [],
}))

vi.mock('@/content/external-tools', () => ({
  allExternalTools: [],
}))

describe('content Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test the actual content loader API with proper mocking
  describe('content object', () => {
    it('returns content with correct structure', () => {
      // Test the imported content object

      expect(content).toBeDefined()
      expect(content).toHaveProperty('guides')
      expect(content).toHaveProperty('workflows')
      expect(content).toHaveProperty('concepts')
      expect(content).toHaveProperty('externalTools')

      // Verify arrays are returned
      expect(Array.isArray(content.guides)).toBe(true)
      expect(Array.isArray(content.workflows)).toBe(true)
      expect(Array.isArray(content.concepts)).toBe(true)
      expect(Array.isArray(content.externalTools)).toBe(true)
    })

    it('provides enriched content with related items', () => {
      // Test that guides are enriched with related items and concepts
      if (content.guides.length > 0) {
        const guide = content.guides[0]!
        expect(guide).toHaveProperty('relatedItems')
        expect(Array.isArray(guide.relatedItems)).toBe(true)

        if (guide.concepts) {
          expect(Array.isArray(guide.concepts)).toBe(true)
        }
      }

      // Test that workflows are enriched with related items and concepts
      if (content.workflows.length > 0) {
        const workflow = content.workflows[0]!
        expect(workflow).toHaveProperty('relatedItems')
        expect(Array.isArray(workflow.relatedItems)).toBe(true)

        if (workflow.concepts) {
          expect(Array.isArray(workflow.concepts)).toBe(true)
        }
      }

      // Test that concepts are enriched with related items
      if (content.concepts.length > 0) {
        const concept = content.concepts[0]!
        expect(concept).toHaveProperty('relatedItems')
        expect(Array.isArray(concept.relatedItems)).toBe(true)
      }
    })

    it('ensures content integrity - all required properties exist', () => {
      // Test guides structure
      content.guides.forEach((guide: any) => {
        expect(guide).toHaveProperty('slug')
        expect(guide).toHaveProperty('title')
        expect(guide).toHaveProperty('description')
        expect(guide).toHaveProperty('category')
        expect(guide).toHaveProperty('difficulty')
        expect(guide).toHaveProperty('tags')
        expect(guide).toHaveProperty('isFavorite')
        expect(guide).toHaveProperty('content')
        expect(typeof guide.slug).toBe('string')
        expect(typeof guide.title).toBe('string')
        expect(Array.isArray(guide.tags)).toBe(true)
        expect(Array.isArray(guide.content)).toBe(true)
        expect(typeof guide.isFavorite).toBe('boolean')
      })

      // Test concepts structure
      content.concepts.forEach((concept: any) => {
        expect(concept).toHaveProperty('slug')
        expect(concept).toHaveProperty('title')
        expect(concept).toHaveProperty('description')
        expect(concept).toHaveProperty('category')
        expect(concept).toHaveProperty('difficulty')
        expect(concept).toHaveProperty('tags')
        expect(concept).toHaveProperty('isFavorite')
        expect(concept).toHaveProperty('keyTakeaways')
        expect(concept).toHaveProperty('content')
        expect(typeof concept.slug).toBe('string')
        expect(typeof concept.title).toBe('string')
        expect(Array.isArray(concept.tags)).toBe(true)
        expect(Array.isArray(concept.keyTakeaways)).toBe(true)
        expect(Array.isArray(concept.content)).toBe(true)
        expect(typeof concept.isFavorite).toBe('boolean')
      })
    })

    it('maintains slug uniqueness across all content types', () => {
      const allSlugs = [
        ...content.guides.map((g: any) => g.slug),
        ...content.workflows.map((w: any) => w.slug),
        ...content.concepts.map((c: any) => c.slug),
        ...content.externalTools.map((t: any) => t.slug),
      ]

      const uniqueSlugs = new Set(allSlugs)
      expect(allSlugs.length).toBe(uniqueSlugs.size)
    })
  })

  // Test the content loader utility functions
  describe('getContentItem', () => {
    it('returns content item by type and slug', () => {
      if (content.guides.length > 0) {
        const guide = content.guides[0]!
        const retrieved = getContentItem('guide', guide.slug)
        expect(retrieved).toBeDefined()
        expect(retrieved?.slug).toBe(guide.slug)
      }

      if (content.concepts.length > 0) {
        const concept = content.concepts[0]!
        const retrieved = getContentItem('concept', concept.slug)
        expect(retrieved).toBeDefined()
        expect(retrieved?.slug).toBe(concept.slug)
      }
    })

    it('returns undefined for non-existent content', () => {
      const nonExistent = getContentItem('guide', 'non-existent-slug')
      expect(nonExistent).toBeUndefined()
    })

    it('handles unknown content types gracefully', () => {
      const unknownType = getContentItem('unknown-type', 'some-slug')
      expect(unknownType).toBeUndefined()
    })
  })

  describe('getContentType utility functions', () => {
    it('provides correct route to content type mapping', () => {
      const mapping = getRouteToContentTypeMapping()

      expect(mapping).toBeDefined()
      expect(mapping.concepts).toBe('concept')
      expect(mapping.guides).toBe('guide')
      expect(mapping.workflows).toBe('workflow')
      expect(mapping['l-arsenal-ia']).toBe('tool')
    })

    it('provides correct content type to route mapping', () => {
      const mapping = getContentTypeToRouteMapping()

      expect(mapping).toBeDefined()
      expect(mapping.concept).toBe('concepts')
      expect(mapping.guide).toBe('guides')
      expect(mapping.workflow).toBe('workflows')
      expect(mapping.tool).toBe('l-arsenal-ia')
    })
  })

  describe('content validation', () => {
    it('validates content types correctly', () => {
      expect(isValidContentType('concept')).toBe(true)
      expect(isValidContentType('guide')).toBe(true)
      expect(isValidContentType('workflow')).toBe(true)
      expect(isValidContentType('tool')).toBe(true)
      expect(isValidContentType('unknown')).toBe(false)
    })

    it('ensures all content has required fields', () => {
      // Test guides
      content.guides.forEach((guide: any) => {
        expect(guide.slug).toBeDefined()
        expect(guide.slug).not.toBe('')
        expect(guide.title).toBeDefined()
        expect(guide.title).not.toBe('')
        expect(guide.description).toBeDefined()
        expect(Array.isArray(guide.content)).toBe(true)
        expect(Array.isArray(guide.tags)).toBe(true)
        expect(typeof guide.isFavorite).toBe('boolean')
      })

      // Test concepts
      content.concepts.forEach((concept: any) => {
        expect(concept.slug).toBeDefined()
        expect(concept.slug).not.toBe('')
        expect(concept.title).toBeDefined()
        expect(concept.title).not.toBe('')
        expect(concept.description).toBeDefined()
        expect(Array.isArray(concept.content)).toBe(true)
        expect(Array.isArray(concept.keyTakeaways)).toBe(true)
        expect(Array.isArray(concept.tags)).toBe(true)
        expect(typeof concept.isFavorite).toBe('boolean')
      })
    })
  })

  describe('related items functionality', () => {
    it('includes related items in enriched content', () => {
      // Test that content has related items array
      const allContent = [...content.guides, ...content.workflows, ...content.concepts]

      allContent.forEach((item: any) => {
        expect(item).toHaveProperty('relatedItems')
        expect(Array.isArray(item.relatedItems)).toBe(true)

        // Each related item should have required properties
        item.relatedItems.forEach((related: any) => {
          expect(related).toHaveProperty('slug')
          expect(related).toHaveProperty('title')
          expect(related).toHaveProperty('description')
          expect(related).toHaveProperty('type')
          expect(related).toHaveProperty('score')
          expect(typeof related.score).toBe('number')
        })
      })
    })

    it('does not include self in related items', () => {
      if (content.guides.length > 0) {
        const guide = content.guides[0]!
        const relatedSlugs = guide.relatedItems.map((item: any) => item.slug)
        expect(relatedSlugs).not.toContain(guide.slug)
      }
    })
  })
})
