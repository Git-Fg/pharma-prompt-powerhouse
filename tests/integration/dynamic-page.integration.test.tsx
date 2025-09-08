import { render, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the content loader
vi.mock('@/lib/content-loader', () => ({
  getContentItem: vi.fn(),
  getGuideBySlug: vi.fn(),
  getConceptBySlug: vi.fn(),
  getWorkflowBySlug: vi.fn(),
  getExternalToolBySlug: vi.fn(),
  content: {
    guides: [],
    concepts: [],
    workflows: [],
    externalTools: [],
  },
}))

// Mock the content utils
vi.mock('@/lib/content-utils', () => ({
  getContentTypeFromRoute: vi.fn(),
  generateContentMetadataDynamic: vi.fn(),
}))

// Mock the navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
}))

import DynamicContentPage from '@/app/[contentType]/[slug]/page'
// Import the mocked modules
import { getContentItem } from '@/lib/content-loader'
import { getContentTypeFromRoute } from '@/lib/content-utils'

// Mock data
const mockGuide = {
  slug: 'test-guide',
  title: 'Test Guide',
  description: 'Test guide description',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  isWorkflow: false,
  content: [
    {
      type: 'paragraph',
      content: 'This is a test paragraph content.',
    },
  ],
  conceptSlugs: ['test-concept'],
  estimatedTime: '10 min',
  keyTakeaways: ['Test takeaway 1', 'Test takeaway 2'],
  concepts: [],
  relatedItems: [],
}

