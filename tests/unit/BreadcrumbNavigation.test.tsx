import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BreadcrumbNavigation } from '@/components/layout/BreadcrumbNavigation'

// Mock the Next.js navigation module
// Note: usePathname is mocked globally in tests/setup.ts
const mockUsePathname = vi.fn()

// Mock navigation utilities
const mockFormatBreadcrumbSegments = vi.fn()

vi.mock('@/lib/navigation', () => ({
  formatBreadcrumbSegments: () => mockFormatBreadcrumbSegments(),
}))

// Note: lucide-react icons are mocked globally in tests/setup.ts

describe('breadcrumbNavigation Component', () => {
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

    expect(screen.getAllByText('Accueil')).toHaveLength(2) // Appears twice in breadcrumb
    expect(screen.getByText('Concepts')).toBeInTheDocument()
    expect(screen.getByText('chain of thought')).toBeInTheDocument()
  })

  it('should render links for all but the last breadcrumb', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const homeLinks = screen.getAllByText('Accueil').map(text => text.closest('a'))
    expect(homeLinks[0]).toHaveAttribute('href', '/')

    const conceptsLink = screen.getByText('Concepts').closest('a')
    expect(conceptsLink).toHaveAttribute('href', '/concepts')

    const currentLink = screen.getByText('chain of thought').closest('a')
    expect(currentLink).toBeNull() // Last item should not be a link
  })

  it('should render correct number of separators', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const { container } = render(<BreadcrumbNavigation />)

    const separators = container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(2) // n-1 separators for n items
  })

  it('should apply proper styling to current page', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const currentPage = screen.getByText('chain of thought')
    expect(currentPage).toHaveClass('capitalize')
  })

  it('should apply proper styling to breadcrumb links', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const conceptsLink = screen.getByText('Concepts').closest('a')
    expect(conceptsLink).toHaveClass('capitalize')
  })

  it('should handle root path', () => {
    mockUsePathname.mockReturnValue('/')

    render(<BreadcrumbNavigation />)

    // For root path, the component returns null
    expect(screen.queryByText('Accueil')).not.toBeInTheDocument()
  })

  it('should handle single level path', () => {
    mockUsePathname.mockReturnValue('/concepts')

    const { container } = render(<BreadcrumbNavigation />)

    expect(screen.getAllByText('Accueil')).toHaveLength(2)
    expect(screen.getByText('Concepts')).toBeInTheDocument()

    const separators = container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(1)
  })

  it('should apply proper navigation attributes', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('mb-8')
  })

  it('should render breadcrumb items in correct order', () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    render(<BreadcrumbNavigation />)

    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems).toHaveLength(3)

    // Check order
    expect(breadcrumbItems[0]).toContainElement(screen.getByText('Accueil'))
    expect(breadcrumbItems[1]).toContainElement(screen.getByText('Concepts'))
    expect(breadcrumbItems[2]).toContainElement(screen.getByText('chain of thought'))
  })

  it('should handle custom path segments with hyphens', () => {
    mockUsePathname.mockReturnValue('/guides/techniques-avancees-fiabilisation')

    render(<BreadcrumbNavigation />)

    expect(screen.getAllByText('Accueil')).toHaveLength(2)
    expect(screen.getByText('Guides')).toBeInTheDocument()
    expect(screen.getByText('techniques avancees fiabilisation')).toBeInTheDocument()
  })

  it('should handle l-arsenal-ia path segment', () => {
    mockUsePathname.mockReturnValue('/l-arsenal-ia/claude-ai')

    render(<BreadcrumbNavigation />)

    expect(screen.getAllByText('Accueil')).toHaveLength(2)
    expect(screen.getByText('L\'Arsenal IA')).toBeInTheDocument()
    expect(screen.getByText('claude ai')).toBeInTheDocument()
  })
})
