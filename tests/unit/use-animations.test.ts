import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  useCounterAnimation,
  useInView,
  useLoadingState,
  useReducedMotion,
  useScrollProgress,
  useTypewriter,
} from '@/hooks/use-animations'

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRAF = vi.fn()
const mockCAF = vi.fn()

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRAF,
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: mockCAF,
})

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

mockIntersectionObserver.mockReturnValue({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
})

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: mockIntersectionObserver,
})

// Mock matchMedia for reduced motion detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('animation Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRAF.mockImplementation((cb) => {
      setTimeout(cb, 16) // Simulate 60fps
      return 1
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('useReducedMotion', () => {
    it('returns false when motion is not reduced', () => {
      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(false)
    })

    it('returns true when user prefers reduced motion', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(true)
    })
  })

  describe('useLoadingState', () => {
    it('starts with loading true and transitions to false', async () => {
      const { result } = renderHook(() => useLoadingState(100))

      expect(result.current.isLoading).toBe(true)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150))
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('provides start and stop loading methods', () => {
      const { result } = renderHook(() => useLoadingState(100))

      expect(typeof result.current.startLoading).toBe('function')
      expect(typeof result.current.stopLoading).toBe('function')

      act(() => {
        result.current.stopLoading()
      })

      expect(result.current.isLoading).toBe(false)

      act(() => {
        result.current.startLoading()
      })

      expect(result.current.isLoading).toBe(true)
    })
  })

  describe('useCounterAnimation', () => {
    it('provides counter animation functionality', () => {
      const { result } = renderHook(() => useCounterAnimation(100, 1000, 0))

      expect(result.current.count).toBe(0)
      expect(result.current.isAnimating).toBe(false)
      expect(typeof result.current.animate).toBe('function')
    })

    it('animates counter when animate is called', () => {
      const { result } = renderHook(() => useCounterAnimation(100, 50, 0))

      act(() => {
        result.current.animate()
      })

      expect(result.current.isAnimating).toBe(true)
    })
  })

  describe('useTypewriter', () => {
    it('types text character by character', async () => {
      const { result } = renderHook(() => useTypewriter('Hello', 10))

      expect(result.current.displayedText).toBe('')
      expect(result.current.isComplete).toBe(false)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 60))
      })

      expect(result.current.displayedText.length).toBeGreaterThan(0)
    })

    it('marks as complete when typing is done', async () => {
      const { result } = renderHook(() => useTypewriter('Hi', 10))

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
      })

      expect(result.current.isComplete).toBe(true)
      expect(result.current.displayedText).toBe('Hi')
    })
  })

  describe('useScrollProgress', () => {
    it('tracks scroll progress', () => {
      const { result } = renderHook(() => useScrollProgress())
      expect(result.current).toBe(0)
    })

    it('updates on scroll events', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        value: 2000,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 800,
      })
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 600,
      })

      const { result } = renderHook(() => useScrollProgress())

      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })

      expect(result.current).toBe(0.5) // 600 / (2000 - 800) = 0.5
    })
  })

  describe('useInView', () => {
    it('provides ref and visibility state', () => {
      const { result } = renderHook(() => useInView())

      expect(result.current.ref).toBeDefined()
      expect(result.current.isInView).toBe(false)
    })

    it('observes element when ref is set', () => {
      const { result } = renderHook(() => useInView())

      const mockElement = document.createElement('div')

      act(() => {
        if (result.current.ref.current !== mockElement) {
          Object.defineProperty(result.current.ref, 'current', {
            writable: true,
            value: mockElement,
          })
        }
      })

      expect(mockIntersectionObserver).toHaveBeenCalled()
    })
  })
})
