import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'

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

describe('collectionPageLayout Component', () => {
  const mockProps = {
    title: 'Test Collection',
    description: 'Test description',
    children: <div data-testid="test-children">Test Children</div>,
  }

  it('should render with all required props', () => {
    render(<CollectionPageLayout {...mockProps} />)

    expect(screen.getByRole('heading', { name: 'Test Collection' })).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByTestId('test-children')).toBeInTheDocument()
  })

  it('should render with stats when provided', () => {
    const propsWithStats = {
      ...mockProps,
      stats: [
        { value: '10', label: 'Total Items', type: 'primary' as const },
        { value: '5', label: 'Concepts', type: 'concepts' as const },
      ],
    }

    render(<CollectionPageLayout {...propsWithStats} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Total Items')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Concepts')).toBeInTheDocument()
  })

  it('should apply proper styling to stat cards', () => {
    const propsWithStats = {
      ...mockProps,
      stats: [
        { value: '10', label: 'Total Items', type: 'primary' as const },
        { value: '5', label: 'Concepts', type: 'concepts' as const },
        { value: '3', label: 'Guides', type: 'guides' as const },
      ],
    }

    const { container } = render(<CollectionPageLayout {...propsWithStats} />)

    const statCards = container.querySelectorAll('.stat-card')
    expect(statCards).toHaveLength(3)
  })

  it('should handle custom header className', () => {
    const propsWithCustomHeader = {
      ...mockProps,
      headerClassName: 'custom-header-class',
    }

    const { container } = render(<CollectionPageLayout {...propsWithCustomHeader} />)

    const header = container.querySelector('.border-b')
    expect(header).toHaveClass('custom-header-class')
  })

  it('should handle custom contentMaxWidth', () => {
    const propsWithCustomWidth = {
      ...mockProps,
      contentMaxWidth: '4xl' as const,
    }

    render(<CollectionPageLayout {...propsWithCustomWidth} />)

    expect(screen.getByTestId('test-children')).toBeInTheDocument()
  })

  it('should apply proper layout structure', () => {
    const { container } = render(<CollectionPageLayout {...mockProps} />)

    const page = container.querySelector('.min-h-screen')
    expect(page).toBeInTheDocument()
    expect(page).toHaveClass('bg-gradient-to-br')
  })

  it('should handle empty stats array', () => {
    const propsWithEmptyStats = {
      ...mockProps,
      stats: [],
    }

    render(<CollectionPageLayout {...propsWithEmptyStats} />)

    expect(screen.getByRole('heading', { name: 'Test Collection' })).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('should handle undefined stats', () => {
    render(<CollectionPageLayout {...mockProps} />)

    expect(screen.getByRole('heading', { name: 'Test Collection' })).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})
