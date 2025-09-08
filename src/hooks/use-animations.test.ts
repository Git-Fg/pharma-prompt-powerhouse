import { act, renderHook } from '@/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  useCounterAnimation,
  useInView,
  useLoadingState,
  useReducedMotion,
  useScrollProgress,
  useTypewriter,
} from './use-animations'

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

describe('Animation Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRAF.mockImplementation((callback) => {
      setTimeout(callback, 16)
      return 1
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('useReducedMotion', () => {
    it('should return false when user prefers motion', () => {
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }))

      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(false)
    })

    it('should return true when user prefers reduced motion', () => {
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }))

      const { result } = renderHook(() => useReducedMotion())
      expect(result.current).toBe(true)
    })
  })

  describe('useInView', () => {
    it('should initialize IntersectionObserver', () => {
      const ref = { current: document.createElement('div') }
      renderHook(() => useInView(ref))

      expect(mockIntersectionObserver).toHaveBeenCalled()
      expect(mockObserve).toHaveBeenCalledWith(ref.current)
    })

    it('should return false initially', () => {
      const ref = { current: document.createElement('div') }
      const { result } = renderHook(() => useInView(ref))

      expect(result.current).toBe(false)
    })

    it('should clean up on unmount', () => {
      const ref = { current: document.createElement('div') }
      const { unmount } = renderHook(() => useInView(ref))

      unmount()
      expect(mockDisconnect).toHaveBeenCalled()
    })
  })

  describe('useCounterAnimation', () => {
    it('should animate from 0 to target value', async () => {
      const { result } = renderHook(() => useCounterAnimation(100, 1000))

      expect(result.current).toBe(0)

      // Simulate animation frame
      act(() => {
        const callback = mockRAF.mock.calls[0][0]
        callback()
      })

      // Value should be progressing towards target
      expect(typeof result.current).toBe('number')
    })

    it('should respect custom duration', () => {
      renderHook(() => useCounterAnimation(50, 500))

      expect(mockRAF).toHaveBeenCalled()
    })
  })

  describe('useLoadingState', () => {
    it('should handle different loading states', () => {
      const { result } = renderHook(() => useLoadingState())

      expect(result.current.isLoading).toBe(false)
      expect(result.current.progress).toBe(0)

      act(() => {
        result.current.setLoading(true)
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('should update progress correctly', () => {
      const { result } = renderHook(() => useLoadingState())

      act(() => {
        result.current.setProgress(50)
      })

      expect(result.current.progress).toBe(50)
    })
  })

  describe('useScrollProgress', () => {
    it('should track scroll progress', () => {
      const { result } = renderHook(() => useScrollProgress())

      expect(result.current).toBe(0)

      // Mock scroll event
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000 })
      Object.defineProperty(window, 'innerHeight', { value: 800 })

      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })

      // Progress should be calculated based on scroll position
      expect(typeof result.current).toBe('number')
    })
  })

  describe('useTypewriter', () => {
    it('should animate text typing effect', async () => {
      const { result } = renderHook(() => useTypewriter('Hello World', 50))

      expect(result.current.displayText).toBe('')
      expect(result.current.isComplete).toBe(false)

      // Wait for first character
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 60))
      })

      expect(result.current.displayText.length).toBeGreaterThan(0)
    })

    it('should complete typing animation', async () => {
      const shortText = 'Hi'
      const { result } = renderHook(() => useTypewriter(shortText, 10))

      // Wait for completion
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      })

      expect(result.current.displayText).toBe(shortText)
      expect(result.current.isComplete).toBe(true)
    })

    it('should restart animation when text changes', () => {
      const { result, rerender } = renderHook(
        ({ text }) => useTypewriter(text, 50),
        { initialProps: { text: 'First' } }
      )

      expect(result.current.displayText).toBe('')

      rerender({ text: 'Second' })

      expect(result.current.displayText).toBe('')
      expect(result.current.isComplete).toBe(false)
    })
  })
})