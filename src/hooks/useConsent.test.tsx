import { act, render, renderHook, screen } from '@/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentProvider, useConsent } from './useConsent'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Test wrapper component
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ConsentProvider>{children}</ConsentProvider>
}

function TestComponent() {
  const { status, accept, decline } = useConsent()
  return (
    <div>
      <div data-testid="status">{status}</div>
      <button type="button" data-testid="accept" onClick={accept}>Accept</button>
      <button type="button" data-testid="decline" onClick={decline}>Decline</button>
    </div>
  )
}

describe('useConsent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('should return pending status when no consent is stored', () => {
      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      expect(result.current.status).toBe('pending')
    })

    it('should return accepted status when consent is stored as accepted', () => {
      localStorageMock.getItem.mockReturnValue('accepted')
      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      expect(result.current.status).toBe('accepted')
    })

    it('should return declined status when consent is stored as declined', () => {
      localStorageMock.getItem.mockReturnValue('declined')
      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      expect(result.current.status).toBe('declined')
    })
  })

  describe('consent actions', () => {
    it('should accept consent and update localStorage', () => {
      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      
      act(() => {
        result.current.accept()
      })

      expect(result.current.status).toBe('accepted')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('consent-status', 'accepted')
    })

    it('should decline consent and update localStorage', () => {
      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      
      act(() => {
        result.current.decline()
      })

      expect(result.current.status).toBe('declined')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('consent-status', 'declined')
    })
  })

  describe('integration with components', () => {
    it('should work correctly with React components', () => {
      render(<TestComponent />, { wrapper: TestWrapper })

      expect(screen.getByTestId('status')).toHaveTextContent('pending')

      act(() => {
        screen.getByTestId('accept').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('consent-status', 'accepted')
    })

    it('should handle decline action in components', () => {
      render(<TestComponent />, { wrapper: TestWrapper })

      act(() => {
        screen.getByTestId('decline').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('declined')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('consent-status', 'declined')
    })
  })

  describe('error handling', () => {
    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      expect(result.current.status).toBe('pending')
    })

    it('should handle setItem errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const { result } = renderHook(() => useConsent(), { wrapper: TestWrapper })
      
      act(() => {
        result.current.accept()
      })

      // Should still update internal state even if localStorage fails
      expect(result.current.status).toBe('accepted')
    })
  })
})