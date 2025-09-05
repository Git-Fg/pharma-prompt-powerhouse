import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Test semantic utilities by verifying they're defined in globals.css
describe('semantic CSS Utilities', () => {
  // Read globals.css content for testing
  const globalsCSS = fs.readFileSync(
    path.join(__dirname, '../../src/app/globals.css'),
    'utf8',
  )

  describe('typography Utilities', () => {
    it('prose-slogan utility is defined', () => {
      expect(globalsCSS).toContain('@utility prose-slogan')
      expect(globalsCSS).toContain('text-muted-foreground')
      expect(globalsCSS).toContain('leading-relaxed')
    })

    it('prose-description utility is defined', () => {
      expect(globalsCSS).toContain('@utility prose-description')
      expect(globalsCSS).toContain('text-muted-foreground')
      expect(globalsCSS).toContain('leading-relaxed')
    })

    it('prose-intro utility is defined', () => {
      expect(globalsCSS).toContain('@utility prose-intro')
      expect(globalsCSS).toContain('text-muted-foreground')
      expect(globalsCSS).toContain('leading-relaxed')
    })

    it('prose-personal-note utility is defined', () => {
      expect(globalsCSS).toContain('@utility prose-personal-note')
      expect(globalsCSS).toContain('text-muted-foreground')
      expect(globalsCSS).toContain('leading-relaxed')
    })
  })

  describe('width Utilities - Tailwind v4 Bug Fixes', () => {
    it('container-content-width utility is defined', () => {
      expect(globalsCSS).toContain('@utility container-content-width')
      expect(globalsCSS).toContain('max-width: 32rem')
      expect(globalsCSS).toContain('/* 512px - Direct value to bypass Tailwind v4 max-w-lg bug */')
    })

    it('container-lg-width utility is defined', () => {
      expect(globalsCSS).toContain('@utility container-lg-width')
      expect(globalsCSS).toContain('max-width: 32rem')
      expect(globalsCSS).toContain('/* 512px - Direct value to bypass Tailwind v4 max-w-lg bug */')
    })

    it('dialog-content-width utility is defined', () => {
      expect(globalsCSS).toContain('@utility dialog-content-width')
      expect(globalsCSS).toContain('max-width: 32rem')
      expect(globalsCSS).toContain('/* 512px - Direct value to bypass Tailwind v4 max-w-lg bug for dialogs */')
    })

    it('offline-container-width utility is defined', () => {
      expect(globalsCSS).toContain('@utility offline-container-width')
      expect(globalsCSS).toContain('max-width: 32rem')
      expect(globalsCSS).toContain('/* 512px - Direct value to bypass Tailwind v4 max-w-lg bug for offline page */')
    })
  })

  describe('container Variables - Tailwind v4 Bug Fix', () => {
    it('defines container variables to fix max-w-* bug', () => {
      expect(globalsCSS).toContain('--container-3xs: 16rem')
      expect(globalsCSS).toContain('--container-2xs: 18rem')
      expect(globalsCSS).toContain('--container-xs: 20rem')
      expect(globalsCSS).toContain('--container-sm: 24rem')
      expect(globalsCSS).toContain('--container-md: 28rem')
      expect(globalsCSS).toContain('--container-lg: 32rem')
      expect(globalsCSS).toContain('--container-xl: 36rem')
      expect(globalsCSS).toContain('--container-2xl: 42rem')
      expect(globalsCSS).toContain('--container-3xl: 48rem')
      expect(globalsCSS).toContain('--container-4xl: 56rem')
      expect(globalsCSS).toContain('--container-5xl: 64rem')
      expect(globalsCSS).toContain('--container-6xl: 72rem')
      expect(globalsCSS).toContain('--container-7xl: 80rem')
    })

    it('includes bug fix comments', () => {
      expect(globalsCSS).toContain('/* Tailwind v4 Bug Fix - Correction du bug max-w-* utilisant --spacing-* au lieu de --container-* */')
    })
  })

  describe('base Responsive Utilities', () => {
    it('responsive-text utility is defined', () => {
      expect(globalsCSS).toContain('@utility responsive-text')
    })

    it('responsive-heading utility is defined', () => {
      expect(globalsCSS).toContain('@utility responsive-heading')
    })

    it('responsive-subheading utility is defined', () => {
      expect(globalsCSS).toContain('@utility responsive-subheading')
    })

    it('section-spacing utility is defined', () => {
      expect(globalsCSS).toContain('@utility section-spacing')
    })

    it('container utility is defined', () => {
      expect(globalsCSS).toContain('@utility container')
    })
  })

  describe('eSLint Configuration for Semantic Utilities', () => {
    const eslintConfig = fs.readFileSync(
      path.join(__dirname, '../../eslint.config.js'),
      'utf8',
    )

    it('includes support for Tailwind v4 semantic utilities', () => {
      // Since eslint-plugin-tailwindcss doesn't support Tailwind v4 yet,
      // we verify the comment explaining this limitation
      expect(eslintConfig).toContain('Tailwind v4 semantic utilities support')
      expect(eslintConfig).toContain('eslint-plugin-tailwindcss doesn\'t support Tailwind v4 yet')
      expect(eslintConfig).toContain('semantic utilities (prose-*, container-*, etc.)')
    })
  })
})
