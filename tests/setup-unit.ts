/**
 * Configuration moderne et simplifiée pour Vitest Unit Tests (2025)
 * Setup minimal pour tests unitaires sans DOM
 */

import { beforeEach, vi } from 'vitest'

// Configuration globale pour tous les tests
beforeEach(() => {
  // Reset des mocks globaux entre chaque test
  vi.clearAllMocks()
})

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
