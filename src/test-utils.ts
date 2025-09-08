/**
 * Utilitaires de test modernes pour co-localisation (2025)
 * Simplifie les tests avec des helpers centralisés
 */

import type { RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

// Re-export des utilitaires de testing-library pour simplifier les imports
export { act, fireEvent, render, renderHook, screen, waitFor, within } from '@testing-library/react'
export { userEvent }
export { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Types pour les mocks simplifiés
export interface MockTheme {
  theme: string
  setTheme: (theme: string | ((prevTheme: string) => string)) => void
  themes: string[]
}

export interface MockNavigation {
  push: (href: string) => void
  back: () => void
  forward: () => void
  refresh: () => void
  pathname: string
  searchParams: URLSearchParams
}

// Factory pour créer des mocks de thème
export function createMockTheme(overrides: Partial<MockTheme> = {}): MockTheme {
  return {
    theme: 'light',
    setTheme: vi.fn(),
    themes: ['light', 'dark', 'system'],
    ...overrides,
  }
}

// Factory pour créer des mocks de navigation
export function createMockNavigation(overrides: Partial<MockNavigation> = {}): MockNavigation {
  return {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
    searchParams: new URLSearchParams(),
    ...overrides,
  }
}

// Render personnalisé avec setup utilisateur automatique
export function renderWithUser(
  ui: ReactElement,
  options?: RenderOptions,
) {
  const user = userEvent.setup()
  return {
    user,
    ...render(ui, options),
  }
}

// Helper pour attendre les animations (si AutoAnimate est utilisé)
export async function waitForAnimations(duration = 300) {
  await new Promise(resolve => setTimeout(resolve, duration))
}

// Helper pour simuler les changements de media query
export function mockMediaQuery(query: string, matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(q => ({
      matches: q === query ? matches : false,
      media: q,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}
