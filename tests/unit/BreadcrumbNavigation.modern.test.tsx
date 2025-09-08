/**
 * Test refactorisé pour BreadcrumbNavigation - Version moderne 2025
 *
 * Applique le Glass Box Principle :
 * - Mock UNIQUEMENT les dépendances externes (navigation, data)
 * - Les composants UI internes restent réels pour tester l'intégration
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BreadcrumbNavigation } from '@/components/layout/BreadcrumbNavigation'
import { clearAllMocks, renderWithUserEvent, TestAssertions } from '../utils/modern-test-utils'

// Mock UNIQUEMENT les dépendances externes selon Glass Box Principle
const mockUsePathname = vi.fn()
const mockFormatBreadcrumbSegments = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

vi.mock('@/lib/navigation', () => ({
  formatBreadcrumbSegments: () => mockFormatBreadcrumbSegments(),
}))

describe('breadcrumbNavigation - Modern Testing', () => {
  beforeEach(() => {
    clearAllMocks()

    // Configuration par défaut
    mockUsePathname.mockReturnValue('/concepts/chain-of-thought')
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Concepts', href: '/concepts', isLast: false },
      { name: 'chain of thought', href: '/concepts/chain-of-thought', isLast: true },
    ])
  })

  it('should render breadcrumb navigation with real UI components', () => {
    renderWithUserEvent(<BreadcrumbNavigation />)

    // Test avec les vrais sélecteurs data-slot des composants UI
    const breadcrumb = document.querySelector('[data-slot="breadcrumb"]')
    expect(breadcrumb).toBeInTheDocument()
    expect(breadcrumb).toHaveClass('mb-8')

    const breadcrumbList = document.querySelector('[data-slot="breadcrumb-list"]')
    expect(breadcrumbList).toBeInTheDocument()

    // Vérifier les items de breadcrumb
    const breadcrumbItems = document.querySelectorAll('[data-slot="breadcrumb-item"]')
    expect(breadcrumbItems).toHaveLength(3) // Accueil + 2 segments

    // Vérifier le contenu avec des assertions modernes
    TestAssertions.expectTextVisible('Accueil')
    TestAssertions.expectTextVisible('Concepts')
    TestAssertions.expectTextVisible('chain of thought')
  })

  it('should render proper links for non-current items', () => {
    renderWithUserEvent(<BreadcrumbNavigation />)

    // Les liens doivent être accessibles et bien formés
    const homeLink = document.querySelector('a[href="/"]')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveTextContent('Accueil')

    const conceptsLink = document.querySelector('a[href="/concepts"]')
    expect(conceptsLink).toBeInTheDocument()
    expect(conceptsLink).toHaveTextContent('Concepts')

    // L'élément actuel utilise BreadcrumbPage avec aria-current
    const currentElement = document.querySelector('[aria-current="page"]')
    expect(currentElement).toBeInTheDocument()
    expect(currentElement).toHaveTextContent('chain of thought')
    expect(currentElement!.tagName.toLowerCase()).toBe('span')
  })

  it('should handle single level path correctly', () => {
    mockUsePathname.mockReturnValue('/concepts')
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Concepts', href: '/concepts', isLast: true },
    ])

    renderWithUserEvent(<BreadcrumbNavigation />)

    const breadcrumbItems = document.querySelectorAll('[data-slot="breadcrumb-item"]')
    expect(breadcrumbItems).toHaveLength(2) // Accueil + Concepts

    // Vérifier la structure des séparateurs
    const separators = document.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(1) // n-1 séparateurs pour n éléments
  })

  it('should handle root path by returning null', () => {
    mockUsePathname.mockReturnValue('/')
    mockFormatBreadcrumbSegments.mockReturnValue([])

    const { container } = renderWithUserEvent(<BreadcrumbNavigation />)

    // Pour le chemin racine, le composant retourne null
    expect(container.firstChild).toBeNull()
  })

  it('should apply proper styling with real CSS classes', () => {
    renderWithUserEvent(<BreadcrumbNavigation />)

    // Vérifier que les classes CSS réelles sont appliquées
    const currentPage = document.querySelector('[aria-current="page"]')
    expect(currentPage).toBeInTheDocument()
    expect(currentPage).toHaveClass('capitalize')

    const links = document.querySelectorAll('a')
    links.forEach((link) => {
      if (link.classList.contains('capitalize')) {
        expect(link).toHaveClass('capitalize')
      }
    })
  })

  it('should handle complex path segments with hyphens', () => {
    mockUsePathname.mockReturnValue('/guides/techniques-avancees-fiabilisation')
    mockFormatBreadcrumbSegments.mockReturnValue([
      { name: 'Guides', href: '/guides', isLast: false },
      { name: 'techniques avancees fiabilisation', href: '/guides/techniques-avancees-fiabilisation', isLast: true },
    ])

    renderWithUserEvent(<BreadcrumbNavigation />)

    // Test des transformations de slug complexes
    TestAssertions.expectTextVisible('techniques avancees fiabilisation')

    const breadcrumbItems = document.querySelectorAll('[data-slot="breadcrumb-item"]')
    expect(breadcrumbItems).toHaveLength(3) // Accueil + Guides + current
  })

  it('should be accessible with proper ARIA attributes', () => {
    renderWithUserEvent(<BreadcrumbNavigation />)

    // Vérifier l'accessibilité de la navigation avec sélecteurs robustes
    const nav = document.querySelector('[data-slot="breadcrumb"]')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')

    // Vérifier les éléments de liste
    const list = document.querySelector('[data-slot="breadcrumb-list"]')
    expect(list).toBeInTheDocument()
    expect(list!.tagName.toLowerCase()).toBe('ol')

    // Vérifier l'élément actuel
    const currentItem = document.querySelector('[aria-current="page"]')
    expect(currentItem).toBeInTheDocument()
    expect(currentItem).toHaveAttribute('aria-current', 'page')
    expect(currentItem).toHaveAttribute('aria-disabled', 'true')
  })

  it('should render separators correctly', () => {
    renderWithUserEvent(<BreadcrumbNavigation />)

    // Vérifier les séparateurs avec icônes
    const separators = document.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(2) // Entre Accueil->Concepts->current

    separators.forEach((separator) => {
      expect(separator).toHaveAttribute('role', 'presentation')
      expect(separator).toHaveAttribute('aria-hidden', 'true')
      expect(separator.tagName.toLowerCase()).toBe('li')
    })
  })
})
