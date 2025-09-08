import { render, screen } from '@/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

// Mock the Next.js navigation module
const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock navigation utilities
const mockFormatBreadcrumbSegments = vi.fn()

vi.mock('@/lib/navigation', () => ({
  formatBreadcrumbSegments: () => mockFormatBreadcrumbSegments(),
}))

describe('BreadcrumbNavigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock breadcrumb segments
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Accueil', href: '/', isCurrent: false },
      { name: 'Concepts', href: '/concepts', isCurrent: false },
      { name: 'chain of thought', href: '/concepts/chain-of-thought', isCurrent: true },
    ])
  })

  it('should render breadcrumb navigation based on current path', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    // Use getAllByText for elements that may appear multiple times
    expect(screen.getAllByText('Accueil')).toHaveLength(2)
    expect(screen.getByText('Concepts')).toBeInTheDocument()
    expect(screen.getByText('chain of thought')).toBeInTheDocument()
  }))

  it('should render links for all but the last breadcrumb', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const homeLinks = screen.getAllByText('Accueil')
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/')

    const conceptsLink = screen.getByText('Concepts').closest('a')
    expect(conceptsLink).toHaveAttribute('href', '/concepts')

    // Current item should not be a link
    const currentItem = screen.getByText('chain of thought')
    expect(currentItem.closest('a')).toBeNull()
  })

  it('should handle different path structures', () => {
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Accueil', href: '/', isCurrent: false },
      { name: 'Workflows', href: '/workflows', isCurrent: false },
      { name: 'Test Workflow', href: '/workflows/test-workflow', isCurrent: true },
    ])

    mockUsePathname.mockReturnValue('/workflows/test-workflow')

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Workflows')).toBeInTheDocument()
    expect(screen.getByText('Test Workflow')).toBeInTheDocument()
  })

  it('should handle single level paths', () => {
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Accueil', href: '/', isCurrent: false },
      { name: 'Concepts', href: '/concepts', isCurrent: true },
    ])

    mockUsePathname.mockReturnValue('/concepts')

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Concepts')).toBeInTheDocument()
  })

  it('should handle home page correctly', () => {
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Accueil', href: '/', isCurrent: true },
    ])

    mockUsePathname.mockReturnValue('/')

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
  })

  it('should handle empty breadcrumb segments', () => {
    mockFormatBreadcrumbSegments.mockReturnValue([])
    mockUsePathname.mockReturnValue('/unknown')

    render(<BreadcrumbNavigation />)

    // Should render without crashing
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  describe('separator rendering', () => {
    it('should render separators between breadcrumb items', () => {
      mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

      render(<BreadcrumbNavigation />)

      // Should have separators between items
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })

  describe('link behavior', () => {
    it('should make all non-current items clickable links', () => {
      mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

      render(<BreadcrumbNavigation />)

      const homeLink = screen.getByText('Accueil').closest('a')
      const conceptsLink = screen.getByText('Concepts').closest('a')
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(conceptsLink).toHaveAttribute('href', '/concepts')
    })

    it('should not make current item a link', () => {
      mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

      render(<BreadcrumbNavigation />)

      const currentItem = screen.getByText('chain of thought')
      expect(currentItem.closest('a')).toBeNull()
    })
  })
})