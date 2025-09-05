import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Footer } from '@/components/layout/Footer'

// Mock the content loader
vi.mock('@/lib/content-loader', () => ({
  content: {
    workflows: [
      {
        slug: 'test-workflow-1',
        title: 'Test Workflow 1',
        isFavorite: true,
      },
      {
        slug: 'test-workflow-2',
        title: 'Test Workflow 2',
        isFavorite: true,
      },
      {
        slug: 'test-workflow-3',
        title: 'Test Workflow 3',
        isFavorite: false,
      },
    ],
  },
}))

// Mock navigation function
vi.mock('@/lib/navigation', () => ({
  getNavigationLinksBySection: (section: string) => {
    if (section === 'main') {
      return [
        { name: 'Accueil', href: '/', icon: () => null },
        { name: 'Par où commencer ?', href: '/par-ou-commencer', icon: () => null },
        { name: 'Workflows Stratégiques', href: '/workflows', icon: () => null },
        { name: 'L\'Arsenal IA', href: '/l-arsenal-ia', icon: () => null },
        { name: 'Concepts', href: '/concepts', icon: () => null },
      ]
    }
    if (section === 'legal') {
      return [
        { name: 'Confidentialité', href: '/guides/confidentialite-securite', icon: () => null },
      ]
    }
    return []
  },
}))

describe('footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  describe('brand Section', () => {
    it('renders the brand logo and name', () => {
      expect(screen.getByText('Pharma Prompt')).toBeInTheDocument()
    })

    it('renders the brand description with semantic utility class', () => {
      const description = screen.getByText(/Mon carnet de notes personnel/)
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('prose-slogan')
    })

    it('applies container-content-width utility to brand description container', () => {
      const brandContainer = screen.getByText(/Mon carnet de notes personnel/).closest('.container-content-width')
      expect(brandContainer).toBeInTheDocument()
    })
  })

  describe('navigation Section', () => {
    it('renders navigation section title', () => {
      expect(screen.getByText('Navigation')).toBeInTheDocument()
    })

    it('renders all main navigation links', () => {
      expect(screen.getByRole('link', { name: /Accueil/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Par où commencer/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Workflows Stratégiques/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /L'Arsenal IA/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Concepts/ })).toBeInTheDocument()
    })

    it('navigation links have correct hrefs', () => {
      expect(screen.getByRole('link', { name: /Accueil/ })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: /Par où commencer/ })).toHaveAttribute('href', '/par-ou-commencer')
    })
  })

  describe('legal Section', () => {
    it('renders legal section title', () => {
      expect(screen.getByText('Sécurité & Légal')).toBeInTheDocument()
    })

    it('renders confidentiality link', () => {
      expect(screen.getByRole('link', { name: /Confidentialité/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Confidentialité/ })).toHaveAttribute('href', '/guides/confidentialite-securite')
    })
  })

  describe('recent Workflows Section', () => {
    it('renders workflows section title', () => {
      expect(screen.getByText('Derniers Workflows')).toBeInTheDocument()
    })

    it('renders workflow links', () => {
      expect(screen.getByRole('link', { name: 'Test Workflow 1' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Test Workflow 2' })).toBeInTheDocument()
    })

    it('renders "Voir tous les workflows" link', () => {
      expect(screen.getByRole('link', { name: /Voir tous les workflows/ })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Voir tous les workflows/ })).toHaveAttribute('href', '/workflows')
    })

    it('workflow links have correct hrefs', () => {
      expect(screen.getByRole('link', { name: 'Test Workflow 1' })).toHaveAttribute('href', '/workflows/test-workflow-1')
      expect(screen.getByRole('link', { name: 'Test Workflow 2' })).toHaveAttribute('href', '/workflows/test-workflow-2')
    })
  })

  describe('grid Layout', () => {
    it('applies responsive grid classes', () => {
      const grid = screen.getByText('Pharma Prompt').closest('.grid')
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'xl:grid-cols-4')
    })

    it('brand section spans 2 columns on xl screens', () => {
      const brandSection = screen.getByText('Pharma Prompt').closest('.xl\\:col-span-2')
      expect(brandSection).toBeInTheDocument()
    })
  })

  describe('copyright Section', () => {
    it('renders copyright notice', () => {
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(`© ${currentYear} Pharma Prompt Powerhouse. Tous droits réservés.`)).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('uses proper semantic footer element', () => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('has proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading', { level: 3 })
      expect(headings).toHaveLength(3)
      expect(headings[0]).toHaveTextContent('Navigation')
      expect(headings[1]).toHaveTextContent('Sécurité & Légal')
      expect(headings[2]).toHaveTextContent('Derniers Workflows')
    })
  })
})
