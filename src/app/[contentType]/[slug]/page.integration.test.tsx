import { render, screen } from '@/test-utils'
import { notFound } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the content loader
vi.mock('@/lib/content-loader', () => ({
  getContentItem: vi.fn(),
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

// Mock the navigation - override global mock for this test
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    usePathname: vi.fn(() => '/'),
    notFound: vi.fn(() => {
      throw new Error('NOT_FOUND')
    }),
  }
})

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
      type: 'markdown',
      content: 'This is test content',
    },
  ],
  conceptSlugs: [],
}

const mockConcept = {
  slug: 'test-concept',
  title: 'Test Concept',
  description: 'Test concept description',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  keyTakeaways: ['Key point 1', 'Key point 2'],
  content: [
    {
      type: 'markdown',
      content: 'This is test concept content',
    },
  ],
}

describe('Dynamic Content Page Integration', () => {
  const mockGetContentItem = vi.mocked(getContentItem)
  const mockGetContentTypeFromRoute = vi.mocked(getContentTypeFromRoute)
  const mockNotFound = vi.mocked(notFound)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Guide pages', () => {
    it('should render guide page with correct content', async () => {
      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(mockGuide)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'guides', slug: 'test-guide' }
      })

      render(PageComponent)

      expect(screen.getByText('Test Guide')).toBeInTheDocument()
      expect(screen.getByText('Test guide description')).toBeInTheDocument()
      expect(mockGetContentItem).toHaveBeenCalledWith('guides', 'test-guide')
    })

    it('should show difficulty badge for guides', async () => {
      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(mockGuide)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'guides', slug: 'test-guide' }
      })

      render(PageComponent)

      expect(screen.getByText('beginner')).toBeInTheDocument()
    })
  })

  describe('Concept pages', () => {
    it('should render concept page with key takeaways', async () => {
      mockGetContentTypeFromRoute.mockReturnValue('concepts')
      mockGetContentItem.mockReturnValue(mockConcept)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'concepts', slug: 'test-concept' }
      })

      render(PageComponent)

      expect(screen.getByText('Test Concept')).toBeInTheDocument()
      expect(screen.getByText('Key point 1')).toBeInTheDocument()
      expect(screen.getByText('Key point 2')).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('should call notFound for invalid content type', async () => {
      mockGetContentTypeFromRoute.mockReturnValue(null)

      await expect(
        DynamicContentPage({
          params: { contentType: 'invalid', slug: 'test' }
        })
      ).rejects.toThrow('NOT_FOUND')

      expect(mockNotFound).toHaveBeenCalled()
    })

    it('should call notFound for non-existent content', async () => {
      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(undefined)

      await expect(
        DynamicContentPage({
          params: { contentType: 'guides', slug: 'non-existent' }
        })
      ).rejects.toThrow('NOT_FOUND')

      expect(mockNotFound).toHaveBeenCalled()
    })
  })

  describe('Content rendering integration', () => {
    it('should render content blocks through ContentRenderer', async () => {
      const guideWithMultipleBlocks = {
        ...mockGuide,
        content: [
          {
            type: 'markdown',
            content: 'Introduction paragraph',
          },
          {
            type: 'codeBlock',
            language: 'typescript',
            content: 'console.log("hello");',
          },
          {
            type: 'markdown',
            content: 'Conclusion paragraph',
          },
        ],
      }

      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(guideWithMultipleBlocks)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'guides', slug: 'test-guide' }
      })

      render(PageComponent)

      expect(screen.getByText('Introduction paragraph')).toBeInTheDocument()
      expect(screen.getByText('console.log("hello");')).toBeInTheDocument()
      expect(screen.getByText('Conclusion paragraph')).toBeInTheDocument()
    })
  })

  describe('Metadata integration', () => {
    it('should handle content with proper metadata structure', async () => {
      const richGuide = {
        ...mockGuide,
        category: 'ai-tools',
        tags: ['chatgpt', 'prompting', 'productivity'],
        isFavorite: true,
      }

      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(richGuide)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'guides', slug: 'test-guide' }
      })

      render(PageComponent)

      expect(screen.getByText('Test Guide')).toBeInTheDocument()
      // Tags and metadata should be rendered
      expect(screen.getByText('chatgpt')).toBeInTheDocument()
      expect(screen.getByText('prompting')).toBeInTheDocument()
    })
  })

  describe('Layout integration', () => {
    it('should render with proper page layout components', async () => {
      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(mockGuide)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'guides', slug: 'test-guide' }
      })

      render(PageComponent)

      // Should have breadcrumb navigation
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      
      // Should have main content area
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('Workflow-specific integration', () => {
    it('should handle workflow guides with special features', async () => {
      const workflowGuide = {
        ...mockGuide,
        isWorkflow: true,
        content: [
          {
            type: 'markdown',
            content: 'Workflow introduction',
          },
          {
            type: 'multiFormatPrompt',
            alternativeVersions: {
              standard: 'Standard prompt version',
              xml: '<prompt>XML version</prompt>',
            },
          },
        ],
      }

      mockGetContentTypeFromRoute.mockReturnValue('guides')
      mockGetContentItem.mockReturnValue(workflowGuide)

      const PageComponent = await DynamicContentPage({
        params: { contentType: 'workflows', slug: 'test-workflow' }
      })

      render(PageComponent)

      expect(screen.getByText('Workflow introduction')).toBeInTheDocument()
      // Workflow-specific components should render
    })
  })
})