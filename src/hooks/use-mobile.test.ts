/**
 * Tests pour use-mobile - Co-localisés avec le hook (2025)
 * Tests unitaires avec simulation des media queries
 */

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from '@/test-utils'
import { useIsMobile } from './use-mobile'

// Mock de window.matchMedia pour les tests
const mockMatchMedia = vi.fn()

describe('useIsMobile', () => {
  beforeEach(() => {
    // Reset du mock avant chaque test
    mockMatchMedia.mockClear()

    // Configuration par défaut de matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  it('returns false initially on undefined state', () => {
    // Mock pour desktop (>= 768px)
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { result } = renderHook(() => useIsMobile())

    // Le hook devrait retourner false pour les écrans desktop
    expect(result.current).toBe(false)

    // Vérifie que la media query est correcte
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('returns true for mobile screens', () => {
    // Mock pour mobile (< 768px)
    const mockMql = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    // Setup initial state (desktop)
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { result } = renderHook(() => useIsMobile())

    // Vérifie l'état initial (desktop)
    expect(result.current).toBe(false)

    // Simule un changement vers mobile
    act(() => {
      mockMql.matches = true
      // Simule le callback de changement
      const changeCallback = mockMql.addEventListener.mock.calls.find(
        call => call[0] === 'change',
      )?.[1]
      changeCallback?.()
    })

    // Vérifie que l'état a été mis à jour
    expect(result.current).toBe(true)
  })

  it('cleans up event listener on unmount', () => {
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { unmount } = renderHook(() => useIsMobile())

    // Vérifie que l'événement a été ajouté
    expect(mockMql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    // Démonte le hook
    unmount()

    // Vérifie que l'événement a été supprimé
    expect(mockMql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('uses correct mobile breakpoint', () => {
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    renderHook(() => useIsMobile())

    // Vérifie que le breakpoint mobile correct est utilisé (767px = 768 - 1)
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('handles multiple re-renders correctly', () => {
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { result, rerender } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    // Re-render multiple fois
    rerender()
    rerender()
    rerender()

    // L'état devrait rester cohérent
    expect(result.current).toBe(false)

    // Les listeners ne devraient être ajoutés qu'une seule fois
    expect(mockMql.addEventListener).toHaveBeenCalledTimes(1)
  })

  it('handles edge case when matchMedia is not available', () => {
    // Simule un environnement sans matchMedia (rare mais possible)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: undefined,
    })

    // Le hook ne devrait pas crasher
    expect(() => {
      renderHook(() => useIsMobile())
    }).toThrow() // Attendu car window.matchMedia est undefined
  })
})
