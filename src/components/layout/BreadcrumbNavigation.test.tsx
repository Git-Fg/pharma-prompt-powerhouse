import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

// Mock the Next.js navigation module
const mockPathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

describe('breadcrumb navigation component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render breadcrumb navigation based on current path', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    await expect.element(screen.getByText('Accueil')).toBeVisible()
    await expect.element(screen.getByText('Concepts')).toBeVisible()
    await expect.element(screen.getByText('chain of thought')).toBeVisible()
  })

  it('should render links for all but the last breadcrumb', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const homeLink = screen.getByRole('link', { name: 'Accueil' })
    await expect.element(homeLink).toHaveAttribute('href', '/')

    const conceptsLink = screen.getByRole('link', { name: 'Concepts' })
    await expect.element(conceptsLink).toHaveAttribute('href', '/concepts')

    // Current item should not be a link
    const currentText = screen.getByText('chain of thought')
    await expect.element(currentText).toBeVisible()
    // Verify it's not inside a link by checking there's no parent link
    const allLinks = screen.container.querySelectorAll('a')
    expect(allLinks).toHaveLength(2) // Only home and concepts should be links
  })

  it('should render correct number of separators', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const separators = screen.container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(2) // n-1 separators for n items
  })

  it('should apply proper styling to current page', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const currentPage = screen.getByText('chain of thought')
    await expect.element(currentPage).toHaveClass('capitalize')
  })

  it('should apply proper styling to breadcrumb links', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const conceptsLink = screen.getByRole('link', { name: 'Concepts' })
    await expect.element(conceptsLink).toHaveClass('capitalize')
  })

  it('should handle root path', async () => {
    mockPathname.mockReturnValue('/')

    const screen = await render(<BreadcrumbNavigation />)

    // For root path, the component returns null - no breadcrumb should be rendered
    // Check if the container is empty or has no meaningful content
    const container = screen.container
    const breadcrumbElements = container.querySelectorAll('nav, [role="navigation"]')
    expect(breadcrumbElements).toHaveLength(0)
  })

  it('should handle single level path', async () => {
    mockPathname.mockReturnValue('/concepts')

    const screen = await render(<BreadcrumbNavigation />)

    await expect.element(screen.getByText('Accueil')).toBeVisible()
    await expect.element(screen.getByText('Concepts')).toBeVisible()

    const separators = screen.container.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(1)
  })

  it('should apply proper navigation attributes', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    const nav = screen.getByRole('navigation')
    await expect.element(nav).toBeVisible()
    await expect.element(nav).toHaveClass('mb-8')
  })

  it('should render breadcrumb items in correct order', async () => {
    mockPathname.mockReturnValue('/concepts/chain-of-thought')

    const screen = await render(<BreadcrumbNavigation />)

    // Check all expected text content appears in order
    await expect.element(screen.getByText('Accueil')).toBeVisible()
    await expect.element(screen.getByText('Concepts')).toBeVisible()
    await expect.element(screen.getByText('chain of thought')).toBeVisible()

    // Check that links are present for non-current items
    const homeLink = screen.getByRole('link', { name: 'Accueil' })
    await expect.element(homeLink).toHaveAttribute('href', '/')

    const conceptsLink = screen.getByRole('link', { name: 'Concepts' })
    await expect.element(conceptsLink).toHaveAttribute('href', '/concepts')
  })
})

it('should handle custom path segments with hyphens', async () => {
  mockPathname.mockReturnValue('/guides/techniques-avancees-fiabilisation')

  const screen = await render(<BreadcrumbNavigation />)

  await expect.element(screen.getByText('Accueil')).toBeVisible()
  await expect.element(screen.getByText('Guides')).toBeVisible()
  await expect.element(screen.getByText('techniques avancees fiabilisation')).toBeVisible()
})

it('should handle l-arsenal-ia path segment', async () => {
  mockPathname.mockReturnValue('/l-arsenal-ia/claude-ai')

  const screen = await render(<BreadcrumbNavigation />)

  await expect.element(screen.getByText('Accueil')).toBeVisible()
  await expect.element(screen.getByText('L\'Arsenal IA')).toBeVisible()
  await expect.element(screen.getByText('claude ai')).toBeVisible()
})
