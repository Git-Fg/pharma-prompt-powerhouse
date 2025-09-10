import { render } from 'vitest-browser-react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

// Mock the Next.js navigation module
const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('BreadcrumbNavigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render breadcrumb navigation based on current path', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeVisible()
    expect(screen.getByText('Concepts')).toBeVisible()
    expect(screen.getByText('chain of thought')).toBeVisible()
  })

  it('should render links for all but the last breadcrumb', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const homeLink = screen.getByText('Accueil').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')

    const conceptsLink = screen.getByText('Concepts').closest('a')
    expect(conceptsLink).toHaveAttribute('href', '/concepts')

    const currentLink = screen.getByText('chain of thought').closest('a')
    expect(currentLink).toBeNull() // Last item should not be a link
  })

  it('should render correct number of separators', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const separators = screen.container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(2) // n-1 separators for n items
  })

  it('should apply proper styling to current page', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const currentPage = screen.getByText('chain of thought')
    expect(currentPage).toHaveClass('capitalize')
  })

  it('should apply proper styling to breadcrumb links', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const conceptsLink = screen.getByText('Concepts').closest('a')
    expect(conceptsLink).toHaveClass('capitalize')
  })

  it('should handle root path', async () => {
    mockUsePathname.mockReturnValue('/')

    const screen = await render(<BreadcrumbNavigation />)

    // For root path, the component returns null
    expect(screen.queryByText('Accueil')).not.toBeInTheDocument()
  })

  it('should handle single level path', async () => {
    mockUsePathname.mockReturnValue('/concepts')

    const screen = await render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeVisible()
    expect(screen.getByText('Concepts')).toBeVisible()

    const separators = screen.container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(1)
  })

  it('should apply proper navigation attributes', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeVisible()
    expect(nav).toHaveClass('mb-8')
  })

  it('should render breadcrumb items in correct order', async () => {
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const breadcrumbItems = screen.getAllByRole('listitem')
    expect(breadcrumbItems).toHaveLength(3)

    // Check order
    expect(breadcrumbItems[0]).toContainElement(screen.getByText('Accueil'))
    expect(breadcrumbItems[1]).toContainElement(screen.getByText('Concepts'))
    expect(breadcrumbItems[2]).toContainElement(screen.getByText('chain of thought'))
  })

  it('should handle custom path segments with hyphens', async () => {
    mockUsePathname.mockReturnValue('/guides/techniques-avancees-fiabilisation')

    const screen = await render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeVisible()
    expect(screen.getByText('Guides')).toBeVisible()
    expect(screen.getByText('techniques avancees fiabilisation')).toBeVisible()
  })

  it('should handle l-arsenal-ia path segment', async () => {
    mockUsePathname.mockReturnValue('/l-arsenal-ia/claude-ai')

    const screen = await render(<BreadcrumbNavigation />)

    expect(screen.getByText('Accueil')).toBeVisible()
    expect(screen.getByText('L\'Arsenal IA')).toBeVisible()
    expect(screen.getByText('claude ai')).toBeVisible()
  })
})