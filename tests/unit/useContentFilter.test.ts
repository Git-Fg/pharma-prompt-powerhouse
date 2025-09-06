import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useContentFilter } from '@/hooks/useContentFilter'

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
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('should filter items by category', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSelectedCategory('backend')
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0]?.title).toBe('Node.js Backend')
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('should filter items by difficulty', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSelectedDifficulty('beginner')
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0]?.title).toBe('React Hooks')
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('should filter items by tags', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.addTag('javascript')
    })

    expect(result.current.filteredItems).toHaveLength(3)
    expect(result.current.filteredItems.map(item => item.title)).toEqual([
      'React Hooks',
      'TypeScript Basics',
      'Node.js Backend',
    ])
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('should filter items by favorites only', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setShowFavoritesOnly(true)
    })

    expect(result.current.filteredItems).toHaveLength(2)
    expect(result.current.filteredItems.map(item => item.title)).toEqual([
      'React Hooks',
      'Node.js Backend',
    ])
    expect(result.current.hasActiveFilters).toBe(true)
  })

  it('should combine multiple filters correctly', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('javascript')
      result.current.setSelectedCategory('frontend')
      result.current.addTag('react')
    })

    expect(result.current.filteredItems).toHaveLength(1)
    expect(result.current.filteredItems[0]?.title).toBe('React Hooks')
  })

  it('should provide correct available categories', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    expect(result.current.availableCategories).toEqual(['backend', 'data', 'frontend'])
  })

  it('should provide correct available difficulties', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    expect(result.current.availableDifficulties).toEqual(['advanced', 'beginner', 'intermediate'])
  })

  it('should provide correct available tags', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    expect(result.current.availableTags).toEqual([
      'data-science',
      'hooks',
      'javascript',
      'nodejs',
      'python',
      'react',
      'typescript',
    ])
  })

  it('should handle tag operations correctly', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.addTag('react')
    })

    expect(result.current.selectedTags).toEqual(['react'])

    act(() => {
      result.current.removeTag('react')
    })

    expect(result.current.selectedTags).toEqual([])

    act(() => {
      result.current.toggleTag('react')
    })

    expect(result.current.selectedTags).toEqual(['react'])

    act(() => {
      result.current.toggleTag('react')
    })

    expect(result.current.selectedTags).toEqual([])
  })

  it('should reset all filters correctly', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    act(() => {
      result.current.setSearchTerm('test')
      result.current.setSelectedCategory('backend')
      result.current.setSelectedDifficulty('advanced')
      result.current.addTag('javascript')
      result.current.setShowFavoritesOnly(true)
    })

    expect(result.current.hasActiveFilters).toBe(true)

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.searchTerm).toBe('')
    expect(result.current.selectedCategory).toBe('all')
    expect(result.current.selectedDifficulty).toBe('all')
    expect(result.current.selectedTags).toEqual([])
    expect(result.current.showFavoritesOnly).toBe(false)
    expect(result.current.hasActiveFilters).toBe(false)
    expect(result.current.filteredItems).toEqual(mockItems)
  })

  it('should handle case sensitivity option', () => {
    const { result } = renderHook(() =>
      useContentFilter(mockItems, { caseSensitive: true }),
    )

    act(() => {
      result.current.setSearchTerm('REACT')
    })

    expect(result.current.filteredItems).toHaveLength(0)

    act(() => {
      result.current.setSearchTerm('React')
    })

    expect(result.current.filteredItems).toHaveLength(1)
  })

  it('should handle custom search fields', () => {
    const { result } = renderHook(() =>
      useContentFilter(mockItems, { searchFields: ['title'] }),
    )

    act(() => {
      result.current.setSearchTerm('Learn')
    })

    expect(result.current.filteredItems).toHaveLength(0)

    act(() => {
      result.current.setSearchTerm('React')
    })

    expect(result.current.filteredItems).toHaveLength(1)
  })

  it('should handle disabled tag filtering', () => {
    const { result } = renderHook(() =>
      useContentFilter(mockItems, { enableTagFiltering: false }),
    )

    expect(result.current.availableTags).toEqual([])

    act(() => {
      result.current.addTag('react')
    })

    expect(result.current.selectedTags).toEqual(['react'])
    expect(result.current.filteredItems).toHaveLength(4) // No filtering by tags
  })

  it('should handle disabled favorite filtering', () => {
    const { result } = renderHook(() =>
      useContentFilter(mockItems, { enableFavoriteFiltering: false }),
    )

    act(() => {
      result.current.setShowFavoritesOnly(true)
    })

    expect(result.current.filteredItems).toHaveLength(4) // No filtering by favorites
  })

  it('should calculate stats correctly', () => {
    const { result } = renderHook(() => useContentFilter(mockItems))

    expect(result.current.stats).toEqual({
      total: 4,
      filtered: 4,
      favorites: 2,
      categories: 3,
      difficulties: 3,
      tags: 7,
    })

    act(() => {
      result.current.setSearchTerm('React')
    })

    expect(result.current.stats.filtered).toBe(1)
  })

  it('should handle empty items array', () => {
    const { result } = renderHook(() => useContentFilter([]))

    expect(result.current.filteredItems).toEqual([])
    expect(result.current.availableCategories).toEqual([])
    expect(result.current.availableDifficulties).toEqual([])
    expect(result.current.availableTags).toEqual([])
    expect(result.current.stats.total).toBe(0)
  })

  it('should handle items without optional fields', () => {
    const itemsWithoutOptional = [
      {
        title: 'Simple Item',
        description: 'Simple description',
        category: 'simple',
      },
      {
        title: 'Another Item',
        description: 'Another description',
        category: 'simple',
        difficulty: 'beginner',
      },
    ]

    const { result } = renderHook(() => useContentFilter(itemsWithoutOptional))

    expect(result.current.availableDifficulties).toEqual(['beginner'])
    expect(result.current.availableTags).toEqual([])
    expect(result.current.stats.favorites).toBe(0)
  })
})
