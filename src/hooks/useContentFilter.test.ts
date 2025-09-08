import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@/test-utils'
import { useContentFilter } from './useContentFilter'

// Mock data for testing
const mockItems = [
  {
    title: 'React Hooks',
    description: 'Learn React Hooks',
    category: 'frontend',
    difficulty: 'beginner',
    tags: ['react', 'hooks', 'javascript'],
    isFavorite: true,
  },
  {
    title: 'TypeScript Basics',
    description: 'Learn TypeScript fundamentals',
    category: 'frontend',
    difficulty: 'intermediate',
    tags: ['typescript', 'javascript'],
    isFavorite: false,
  },
  {
    title: 'Node.js Backend',
    description: 'Build backend with Node.js',
    category: 'backend',
    difficulty: 'advanced',
    tags: ['nodejs', 'javascript'],
    isFavorite: true,
  },
  {
    title: 'Python Data Science',
    description: 'Data Science with Python',
    category: 'data',
    difficulty: 'intermediate',
    tags: ['python', 'data-science'],
    isFavorite: false,
  },
]

describe('useContentFilter Hook', () => {
  it('should return all items when no filters are applied', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    expect(result.current.filteredItems).toEqual(mockItems)
    expect(result.current.stats.total).toBe(4)
    expect(result.current.stats.filtered).toBe(4)
  })

  it('should filter items by search term', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('React')
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0]?.title).toBe('React Hooks')
    expect(result.current.stats.filtered).toBe(1)
  })

  it('should filter items by category', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSelectedCategory('frontend')
    })

    expect(result.current.filteredItems).toHaveLength(2)
    expect(result.current.filteredItems.every(item => item.category === 'frontend')).toBe(true)
  })

  it('should filter items by difficulty', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSelectedDifficulty('intermediate')
    })

    expect(result.current.filteredItems).toHaveLength(2)
    expect(result.current.filteredItems.every(item => item.difficulty === 'intermediate')).toBe(true)
  })

  it('should filter items by favorite status', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setShowFavoritesOnly(true)
    })

    expect(result.current.filteredItems).toHaveLength(2)
    expect(result.current.filteredItems.every(item => item.isFavorite)).toBe(true)
  })

  it('should apply multiple filters simultaneously', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSelectedCategory('frontend')
      result.current.setShowFavoritesOnly(true)
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0].title).toBe('React Hooks')
  })

  it('should handle search in title and description', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('fundamentals')
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0].title).toBe('TypeScript Basics')
  })

  it('should handle search in tags', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('javascript')
    })

    expect(result.current.filteredItems).toHaveLength(3)
  })

  it('should be case insensitive in search', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('REACT')
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0].title).toBe('React Hooks')
  })

  it('should reset filters correctly', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    // Apply some filters
    act(() => {
      result.current.setSearchTerm('React')
      result.current.setSelectedCategory('frontend')
      result.current.setShowFavoritesOnly(true)
    })

    expect(result.current.filteredItems).toHaveLength(1)

    // Reset filters
    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filteredItems).toEqual(mockItems)
    expect(result.current.searchTerm).toBe('')
    expect(result.current.selectedCategory).toBe('all')
    expect(result.current.selectedDifficulty).toBe('all')
    expect(result.current.showFavoritesOnly).toBe(false)
  })

  it('should return empty array when no items match filters', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('nonexistent')
    })

    expect(result.current.filteredItems).toHaveLength(0)
    expect(result.current.stats.filtered).toBe(0)
  })

  it('should provide correct filter statistics', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSelectedCategory('frontend')
    })

    expect(result.current.stats.total).toBe(4)
    expect(result.current.stats.filtered).toBe(2)
  })
})
