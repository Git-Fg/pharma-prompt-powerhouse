import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'

describe('utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should combine class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const isHidden = false
      const result = cn('base', isActive && 'conditional', isHidden && 'hidden')
      expect(result).toBe('base conditional')
    })

    it('should merge Tailwind classes correctly', () => {
      // Should merge conflicting Tailwind classes
      const result = cn('px-2 py-1', 'px-4')
      expect(result).toBe('py-1 px-4')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'valid')
      expect(result).toBe('base valid')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        base: true,
        active: true,
        hidden: false,
      })
      expect(result).toBe('base active')
    })

    it('should merge complex Tailwind utility classes', () => {
      // Test merging of more complex Tailwind classes
      const result = cn(
        'bg-blue-500 text-white p-4',
        'bg-red-500 p-2',
        'hover:bg-green-500',
      )
      expect(result).toBe('text-white bg-red-500 p-2 hover:bg-green-500')
    })

    it('should preserve non-conflicting classes', () => {
      const result = cn(
        'flex items-center justify-center',
        'bg-blue-500',
        'text-white font-bold',
      )
      expect(result).toBe('flex items-center justify-center bg-blue-500 text-white font-bold')
    })
  })
})
