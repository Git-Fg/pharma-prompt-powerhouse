/**
 * Test simple pour valider la configuration
 */

import { describe, expect, it } from 'vitest'

describe('configuration Test', () => {
  it('should have vitest working in browser mode', () => {
    expect(true).toBe(true)
  })

  it('should have browser globals available', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
  })

  it('should support basic assertions', () => {
    const testObject = { name: 'test', value: 42 }
    expect(testObject.name).toBe('test')
    expect(testObject.value).toBeGreaterThan(40)
  })
})
