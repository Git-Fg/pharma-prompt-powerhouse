import type { BaseConcept, BaseGuide } from '@/lib/content-schema'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock content modules first
vi.mock('@/content/guides', () => ({
  allGuides: [{
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
  }],
}))

vi.mock('@/content/concepts', () => ({
  allConcepts: [{
    slug: 'test-concept',
    title: 'Test Concept',
    description: 'A test concept',
    category: 'general',
    difficulty: 'beginner',
    tags: ['test'],
    isFavorite: false,
    keyTakeaways: ['Key point 1'],
    content: [],
  }],
}))

vi.mock('@/content/workflows', () => ({
  allWorkflows: [],
}))

vi.mock('@/content/external-tools', () => ({
  allExternalTools: [],
}))

// Import the actual content loader functions for testing
import {
  content,
  getContentItem,
  getContentTypeToRouteMapping,
  getRouteToContentTypeMapping,
  isValidContentType,
} from './content-loader'

// Mock content data for assertions
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

describe('content Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('content object', () => {
    it('should provide access to all content types', () => {
      expect(content.guides).toBeDefined()
      expect(content.concepts).toBeDefined()
      expect(content.workflows).toBeDefined()
      expect(content.externalTools).toBeDefined()
    })

    it('should contain mocked content', () => {
      expect(content.guides).toHaveLength(1)
      expect(content.guides[0]).toBeDefined()
      expect(content.guides[0]!.slug).toBe('test-guide')
      expect(content.concepts).toHaveLength(1)
      expect(content.concepts[0]).toBeDefined()
      expect(content.concepts[0]!.slug).toBe('test-concept')
    })
  })

  describe('getContentItem', () => {
    it('should retrieve guide by slug', () => {
      const guide = getContentItem('guides', 'test-guide')
      expect(guide).toBeDefined()
      expect(guide?.title).toBe('Test Guide')
    })

    it('should retrieve concept by slug', () => {
      const concept = getContentItem('concepts', 'test-concept')
      expect(concept).toBeDefined()
      expect(concept?.title).toBe('Test Concept')
    })

    it('should return undefined for non-existent content', () => {
      const result = getContentItem('guides', 'non-existent')
      expect(result).toBeUndefined()
    })

    it('should handle invalid content type gracefully', () => {
      // Testing invalid content type
      const result = getContentItem('invalid' as any, 'test')
      expect(result).toBeUndefined()
    })
  })

  describe('isValidContentType', () => {
    it('should return true for valid content types', () => {
      expect(isValidContentType('guides')).toBe(true)
      expect(isValidContentType('concepts')).toBe(true)
      expect(isValidContentType('workflows')).toBe(true)
      expect(isValidContentType('external-tools')).toBe(true)
    })

    it('should return false for invalid content types', () => {
      expect(isValidContentType('invalid')).toBe(false)
      expect(isValidContentType('')).toBe(false)
      expect(isValidContentType('guide')).toBe(false) // singular form
    })
  })

  describe('route mappings', () => {
    it('should provide correct content type to route mapping', () => {
      const mapping = getContentTypeToRouteMapping()
      expect(mapping.guide).toBe('guides')
      expect(mapping.concept).toBe('concepts')
      expect(mapping.workflow).toBe('workflows')
      expect(mapping.tool).toBe('l-arsenal-ia')
    })

    it('should provide correct route to content type mapping', () => {
      const mapping = getRouteToContentTypeMapping()
      expect(mapping.guides).toBe('guides')
      expect(mapping.concepts).toBe('concepts')
      expect(mapping.workflows).toBe('workflows')
      expect(mapping['l-arsenal-ia']).toBe('externalTools')
    })
  })

  describe('content relationships', () => {
    it('should maintain content relationships through slugs', () => {
      const guide = getContentItem('guides', 'test-guide')
      expect(guide?.conceptSlugs).toContain('test-concept')

      const concept = getContentItem('concepts', 'test-concept')
      expect(concept).toBeDefined()
    })
  })

  describe('content properties', () => {
    it('should have required properties on guides', () => {
      const guide = content.guides[0]
      expect(guide).toHaveProperty('slug')
      expect(guide).toHaveProperty('title')
      expect(guide).toHaveProperty('description')
      expect(guide).toHaveProperty('category')
      expect(guide).toHaveProperty('difficulty')
      expect(guide).toHaveProperty('tags')
      expect(guide).toHaveProperty('isFavorite')
      expect(guide).toHaveProperty('isWorkflow')
      expect(guide).toHaveProperty('content')
      expect(guide).toHaveProperty('conceptSlugs')
    })

    it('should have required properties on concepts', () => {
      const concept = content.concepts[0]
      expect(concept).toHaveProperty('slug')
      expect(concept).toHaveProperty('title')
      expect(concept).toHaveProperty('description')
      expect(concept).toHaveProperty('category')
      expect(concept).toHaveProperty('difficulty')
      expect(concept).toHaveProperty('tags')
      expect(concept).toHaveProperty('isFavorite')
      expect(concept).toHaveProperty('keyTakeaways')
      expect(concept).toHaveProperty('content')
    })
  })

  describe('error handling', () => {
    it('should handle missing content gracefully', () => {
      expect(() => getContentItem('guides', 'missing')).not.toThrow()
      expect(getContentItem('guides', 'missing')).toBeUndefined()
    })

    it('should handle empty slug gracefully', () => {
      expect(() => getContentItem('guides', '')).not.toThrow()
      expect(getContentItem('guides', '')).toBeUndefined()
    })
  })
})
