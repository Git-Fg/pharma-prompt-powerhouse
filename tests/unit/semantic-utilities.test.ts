import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Test semantic utilities by verifying they're defined in utilities.css
describe('semantic CSS Utilities', () => {
  // Read utilities.css content for testing (modular architecture)
  const utilitiesCSS = fs.readFileSync(
    path.join(__dirname, '../../src/styles/utilities.css'),
    'utf8',
  )

  // Also read globals.css for integration tests that need the full assembled CSS
  const globalsCSS = fs.readFileSync(
    path.join(__dirname, '../../src/app/globals.css'),
    'utf8',
  )

  describe('typography Utilities', () => {
    it('prose-slogan utility is defined', () => {
      expect(utilitiesCSS).toContain('@utility prose-slogan')
      expect(utilitiesCSS).toContain('text-muted-foreground')
      expect(utilitiesCSS).toContain('leading-relaxed')
    })

    it('prose-description utility is defined', () => {
      expect(utilitiesCSS).toContain('@utility prose-description')
      expect(utilitiesCSS).toContain('text-muted-foreground')
      expect(utilitiesCSS).toContain('leading-relaxed')
    })

    // These utilities don't exist in the new structure, removing obsolete tests
  })

  // Removing obsolete width utilities tests - these were specific workarounds
  // that are no longer needed in the new modular architecture

  // Removing container variables tests - these are now in tokens.css

  describe('base Responsive Utilities', () => {
    it('section-spacing utility is defined', () => {
      expect(utilitiesCSS).toContain('@utility section-spacing')
    })

    it('container utilities are defined', () => {
      expect(utilitiesCSS).toContain('@utility container-page')
      expect(utilitiesCSS).toContain('@utility container-content')
      expect(utilitiesCSS).toContain('@utility container-narrow')
    })
  })

  describe('integration with globals.css', () => {
    it('imports utilities.css correctly', () => {
      expect(globalsCSS).toContain('@import \'../styles/utilities.css\'')
    })

    it('uses modular architecture', () => {
      expect(globalsCSS).toContain('@import \'../styles/tokens.css\'')
      expect(globalsCSS).toContain('@import \'../styles/base.css\'')
      expect(globalsCSS).toContain('@import \'../styles/components.css\'')
      expect(globalsCSS).toContain('@import \'../styles/animations.css\'')
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
