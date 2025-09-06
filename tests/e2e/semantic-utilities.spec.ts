import { expect, test } from '@playwright/test'

test.describe('Semantic Utilities Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('prose-description utility has correct styling', async ({ page }) => {
    // Test on workflows page
    await page.goto('/workflows')

    const description = page.locator('.prose-description').first()
    await expect(description).toBeVisible()

    const computedStyle = await description.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        maxWidth: style.maxWidth,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: style.color,
      }
    })

    expect(computedStyle.maxWidth).toBe('672px') // 42rem
    expect(computedStyle.marginLeft).toBe('auto')
    expect(computedStyle.marginRight).toBe('auto')
    expect(computedStyle.fontSize).toMatch(/16px/) // text-base
    expect(computedStyle.lineHeight).toMatch(/1\.5/) // leading-relaxed
  })

  test('dialog-content-width utility has correct styling', async ({ page }) => {
    // Set desktop viewport to see desktop footer
    await page.setViewportSize({ width: 1400, height: 800 })

    const dialogContainer = page.locator('.dialog-content-width').first()
    await expect(dialogContainer).toBeVisible()

    const computedStyle = await dialogContainer.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        maxWidth: style.maxWidth,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
      }
    })

    expect(computedStyle.maxWidth).toBe('768px') // 48rem
    expect(computedStyle.marginLeft).toBe('auto')
    expect(computedStyle.marginRight).toBe('auto')
  })

  test('footer-description-width utility has correct styling', async ({ page }) => {
    // Set mobile viewport to see mobile footer
    await page.setViewportSize({ width: 375, height: 667 })

    const footerContainer = page.locator('.footer-description-width').first()
    await expect(footerContainer).toBeVisible()

    const computedStyle = await footerContainer.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        maxWidth: style.maxWidth,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
      }
    })

    expect(computedStyle.maxWidth).toBe('320px') // 20rem
    expect(computedStyle.marginLeft).toBe('auto')
    expect(computedStyle.marginRight).toBe('auto')
  })

  test('text-content-width utility has correct styling', async ({ page }) => {
    // Find an element with text-content-width utility
    const textContainer = page.locator('.text-content-width').first()
    const count = await textContainer.count()

    if (count > 0) {
      await expect(textContainer).toBeVisible()

      const computedStyle = await textContainer.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          maxWidth: style.maxWidth,
          marginLeft: style.marginLeft,
          marginRight: style.marginRight,
        }
      })

      expect(computedStyle.maxWidth).toBe('448px') // 28rem
      expect(computedStyle.marginLeft).toBe('auto')
      expect(computedStyle.marginRight).toBe('auto')
    }
  })

  test('prose-slogan utility has correct styling', async ({ page }) => {
    const slogan = page.locator('.prose-slogan').first()
    await expect(slogan).toBeVisible()

    const computedStyle = await slogan.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        textAlign: style.textAlign,
      }
    })

    expect(computedStyle.fontSize).toMatch(/20px/) // text-xl
    expect(computedStyle.lineHeight).toMatch(/1\.5/) // leading-relaxed
  })

  test('semantic utilities maintain consistency across breakpoints', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1400, height: 800, name: 'desktop' },
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)

      // Test prose-description utility consistency
      await page.goto('/workflows')
      const description = page.locator('.prose-description').first()

      const computedStyle = await description.evaluate((el) => {
        return window.getComputedStyle(el).maxWidth
      })

      // Should always be 672px regardless of viewport
      expect(computedStyle).toBe('672px')
    }
  })

  test('semantic utilities are applied to correct elements', async ({ page }) => {
    await page.goto('/workflows')

    // Collection page description should use prose-description
    const description = page.locator('.prose-description').first()
    await expect(description).toBeVisible()
    await expect(description).toContainText('Mes méthodes éprouvées')

    // Should have the correct max-width
    const maxWidth = await description.evaluate((el) => {
      return window.getComputedStyle(el).maxWidth
    })
    expect(maxWidth).toBe('672px')
  })

  test('no direct max-w-* classes are used in semantic utilities', async ({ page }) => {
    const pagesToTest = ['/', '/workflows', '/concepts', '/guides', '/l-arsenal-ia']

    for (const url of pagesToTest) {
      await page.goto(url)

      // Find elements with semantic utility classes
      const semanticElements = await page.$$([
        '.prose-description',
        '.dialog-content-width',
        '.footer-description-width',
        '.text-content-width',
        '.prose-slogan',
        '.prose-intro',
        '.prose-personal-note',
      ].join(', '))

      for (const element of semanticElements) {
        const className = await element.getAttribute('class')

        // Should not contain any direct max-w-* classes
        expect(className).not.toMatch(/max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)/)
      }
    }
  })

  test('semantic utilities work with responsive design', async ({ page }) => {
    await page.goto('/')

    // Test footer responsive behavior
    const desktopViewport = { width: 1400, height: 800 }
    const mobileViewport = { width: 375, height: 667 }

    // Desktop - should use dialog-content-width
    await page.setViewportSize(desktopViewport)
    const desktopContainer = page.locator('.dialog-content-width').first()
    const desktopMaxWidth = await desktopContainer.evaluate((el) => {
      return window.getComputedStyle(el).maxWidth
    })
    expect(desktopMaxWidth).toBe('768px')

    // Mobile - should use footer-description-width
    await page.setViewportSize(mobileViewport)
    const mobileContainer = page.locator('.footer-description-width').first()
    const mobileMaxWidth = await mobileContainer.evaluate((el) => {
      return window.getComputedStyle(el).maxWidth
    })
    expect(mobileMaxWidth).toBe('320px')
  })

  test('ESLint rule validation: semantic utilities are used instead of max-w classes', async ({ page }) => {
    await page.goto('/')

    // Check that no max-w-* classes are present in the main content
    const body = await page.locator('body')
    const bodyClasses = await body.getAttribute('class') || ''

    // Verify no problematic max-w classes are used
    const problematicClasses = [
      'max-w-xs',
      'max-w-sm',
      'max-w-md',
      'max-w-lg',
      'max-w-xl',
      'max-w-2xl',
      'max-w-3xl',
      'max-w-4xl',
      'max-w-5xl',
      'max-w-6xl',
      'max-w-7xl',
    ]

    for (const className of problematicClasses) {
      expect(bodyClasses).not.toContain(className)
    }

    // Check that semantic utilities are present instead
    const semanticUtilities = [
      'footer-description-width',
      'text-content-width',
      'dialog-content-width',
      'offline-container-width',
      'container-lg-width',
      'container-content-width',
    ]

    // At least one semantic utility should be present on the page
    let hasSemanticUtility = false
    for (const utility of semanticUtilities) {
      const element = page.locator(`.${utility}`)
      if (await element.count() > 0) {
        hasSemanticUtility = true
        break
      }
    }

    expect(hasSemanticUtility).toBe(true)
  })
})
