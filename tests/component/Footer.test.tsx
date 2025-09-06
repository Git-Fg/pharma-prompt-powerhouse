import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Footer } from '@/components/layout/Footer'

// Mock the content loader to provide consistent test data
vi.mock('@/lib/content-loader', () => ({
  content: {
    workflows: [
      { slug: 'test-workflow-1', title: 'Test Workflow 1', isFavorite: true },
      { slug: 'test-workflow-2', title: 'Test Workflow 2', isFavorite: true },
      { slug: 'test-workflow-3', title: 'Test Workflow 3', isFavorite: true }, // Ensure 3 favorites for the test
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

describe('footer Component', () => {
  let desktopFooter: HTMLElement
  let mobileFooter: HTMLElement

  beforeEach(() => {
    render(<Footer />)
    // The footer renders two versions: one for lg+ screens and one for smaller screens.
    // We need to query them separately to avoid ambiguity.
    const footer = screen.getByRole('contentinfo')
    desktopFooter = within(footer).getByTestId('desktop-footer')
    mobileFooter = within(footer).getByTestId('mobile-footer')
  })

  // Test the desktop view
  describe('desktop Footer View', () => {
    it('renders the brand name', () => {
      expect(within(desktopFooter).getByText('Pharma Prompt')).toBeInTheDocument()
    })

    it('renders the brand description with correct semantic class', () => {
      const description = within(desktopFooter).getByText(/Mon carnet de notes personnel/)
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('prose-slogan')
    })

    it('renders all main navigation links', () => {
      const nav = within(desktopFooter).getByRole('navigation', { name: /navigation/i })
      expect(within(nav).getByRole('link', { name: 'Accueil' })).toBeInTheDocument()
      expect(within(nav).getByRole('link', { name: 'Workflows Stratégiques' })).toBeInTheDocument()
    })

    it('renders the legal section with correct links', () => {
      const legal = within(desktopFooter).getByRole('navigation', { name: /sécurité & légal/i })
      expect(within(legal).getByRole('link', { name: 'Confidentialité' })).toHaveAttribute(
        'href',
        '/guides/confidentialite-securite',
      )
    })

    it('renders recent workflows with correct links', () => {
      const workflows = within(desktopFooter).getByRole('navigation', { name: /workflows/i })
      expect(within(workflows).getByRole('link', { name: 'Test Workflow 1' })).toHaveAttribute(
        'href',
        '/workflows/test-workflow-1',
      )
      expect(within(workflows).getByRole('link', { name: 'Voir tous' })).toHaveAttribute('href', '/workflows')
    })
  })

  // Test the mobile view
  describe('mobile Footer View', () => {
    it('renders the brand name', () => {
      expect(within(mobileFooter).getByText('Pharma Prompt')).toBeInTheDocument()
    })

    it('renders all main navigation links', () => {
      const navs = within(mobileFooter).getAllByRole('navigation', { name: /navigation/i })
      expect(navs.length).toBeGreaterThan(0)
      const nav = navs[0]
      if (nav) {
        expect(within(nav).getByRole('link', { name: 'Accueil' })).toBeInTheDocument()
      }
    })

    it('renders the "Voir tous" link for workflows', () => {
      const workflowsNavs = within(mobileFooter).getAllByRole('navigation', { name: /workflows/i })
      expect(workflowsNavs.length).toBeGreaterThan(0)
      const workflows = workflowsNavs[0]
      if (workflows) {
        expect(within(workflows).getByRole('link', { name: /Voir tous/ })).toBeInTheDocument()
      }
    })
  })

  // General tests applicable to both views
  describe('copyright and Accessibility', () => {
    it('renders copyright notice', () => {
      // Test is simplified to check for presence, as year can change.
      expect(screen.getByText(/Pharma Prompt Powerhouse. Tous droits réservés./)).toBeInTheDocument()
    })

    it('has proper heading hierarchy', () => {
      const desktopHeadings = within(desktopFooter).getAllByRole('heading', { level: 3 })
      expect(desktopHeadings).toHaveLength(3)
      expect(desktopHeadings[0]).toHaveTextContent('Navigation')

      const mobileHeadings = within(mobileFooter).getAllByRole('heading', { level: 3 })
      expect(mobileHeadings).toHaveLength(3)
    })
  })
})
