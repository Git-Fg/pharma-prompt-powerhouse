/**
 * Concept Page Server Component Tests
 * Modern testing patterns for Next.js 15 Server Components with async params
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
// Import mock factories directly from content.mock
import { createConceptWithoutTakeaways, createMockConcept } from '../mocks/content.mock'

import { renderServerPage } from '../utils/testing-utils'

// Mock the notFound function from next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
}))

// Mock content loader and utils
vi.mock('@/lib/content-loader', () => ({
  getConceptBySlug: vi.fn(),
  content: {
    concepts: [],
    guides: [],
    workflows: [],
    externalTools: [],
  },
}))

vi.mock('@/lib/utils', () => ({
  normalizeSlug: (slug: string) => slug,
}))

// Mock layout components
vi.mock('@/components/layout/ContentPageLayout', () => ({
  ContentPageLayout: ({ children, item, prose }: any) => (
    <div data-testid="content-page-layout" data-prose={prose}>
      <h1 data-testid="item-title" role="heading" aria-level={1}>{item?.title}</h1>
      <p data-testid="item-description">{item?.description}</p>
      <div data-testid="item-category">{item?.category}</div>
      <div data-testid="item-difficulty">{item?.difficulty}</div>
      {children}
    </div>
  ),
}))

vi.mock('@/components/shared/ContentRenderer', () => ({
  ContentRenderer: ({ content }: any) => (
    <div data-testid="content-renderer">
      {content?.map((block: any, index: number) => (
        // eslint-disable-next-line react/no-array-index-key -- Test mock, pas de réordonnancement possible
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
        // eslint-disable-next-line react/no-array-index-key -- Test mock, pas de réordonnancement possible
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

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, ...props }: any) => (
    <div data-testid="card-header" {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, ...props }: any) => (
    <h3 data-testid="card-title" role="heading" aria-level={3} {...props}>
      {children}
    </h3>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div data-testid="card-content" {...props}>
      {children}
    </div>
  ),
}))

vi.mock('lucide-react', () => ({
  Target: () => <span data-testid="target-icon">🎯</span>,
}))

describe('concept Page Server Component', () => {
  const mockConcept = createMockConcept({
    slug: 'test-concept',
    title: 'Test Concept',
    description: 'A test concept for demonstration',
    category: 'methodology',
    difficulty: 'intermediate',
    tags: ['test', 'concept', 'methodology'],
    isFavorite: false,
    keyTakeaways: [
      'Understanding this concept is crucial',
      'Apply it in practical scenarios',
      'Master the fundamentals',
    ],
    content: [
      {
        type: 'markdown',
        content: '# Test Concept\n\nThis is a detailed explanation of the test concept.',
      },
      {
        type: 'card',
        title: 'Simple Analogy',
        content: 'Think of this concept like building blocks - each piece builds upon the previous one.',
      },
      {
        type: 'codeBlock',
        content: 'concept.example()',
        language: 'javascript',
      },
    ],
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('with valid concept', () => {
    it('renders concept page with all components', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { getByTestId, getByText } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      // Check main layout
      expect(getByTestId('content-page-layout')).toBeInTheDocument()
      expect(getByTestId('item-title')).toHaveTextContent('Test Concept')
      expect(getByTestId('item-description')).toHaveTextContent('A test concept for demonstration')
      expect(getByTestId('item-category')).toHaveTextContent('methodology')
      expect(getByTestId('item-difficulty')).toHaveTextContent('intermediate')

      // Check prose prop is false for concepts
      expect(getByTestId('content-page-layout')).toHaveAttribute('data-prose', 'false')

      // Check key takeaways
      expect(getByTestId('key-takeaways')).toBeInTheDocument()
      expect(getByTestId('takeaway-0')).toHaveTextContent('Understanding this concept is crucial')
      expect(getByTestId('takeaway-1')).toHaveTextContent('Apply it in practical scenarios')
      expect(getByTestId('takeaway-2')).toHaveTextContent('Master the fundamentals')

      // Check concept card
      expect(getByTestId('card')).toBeInTheDocument()
      expect(getByTestId('card-header')).toBeInTheDocument()
      expect(getByTestId('card-title')).toBeInTheDocument()
      expect(getByTestId('card-content')).toBeInTheDocument()

      // Check card title with icon
      expect(getByTestId('card-title')).toHaveTextContent('À propos de ce concept')
      expect(getByTestId('target-icon')).toBeInTheDocument()

      // Check content renderer
      expect(getByTestId('content-renderer')).toBeInTheDocument()

      // Check recommendations
      expect(getByTestId('smart-recommendations')).toBeInTheDocument()
    })

    it('renders concept content correctly', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { getByTestId } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      const contentRenderer = getByTestId('content-renderer')
      expect(contentRenderer).toBeInTheDocument()

      // Check individual content blocks
      const markdownBlock = getByTestId('content-block-0')
      expect(markdownBlock).toHaveTextContent('markdown: # Test Concept')

      const cardBlock = getByTestId('content-block-1')
      expect(cardBlock).toHaveTextContent('Think of this concept like building blocks')

      const codeBlock = getByTestId('content-block-2')
      expect(codeBlock).toHaveTextContent('codeBlock: concept.example()')
    })

    it('handles concept without key takeaways', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      const conceptWithoutTakeaways = createConceptWithoutTakeaways()
      vi.mocked(getConceptBySlug).mockReturnValue(conceptWithoutTakeaways)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { queryByTestId } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      // Should not render key takeaways section when none exist
      expect(queryByTestId('key-takeaways')).not.toBeInTheDocument()
    })

    it('always renders concept card structure', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { getByTestId } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      // Card structure should always be present for concepts
      expect(getByTestId('card')).toBeInTheDocument()
      expect(getByTestId('card-header')).toBeInTheDocument()
      expect(getByTestId('card-title')).toBeInTheDocument()
      expect(getByTestId('card-content')).toBeInTheDocument()
      expect(getByTestId('target-icon')).toBeInTheDocument()
    })
  })

  describe('with invalid concept', () => {
    it('calls notFound when concept does not exist', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getConceptBySlug).mockReturnValue(undefined)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      await expect(renderServerPage(ConceptDetailPage, {
        params: { slug: 'non-existent-concept' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })

    it('handles malformed slug gracefully', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getConceptBySlug).mockReturnValue(undefined)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      await expect(renderServerPage(ConceptDetailPage, {
        params: { slug: '' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('content structure', () => {
    it('has proper concept card layout', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { getByTestId } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      const card = getByTestId('card')
      const cardHeader = getByTestId('card-header')
      const cardTitle = getByTestId('card-title')
      const cardContent = getByTestId('card-content')

      // Check card structure
      expect(card).toContainElement(cardHeader)
      expect(cardHeader).toContainElement(cardTitle)
      expect(card).toContainElement(cardContent)

      // Check card title includes icon
      expect(cardTitle).toContainElement(getByTestId('target-icon'))
      expect(cardTitle).toHaveTextContent('À propos de ce concept')

      // Check content renderer is inside card content
      expect(cardContent).toContainElement(getByTestId('content-renderer'))
    })

    it('applies proper CSS classes', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { getByTestId } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      // Check card has margin bottom class
      const card = getByTestId('card')
      expect(card).toHaveClass('mb-8')
    })
  })

  describe('accessibility testing', () => {
    it('meets basic accessibility standards', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default
      const { testAccessibility } = await import('../utils/testing-utils')

      const renderResult = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      // Test basic accessibility without heading order for mock components
      await testAccessibility(renderResult, {
        rules: {},
      })
    })

    it('has proper heading structure', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default

      const { getAllByRole } = await renderServerPage(ConceptDetailPage, {
        params: { slug: 'test-concept' },
      })

      // Should have proper heading hierarchy
      const headings = getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)

      // H1 should be the main title
      const h1 = headings.find(h => h.getAttribute('aria-level') === '1')
      expect(h1).toBeDefined()
      expect(h1).toHaveTextContent('Test Concept')

      // Card title should be h3
      const h3 = headings.find(h => h.getAttribute('aria-level') === '3')
      expect(h3).toBeInTheDocument()
      expect(h3).toHaveTextContent('À propos de ce concept')
    })
  })

  describe('performance testing', () => {
    it('renders within performance budget', async () => {
      const { getConceptBySlug } = await import('@/lib/content-loader')
      vi.mocked(getConceptBySlug).mockReturnValue(mockConcept)

      const ConceptDetailPage = (await import('@/app/concepts/[slug]/page')).default
      const { measureRenderPerformance } = await import('../utils/testing-utils')

      const performance = measureRenderPerformance(
        () => renderServerPage(ConceptDetailPage, { params: { slug: 'test-concept' } }),
        5,
      )

      // Expect render time to be under 50ms for server components
      performance.expectFastRender(50)
    })
  })
})
