/**
 * Modern Test Utilities 2025
 *
 * Utilitaires de test modernes utilisant les meilleures pratiques :
 * - @testing-library/react pour le rendu
 * - @testing-library/user-event pour les interactions
 * - Glass Box Principle
 */

import type { RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

/**
 * Wrapper de rendu personnalisé avec user-event configuré
 */
export interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Options pour user-event
  userEventOptions?: Parameters<typeof userEvent.setup>[0]
}

/**
 * Fonction de rendu personnalisée qui configure automatiquement user-event
 */
export function renderWithUserEvent(
  ui: ReactElement,
  options: CustomRenderOptions = {},
) {
  const { userEventOptions, ...renderOptions } = options

  // Configuration user-event optimisée pour browser mode
  const user = userEvent.setup({
    delay: null, // Tests plus rapides
    ...userEventOptions,
  })

  const renderResult = render(ui, renderOptions)

  return {
    user,
    ...renderResult,
  }
}

/**
 * Factory pour créer des données de test typées
 */
export const TestDataFactory = {
  guide: (overrides = {}) => ({
    slug: 'test-guide',
    title: 'Guide de Test',
    description: 'Description de test',
    category: 'general' as const,
    difficulty: 'beginner' as const,
    tags: ['test'],
    isFavorite: false,
    isWorkflow: false,
    content: [],
    conceptSlugs: ['test-concept'],
    ...overrides,
  }),

  concept: (overrides = {}) => ({
    slug: 'test-concept',
    title: 'Concept de Test',
    description: 'Description de concept',
    category: 'general' as const,
    difficulty: 'beginner' as const,
    tags: ['test'],
    isFavorite: false,
    keyTakeaways: ['Point clé 1', 'Point clé 2'],
    content: [],
    ...overrides,
  }),

  workflow: (overrides = {}) => ({
    slug: 'test-workflow',
    title: 'Workflow de Test',
    description: 'Description de workflow',
    category: 'general' as const,
    difficulty: 'intermediate' as const,
    tags: ['workflow', 'test'],
    isFavorite: false,
    isWorkflow: true,
    content: [],
    conceptSlugs: ['test-concept'],
    ...overrides,
  }),

  externalTool: (overrides = {}) => ({
    slug: 'test-tool',
    title: 'Outil Externe',
    description: 'Description d\'outil',
    category: 'tools' as const,
    difficulty: 'beginner' as const,
    tags: ['tool', 'external'],
    isFavorite: false,
    url: 'https://example.com',
    content: [],
    ...overrides,
  }),
}

/**
 * Utilitaires pour les tests d'accessibilité sans vitest-axe pour l'instant
 */
export const AccessibilityTestUtils = {
  /**
   * Vérifie qu'un bouton est accessible
   */
  expectAccessibleButton(button: HTMLElement) {
    expect(button).toBeInTheDocument()
    expect(button).toBeVisible()
    expect(button).toBeEnabled()
    // Un bouton peut ne pas avoir type (implicitement "submit" dans un form, "button" sinon)
    if (button.tagName.toLowerCase() === 'button') {
      expect(button).toHaveAttribute('type')
    }
    // Un bouton doit avoir un nom accessible (soit textContent, soit aria-label)
    const hasAccessibleName = button.textContent?.trim() || button.getAttribute('aria-label')
    expect(hasAccessibleName).toBeTruthy()
  },

  /**
   * Vérifie qu'un lien est accessible
   */
  expectAccessibleLink(link: HTMLElement) {
    expect(link).toBeInTheDocument()
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href')
    expect(link.getAttribute('href')).not.toBe('#')
    expect(link.getAttribute('href')).not.toBe('')
    // Un lien doit avoir un nom accessible
    const hasAccessibleName = link.textContent?.trim() || link.getAttribute('aria-label')
    expect(hasAccessibleName).toBeTruthy()
  },

  /**
   * Vérifie qu'un élément interactif a le bon focus
   */
  expectProperFocus(element: HTMLElement) {
    expect(element).toHaveFocus()
    expect(element).toBeVisible()
  },
}

/**
 * Utilitaires pour les interactions utilisateur modernes
 */
export const UserInteractionUtils = {
  /**
   * Clique sur un élément avec gestion d'erreur
   */
  async clickElement(user: ReturnType<typeof userEvent.setup>, element: HTMLElement) {
    expect(element).toBeVisible()
    expect(element).toBeEnabled()
    await user.click(element)
  },

  /**
   * Tape du texte dans un champ avec validation
   */
  async typeInField(user: ReturnType<typeof userEvent.setup>, field: HTMLElement, text: string) {
    expect(field).toBeVisible()
    expect(field).toBeEnabled()
    await user.type(field, text)
    expect(field).toHaveValue(text)
  },

  /**
   * Navigation au clavier
   */
  async navigateWithKeyboard(user: ReturnType<typeof userEvent.setup>, key: string) {
    await user.keyboard(key)
  },
}

/**
 * Utilitaires pour les assertions de test robustes
 */
export const TestAssertions = {
  /**
   * Vérifie qu'un élément avec test-id existe et est visible
   */
  expectTestIdVisible(testId: string) {
    const element = screen.getByTestId(testId)
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    return element
  },

  /**
   * Vérifie qu'un élément avec test-id existe (peut être caché)
   */
  expectTestIdExists(testId: string) {
    const element = screen.getByTestId(testId)
    expect(element).toBeInTheDocument()
    return element
  },

  /**
   * Vérifie qu'un élément avec test-id n'existe pas
   */
  expectTestIdNotExists(testId: string) {
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
  },

  /**
   * Vérifie qu'un texte est présent et visible
   */
  expectTextVisible(text: string | RegExp) {
    const element = screen.getByText(text)
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
    return element
  },

  /**
   * Gère les éléments dupliqués (desktop/mobile)
   */
  expectDuplicatedElements(testId: string, expectedCount: number = 2) {
    const elements = screen.getAllByTestId(testId)
    expect(elements).toHaveLength(expectedCount)
    elements.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
    return elements
  },
}

/**
 * Mock factories modernes pour les dépendances externes
 */
export const MockFactories = {
  router: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),

  theme: (overrides = {}) => ({
    theme: 'light',
    setTheme: vi.fn(),
    systemTheme: 'light',
    themes: ['light', 'dark'],
    resolvedTheme: 'light',
    ...overrides,
  }),

  searchParams: (params: Record<string, string> = {}) =>
    new URLSearchParams(params),
}

/**
 * Fonction d'aide pour nettoyer les mocks entre les tests
 */
export function clearAllMocks() {
  vi.clearAllMocks()
}

/**
 * Export des utilitaires principaux pour l'import simple
 */
export {
  render,
  screen,
  userEvent,
}
