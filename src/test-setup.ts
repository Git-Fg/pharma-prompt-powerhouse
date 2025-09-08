/**
 * Configuration moderne et simplifiée pour Vitest (2025)
 * Co-localisation des tests avec setup minimal
 */

import { beforeEach } from 'vitest'
import '@testing-library/jest-dom'

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
