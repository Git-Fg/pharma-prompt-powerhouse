import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PWALifecycle } from '@/components/pwa/PWALifecycle'

// Mock service worker
const mockServiceWorker = {
  register: vi.fn(),
  controller: null as { state: string } | null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}

const mockRegistration = {
  installing: null,
  waiting: null,
  active: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  unregister: vi.fn(),
  update: vi.fn(),
}

const mockWorker = {
  state: 'installing',
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}

// Mock console methods
const originalConsole = {
  warn: console.warn,
  log: console.log,
  error: console.error,
}

describe('pWALifecycle', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock navigator.serviceWorker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: mockServiceWorker,
      writable: true,
    })

    // Mock console methods
    console.warn = vi.fn()
    console.log = vi.fn()
    console.error = vi.fn()

    // Reset environment
    vi.stubEnv('NODE_ENV', 'test')
  })

  afterEach(() => {
    vi.restoreAllMocks()

    // Restore console methods
    console.warn = originalConsole.warn
    console.log = originalConsole.log
    console.error = originalConsole.error
  })

  describe('service Worker Support Detection', () => {
    it('registers service worker when supported', () => {
      mockServiceWorker.register.mockResolvedValue(mockRegistration)

      render(<PWALifecycle />)

      expect(mockServiceWorker.register).toHaveBeenCalledWith('/sw.js')
    })

    it('does not register when service worker not supported', () => {
      // Remove service worker support
      const originalSW = navigator.serviceWorker
      delete (navigator as any).serviceWorker

      render(<PWALifecycle />)

      expect(mockServiceWorker.register).not.toHaveBeenCalled()

      // Restore
      Object.defineProperty(navigator, 'serviceWorker', {
        value: originalSW,
        writable: true,
      })
    })

    it('handles server-side rendering gracefully', () => {
      // Mock window as undefined
      const originalWindow = globalThis.window
      delete (globalThis as any).window

      expect(() => {
        render(<PWALifecycle />)
      }).not.toThrow()

      // Restore
      globalThis.window = originalWindow
    })
  })

  describe('service Worker Registration', () => {
    it('handles successful registration', async () => {
      mockServiceWorker.register.mockResolvedValue(mockRegistration)

      render(<PWALifecycle />)

      // Wait for async registration
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(mockServiceWorker.register).toHaveBeenCalledWith('/sw.js')
    })

    it('handles registration errors gracefully', async () => {
      const registrationError = new Error('Registration failed')
      mockServiceWorker.register.mockRejectedValue(registrationError)

      expect(() => {
        render(<PWALifecycle />)
      }).not.toThrow()

      // Should log error in development
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    it('logs registration errors in development', async () => {
      vi.stubEnv('NODE_ENV', 'development')
      const registrationError = new Error('Registration failed')
      mockServiceWorker.register.mockRejectedValue(registrationError)

      render(<PWALifecycle />)

      await new Promise(resolve => setTimeout(resolve, 0))

      expect(console.error).toHaveBeenCalledWith(
        'Service Worker registration failed:',
        registrationError,
      )
    })

    it('does not log registration errors in production', async () => {
      vi.stubEnv('NODE_ENV', 'production')
      const registrationError = new Error('Registration failed')
      mockServiceWorker.register.mockRejectedValue(registrationError)

      render(<PWALifecycle />)

      await new Promise(resolve => setTimeout(resolve, 0))

      expect(console.error).not.toHaveBeenCalled()
    })
  })

  describe('update Detection', () => {
    it('detects when new service worker is installing', () => {
      const mockInstallingWorker = { ...mockWorker, state: 'installing' }
      const registration = {
        ...mockRegistration,
        installing: mockInstallingWorker,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      render(<PWALifecycle />)

      expect(registration.addEventListener).toHaveBeenCalledWith(
        'updatefound',
        expect.any(Function),
      )
    })

    it('handles state changes of installing worker', () => {
      const mockInstallingWorker = { ...mockWorker, state: 'installed' }
      mockServiceWorker.controller = { state: 'activated' } // Simulate existing controller

      const registration = {
        ...mockRegistration,
        installing: mockInstallingWorker,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      render(<PWALifecycle />)

      // Simulate updatefound event
      const updateFoundHandler = registration.addEventListener.mock.calls.find(
        call => call[0] === 'updatefound',
      )?.[1]

      if (updateFoundHandler) {
        updateFoundHandler()
      }

      expect(mockInstallingWorker.addEventListener).toHaveBeenCalledWith(
        'statechange',
        expect.any(Function),
      )
    })

    it('shows update notification in development', () => {
      vi.stubEnv('NODE_ENV', 'development')

      const mockInstallingWorker = { ...mockWorker, state: 'installed' }
      mockServiceWorker.controller = { state: 'activated' } // Simulate existing controller

      const registration = {
        ...mockRegistration,
        installing: mockInstallingWorker,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      render(<PWALifecycle />)

      // Simulate the full update flow
      const updateFoundHandler = registration.addEventListener.mock.calls.find(
        call => call[0] === 'updatefound',
      )?.[1]

      if (updateFoundHandler) {
        updateFoundHandler()

        // Simulate state change to installed
        const stateChangeHandler = mockInstallingWorker.addEventListener.mock.calls.find(
          call => call[0] === 'statechange',
        )?.[1]

        if (stateChangeHandler) {
          stateChangeHandler()
        }
      }

      expect(console.warn).toHaveBeenCalledWith(
        'New version available! Please refresh to update.',
      )
    })

    it('does not show notification in production', () => {
      vi.stubEnv('NODE_ENV', 'production')

      const mockInstallingWorker = { ...mockWorker, state: 'installed' }
      mockServiceWorker.controller = { state: 'activated' }

      const registration = {
        ...mockRegistration,
        installing: mockInstallingWorker,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      render(<PWALifecycle />)

      // Simulate update flow
      const updateFoundHandler = registration.addEventListener.mock.calls.find(
        call => call[0] === 'updatefound',
      )?.[1]

      if (updateFoundHandler) {
        updateFoundHandler()

        const stateChangeHandler = mockInstallingWorker.addEventListener.mock.calls.find(
          call => call[0] === 'statechange',
        )?.[1]

        if (stateChangeHandler) {
          stateChangeHandler()
        }
      }

      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe('cleanup and Memory Management', () => {
    it('cleans up event listeners on unmount', () => {
      const registration = { ...mockRegistration }
      mockServiceWorker.register.mockResolvedValue(registration)

      const { unmount } = render(<PWALifecycle />)

      unmount()

      expect(registration.removeEventListener).toHaveBeenCalledWith(
        'updatefound',
        expect.any(Function),
      )
    })

    it('cleans up worker state change listeners', () => {
      const mockInstallingWorker = { ...mockWorker }
      const registration = {
        ...mockRegistration,
        installing: mockInstallingWorker,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      const { unmount } = render(<PWALifecycle />)

      // Trigger updatefound to set up worker listener
      const updateFoundHandler = registration.addEventListener.mock.calls.find(
        call => call[0] === 'updatefound',
      )?.[1]

      if (updateFoundHandler) {
        updateFoundHandler()
      }

      unmount()

      expect(mockInstallingWorker.removeEventListener).toHaveBeenCalledWith(
        'statechange',
        expect.any(Function),
      )
    })

    it('handles multiple mounting and unmounting', () => {
      const registration = { ...mockRegistration }
      mockServiceWorker.register.mockResolvedValue(registration)

      const { unmount } = render(<PWALifecycle />)
      unmount()

      const { unmount: unmount2 } = render(<PWALifecycle />)
      unmount2()

      // Should register service worker for each mount
      expect(mockServiceWorker.register).toHaveBeenCalledTimes(2)
    })
  })

  describe('error Handling', () => {
    it('handles missing installing worker gracefully', () => {
      const registration = {
        ...mockRegistration,
        installing: null,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      expect(() => {
        render(<PWALifecycle />)

        // Trigger updatefound with no installing worker
        const updateFoundHandler = registration.addEventListener.mock.calls.find(
          call => call[0] === 'updatefound',
        )?.[1]

        if (updateFoundHandler) {
          updateFoundHandler()
        }
      }).not.toThrow()
    })

    it('handles worker state change errors gracefully', () => {
      const mockInstallingWorker = {
        ...mockWorker,
        addEventListener: vi.fn().mockImplementation((event, handler) => {
          if (event === 'statechange') {
            // Simulate error in handler
            setTimeout(() => {
              try {
                handler()
              }
              catch (error) {
                // Errors should be handled gracefully
              }
            }, 0)
          }
        }),
        removeEventListener: vi.fn(),
      }

      const registration = {
        ...mockRegistration,
        installing: mockInstallingWorker,
      }

      mockServiceWorker.register.mockResolvedValue(registration)

      expect(() => {
        render(<PWALifecycle />)
      }).not.toThrow()
    })
  })

  describe('browser Compatibility', () => {
    it('works with different service worker implementations', () => {
      // Test with minimal service worker support
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          register: vi.fn().mockResolvedValue({}),
        },
        writable: true,
      })

      expect(() => {
        render(<PWALifecycle />)
      }).not.toThrow()
    })

    it('handles browsers without service worker support', () => {
      // Remove service worker entirely
      const originalSW = navigator.serviceWorker
      delete (navigator as any).serviceWorker

      expect(() => {
        render(<PWALifecycle />)
      }).not.toThrow()

      // Restore
      Object.defineProperty(navigator, 'serviceWorker', {
        value: originalSW,
        writable: true,
      })
    })
  })

  describe('performance', () => {
    it('registers service worker asynchronously without blocking', () => {
      mockServiceWorker.register.mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve(mockRegistration), 100)),
      )

      const start = performance.now()
      render(<PWALifecycle />)
      const end = performance.now()

      // Should return immediately, not wait for registration
      expect(end - start).toBeLessThan(50)
    })

    it('handles multiple rapid registrations efficiently', () => {
      mockServiceWorker.register.mockResolvedValue(mockRegistration)

      // Render multiple instances quickly
      const instances = Array.from({ length: 10 }, () => render(<PWALifecycle />))

      instances.forEach(({ unmount }) => unmount())

      // Should handle multiple registrations without issues
      expect(mockServiceWorker.register).toHaveBeenCalledTimes(10)
    })
  })
})
