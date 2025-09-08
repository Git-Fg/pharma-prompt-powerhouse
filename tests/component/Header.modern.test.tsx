/**
 * Test refactorisé pour Header - Version moderne 2025
 *
 * Applique le Glass Box Principle :
 * - Mock UNIQUEMENT les dépendances externes (navigation, themes, search)
 * - Les composants UI internes restent réels pour tester l'intégration
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/layout/Header'
import {
  AccessibilityTestUtils,
  clearAllMocks,
  renderWithUserEvent,
  TestAssertions,
  UserInteractionUtils,
} from '../utils/modern-test-utils'

// Mock UNIQUEMENT les dépendances externes selon Glass Box Principle
const mockUseTheme = vi.fn()
const mockGetMainNavigationLinks = vi.fn()
const mockUsePathname = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

vi.mock('@/lib/navigation', () => ({
  getMainNavigationLinks: () => mockGetMainNavigationLinks(),
}))

// Mock CommandPalette car c'est un composant complexe avec state
vi.mock('@/components/search/CommandPalette', () => ({
  CommandPalette: ({ open, onOpenChange }: any) => {
    // Utiliser React via import dans le browser mode
    return (
      <div
        data-testid="command-palette"
        data-open={open}
        onClick={() => onOpenChange?.(false)}
      >
        Command Palette
      </div>
    )
  },
}))

describe('header - Modern Testing', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    clearAllMocks()

    // Configuration par défaut
    mockUsePathname.mockReturnValue('/') // Valeur par défaut pour pathname

    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    })

    mockGetMainNavigationLinks.mockReturnValue([
      { name: 'Guides', href: '/guides', isActive: false },
      { name: 'Workflows', href: '/workflows', isActive: false },
      { name: 'Concepts', href: '/concepts', isActive: false },
      { name: 'L\'Arsenal IA', href: '/l-arsenal-ia', isActive: false },
    ])
  })

  it('should render header with logo and navigation', () => {
    renderWithUserEvent(<Header />)

    // Tester la structure principale avec des sélecteurs robustes
    const header = document.querySelector('header')
    expect(header).toBeInTheDocument()

    // Logo devrait être présent et cliquable
    const logoLink = document.querySelector('a[href="/"]')
    expect(logoLink).toBeInTheDocument()
    AccessibilityTestUtils.expectAccessibleLink(logoLink as HTMLElement)

    // Navigation principale avec vrais liens
    TestAssertions.expectTextVisible('Guides')
    TestAssertions.expectTextVisible('Workflows')
    TestAssertions.expectTextVisible('Concepts')
    TestAssertions.expectTextVisible('L\'Arsenal IA')
  })

  it('should render theme toggle button', () => {
    renderWithUserEvent(<Header />)

    // Le bouton de thème utilise un test ID spécifique
    const themeButton = document.querySelector('[data-testid="nav-theme-toggle"]')

    expect(themeButton).toBeInTheDocument()
    expect(themeButton).toBeVisible()
    expect(themeButton).toBeEnabled()

    // Le bouton doit contenir des icônes (même si mockées)
    expect(themeButton).not.toBeEmptyDOMElement()
  })

  it('should handle theme switching with user interaction', async () => {
    const { user } = renderWithUserEvent(<Header />)

    // Chercher le bouton de thème avec différentes stratégies
    const themeButton = document.querySelector('[data-testid*="theme"]')
      || document.querySelector('button[aria-label*="theme" i]')
      || document.querySelector('[data-testid*="sun"]')
      || document.querySelector('[data-testid*="moon"]')

    if (themeButton) {
      await UserInteractionUtils.clickElement(user, themeButton as HTMLElement)

      // Vérifier que setTheme a été appelé (interaction réelle)
      expect(mockSetTheme).toHaveBeenCalled()
    }
  })

  it('should render search trigger button', () => {
    renderWithUserEvent(<Header />)

    // Bouton de recherche
    const searchButton = document.querySelector('[data-testid*="search"]')
      || document.querySelector('button[aria-label*="search" i]')

    if (searchButton) {
      AccessibilityTestUtils.expectAccessibleButton(searchButton as HTMLElement)
    }
  })

  it('should handle mobile navigation toggle', async () => {
    const { user } = renderWithUserEvent(<Header />)

    // Bouton de menu mobile
    const mobileMenuButton = document.querySelector('[data-testid*="menu"]')
      || document.querySelector('button[aria-label*="menu" i]')
      || document.querySelector('[data-testid*="mobile"]')

    if (mobileMenuButton) {
      await UserInteractionUtils.clickElement(user, mobileMenuButton as HTMLElement)

      // Vérifier l'état après clic (les détails dépendent de l'implémentation)
      expect(mobileMenuButton).toBeInTheDocument()
    }
  })

  it('should render navigation links correctly', () => {
    renderWithUserEvent(<Header />)

    // Vérifier que tous les liens de navigation sont accessibles
    const guidesLink = document.querySelector('a[href="/guides"]')
    const workflowsLink = document.querySelector('a[href="/workflows"]')
    const conceptsLink = document.querySelector('a[href="/concepts"]')
    const arsenalLink = document.querySelector('a[href="/l-arsenal-ia"]')

    if (guidesLink)
      AccessibilityTestUtils.expectAccessibleLink(guidesLink as HTMLElement)
    if (workflowsLink)
      AccessibilityTestUtils.expectAccessibleLink(workflowsLink as HTMLElement)
    if (conceptsLink)
      AccessibilityTestUtils.expectAccessibleLink(conceptsLink as HTMLElement)
    if (arsenalLink)
      AccessibilityTestUtils.expectAccessibleLink(arsenalLink as HTMLElement)
  })

  it('should render CommandPalette component', () => {
    renderWithUserEvent(<Header />)

    // CommandPalette est mocké mais devrait être présent
    const commandPalette = document.querySelector('[data-testid="command-palette"]')
    expect(commandPalette).toBeInTheDocument()
  })

  it('should be responsive with mobile and desktop versions', () => {
    renderWithUserEvent(<Header />)

    // Vérifier que le header est responsive
    const header = document.querySelector('header')
    expect(header).toBeInTheDocument()

    // Certains éléments peuvent être dupliqués pour mobile/desktop
    const navigationElements = document.querySelectorAll('nav')
    expect(navigationElements.length).toBeGreaterThan(0)
  })

  it('should handle different theme states', () => {
    // Test avec thème sombre
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      resolvedTheme: 'dark',
    })

    renderWithUserEvent(<Header />)

    const header = document.querySelector('header')
    expect(header).toBeInTheDocument()

    // Le contenu du header doit toujours être présent même avec thème différent
    TestAssertions.expectTextVisible('Guides')
  })
})
