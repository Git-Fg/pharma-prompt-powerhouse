/**
 * Server Component Page Tests
 * Modern testing patterns for Next.js 15 Server Components with params
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
// Import mock factories directly from content.mock
import { createGuideWithoutTakeaways, createMockEnrichedGuide } from '../mocks/content.mock'

import { renderNextPage } from '../utils/testing-utils'

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
  getContentItem: vi.fn(),
  getRouteToContentTypeMapping: vi.fn(() => ({
    'concepts': 'concept',
    'guides': 'guide',
    'workflows': 'workflow',
    'l-arsenal-ia': 'tool',
  })),
  getContentTypeToRouteMapping: vi.fn(() => ({
    concept: 'concepts',
    guide: 'guides',
    workflow: 'workflows',
    tool: 'l-arsenal-ia',
  })),
  content: {
    guides: [],
    workflows: [],
    concepts: [],
    externalTools: [],
  },
}))

vi.mock('@/lib/content-utils', () => ({
  getContentTypeFromRoute: vi.fn((routeName: string) => {
    const mapping: Record<string, string> = {
      'concepts': 'concept',
      'guides': 'guide',  
      'workflows': 'workflow',
      'l-arsenal-ia': 'tool',
    }
    return mapping[routeName] || null
  }),
  generateAllStaticParams: vi.fn(() => []),
  generateContentMetadataDynamic: vi.fn(() => ({})),
}))

// Comprehensive lucide-react mock
vi.mock('lucide-react', () => ({
  // Layout and navigation
  ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  ChevronRight: () => <span data-testid="chevron-right-icon">▶</span>,
  ChevronRightIcon: () => <span data-testid="chevron-right-icon">▶</span>,
  ChevronDownIcon: () => <span data-testid="chevron-down-icon">▼</span>,
  ChevronUpIcon: () => <span data-testid="chevron-up-icon">▲</span>,
  PanelLeftIcon: () => <span data-testid="panel-left-icon">⬅️</span>,
  X: () => <span data-testid="x-icon">✕</span>,
  XIcon: () => <span data-testid="x-icon">✕</span>,
  MoreHorizontal: () => <span data-testid="more-horizontal-icon">⋯</span>,

  // Content and media
  Target: () => <span data-testid="target-icon">🎯</span>,
  Lightbulb: () => <span data-testid="lightbulb-icon">💡</span>,
  TrendingUp: () => <span data-testid="trending-up-icon">📈</span>,
  BookOpen: () => <span data-testid="book-open-icon">📖</span>,
  FileText: () => <span data-testid="file-text-icon">📄</span>,
  FileCode: () => <span data-testid="file-code-icon">📄</span>,
  Code: () => <span data-testid="code-icon">💻</span>,
  PlayCircle: () => <span data-testid="play-circle-icon">▶️</span>,
  Quote: () => <span data-testid="quote-icon">💬</span>,

  // User interface
  Settings: () => <span data-testid="settings-icon">⚙️</span>,
  Search: () => <span data-testid="search-icon">🔍</span>,
  SearchIcon: () => <span data-testid="search-icon">🔍</span>,
  User: () => <span data-testid="user-icon">👤</span>,
  Users: () => <span data-testid="users-icon">👥</span>,
  Globe: () => <span data-testid="globe-icon">🌍</span>,
  ExternalLink: () => <span data-testid="external-link-icon">🔗</span>,
  Copy: () => <span data-testid="copy-icon">📋</span>,
  Download: () => <span data-testid="download-icon">⬇️</span>,

  // Status and feedback
  Star: ({ className, ...props }: any) => (
    <span data-testid="star-icon" className={className} {...props}>
      ⭐
    </span>
  ),
  Check: () => <span data-testid="check-icon">✓</span>,
  CheckIcon: () => <span data-testid="check-icon">✓</span>,
  CheckCircle: () => <span data-testid="check-circle-icon">✅</span>,
  CheckCircle2: () => <span data-testid="check-circle2-icon">✅</span>,
  AlertCircle: () => <span data-testid="alert-circle-icon">⚠️</span>,
  AlertTriangle: () => <span data-testid="alert-triangle-icon">⚠️</span>,
  Info: () => <span data-testid="info-icon">ℹ️</span>,
  HelpCircle: () => <span data-testid="help-circle-icon">❓</span>,
  Shield: () => <span data-testid="shield-icon">🛡️</span>,

  // Miscellaneous
  Brain: () => <span data-testid="brain-icon">🧠</span>,
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
  Zap: () => <span data-testid="zap-icon">⚡</span>,
  Tag: () => <span data-testid="tag-icon">🏷️</span>,
  Clock: () => <span data-testid="clock-icon">🕒</span>,
  Cookie: () => <span data-testid="cookie-icon">🍪</span>,
  Wifi: () => <span data-testid="wifi-icon">📶</span>,
  WifiOff: () => <span data-testid="wifi-off-icon">📶</span>,
  Circle: () => <span data-testid="circle-icon">○</span>,
  CircleIcon: () => <span data-testid="circle-icon">○</span>,
  LucideIcon: () => <span data-testid="lucide-icon">⭐</span>,
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
          {' '}
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
  const mockGuide = createMockEnrichedGuide({
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
        category: 'methodology',
        difficulty: 'intermediate',
        tags: ['test', 'concept'],
        isFavorite: false,
        keyTakeaways: ['Test concept takeaway'],
        content: [],
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
      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId, getAllByTestId, getByText } = await renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'test-guide' },
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

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId } = await renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'test-guide' },
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
      const guideWithoutConcepts = createMockEnrichedGuide({ ...mockGuide, concepts: [] })
      vi.mocked(getGuideBySlug).mockReturnValue(guideWithoutConcepts)

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { queryByTestId } = await renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'test-guide' },
      })

      // Should not render concept section when no concepts
      expect(queryByTestId('concept-list-section')).not.toBeInTheDocument()
    })

    it('handles guide without key takeaways', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      const baseGuide = createGuideWithoutTakeaways()
      const guideWithoutTakeaways = {
        ...baseGuide,
        concepts: [],
        relatedItems: [],
      }
      vi.mocked(getGuideBySlug).mockReturnValue(guideWithoutTakeaways)

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { queryByTestId } = await renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'test-guide' },
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

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      await expect(renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'non-existent-guide' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })

    it('handles malformed params gracefully', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getGuideBySlug).mockReturnValue(undefined)

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      await expect(renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: '' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('accessibility testing', () => {
    it('meets accessibility standards', async () => {
      const { getGuideBySlug } = await import('@/lib/content-loader')
      vi.mocked(getGuideBySlug).mockReturnValue(mockGuide)

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default
      const { testAccessibility } = await import('../utils/testing-utils')

      const renderResult = await renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'test-guide' },
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

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByRole } = await renderNextPage(GuideDetailPage, {
        params: { contentType: 'guides', slug: 'test-guide' },
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

      const GuideDetailPage = (await import('@/app/[contentType]/[slug]/page')).default
      const { measureRenderPerformance } = await import('../utils/testing-utils')

      const performance = measureRenderPerformance(
        () => renderNextPage(GuideDetailPage, { params: { contentType: 'guides', slug: 'test-guide' } }),
        5,
      )

      // Expect render time to be under 50ms for server components
      performance.expectFastRender(50)
    })
  })
})