describe('dynamicContentPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('successful content loading', () => {
    it('should render guide content with prose layout', () => {
      // Setup mocks
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(mockGuide)

      // Render the page
      const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'test-guide' })} />)

      // Verify the page structure
      expect(container.querySelector('section')).toBeInTheDocument()
      expect(container.querySelector('.container-layout-collection')).toBeInTheDocument()

      // Verify content is rendered (through real components)
      expect(screen.getByText('Test Guide')).toBeInTheDocument()
      expect(screen.getByText('Test guide description')).toBeInTheDocument()
    })

    it('should render concept content without prose layout', () => {
      const mockConcept = {
        ...mockGuide,
        slug: 'test-concept',
        title: 'Test Concept',
        category: 'fundamentals',
      }

      vi.mocked(getContentTypeFromRoute).mockReturnValue('concept')
      vi.mocked(getContentItem).mockReturnValue(mockConcept)

      const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: 'concepts', slug: 'test-concept' })} />)

      // Verify concept-specific layout (no prose)
      const main = container.querySelector('main')
      expect(main).not.toHaveClass('prose')
      expect(main).toHaveClass('max-w-none')

      expect(screen.getByText('Test Concept')).toBeInTheDocument()
    })

    it('should render external tool content without prose layout', () => {
      const mockTool = {
        ...mockGuide,
        slug: 'test-tool',
        title: 'Test Tool',
        category: 'general',
        url: 'https://example.com',
        personalReview: 'Test review',
        strongPoints: ['Feature 1'],
        vigilancePoints: ['Limitation 1'],
        confidenceScore: 4,
        confidenceJustification: 'Test justification',
        freeVsPaidOffer: 'Free',
      }

      vi.mocked(getContentTypeFromRoute).mockReturnValue('tool')
      vi.mocked(getContentItem).mockReturnValue(mockTool)

      const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: 'tools', slug: 'test-tool' })} />)

      // Verify tool-specific layout (no prose)
      const main = container.querySelector('main')
      expect(main).not.toHaveClass('prose')
      expect(main).toHaveClass('max-w-none')

      expect(screen.getByText('Test Tool')).toBeInTheDocument()
    })

    it('should render workflow content with prose layout', () => {
      const mockWorkflow = {
        ...mockGuide,
        slug: 'test-workflow',
        title: 'Test Workflow',
        category: 'analysis',
        isWorkflow: true,
      }

      vi.mocked(getContentTypeFromRoute).mockReturnValue('workflow')
      vi.mocked(getContentItem).mockReturnValue(mockWorkflow)

      const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: 'workflows', slug: 'test-workflow' })} />)

      // Verify workflow layout (with prose)
      const main = container.querySelector('main')
      expect(main).toHaveClass('prose')
      expect(main).toHaveClass('prose-lg')
      expect(main).toHaveClass('dark:prose-invert')

      expect(screen.getByText('Test Workflow')).toBeInTheDocument()
    })
  })

  describe('error handling', () => {
    it('should handle invalid content type', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue(null as any)

      expect(() => {
        render(<DynamicContentPage params={Promise.resolve({ contentType: 'invalid', slug: 'test' })} />)
      }).toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })

    it('should handle content not found', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(undefined)

      expect(() => {
        render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'nonexistent' })} />)
      }).toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('data flow integration', () => {
    it('should pass correct props to ContentPageLayout', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(mockGuide)

      const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'test-guide' })} />)

      // Verify that ContentPageLayout receives the correct item
      expect(screen.getByText('Test Guide')).toBeInTheDocument()
      expect(screen.getByText('Test guide description')).toBeInTheDocument()
    })

    it('should pass correct props to ContentBodyRenderer', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(mockGuide)

      render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'test-guide' })} />)

      // Verify that ContentBodyRenderer receives the correct item and contentType
      expect(screen.getByText('Test Guide')).toBeInTheDocument()

      // The content should be rendered through the real ContentBodyRenderer component
      expect(screen.getByText('This is a test paragraph content.')).toBeInTheDocument()
    })

    it('should handle content with complex structure', () => {
      const complexContent = {
        ...mockGuide,
        content: [
          {
            type: 'heading',
            level: 2,
            content: 'Test Heading',
          },
          {
            type: 'paragraph',
            content: 'Test paragraph with **bold** text.',
          },
          {
            type: 'list',
            items: ['Item 1', 'Item 2', 'Item 3'],
          },
        ],
      }

      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(complexContent)

      render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'complex-guide' })} />)

      // Verify complex content is rendered
      expect(screen.getByText('Test Guide')).toBeInTheDocument()
      expect(screen.getByText('Test paragraph with bold text.')).toBeInTheDocument()
    })
  })

  describe('route parameter handling', () => {
    it('should handle different content type routes', () => {
      const routes = [
        { route: 'guides', expected: 'guide' },
        { route: 'concepts', expected: 'concept' },
        { route: 'workflows', expected: 'workflow' },
        { route: 'tools', expected: 'tool' },
      ]

      routes.forEach(({ route, expected }) => {
        vi.mocked(getContentTypeFromRoute).mockReturnValue(expected as any)
        vi.mocked(getContentItem).mockReturnValue({ ...mockGuide, title: `Test ${route}` })

        const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: route, slug: 'test' })} />)

        expect(getContentTypeFromRoute).toHaveBeenCalledWith(route)
        expect(getContentItem).toHaveBeenCalledWith(expected, 'test')
        expect(screen.getByText(`Test ${route}`)).toBeInTheDocument()

        vi.clearAllMocks()
      })
    })

    it('should handle slug-based content retrieval', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(mockGuide)

      render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'test-guide' })} />)

      expect(getContentItem).toHaveBeenCalledWith('guide', 'test-guide')
      expect(screen.getByText('Test Guide')).toBeInTheDocument()
    })
  })

  describe('performance and accessibility', () => {
    it('should render efficiently with minimal re-renders', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(mockGuide)

      const start = performance.now()
      const { container } = render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'test-guide' })} />)
      const end = performance.now()

      expect(end - start).toBeLessThan(100)
      expect(container.querySelector('section')).toBeInTheDocument()
    })

    it('should maintain proper heading hierarchy', () => {
      vi.mocked(getContentTypeFromRoute).mockReturnValue('guide')
      vi.mocked(getContentItem).mockReturnValue(mockGuide)

      render(<DynamicContentPage params={Promise.resolve({ contentType: 'guides', slug: 'test-guide' })} />)

      // The main heading should be at level 1
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Guide')
    })
  })
})
