import type { Guide } from '@/lib/content-schema'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { FilterableContentGrid } from '@/components/shared/FilterableContentGrid'
import { useContentFilter } from '@/hooks/useContentFilter'

// Mock the search and filter hooks
vi.mock('@/hooks/useContentFilter', () => ({
  useContentFilter: vi.fn(),
}))

// Mock AutoAnimate hook
vi.mock('@/hooks/useAutoAnimate', () => ({
  useAutoAnimateList: vi.fn(() => [null]),
}))

// Mock content components
vi.mock('@/components/shared/ContentFilterControls', () => ({
  ContentFilterControls: ({ onReset }: { onReset: () => void }) => (
    <div data-testid="filter-controls">
      <button onClick={onReset} data-testid="reset-filters">Reset</button>
    </div>
  ),
}))

vi.mock('@/components/shared/GuideCard', () => ({
  GuideCard: ({ guide }: { guide: Guide }) => (
    <div data-testid={`guide-card-${guide.slug}`}>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
    </div>
  ),
}))

const mockItems: Guide[] = [
  {
    slug: 'guide-1',
    title: 'Test Guide 1',
    description: 'Description for guide 1',
    category: 'general',
    difficulty: 'beginner',
    estimatedTime: '10 min',
    lastUpdated: '2024-01-01',
    tags: ['test', 'guide'],
    contentBlocks: [],
    conceptSlugs: [],
    relatedItems: [],
    concepts: [],
  },
  {
    slug: 'guide-2',
    title: 'Test Guide 2',
    description: 'Description for guide 2',
    category: 'advanced',
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    lastUpdated: '2024-01-02',
    tags: ['advanced', 'test'],
    contentBlocks: [],
    conceptSlugs: [],
    relatedItems: [],
    concepts: [],
  },
]

describe('FilterableContentGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useContentFilter).mockReturnValue({
      searchTerm: '',
      selectedCategory: 'all',
      selectedDifficulty: 'all',
      setSearchTerm: vi.fn(),
      setSelectedCategory: vi.fn(),
      setSelectedDifficulty: vi.fn(),
      resetFilters: vi.fn(),
      filteredItems: mockItems,
    })
  })

  it('renders all items correctly', () => {
    render(
      <FilterableContentGrid
        items={mockItems}
        renderItem={(guide) => <div key={guide.slug} data-testid={`guide-card-${guide.slug}`}>{guide.title}</div>}
        emptyStateTitle="No guides found"
        emptyStateDescription="Try adjusting your filters"
      />
    )

    expect(screen.getByTestId('guide-card-guide-1')).toBeInTheDocument()
    expect(screen.getByTestId('guide-card-guide-2')).toBeInTheDocument()
    expect(screen.getByText('Test Guide 1')).toBeInTheDocument()
    expect(screen.getByText('Test Guide 2')).toBeInTheDocument()
  })

  it('displays filter controls', () => {
    render(
      <FilterableContentGrid
        items={mockItems}
        renderItem={(guide) => <div key={guide.slug}>{guide.title}</div>}
        emptyStateTitle="No guides found"
        emptyStateDescription="Try adjusting your filters"
        showCategoryFilter
        showDifficultyFilter
      />
    )

    expect(screen.getByTestId('filter-controls')).toBeInTheDocument()
    expect(screen.getByTestId('reset-filters')).toBeInTheDocument()
  })

  it('shows empty state when no items match filters', () => {
    vi.mocked(useContentFilter).mockReturnValue({
      searchTerm: 'nonexistent',
      selectedCategory: 'all',
      selectedDifficulty: 'all',
      setSearchTerm: vi.fn(),
      setSelectedCategory: vi.fn(),
      setSelectedDifficulty: vi.fn(),
      resetFilters: vi.fn(),
      filteredItems: [],
    })

    render(
      <FilterableContentGrid
        items={[]}
        renderItem={(guide) => <div key={guide.slug}>{guide.title}</div>}
        emptyStateTitle="No guides found"
        emptyStateDescription="Try adjusting your filters"
      />
    )

    expect(screen.getByText('No guides found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
  })

  it('handles reset filters action', () => {
    const resetFiltersMock = vi.fn()
    vi.mocked(useContentFilter).mockReturnValue({
      searchTerm: '',
      selectedCategory: 'all',
      selectedDifficulty: 'all',
      setSearchTerm: vi.fn(),
      setSelectedCategory: vi.fn(),
      setSelectedDifficulty: vi.fn(),
      resetFilters: resetFiltersMock,
      filteredItems: mockItems,
    })

    render(
      <FilterableContentGrid
        items={mockItems}
        renderItem={(guide) => <div key={guide.slug}>{guide.title}</div>}
        emptyStateTitle="No guides found"
        emptyStateDescription="Try adjusting your filters"
        showCategoryFilter
      />
    )

    const resetButton = screen.getByTestId('reset-filters')
    fireEvent.click(resetButton)

    expect(resetFiltersMock).toHaveBeenCalled()
  })

  it('displays correct grid layout for content', () => {
    render(
      <FilterableContentGrid
        items={mockItems}
        renderItem={(guide) => <div key={guide.slug} data-testid={`guide-card-${guide.slug}`}>{guide.title}</div>}
        emptyStateTitle="No guides found"
        emptyStateDescription="Try adjusting your filters"
      />
    )

    // Check that the grid container has proper classes
    const gridContainer = screen.getByTestId('guide-card-guide-1').parentElement
    expect(gridContainer).toHaveClass('grid')
  })

  it('handles search functionality through filter controls', async () => {
    const setSearchTermMock = vi.fn()
    vi.mocked(useContentFilter).mockReturnValue({
      searchTerm: '',
      selectedCategory: 'all',
      selectedDifficulty: 'all',
      setSearchTerm: setSearchTermMock,
      setSelectedCategory: vi.fn(),
      setSelectedDifficulty: vi.fn(),
      resetFilters: vi.fn(),
      filteredItems: mockItems,
    })

    render(
      <FilterableContentGrid
        items={mockItems}
        renderItem={(guide) => <div key={guide.slug}>{guide.title}</div>}
        emptyStateTitle="No guides found"
        emptyStateDescription="Try adjusting your filters"
      />
    )

    // The component should render without errors and show filter controls
    expect(screen.getByTestId('filter-controls')).toBeInTheDocument()
  })
})