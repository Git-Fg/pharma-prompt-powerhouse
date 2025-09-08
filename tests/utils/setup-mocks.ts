/**
 * Setup de mocks modernes pour les tests
 *
 * Suit le Glass Box Principle :
 * - Mock UNIQUEMENT les dépendances externes
 * - Les composants internes restent réels pour tester l'intégration
 */

import React from 'react'
import { vi } from 'vitest'

/**
 * Mock pour Next.js navigation - External dependency
 */
export function mockNextNavigation() {
  vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    })),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    usePathname: vi.fn(() => '/'),
    redirect: vi.fn(),
    notFound: vi.fn(),
  }))
}

/**
 * Mock pour Next.js Link - External dependency
 */
export function mockNextLink() {
  vi.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, ...props }: any) =>
      React.createElement('a', { href, ...props }, children),
  }))
}

/**
 * Mock pour next-themes - External dependency
 */
export function mockNextThemes() {
  vi.mock('next-themes', () => ({
    useTheme: vi.fn(() => ({
      theme: 'light',
      setTheme: vi.fn(),
      systemTheme: 'light',
      themes: ['light', 'dark'],
      resolvedTheme: 'light',
    })),
  }))
}

/**
 * Mock pour le content loader - External data dependency
 */
export function mockContentLoader() {
  vi.mock('@/lib/content-loader', () => ({
    getContentItem: vi.fn(),
    getAllContent: vi.fn(() => []),
    getContentByType: vi.fn(() => []),
    searchContent: vi.fn(() => []),
  }))
}

/**
 * Mock pour lucide-react icons - External dependency
 */
export function mockLucideIcons() {
  vi.mock('lucide-react', () => {
    const createIcon = (testId: string) => () =>
      React.createElement('span', { 'data-testid': testId, 'aria-hidden': 'true' })

    return {
      Home: createIcon('home-icon'),
      Search: createIcon('search-icon'),
      Menu: createIcon('menu-icon'),
      Moon: createIcon('moon-icon'),
      Sun: createIcon('sun-icon'),
      BookOpen: createIcon('book-icon'),
      ChevronDown: createIcon('chevron-down-icon'),
      ChevronUp: createIcon('chevron-up-icon'),
      ChevronLeft: createIcon('chevron-left-icon'),
      ChevronRight: createIcon('chevron-right-icon'),
      X: createIcon('x-icon'),
      Check: createIcon('check-icon'),
      Copy: createIcon('copy-icon'),
      ExternalLink: createIcon('external-link-icon'),
      Star: createIcon('star-icon'),
      Filter: createIcon('filter-icon'),
      Settings: createIcon('settings-icon'),
    }
  })
}

/**
 * Mock pour sonner toasts - External dependency
 */
export function mockSonner() {
  vi.mock('sonner', () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn(),
    },
    Toaster: () => null,
  }))
}

/**
 * Mock pour les APIs du navigateur si nécessaires
 */
export function mockBrowserAPIs() {
  // ResizeObserver est maintenant natif en browser mode
  if (!globalThis.ResizeObserver) {
    globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  }

  // scrollIntoView pour les éléments
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = vi.fn()
  }

  // Process env pour les variables d'environnement
  if (!globalThis.process) {
    globalThis.process = { env: { NODE_ENV: 'test' } } as any
  }
}

/**
 * Setup complet des mocks - À utiliser dans les tests individuels au besoin
 */
export function setupExternalMocks() {
  mockNextNavigation()
  mockNextLink()
  mockNextThemes()
  mockContentLoader()
  mockLucideIcons()
  mockSonner()
  mockBrowserAPIs()
}
