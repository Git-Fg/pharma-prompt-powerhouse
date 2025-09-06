import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BreadcrumbNavigation } from '@/components/layout/BreadcrumbNavigation'

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/concepts/chain-of-thought',
}))

describe('breadcrumbNavigation Component', () => {
  it('should render breadcrumb navigation based on current path', () => {
    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Concepts')).toBeInTheDocument()
    expect(screen.getByText('Chain of Thought')).toBeInTheDocument()
  })

  it('should render links for all but the last breadcrumb', () => {
    render(<BreadcrumbNavigation />)

    const homeLink = screen.getByText('Accueil').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')

    const conceptsLink = screen.getByText('Concepts').closest('a')
    expect(conceptsLink).toHaveAttribute('href', '/concepts')

    const currentLink = screen.getByText('Chain of Thought').closest('a')
    expect(currentLink).toBeNull() // Last item should not be a link
  })

  it('should render correct number of separators', () => {
    render(<BreadcrumbNavigation />)

    const separators = screen.getAllByRole('separator')
    expect(separators).toHaveLength(2) // n-1 separators for n items
  })

  it('should apply proper styling to current page', () => {
    render(<BreadcrumbNavigation />)

    const currentPage = screen.getByText('Chain of Thought')
    expect(currentPage).toHaveClass('capitalize')
  })

  it('should apply proper styling to breadcrumb links', () => {
    render(<BreadcrumbNavigation />)

    const homeLink = screen.getByText('Accueil').closest('a')
    expect(homeLink).toHaveClass('capitalize')
  })

  it('should handle root path', () => {
    vi.mock('next/navigation', () => ({
      usePathname: () => '/',
    }))

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()

    // No separators for root path
    const separators = screen.queryAllByRole('separator')
    expect(separators).toHaveLength(0)
  })

  it('should handle single level path', () => {
    vi.mock('next/navigation', () => ({
      usePathname: () => '/concepts',
    }))

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Concepts')).toBeInTheDocument()

    const separators = screen.getAllByRole('separator')
    expect(separators).toHaveLength(1)
  })

  it('should apply proper navigation attributes', () => {
    render(<BreadcrumbNavigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('mb-8')
  })

  it('should render breadcrumb items in correct order', () => {
    render(<BreadcrumbNavigation />)

    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems).toHaveLength(3)

    // Check order
    expect(breadcrumbItems[0]).toContainElement(screen.getByText('Accueil'))
    expect(breadcrumbItems[1]).toContainElement(screen.getByText('Concepts'))
    expect(breadcrumbItems[2]).toContainElement(screen.getByText('Chain of Thought'))
  })

  it('should handle custom path segments with hyphens', () => {
    vi.mock('next/navigation', () => ({
      usePathname: () => '/guides/techniques-avancees-fiabilisation',
    }))

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Guides')).toBeInTheDocument()
    expect(screen.getByText('Techniques Avancees Fiabilisation')).toBeInTheDocument()
  })

  it('should handle l-arsenal-ia path segment', () => {
    vi.mock('next/navigation', () => ({
      usePathname: () => '/l-arsenal-ia/claude-ai',
    }))

    render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('L\'Arsenal IA')).toBeInTheDocument()
    expect(screen.getByText('Claude Ai')).toBeInTheDocument()
  })
})
