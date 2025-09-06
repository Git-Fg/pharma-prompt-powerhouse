import { describe, expect, it } from 'vitest'
import {
  filterAndSortByRelevance,
  formatEstimatedTime,
  formatTags,
  generateSlug,
  getCategoryColor,
  getCategoryLabel,
  getConfidenceInfo,
  getContentTypeFromUrl,
  getContentUrl,
  getDifficultyLabel,
  getStarRatingProps,
  isValidCategory,
  isValidConfidenceScore,
  isValidDifficulty,
  sortByFavoritesThenTitle,
} from '@/lib/ui-utils'

describe('uI Utilities', () => {
  describe('getCategoryLabel', () => {
    it('should return correct label for known categories', () => {
      expect(getCategoryLabel('fondamentaux')).toBe('Fondamentaux 📚')
      expect(getCategoryLabel('methodologie')).toBe('Méthodologie 🔬')
    })

    it('should return fallback for unknown categories', () => {
      expect(getCategoryLabel('unknown')).toBe('unknown')
      expect(getCategoryLabel('')).toBe('')
    })
  })

  describe('getDifficultyLabel', () => {
    it('should return correct label for known difficulties', () => {
      expect(getDifficultyLabel('débutant')).toBe('Débutant 🌱')
      expect(getDifficultyLabel('avancé')).toBe('Avancé 🌳')
    })

    it('should return fallback for unknown difficulties', () => {
      expect(getDifficultyLabel('unknown')).toBe('unknown')
      expect(getDifficultyLabel('')).toBe('')
    })
  })

  describe('getCategoryColor', () => {
    it('should return correct color for known categories', () => {
      expect(getCategoryColor('fondamentaux')).toBe('blue')
      expect(getCategoryColor('methodologie')).toBe('green')
    })

    it('should return fallback color for unknown categories', () => {
      expect(getCategoryColor('unknown')).toBe('gray')
      expect(getCategoryColor('')).toBe('gray')
    })
  })

  describe('getConfidenceInfo', () => {
    it('should return correct info for valid scores', () => {
      expect(getConfidenceInfo(1)).toEqual({ label: '⭐☆☆☆☆', description: 'Très faible confiance' })
      expect(getConfidenceInfo(3)).toEqual({ label: '⭐⭐⭐☆☆', description: 'Confiance modérée' })
      expect(getConfidenceInfo(5)).toEqual({ label: '⭐⭐⭐⭐⭐', description: 'Très haute confiance' })
    })

    it('should clamp scores to valid range', () => {
      expect(getConfidenceInfo(0)).toEqual({ label: '⭐☆☆☆☆', description: 'Très faible confiance' })
      expect(getConfidenceInfo(6)).toEqual({ label: '⭐⭐⭐⭐⭐', description: 'Très haute confiance' })
      expect(getConfidenceInfo(-10)).toEqual({ label: '⭐☆☆☆☆', description: 'Très faible confiance' })
    })
  })

  describe('getStarRatingProps', () => {
    it('should return correct star rating for valid scores', () => {
      const result = getStarRatingProps(3, 5)

      expect(result.score).toBe(3)
      expect(result.totalStars).toBe(5)
      expect(result.stars).toHaveLength(5)
      expect(result.stars[0]?.filled).toBe(true)
      expect(result.stars[2]?.filled).toBe(true)
      expect(result.stars[3]?.filled).toBe(false)
    })

    it('should clamp scores to valid range', () => {
      expect(getStarRatingProps(-1).score).toBe(0)
      expect(getStarRatingProps(6, 5).score).toBe(5)
      expect(getStarRatingProps(10, 10).score).toBe(10)
    })

    it('should use default total stars when not specified', () => {
      const result = getStarRatingProps(3)
      expect(result.totalStars).toBe(5)
    })
  })

  describe('formatEstimatedTime', () => {
    it('should return provided time when available', () => {
      expect(formatEstimatedTime('45 min')).toBe('45 min')
      expect(formatEstimatedTime('1 heure')).toBe('1 heure')
    })

    it('should return default times based on content type', () => {
      expect(formatEstimatedTime(undefined, 'concept')).toBe('5-10 min')
      expect(formatEstimatedTime(undefined, 'guide')).toBe('15-30 min')
      expect(formatEstimatedTime(undefined, 'workflow')).toBe('30-60 min')
      expect(formatEstimatedTime(undefined, 'tool')).toBe('5-15 min')
    })

    it('should return fallback for unknown content types', () => {
      expect(formatEstimatedTime(undefined, 'unknown' as any)).toBe('10-20 min')
    })
  })

  describe('formatTags', () => {
    it('should return empty array for no tags', () => {
      expect(formatTags()).toEqual([])
      expect(formatTags([])).toEqual([])
      expect(formatTags(undefined)).toEqual([])
    })

    it('should clean and filter tags', () => {
      const result = formatTags(['  react  ', '  ', 'typescript', '', 'vue  '])
      expect(result).toEqual(['react', 'typescript', 'vue'])
    })
  })

  describe('generateSlug', () => {
    it('should generate correct slugs', () => {
      expect(generateSlug('Hello World')).toBe('hello-world')
      expect(generateSlug('React & Vue')).toBe('react-vue')
      expect(generateSlug('  Extra  Spaces  ')).toBe('extra-spaces')
      expect(generateSlug('Café au Lait')).toBe('cafe-au-lait')
      expect(generateSlug('Special!@#$%Chars')).toBe('special-chars')
    })

    it('should handle edge cases', () => {
      expect(generateSlug('')).toBe('')
      expect(generateSlug('   ')).toBe('')
      expect(generateSlug('---')).toBe('')
      expect(generateSlug('a-b-c')).toBe('a-b-c')
    })
  })

  describe('sortByFavoritesThenTitle', () => {
    const mockItems = [
      { title: 'Zebra', isFavorite: false },
      { title: 'Apple', isFavorite: true },
      { title: 'Banana', isFavorite: false },
      { title: 'Cherry', isFavorite: true },
    ]

    it('should sort favorites first, then by title', () => {
      const result = sortByFavoritesThenTitle(mockItems)
      expect(result.map(item => item.title)).toEqual(['Apple', 'Cherry', 'Banana', 'Zebra'])
    })

    it('should handle items without favorite property', () => {
      const itemsWithoutFavorite = [
        { title: 'Zebra' },
        { title: 'Apple', isFavorite: true },
        { title: 'Banana' },
      ]

      const result = sortByFavoritesThenTitle(itemsWithoutFavorite)
      expect(result.map(item => item.title)).toEqual(['Apple', 'Banana', 'Zebra'])
    })

    it('should return empty array for empty input', () => {
      expect(sortByFavoritesThenTitle([])).toEqual([])
    })
  })

  describe('filterAndSortByRelevance', () => {
    const mockItems = [
      { title: 'React Hooks', description: 'Learn React Hooks', tags: ['react', 'hooks'] },
      { title: 'Vue Tutorial', description: 'Learn Vue.js', tags: ['vue', 'javascript'] },
      { title: 'JavaScript Basics', description: 'Learn JavaScript fundamentals', tags: ['javascript'] },
    ]

    it('should return all items when no search term', () => {
      const result = filterAndSortByRelevance(mockItems, '')
      expect(result).toEqual(mockItems)
    })

    it('should filter and sort by relevance', () => {
      const result = filterAndSortByRelevance(mockItems, 'react')
      expect(result.map(item => item.title)).toEqual(['React Hooks'])
    })

    it('should handle partial matches', () => {
      const result = filterAndSortByRelevance(mockItems, 'javascript')
      expect(result.map(item => item.title)).toEqual(['JavaScript Basics', 'Vue Tutorial'])
    })

    it('should return empty array for no matches', () => {
      const result = filterAndSortByRelevance(mockItems, 'python')
      expect(result).toEqual([])
    })

    it('should be case insensitive', () => {
      const result = filterAndSortByRelevance(mockItems, 'REACT')
      expect(result.map(item => item.title)).toEqual(['React Hooks'])
    })
  })

  describe('isValidCategory', () => {
    it('should return true for valid categories', () => {
      expect(isValidCategory('fondamentaux')).toBe(true)
      expect(isValidCategory('methodologie')).toBe(true)
    })

    it('should return false for invalid categories', () => {
      expect(isValidCategory('invalid')).toBe(false)
      expect(isValidCategory('')).toBe(false)
    })
  })

  describe('isValidDifficulty', () => {
    it('should return true for valid difficulties', () => {
      expect(isValidDifficulty('débutant')).toBe(true)
      expect(isValidDifficulty('avancé')).toBe(true)
    })

    it('should return false for invalid difficulties', () => {
      expect(isValidDifficulty('invalid')).toBe(false)
      expect(isValidDifficulty('')).toBe(false)
    })
  })

  describe('isValidConfidenceScore', () => {
    it('should return true for valid scores', () => {
      expect(isValidConfidenceScore(1)).toBe(true)
      expect(isValidConfidenceScore(3)).toBe(true)
      expect(isValidConfidenceScore(5)).toBe(true)
    })

    it('should return false for invalid scores', () => {
      expect(isValidConfidenceScore(0)).toBe(false)
      expect(isValidConfidenceScore(6)).toBe(false)
      expect(isValidConfidenceScore(3.5)).toBe(false)
      expect(isValidConfidenceScore(-1)).toBe(false)
    })
  })

  describe('getContentUrl', () => {
    it('should generate correct URLs', () => {
      expect(getContentUrl('workflow', 'test-workflow')).toBe('/workflows/test-workflow')
      expect(getContentUrl('guide', 'test-guide')).toBe('/guides/test-guide')
      expect(getContentUrl('concept', 'test-concept')).toBe('/concepts/test-concept')
      expect(getContentUrl('tool', 'test-tool')).toBe('/l-arsenal-ia/test-tool')
    })
  })

  describe('getContentTypeFromUrl', () => {
    it('should extract correct content type from URL', () => {
      expect(getContentTypeFromUrl('/workflows/test-workflow')).toBe('workflow')
      expect(getContentTypeFromUrl('/guides/test-guide')).toBe('guide')
      expect(getContentTypeFromUrl('/concepts/test-concept')).toBe('concept')
      expect(getContentTypeFromUrl('/l-arsenal-ia/test-tool')).toBe('tool')
    })

    it('should return null for unknown URLs', () => {
      expect(getContentTypeFromUrl('/unknown/test')).toBe(null)
      expect(getContentTypeFromUrl('/workflows')).toBe(null)
      expect(getContentTypeFromUrl('')).toBe(null)
    })
  })
})
