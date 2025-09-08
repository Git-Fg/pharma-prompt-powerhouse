/**
 * Configuration moderne et simplifiée pour Vitest (2025)
 * Architecture projects avec setup optimisé par environnement
 */

import React from 'react'
import { beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom'

// Ajout de React aux globals pour les tests de composants
globalThis.React = React

// Configuration globale pour tous les tests
beforeEach(() => {
  // Reset des mocks globaux entre chaque test
  vi.clearAllMocks()
})

// Mocks globaux minimaux pour l'environnement de test
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock pour ResizeObserver (utilisé par certains composants UI)
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock pour IntersectionObserver (si nécessaire)
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock pour scrollIntoView (souvent utilisé dans les tests)
Element.prototype.scrollIntoView = vi.fn()

// Mock global pour next/navigation (évite les conflits entre tests)
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    usePathname: vi.fn(() => '/'),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    })),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    notFound: vi.fn(() => {
      throw new Error('NOT_FOUND')
    }),
  }
})

// Mock global pour next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode, href: string, [key: string]: unknown }) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock global pour next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    setTheme: vi.fn(),
    themes: ['light', 'dark', 'system'],
  })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))
