import { act, render, renderHook, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ConsentProvider, useConsent } from '@/hooks/useConsent'

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
      <button data-testid="accept" onClick={accept}>Accept</button>
      <button data-testid="decline" onClick={decline}>Decline</button>
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

  describe('consentProvider', () => {
    it('provides initial pending status when no stored consent', () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('pending')
    })

    it('loads stored consent status on mount', () => {
      localStorageMock.getItem.mockReturnValue('accepted')

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
    })

    it('handles stored declined status', () => {
      localStorageMock.getItem.mockReturnValue('declined')

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('declined')
    })

    it('defaults to pending for invalid stored values', () => {
      localStorageMock.getItem.mockReturnValue('invalid-status')

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('pending')
    })
  })

  describe('useConsent hook', () => {
    it('throws error when used outside ConsentProvider', () => {
      expect(() => {
        renderHook(() => useConsent())
      }).toThrow('useConsent must be used within a ConsentProvider')
    })

    it('provides consent context when used within provider', () => {
      const { result } = renderHook(() => useConsent(), {
        wrapper: TestWrapper,
      })

      expect(result.current.status).toBe('pending')
      expect(typeof result.current.accept).toBe('function')
      expect(typeof result.current.decline).toBe('function')
    })
  })

  describe('accept function', () => {
    it('changes status to accepted', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('accept').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
    })

    it('saves accepted status to localStorage', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('accept').click()
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'pharma-consent-status',
        'accepted',
      )
    })

    it('can be called multiple times safely', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('accept').click()
        screen.getByTestId('accept').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2)
    })
  })

  describe('decline function', () => {
    it('changes status to declined', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('decline').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('declined')
    })

    it('saves declined status to localStorage', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('decline').click()
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'pharma-consent-status',
        'declined',
      )
    })

    it('clears stored data when declining', () => {
      // Set up some existing localStorage data
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'theme')
          return 'dark'
        if (key === 'favorites')
          return '["item1", "item2"]'
        return null
      })

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('decline').click()
      })

      // Should remove data storage keys
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('favorites')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user-preferences')
    })
  })

  describe('status transitions', () => {
    it('allows changing from pending to accepted', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('pending')

      act(() => {
        screen.getByTestId('accept').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
    })

    it('allows changing from pending to declined', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('pending')

      act(() => {
        screen.getByTestId('decline').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('declined')
    })

    it('allows changing from accepted to declined', () => {
      localStorageMock.getItem.mockReturnValue('accepted')

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')

      act(() => {
        screen.getByTestId('decline').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('declined')
    })

    it('allows changing from declined to accepted', () => {
      localStorageMock.getItem.mockReturnValue('declined')

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('declined')

      act(() => {
        screen.getByTestId('accept').click()
      })

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
    })
  })

  describe('localStorage integration', () => {
    it('handles localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage not available')
      })

      expect(() => {
        render(
          <ConsentProvider>
            <TestComponent />
          </ConsentProvider>,
        )
      }).not.toThrow()

      expect(screen.getByTestId('status')).toHaveTextContent('pending')
    })

    it('handles setItem errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage quota exceeded')
      })

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(() => {
        act(() => {
          screen.getByTestId('accept').click()
        })
      }).not.toThrow()
    })

    it('handles removeItem errors gracefully during decline', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(() => {
        act(() => {
          screen.getByTestId('decline').click()
        })
      }).not.toThrow()
    })
  })

  describe('data privacy compliance', () => {
    it('only stores consent decision when accepted', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('accept').click()
      })

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'pharma-consent-status',
        'accepted',
      )
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1)
    })

    it('clears all user data when consent is declined', () => {
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      act(() => {
        screen.getByTestId('decline').click()
      })

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('favorites')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user-preferences')
    })

    it('persists consent decision across sessions', () => {
      localStorageMock.getItem.mockReturnValue('accepted')

      const { unmount } = render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')

      unmount()

      // Remount to simulate new session
      render(
        <ConsentProvider>
          <TestComponent />
        </ConsentProvider>,
      )

      expect(screen.getByTestId('status')).toHaveTextContent('accepted')
    })
  })

  describe('multiple ConsentProvider instances', () => {
    it('each provider maintains independent state', () => {
      function App1() {
        return (
          <ConsentProvider>
            <div data-testid="app1">
              <TestComponent />
            </div>
          </ConsentProvider>
        )
      }

      function App2() {
        return (
          <ConsentProvider>
            <div data-testid="app2">
              <TestComponent />
            </div>
          </ConsentProvider>
        )
      }

      const { unmount: unmount1 } = render(<App1 />)
      const app1Status = screen.getByTestId('status')
      expect(app1Status).toHaveTextContent('pending')
      unmount1()

      const { unmount: unmount2 } = render(<App2 />)
      const app2Status = screen.getByTestId('status')
      expect(app2Status).toHaveTextContent('pending')
      unmount2()
    })
  })
})
