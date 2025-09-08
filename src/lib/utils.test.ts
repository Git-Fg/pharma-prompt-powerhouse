/**
 * Tests pour utils - Co-localisés avec les utilitaires (2025)
 * Tests unitaires simples sans mocks complexes
 */

import { describe, expect, it } from 'vitest'
import { cn, normalizeSlug } from './utils'

describe('utils', () => {
  describe('cn (className utility)', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })

    it('handles Tailwind conflicts', () => {
      // twMerge devrait résoudre les conflits Tailwind
      expect(cn('px-2 px-4')).toBe('px-4')
      expect(cn('bg-red-500 bg-blue-500')).toBe('bg-blue-500')
    })

    it('handles arrays and objects', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar')
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('handles empty input', () => {
      expect(cn()).toBe('')
      expect(cn('')).toBe('')
      expect(cn(null, undefined, false)).toBe('')
    })
  })

  describe('normalizeSlug', () => {
    it('converts to lowercase', () => {
      expect(normalizeSlug('HELLO')).toBe('hello')
      expect(normalizeSlug('Hello World')).toBe('hello-world')
    })

    it('removes accents and diacritics', () => {
      expect(normalizeSlug('café')).toBe('cafe')
      expect(normalizeSlug('naïve')).toBe('naive')
      expect(normalizeSlug('résumé')).toBe('resume')
      expect(normalizeSlug('München')).toBe('munchen')
    })

    it('replaces special characters with hyphens', () => {
      expect(normalizeSlug('hello world')).toBe('hello-world')
      expect(normalizeSlug('hello@world.com')).toBe('hello-world-com')
      expect(normalizeSlug('hello_world')).toBe('hello-world')
    })

    it('handles multiple consecutive special characters', () => {
      expect(normalizeSlug('hello   world')).toBe('hello-world')
      expect(normalizeSlug('hello---world')).toBe('hello-world')
      expect(normalizeSlug('hello@@@world')).toBe('hello-world')
    })

    it('removes leading and trailing hyphens', () => {
      expect(normalizeSlug('-hello-')).toBe('hello')
      expect(normalizeSlug('---hello---')).toBe('hello')
      expect(normalizeSlug('@hello@')).toBe('hello')
    })

    it('handles complex real-world examples', () => {
      expect(normalizeSlug('L\'Arsenal IA')).toBe('l-arsenal-ia')
      expect(normalizeSlug('Créer un prompt efficace')).toBe('creer-un-prompt-efficace')
      expect(normalizeSlug('API REST & GraphQL')).toBe('api-rest-graphql')
      expect(normalizeSlug('Node.js & TypeScript')).toBe('node-js-typescript')
    })

    it('preserves alphanumeric characters and hyphens', () => {
      expect(normalizeSlug('hello-world-123')).toBe('hello-world-123')
      expect(normalizeSlug('api-v2-beta')).toBe('api-v2-beta')
    })

    it('handles empty and edge cases', () => {
      expect(normalizeSlug('')).toBe('')
      expect(normalizeSlug('   ')).toBe('')
      expect(normalizeSlug('---')).toBe('')
      expect(normalizeSlug('@@@')).toBe('')
    })

    it('handles numbers correctly', () => {
      expect(normalizeSlug('Version 2.0')).toBe('version-2-0')
      expect(normalizeSlug('Test 123 ABC')).toBe('test-123-abc')
    })
  })
})
