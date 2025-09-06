import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'

// Mock the BreadcrumbNavigation component
vi.mock('@/components/layout/BreadcrumbNavigation', () => ({
  BreadcrumbNavigation: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}))

// Mock the ContentMetadata component
vi.mock('@/components/shared/ContentMetadata', () => ({
  ContentMetadata: () => <div data-testid="content-metadata">Metadata</div>,
}))

// Mock IntersectionObserver
beforeAll(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })),
  })
})

describe('contentPageLayout Component', () => {
  const mockItem = {
    title: 'Test Content',
    description: 'Test description',
    slug: 'test-content',
    type: 'concept' as const,
    category: 'frontend' as const,
    difficulty: 'beginner' as const,
    tags: ['test', 'concept'],
    isFavorite: false,
    problem: [],
    initialApproach: [],
    optimizedStrategy: [],
    toolComparison: [],
    keyTakeaways: [],
    conceptSlugs: [],
    content: [],
    finalPrompt: '',
  }

  const mockProps = {
    item: mockItem,
    children: <div data-testid="test-children">Test Children</div>,
  }

  it('should render with all required props', () => {
    render(<ContentPageLayout {...mockProps} />)

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    expect(screen.getByTestId('content-metadata')).toBeInTheDocument()
    expect(screen.getByTestId('test-children')).toBeInTheDocument()
  })

  it('should render content title and description', () => {
    render(<ContentPageLayout {...mockProps} />)

    expect(screen.getByRole('heading', { name: 'Test Content' })).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('should apply proper layout structure', () => {
    const { container } = render(<ContentPageLayout {...mockProps} />)

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()

    const containerDiv = container.querySelector('.max-w-4xl')
    expect(containerDiv).toBeInTheDocument()
  })

  it('should render children in main area', () => {
    render(<ContentPageLayout {...mockProps} />)

    const main = screen.getByTestId('test-children').closest('main')
    expect(main).toBeInTheDocument()
  })

  it('should apply prose class by default', () => {
    const { container } = render(<ContentPageLayout {...mockProps} />)

    const main = container.querySelector('main')
    expect(main).toHaveClass('prose')
    expect(main).toHaveClass('prose-lg')
    expect(main).toHaveClass('dark:prose-invert')
  })

  it('should handle prose prop set to false', () => {
    const propsWithoutProse = {
      ...mockProps,
      prose: false,
    }

    const { container } = render(<ContentPageLayout {...propsWithoutProse} />)

    const main = container.querySelector('main')
    expect(main).not.toHaveClass('prose')
    expect(main).toHaveClass('max-w-none')
  })

  it('should render custom header content when provided', () => {
    const propsWithCustomHeader = {
      ...mockProps,
      headerContent: <div data-testid="custom-header">Custom Header</div>,
    }

    render(<ContentPageLayout {...propsWithCustomHeader} />)

    expect(screen.getByTestId('custom-header')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Test Content' })).not.toBeInTheDocument()
  })

  it('should handle item without description', () => {
    const itemWithoutDescription = { ...mockItem, description: '', finalPrompt: '' }
    const propsWithItemWithoutDescription = { ...mockProps, item: itemWithoutDescription }

    render(<ContentPageLayout {...propsWithItemWithoutDescription} />)

    expect(screen.getByRole('heading', { name: 'Test Content' })).toBeInTheDocument()
    expect(screen.getByTestId('test-children')).toBeInTheDocument()
  })
})
