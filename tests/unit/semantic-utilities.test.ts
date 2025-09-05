import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('centralized Design System in globals.css', () => {
  const globalsCSS = fs.readFileSync(
    path.join(__dirname, '../../src/app/globals.css'),
    'utf8',
  )

  describe('semantic Typography Utilities', () => {
    it('defines @utility prose-slogan', () => {
      expect(globalsCSS).toContain('@utility prose-slogan {')
      expect(globalsCSS).toContain('text-xl/relaxed text-muted-foreground')
    })

    it('defines @utility prose-description', () => {
      expect(globalsCSS).toContain('@utility prose-description {')
      expect(globalsCSS).toContain('text-base/relaxed')
    })
  })

  describe('semantic Layout Utilities', () => {
    it('defines @utility section-spacing', () => {
      expect(globalsCSS).toContain('@utility section-spacing {')
      expect(globalsCSS).toContain('py-12 md:py-16 lg:py-20')
    })

    it('defines @utility container-page', () => {
      expect(globalsCSS).toContain('@utility container-page {')
      expect(globalsCSS).toContain('container mx-auto px-4')
    })

    it('defines @utility container-content', () => {
      expect(globalsCSS).toContain('@utility container-content {')
      expect(globalsCSS).toContain('w-full max-w-4xl')
    })

    it('defines @utility container-narrow', () => {
      expect(globalsCSS).toContain('@utility container-narrow {')
      expect(globalsCSS).toContain('w-full max-w-2xl')
    })
  })

  describe('cSS Architecture Philosophy', () => {
    it('contains the @theme definition block for design tokens', () => {
      expect(globalsCSS).toContain('@theme {')
    })

    it('uses @layer components for custom component styles', () => {
      expect(globalsCSS).toContain('@layer components {')
    })

    it('includes the Tailwind v4 max-width bug workaround', () => {
      expect(globalsCSS).toContain('/* Tailwind v4 max-w-* Bug Workaround */')
      expect(globalsCSS).toContain('--container-xs:')
    })
  })
})
