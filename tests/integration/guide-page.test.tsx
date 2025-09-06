/**
 * Server Component Page Tests
 * Modern testing patterns for Next.js 15 Server Components with params
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
// Import mock factories directly from content.mock
import { createGuideWithoutTakeaways, createMockGuide } from '../mocks/content.mock'

import { renderServerPage } from '../utils/testing-utils'

// Mock the notFound function from next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
}))

// Mock content loader
vi.mock('@/lib/content-loader', () => ({
  getGuideBySlug: vi.fn(),
  getWorkflowBySlug: vi.fn(),
  getConceptBySlug: vi.fn(),
  getExternalToolBySlug: vi.fn(),
  content: {
    guides: [],
    workflows: [],
    concepts: [],
    externalTools: [],
  },
}))

// Mock layout components
vi.mock('@/components/layout/ContentPageLayout', () => ({
  ContentPageLayout: ({ children, item }: any) => (
    <div data-testid="content-page-layout">
      <h1 data-testid="item-title">{item?.title}</h1>
      <p data-testid="item-description">{item?.description}</p>
      {children}
    </div>
  ),
}))

vi.mock('@/components/shared/ConceptListSection', () => ({
  ConceptListSection: ({ concepts }: any) => (
    <div data-testid="concept-list-section">
      {concepts?.map((concept: any) => (
        <div key={concept.slug} data-testid={`concept-${concept.slug}`}>
          {concept.title}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/shared/ContentRenderer', () => ({
  ContentRenderer: ({ content }: any) => (
    <div data-testid="content-renderer">
      {content?.map((block: any, index: number) => (
        <div key={index} data-testid={`content-block-${index}`}>
          {block.type}
          :
          {block.content?.substring(0, 50) || block.title}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/shared/KeyTakeaways', () => ({
  KeyTakeaways: ({ points }: any) => (
    <div data-testid="key-takeaways">
      {points?.map((point: string, index: number) => (
        <div key={index} data-testid={`takeaway-${index}`}>
          {point}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/shared/SmartRecommendationsSection', () => ({
  SmartRecommendationsSection: ({ item }: any) => (
    <div data-testid="smart-recommendations">
      Recommendations for
      {' '}
      {item?.title}
    </div>
  ),
}))

vi.mock('@/components/ui/separator', () => ({
  Separator: ({ className }: any) => (
    <hr data-testid="separator" className={className} />
  ),
}))

describe('guide Page Server Component', () => {
  const mockGuide = createMockGuide({
    slug: 'test-guide',
    title: 'Test Guide',
    description: 'A test guide for demonstration',
    category: 'test',
    difficulty: 'beginner',
    tags: ['test', 'guide'],
    isFavorite: false,
    content: [
      {
        type: 'markdown',
        content: 'This is test content for the guide',
      },
      {
        type: 'codeBlock',
        content: 'console.log("Hello, World!")',
        language: 'javascript',
      },
    ],
    keyTakeaways: ['Key takeaway 1', 'Key takeaway 2'],
    concepts: [
      {
        slug: 'test-concept',
        title: 'Test Concept',
        description: 'A test concept',
      },
    ],
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('with valid guide', () => {
    it('renders guide page with all components', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      vi.mocked(getGuideBySlug).mockReturnValue(mockGuide)

      // Import the actual page component
      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      const { getByTestId, getAllByTestId, getByText } = await renderServerPage(GuideDetailPage, {
        params: { slug: 'test-guide' },
      })

      // Check main layout
      expect(getByTestId('content-page-layout')).toBeInTheDocument()
      expect(getByTestId('item-title')).toHaveTextContent('Test Guide')
      expect(getByTestId('item-description')).toHaveTextContent('A test guide for demonstration')

      // Check content components
      expect(getByTestId('concept-list-section')).toBeInTheDocument()
      expect(getByTestId('concept-test-concept')).toBeInTheDocument()
      expect(getByTestId('key-takeaways')).toBeInTheDocument()
      expect(getByTestId('takeaway-0')).toHaveTextContent('Key takeaway 1')
      expect(getByTestId('takeaway-1')).toHaveTextContent('Key takeaway 2')
      expect(getByTestId('content-renderer')).toBeInTheDocument()
      expect(getByTestId('smart-recommendations')).toBeInTheDocument()

      // Check separators
      const separators = getAllByTestId('separator')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('renders content blocks correctly', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      vi.mocked(getGuideBySlug).mockReturnValue(mockGuide)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      const { getByTestId } = await renderServerPage(GuideDetailPage, {
        params: { slug: 'test-guide' },
      })

      const contentRenderer = getByTestId('content-renderer')
      expect(contentRenderer).toBeInTheDocument()

      // Check individual content blocks
      const markdownBlock = getByTestId('content-block-0')
      expect(markdownBlock).toHaveTextContent('markdown: This is test content for the guide')

      const codeBlock = getByTestId('content-block-1')
      expect(codeBlock).toHaveTextContent('codeBlock: console.log("Hello, World!")')
    })

    it('handles guide without concepts', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      const guideWithoutConcepts = createMockGuide({ ...mockGuide, concepts: [] })
      vi.mocked(getGuideBySlug).mockReturnValue(guideWithoutConcepts)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      const { queryByTestId } = await renderServerPage(GuideDetailPage, {
        params: { slug: 'test-guide' },
      })

      // Should not render concept section when no concepts
      expect(queryByTestId('concept-list-section')).not.toBeInTheDocument()
    })

    it('handles guide without key takeaways', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      const guideWithoutTakeaways = createGuideWithoutTakeaways()
      vi.mocked(getGuideBySlug).mockReturnValue(guideWithoutTakeaways)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      const { queryByTestId } = await renderServerPage(GuideDetailPage, {
        params: { slug: 'test-guide' },
      })

      // Should not render key takeaways section when none exist
      expect(queryByTestId('key-takeaways')).not.toBeInTheDocument()
    })
  })

  describe('with invalid guide', () => {
    it('calls notFound when guide does not exist', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getGuideBySlug).mockReturnValue(undefined)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      await expect(renderServerPage(GuideDetailPage, {
        params: { slug: 'non-existent-guide' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })

    it('handles malformed params gracefully', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getGuideBySlug).mockReturnValue(undefined)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      await expect(renderServerPage(GuideDetailPage, {
        params: { slug: '' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('accessibility testing', () => {
    it('meets accessibility standards', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      vi.mocked(getGuideBySlug).mockReturnValue(mockGuide)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default
      const { testAccessibility } = await import('../utils/testing-utils')

      const renderResult = await renderServerPage(GuideDetailPage, {
        params: { slug: 'test-guide' },
      })

      await testAccessibility(renderResult, {
        rules: {
          'heading-order': { enabled: true },
        },
      })
    })

    it('has proper heading structure', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      vi.mocked(getGuideBySlug).mockReturnValue(mockGuide)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default

      const { getByRole } = await renderServerPage(GuideDetailPage, {
        params: { slug: 'test-guide' },
      })

      // Should have an h1 heading
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Guide')
    })
  })

  describe('performance testing', () => {
    it('renders within performance budget', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      vi.mocked(getGuideBySlug).mockReturnValue(mockGuide)

      const GuideDetailPage = (await import('@/app/guides/[slug]/page')).default
      const { measureRenderPerformance } = await import('../utils/testing-utils')

      const performance = measureRenderPerformance(
        () => renderServerPage(GuideDetailPage, { params: { slug: 'test-guide' } }),
        5,
      )

      // Expect render time to be under 50ms for server components
      performance.expectFastRender(50)
    })
  })
})
