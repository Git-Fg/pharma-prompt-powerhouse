import { render, screen, within } from '@/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Footer } from './Footer'

// Mock the content loader to provide consistent test data
vi.mock('@/lib/content-loader', () => ({
  content: {
    workflows: [
      { slug: 'test-workflow-1', title: 'Test Workflow 1', isFavorite: true },
      { slug: 'test-workflow-2', title: 'Test Workflow 2', isFavorite: true },
      { slug: 'test-workflow-3', title: 'Test Workflow 3', isFavorite: true },
      { slug: 'test-workflow-4', title: 'Test Workflow 4', isFavorite: false },
    ],
  },
}))

// Mock navigation to control the links rendered
vi.mock('@/lib/navigation', () => ({
  getNavigationLinksBySection: (section: string) => {
    if (section === 'main') {
      return [
        { name: 'Accueil', href: '/', icon: null },
        { name: 'Par où commencer', href: '/par-ou-commencer', icon: null },
        { name: 'Workflows Stratégiques', href: '/workflows', icon: null },
        { name: 'L\'Arsenal IA', href: '/l-arsenal-ia', icon: null },
        { name: 'Concepts', href: '/concepts', icon: null },
      ]
    }
    if (section === 'legal') {
      return [{ name: 'Confidentialité', href: '/guides/confidentialite-securite', icon: null }]
    }
    return []
  },
}))

describe('Footer Component', () => {
  let desktopFooter: HTMLElement
  let mobileFooter: HTMLElement

  beforeEach(() => {
    render(<Footer />)
    // The footer renders two versions: one for lg+ screens and one for smaller screens.
    const footer = screen.getByRole('contentinfo')
    desktopFooter = within(footer).getByTestId('desktop-footer')
    mobileFooter = within(footer).getByTestId('mobile-footer')
  })

  describe('Desktop Footer', () => {
    it('renders the desktop footer section correctly', () => {
      expect(desktopFooter).toBeInTheDocument()
      
      // Check main navigation links
      expect(within(desktopFooter).getByText('Accueil')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('Par où commencer')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('Workflows Stratégiques')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('L\'Arsenal IA')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('Concepts')).toBeInTheDocument()
    })

    it('renders favorite workflows section', () => {
      expect(within(desktopFooter).getByText('Workflows Favoris')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('Test Workflow 1')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('Test Workflow 2')).toBeInTheDocument()
      expect(within(desktopFooter).getByText('Test Workflow 3')).toBeInTheDocument()
    })

    it('renders legal links section', () => {
      expect(within(desktopFooter).getByText('Confidentialité')).toBeInTheDocument()
    })

    it('renders copyright notice', () => {
      expect(within(desktopFooter).getByText(/© 2025/)).toBeInTheDocument()
    })
  })

  describe('Mobile Footer', () => {
    it('renders the mobile footer section correctly', () => {
      expect(mobileFooter).toBeInTheDocument()
      
      // Check that main navigation links are present in mobile version
      expect(within(mobileFooter).getByText('Accueil')).toBeInTheDocument()
      expect(within(mobileFooter).getByText('Par où commencer')).toBeInTheDocument()
      expect(within(mobileFooter).getByText('Workflows Stratégiques')).toBeInTheDocument()
    })

    it('renders copyright in mobile version', () => {
      expect(within(mobileFooter).getByText(/© 2025/)).toBeInTheDocument()
    })
  })

  describe('Navigation Links', () => {
    it('contains working navigation links', () => {
      const homeLink = screen.getAllByRole('link', { name: 'Accueil' })[0]
      expect(homeLink).toHaveAttribute('href', '/')
      
      const workflowsLink = screen.getAllByRole('link', { name: 'Workflows Stratégiques' })[0]
      expect(workflowsLink).toHaveAttribute('href', '/workflows')
    })

    it('renders favorite workflow links correctly', () => {
      const workflow1Link = screen.getByRole('link', { name: 'Test Workflow 1' })
      expect(workflow1Link).toHaveAttribute('href', '/workflows/test-workflow-1')
    })
  })

  describe('Accessibility', () => {
    it('has proper contentinfo role', () => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('has proper heading structure', () => {
      expect(screen.getByRole('heading', { name: 'Workflows Favoris' })).toBeInTheDocument()
    })
  })
})