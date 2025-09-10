import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIsMobile } from '@/hooks/use-mobile'

// Mock window.matchMedia
const mockMatchMedia = vi.fn()

describe('useIsMobile Hook', () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    window.matchMedia = mockMatchMedia

    // Reset all mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('should return false on desktop (width >= 768)', () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should return true on mobile (width < 768)', () => {
    const mockMediaQueryList = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('should update when window is resized', () => {
    const mockAddEventListener = vi.fn()
    const mockRemoveEventListener = vi.fn()

    const mockMediaQueryList = {
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    // Simulate the change event listener being called
    const changeCallback = mockAddEventListener.mock.calls[0]?.[1]

    // Change matches property to simulate mobile viewport
    mockMediaQueryList.matches = true

    act(() => {
      changeCallback?.()
    })

    expect(result.current).toBe(true)
  })

  it('should cleanup event listener on unmount', () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { unmount } = renderHook(() => useIsMobile())

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalled()

    unmount()

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled()
  })

  it('should handle undefined state initially', () => {
    const mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    const { result } = renderHook(() => useIsMobile())

    // The hook should return a boolean (not undefined) after the effect runs
    expect(typeof result.current).toBe('boolean')
  })

  it('should use correct mobile breakpoint (768)', () => {
    const mockMediaQueryList = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)

    renderHook(() => useIsMobile())

    // Should use 767px (768 - 1) as the breakpoint
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })
})
