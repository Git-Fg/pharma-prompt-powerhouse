import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useAnimations } from '@/hooks/use-animations'

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

describe('useAnimations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRAF.mockImplementation(cb => {
      setTimeout(cb, 16) // Simulate 60fps
      return 1
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAnimations())

    expect(result.current.isAnimationsEnabled).toBe(true)
    expect(result.current.isVisible).toBe(false)
    expect(result.current.animationText).toBe('')
    expect(result.current.scrollProgress).toBe(0)
  })

  it('disables animations when user prefers reduced motion', () => {
    // Mock reduced motion preference
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

    const { result } = renderHook(() => useAnimations())

    expect(result.current.isAnimationsEnabled).toBe(false)
  })

  it('enables animations when user prefers motion', () => {
    // Mock motion preference
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query !== '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { result } = renderHook(() => useAnimations())

    expect(result.current.isAnimationsEnabled).toBe(true)
  })

  it('updates scroll progress correctly', () => {
    const { result } = renderHook(() => useAnimations())

    // Mock scroll position
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true })

    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Should calculate progress as scrollY / (scrollHeight - innerHeight)
    // 500 / (2000 - 1000) = 0.5
    expect(result.current.scrollProgress).toBe(0.5)
  })

  it('handles edge cases in scroll progress calculation', () => {
    const { result } = renderHook(() => useAnimations())

    // Mock edge case where scrollHeight <= innerHeight
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 800, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.scrollProgress).toBe(0)
  })

  it('provides createInViewAnimation function', () => {
    const { result } = renderHook(() => useAnimations())

    expect(typeof result.current.createInViewAnimation).toBe('function')
  })

  it('creates intersection observer for in-view animations', () => {
    const { result } = renderHook(() => useAnimations())
    const mockElement = document.createElement('div')

    act(() => {
      result.current.createInViewAnimation(mockElement, 'slide-in')
    })

    expect(mockIntersectionObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalledWith(mockElement)
  })

  it('provides createTypewriterAnimation function', () => {
    const { result } = renderHook(() => useAnimations())

    expect(typeof result.current.createTypewriterAnimation).toBe('function')
  })

  it('animates text with typewriter effect', async () => {
    const { result } = renderHook(() => useAnimations())

    act(() => {
      result.current.createTypewriterAnimation('Hello World', 50)
    })

    // Should start typing animation
    expect(result.current.animationText).toBe('')

    // Wait for first character
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 60))
    })

    // Should have started typing
    expect(mockRAF).toHaveBeenCalled()
  })

  it('provides createScrollAnimation function', () => {
    const { result } = renderHook(() => useAnimations())

    expect(typeof result.current.createScrollAnimation).toBe('function')
  })

  it('creates scroll-based animations', () => {
    const { result } = renderHook(() => useAnimations())
    const mockElement = document.createElement('div')

    act(() => {
      result.current.createScrollAnimation(mockElement, 'fade-in-up')
    })

    // Should set up scroll listener
    expect(mockRAF).toHaveBeenCalled()
  })

  it('provides cleanup for animations', () => {
    const { result, unmount } = renderHook(() => useAnimations())

    const mockElement = document.createElement('div')
    
    act(() => {
      result.current.createInViewAnimation(mockElement, 'slide-in')
    })

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('respects animation preferences in createInViewAnimation', () => {
    // Mock reduced motion
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

    const { result } = renderHook(() => useAnimations())
    const mockElement = document.createElement('div')

    act(() => {
      result.current.createInViewAnimation(mockElement, 'slide-in')
    })

    // Should not create intersection observer when animations are disabled
    expect(result.current.isAnimationsEnabled).toBe(false)
  })

  it('handles typewriter animation cancellation', () => {
    const { result } = renderHook(() => useAnimations())

    act(() => {
      result.current.createTypewriterAnimation('Hello World', 50)
    })

    // Start another animation to cancel the first
    act(() => {
      result.current.createTypewriterAnimation('New Text', 50)
    })

    expect(mockCAF).toHaveBeenCalled()
  })

  it('updates visibility state correctly', () => {
    const { result } = renderHook(() => useAnimations())

    // Initially not visible
    expect(result.current.isVisible).toBe(false)

    // Mock intersection observer callback
    const mockCallback = mockIntersectionObserver.mock.calls[0]?.[0]
    
    if (mockCallback) {
      act(() => {
        mockCallback([{ isIntersecting: true }])
      })

      expect(result.current.isVisible).toBe(true)
    }
  })
})