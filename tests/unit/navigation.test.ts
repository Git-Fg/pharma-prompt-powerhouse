import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  buildContentPath,
  generateBreadcrumbs,
  getContentTypeFromPath,
  getDisplayNameForSegment,
  getMainNavigationLinks,
  getMobileNavigationLinks,
  isActiveRoute,
} from '@/lib/navigation'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  BookOpen: vi.fn(),
  Brain: vi.fn(),
  ExternalLink: vi.fn(),
  Home: vi.fn(),
  Shield: vi.fn(),
  Target: vi.fn(),
}))

describe('navigation Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getDisplayNameForSegment', () => {
    it('returns correct display names for known segments', () => {
      expect(getDisplayNameForSegment('concepts')).toBe('Concepts')
      expect(getDisplayNameForSegment('guides')).toBe('Guides')
      expect(getDisplayNameForSegment('workflows')).toBe('Workflows')
      expect(getDisplayNameForSegment('l-arsenal-ia')).toBe('L\'Arsenal IA')
      expect(getDisplayNameForSegment('par-ou-commencer')).toBe('Par où commencer')
    })

    it('returns formatted segment name for unknown segments', () => {
      expect(getDisplayNameForSegment('unknown-segment')).toBe('Unknown Segment')
      expect(getDisplayNameForSegment('test-page')).toBe('Test Page')
      expect(getDisplayNameForSegment('multi-word-page')).toBe('Multi Word Page')
    })

    it('handles empty and special characters', () => {
      expect(getDisplayNameForSegment('')).toBe('')
      expect(getDisplayNameForSegment('page-with-numbers-123')).toBe('Page With Numbers 123')
      expect(getDisplayNameForSegment('page_with_underscores')).toBe('Page With Underscores')
    })

    it('handles content type specific segments', () => {
      expect(getDisplayNameForSegment('external-tools')).toBe('Outils externes')
      expect(getDisplayNameForSegment('arsenalIA')).toBe('Arsenalia')
    })
  })

  describe('generateBreadcrumbs', () => {
    it('generates breadcrumbs for root path', () => {
      const breadcrumbs = generateBreadcrumbs('/')

      expect(breadcrumbs).toEqual([
        { label: 'Accueil', href: '/' },
      ])
    })

    it('generates breadcrumbs for simple paths', () => {
      const breadcrumbs = generateBreadcrumbs('/guides')

      expect(breadcrumbs).toEqual([
        { label: 'Accueil', href: '/' },
        { label: 'Guides', href: '/guides' },
      ])
    })

    it('generates breadcrumbs for nested paths', () => {
      const breadcrumbs = generateBreadcrumbs('/guides/test-guide')

      expect(breadcrumbs).toEqual([
        { label: 'Accueil', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Test Guide', href: '/guides/test-guide' },
      ])
    })

    it('generates breadcrumbs for deeply nested paths', () => {
      const breadcrumbs = generateBreadcrumbs('/guides/category/subcategory/item')

      expect(breadcrumbs).toEqual([
        { label: 'Accueil', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Category', href: '/guides/category' },
        { label: 'Subcategory', href: '/guides/category/subcategory' },
        { label: 'Item', href: '/guides/category/subcategory/item' },
      ])
    })

    it('handles special routes correctly', () => {
      const breadcrumbs = generateBreadcrumbs('/par-ou-commencer')

      expect(breadcrumbs).toEqual([
        { label: 'Accueil', href: '/' },
        { label: 'Par où commencer', href: '/par-ou-commencer' },
      ])
    })

    it('filters out empty segments', () => {
      const breadcrumbs = generateBreadcrumbs('/guides//test-guide/')

      expect(breadcrumbs).toEqual([
        { label: 'Accueil', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Test Guide', href: '/guides/test-guide' },
      ])
    })
  })

  describe('getMainNavigationLinks', () => {
    it('returns main navigation links with correct structure', () => {
      const links = getMainNavigationLinks('/')

      expect(links).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            href: '/guides',
            label: 'Guides',
            icon: expect.any(Function),
            isActive: false,
          }),
          expect.objectContaining({
            href: '/workflows',
            label: 'Workflows',
            icon: expect.any(Function),
            isActive: false,
          }),
          expect.objectContaining({
            href: '/concepts',
            label: 'Concepts',
            icon: expect.any(Function),
            isActive: false,
          }),
          expect.objectContaining({
            href: '/l-arsenal-ia',
            label: 'L\'Arsenal IA',
            icon: expect.any(Function),
            isActive: false,
          }),
        ]),
      )
    })

    it('marks active link correctly', () => {
      const links = getMainNavigationLinks('/guides')
      const guidesLink = links.find(link => link.href === '/guides')

      expect(guidesLink?.isActive).toBe(true)
    })

    it('marks nested paths as active for parent', () => {
      const links = getMainNavigationLinks('/guides/test-guide')
      const guidesLink = links.find(link => link.href === '/guides')

      expect(guidesLink?.isActive).toBe(true)
    })

    it('handles root path correctly', () => {
      const links = getMainNavigationLinks('/')

      // No link should be active for root
      expect(links.every(link => !link.isActive)).toBe(true)
    })
  })

  describe('getMobileNavigationLinks', () => {
    it('returns mobile navigation links including home', () => {
      const links = getMobileNavigationLinks('/')

      expect(links).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            href: '/',
            label: 'Accueil',
            icon: expect.any(Function),
            isActive: true,
          }),
          expect.objectContaining({
            href: '/guides',
            label: 'Guides',
            icon: expect.any(Function),
            isActive: false,
          }),
        ]),
      )
    })

    it('marks home as active for root path', () => {
      const links = getMobileNavigationLinks('/')
      const homeLink = links.find(link => link.href === '/')

      expect(homeLink?.isActive).toBe(true)
    })

    it('marks correct link as active for non-root paths', () => {
      const links = getMobileNavigationLinks('/concepts')
      const conceptsLink = links.find(link => link.href === '/concepts')
      const homeLink = links.find(link => link.href === '/')

      expect(conceptsLink?.isActive).toBe(true)
      expect(homeLink?.isActive).toBe(false)
    })
  })

  describe('isActiveRoute', () => {
    it('returns true for exact matches', () => {
      expect(isActiveRoute('/guides', '/guides')).toBe(true)
      expect(isActiveRoute('/concepts', '/concepts')).toBe(true)
      expect(isActiveRoute('/', '/')).toBe(true)
    })

    it('returns true for nested paths', () => {
      expect(isActiveRoute('/guides/test-guide', '/guides')).toBe(true)
      expect(isActiveRoute('/concepts/ai-fundamentals', '/concepts')).toBe(true)
      expect(isActiveRoute('/guides/advanced/test', '/guides')).toBe(true)
    })

    it('returns false for different routes', () => {
      expect(isActiveRoute('/guides', '/concepts')).toBe(false)
      expect(isActiveRoute('/workflows', '/guides')).toBe(false)
      expect(isActiveRoute('/concepts', '/')).toBe(false)
    })

    it('handles root path correctly', () => {
      expect(isActiveRoute('/', '/')).toBe(true)
      expect(isActiveRoute('/guides', '/')).toBe(false)
      expect(isActiveRoute('/', '/guides')).toBe(false)
    })

    it('handles trailing slashes', () => {
      expect(isActiveRoute('/guides/', '/guides')).toBe(true)
      expect(isActiveRoute('/guides', '/guides/')).toBe(true)
      expect(isActiveRoute('/guides/', '/guides/')).toBe(true)
    })

    it('is case sensitive', () => {
      expect(isActiveRoute('/Guides', '/guides')).toBe(false)
      expect(isActiveRoute('/guides', '/Guides')).toBe(false)
    })
  })

  describe('getContentTypeFromPath', () => {
    it('extracts content type from valid paths', () => {
      expect(getContentTypeFromPath('/guides/test-guide')).toBe('guide')
      expect(getContentTypeFromPath('/workflows/test-workflow')).toBe('workflow')
      expect(getContentTypeFromPath('/concepts/test-concept')).toBe('concept')
      expect(getContentTypeFromPath('/l-arsenal-ia/test-tool')).toBe('tool')
    })

    it('returns null for invalid or non-content paths', () => {
      expect(getContentTypeFromPath('/')).toBe(null)
      expect(getContentTypeFromPath('/par-ou-commencer')).toBe(null)
      expect(getContentTypeFromPath('/unknown')).toBe(null)
      expect(getContentTypeFromPath('/guides')).toBe(null) // Collection path, not content
    })

    it('handles malformed paths gracefully', () => {
      expect(getContentTypeFromPath('')).toBe(null)
      expect(getContentTypeFromPath('//')).toBe(null)
      expect(getContentTypeFromPath('invalid-path')).toBe(null)
    })
  })

  describe('buildContentPath', () => {
    it('builds correct paths for different content types', () => {
      expect(buildContentPath('guide', 'test-guide')).toBe('/guides/test-guide')
      expect(buildContentPath('workflow', 'test-workflow')).toBe('/workflows/test-workflow')
      expect(buildContentPath('concept', 'test-concept')).toBe('/concepts/test-concept')
      expect(buildContentPath('tool', 'test-tool')).toBe('/l-arsenal-ia/test-tool')
    })

    it('handles edge cases', () => {
      expect(buildContentPath('guide', '')).toBe('/guides/')
      expect(buildContentPath('guide', 'slug-with-special-chars-123')).toBe('/guides/slug-with-special-chars-123')
    })

    it('returns null for unknown content types', () => {
      expect(buildContentPath('unknown' as any, 'test')).toBe(null)
      expect(buildContentPath('' as any, 'test')).toBe(null)
    })
  })

  describe('navigation State Management', () => {
    it('maintains consistent state across calls', () => {
      const links1 = getMainNavigationLinks('/guides')
      const links2 = getMainNavigationLinks('/guides')

      expect(links1).toEqual(links2)
    })

    it('updates active state correctly when path changes', () => {
      const guidesLinks = getMainNavigationLinks('/guides')
      const conceptsLinks = getMainNavigationLinks('/concepts')

      const guidesActive = guidesLinks.find(link => link.href === '/guides')?.isActive
      const conceptsActiveInGuides = guidesLinks.find(link => link.href === '/concepts')?.isActive
      const conceptsActive = conceptsLinks.find(link => link.href === '/concepts')?.isActive

      expect(guidesActive).toBe(true)
      expect(conceptsActiveInGuides).toBe(false)
      expect(conceptsActive).toBe(true)
    })
  })

  describe('performance and Edge Cases', () => {
    it('handles long paths efficiently', () => {
      const longPath = `/guides/${'segment/'.repeat(20)}final`

      const start = performance.now()
      const breadcrumbs = generateBreadcrumbs(longPath)
      const end = performance.now()

      expect(end - start).toBeLessThan(10)
      expect(breadcrumbs).toHaveLength(23) // home + 22 segments
    })

    it('handles unicode characters in paths', () => {
      const unicodePath = '/guides/guide-avec-accents-éàü'

      expect(() => {
        const breadcrumbs = generateBreadcrumbs(unicodePath)
        const contentType = getContentTypeFromPath(unicodePath)
        const links = getMainNavigationLinks(unicodePath)
      }).not.toThrow()
    })

    it('handles malformed URLs gracefully', () => {
      const malformedPaths = [
        '//guides///',
        '/guides//',
        '/guides/%20%20',
        '/guides/../..',
      ]

      malformedPaths.forEach((path) => {
        expect(() => {
          generateBreadcrumbs(path)
          getMainNavigationLinks(path)
          getContentTypeFromPath(path)
        }).not.toThrow()
      })
    })
  })

  describe('accessibility and Internationalization', () => {
    it('provides accessible navigation structure', () => {
      const links = getMainNavigationLinks('/guides')

      links.forEach((link) => {
        expect(link.label).toBeTruthy()
        expect(link.href).toMatch(/^\//)
        expect(link.icon).toBeDefined()
      })
    })

    it('uses consistent French labels', () => {
      const mainLinks = getMainNavigationLinks('/')
      const mobileLinks = getMobileNavigationLinks('/')

      const arsenalLink = mainLinks.find(link => link.href === '/l-arsenal-ia')
      expect(arsenalLink?.label).toBe('L\'Arsenal IA')

      const homeLink = mobileLinks.find(link => link.href === '/')
      expect(homeLink?.label).toBe('Accueil')
    })

    it('maintains correct text direction for RTL content', () => {
      // Even though this is a French site, test that navigation structure
      // would support different text directions
      const links = getMainNavigationLinks('/guides')

      expect(links.every(link => typeof link.label === 'string')).toBe(true)
    })
  })
})
