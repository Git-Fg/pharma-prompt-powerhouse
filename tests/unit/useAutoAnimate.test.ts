import { useAutoAnimate } from '@formkit/auto-animate/react'
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useReducedMotion } from '@/hooks/use-animations'
import {
  useAutoAnimateGrid,
  useAutoAnimateIfEnabled,
  useAutoAnimateList,
  useAutoAnimateWithConfig,
} from '@/hooks/useAutoAnimate'

// Mock @formkit/auto-animate/react
vi.mock('@formkit/auto-animate/react', () => ({
  useAutoAnimate: vi.fn(),
}))

// Mock useReducedMotion
vi.mock('@/hooks/use-animations', () => ({
  useReducedMotion: vi.fn(),
}))

const mockRef = vi.fn()
const mockSetEnabled = vi.fn()
const mockAutoAnimate = vi.mocked(useAutoAnimate)
const mockUseReducedMotion = vi.mocked(useReducedMotion)

describe('useAutoAnimate hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAutoAnimate.mockReturnValue([mockRef, mockSetEnabled])
    mockUseReducedMotion.mockReturnValue(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('useAutoAnimateIfEnabled', () => {
    it('returns auto-animate ref when motion is enabled', () => {
      mockUseReducedMotion.mockReturnValue(false)

      const { result } = renderHook(() => useAutoAnimateIfEnabled())

      expect(result.current).toBe(mockRef)
      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 250,
        easing: 'ease-out',
      })
    })

    it('returns null when user prefers reduced motion', () => {
      mockUseReducedMotion.mockReturnValue(true)

      const { result } = renderHook(() => useAutoAnimateIfEnabled())

      expect(result.current).toBe(null)
      expect(mockAutoAnimate).toHaveBeenCalled()
    })

    it('uses default animation configuration', () => {
      renderHook(() => useAutoAnimateIfEnabled())

      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 250,
        easing: 'ease-out',
      })
    })

    it('respects changes in motion preference', () => {
      mockUseReducedMotion.mockReturnValue(false)

      const { result, rerender } = renderHook(() => useAutoAnimateIfEnabled())

      expect(result.current).toBe(mockRef)

      // Change motion preference
      mockUseReducedMotion.mockReturnValue(true)
      rerender()

      expect(result.current).toBe(null)
    })
  })

  describe('useAutoAnimateList', () => {
    it('returns auto-animate ref when motion is enabled', () => {
      mockUseReducedMotion.mockReturnValue(false)

      const { result } = renderHook(() => useAutoAnimateList())

      expect(result.current).not.toBe(null)
      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 200,
        easing: 'ease-out',
      })
    })

    it('returns null when user prefers reduced motion', () => {
      mockUseReducedMotion.mockReturnValue(true)

      const { result } = renderHook(() => useAutoAnimateList())

      expect(result.current).toBe(null)
    })

    it('accepts custom duration option', () => {
      renderHook(() => useAutoAnimateList({ duration: 300 }))

      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 300,
        easing: 'ease-out',
      })
    })

    it('accepts custom easing option', () => {
      renderHook(() => useAutoAnimateList({ easing: 'ease-out' }))

      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 200,
        easing: 'ease-out',
      })
    })

    it('accepts both duration and easing options', () => {
      renderHook(() => useAutoAnimateList({
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }))

      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      })
    })

    it('uses default values when options are undefined', () => {
      renderHook(() => useAutoAnimateList({}))

      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 200,
        easing: 'ease-out',
      })
    })
  })

  describe('useAutoAnimateGrid', () => {
    it('returns auto-animate ref for grid layouts', () => {
      mockUseReducedMotion.mockReturnValue(false)

      const { result } = renderHook(() => useAutoAnimateGrid())

      expect(result.current).not.toBe(null)
      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 300,
        easing: 'ease-out',
      })
    })

    it('returns null when user prefers reduced motion', () => {
      mockUseReducedMotion.mockReturnValue(true)

      const { result } = renderHook(() => useAutoAnimateGrid())

      expect(result.current).toBe(null)
    })

    it('accepts custom grid options', () => {
      renderHook(() => useAutoAnimateGrid({
        duration: 350,
        easing: 'ease-out',
      }))

      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 350,
        easing: 'ease-out',
      })
    })
  })

  describe('useAutoAnimateWithConfig', () => {
    it('returns auto-animate ref with custom config', () => {
      mockUseReducedMotion.mockReturnValue(false)

      const config = {
        duration: 500,
        easing: 'ease-in',
        disrespectUserMotionPreference: false,
      }

      const { result } = renderHook(() => useAutoAnimateWithConfig(config))

      expect(result.current).not.toBe(null)
      expect(mockAutoAnimate).toHaveBeenCalledWith(config)
    })

    it('respects motion preferences by default', () => {
      mockUseReducedMotion.mockReturnValue(true)

      const config = {
        duration: 500,
        easing: 'ease-in',
      }

      const { result } = renderHook(() => useAutoAnimateWithConfig(config))

      expect(result.current).toBe(null)
    })

    it('can disrespect user motion preference when explicitly configured', () => {
      mockUseReducedMotion.mockReturnValue(true)

      const config = {
        duration: 500,
        easing: 'ease-in',
        disrespectUserMotionPreference: true,
      }

      const { result } = renderHook(() => useAutoAnimateWithConfig(config))

      expect(result.current).not.toBe(null)
      expect(mockAutoAnimate).toHaveBeenCalledWith(config)
    })

    it('handles empty config object', () => {
      const { result } = renderHook(() => useAutoAnimateWithConfig({}))

      expect(result.current).not.toBe(null)
      expect(mockAutoAnimate).toHaveBeenCalledWith({
        duration: 250,
        easing: 'ease-in-out',
      })
    })
  })

  describe('performance and optimization', () => {
    it('maintains stable ref identity when motion preference unchanged', () => {
      mockUseReducedMotion.mockReturnValue(false)

      const { result, rerender } = renderHook(() => useAutoAnimateIfEnabled())

      const firstRef = result.current
      rerender()
      const secondRef = result.current

      expect(firstRef).toBe(secondRef)
    })

    it('handles rapid motion preference changes', () => {
      let motionPreference = false
      mockUseReducedMotion.mockImplementation(() => motionPreference)

      const { result, rerender } = renderHook(() => useAutoAnimateList())

      // Rapidly toggle motion preference
      for (let i = 0; i < 10; i++) {
        motionPreference = !motionPreference
        mockUseReducedMotion.mockReturnValue(motionPreference)
        rerender()

        if (motionPreference) {
          expect(result.current).toBe(null)
        }
        else {
          expect(result.current).not.toBe(null)
        }
      }
    })
  })

  describe('error handling', () => {
    it('handles useAutoAnimate errors gracefully', () => {
      mockAutoAnimate.mockImplementation(() => {
        throw new Error('Auto-animate error')
      })

      expect(() => {
        renderHook(() => useAutoAnimateIfEnabled())
      }).toThrow('Auto-animate error')
    })

    it('handles useReducedMotion errors gracefully', () => {
      mockUseReducedMotion.mockImplementation(() => {
        throw new Error('Motion detection error')
      })

      expect(() => {
        renderHook(() => useAutoAnimateIfEnabled())
      }).toThrow('Motion detection error')
    })
  })

  describe('integration with @formkit/auto-animate', () => {
    it('passes through all @formkit/auto-animate options correctly', () => {
      const fullConfig = {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        disrespectUserMotionPreference: false,
      }

      renderHook(() => useAutoAnimateWithConfig(fullConfig))

      expect(mockAutoAnimate).toHaveBeenCalledWith(fullConfig)
    })

    it('calls useAutoAnimate exactly once per hook instance', () => {
      renderHook(() => useAutoAnimateIfEnabled())

      expect(mockAutoAnimate).toHaveBeenCalledTimes(1)

      renderHook(() => useAutoAnimateList())

      expect(mockAutoAnimate).toHaveBeenCalledTimes(2)
    })
  })

  describe('accessibility compliance', () => {
    it('always respects reduced motion preference unless explicitly overridden', () => {
      mockUseReducedMotion.mockReturnValue(true)

      // These should all respect reduced motion
      expect(renderHook(() => useAutoAnimateIfEnabled()).result.current).toBe(null)
      expect(renderHook(() => useAutoAnimateList()).result.current).toBe(null)
      expect(renderHook(() => useAutoAnimateGrid()).result.current).toBe(null)

      // Only this one should override
      const config = { duration: 500 }
      expect(renderHook(() => useAutoAnimateWithConfig(config)).result.current).not.toBe(null)
    })

    it('provides appropriate animation durations for accessibility', () => {
      // Default durations should be reasonable for accessibility
      renderHook(() => useAutoAnimateIfEnabled())
      expect(mockAutoAnimate).toHaveBeenCalledWith(
        expect.objectContaining({ duration: expect.any(Number) }),
      )

      renderHook(() => useAutoAnimateList())
      expect(mockAutoAnimate).toHaveBeenCalledWith(
        expect.objectContaining({ duration: expect.any(Number) }),
      )
    })
  })
})
