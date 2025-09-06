/**
 * Tool Page Server Component Tests
 * Modern testing patterns for Next.js 15 Server Components with async params
 *
 * This file demonstrates the use of centralized mock factories while maintaining
 * the original mock structure for compatibility with vi.mock hoisting behavior.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
// Import mock factories directly from content.mock
import {
  createMinimalTool,
  createMockTool,
  createToolWithoutConfidence,
} from '../mocks/content.mock'

import { renderNextPage } from '../utils/testing-utils'

// Mock the notFound function from next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
}))

// Mock content loader and utils
vi.mock('@/lib/content-loader', () => ({
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
    externalTools: [],
    guides: [],
    workflows: [],
    concepts: [],
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

vi.mock('@/lib/ui-utils', () => ({
  getStarRatingProps: (score: number) => ({
    stars: Array.from({ length: 5 }, (_, i) => ({
      index: i,
      className: i < score ? 'text-yellow-400 fill-current' : 'text-gray-300',
    })),
  }),
}))

// Mock layout components
vi.mock('@/components/layout/ContentPageLayout', () => ({
  ContentPageLayout: ({ children, item, prose }: any) => (
    <div data-testid="content-page-layout" data-prose={prose}>
      <h1 data-testid="item-title">{item?.title}</h1>
      <p data-testid="item-description">{item?.description}</p>
      <div data-testid="item-category">{item?.category}</div>
      {children}
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

vi.mock('@/components/markdown/MarkdownRenderer', () => ({
  MarkdownRenderer: ({ content }: any) => (
    <div data-testid="markdown-renderer">
      {content?.substring(0, 100)}
    </div>
  ),
}))

vi.mock('@/components/shared/DisclaimerBanner', () => ({
  DisclaimerBanner: ({ type }: any) => (
    <div data-testid="disclaimer-banner">
      Disclaimer for
      {' '}
      {type}
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

vi.mock('@/components/ui/badge', () => ({
  default: ({ children, variant, ...props }: any) => (
    <span data-testid="badge" data-variant={variant} {...props}>
      {children}
    </span>
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
  CardTitle: ({ children, className, ...props }: any) => (
    <h3 data-testid="card-title" className={className} {...props}>
      {children}
    </h3>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div data-testid="card-content" {...props}>
      {children}
    </div>
  ),
}))

describe('tool Page Server Component', () => {
  const mockTool = createMockTool({
    slug: 'test-tool',
    title: 'Test Tool',
    description: 'A test AI tool for demonstration',
    url: 'https://test-tool.example.com',
    category: 'research',
    tags: ['ai', 'research', 'test'],
    isFavorite: false,
    personalReview: 'This is a great tool for research purposes.',
    strongPoints: ['Fast response times', 'Accurate results', 'User-friendly interface'],
    vigilancePoints: ['Limited free tier', 'Requires account creation', 'Privacy concerns'],
    confidenceScore: 4,
    confidenceJustification: 'Based on extensive testing and comparison with similar tools.',
    freeVsPaidOffer: '| Feature | Free | Paid |\n|---------|------|------|\n| Basic usage | ✅ | ✅ |\n| Advanced features | ❌ | ✅ |\n| API access | ❌ | ✅ |',
    tldr: 'Great for research, but paid version needed for advanced features.',
    use_cases: ['Literature review', 'Data analysis', 'Content generation'],
    capabilities: ['Natural language processing', 'Data visualization', 'Multi-language support'],
    content: [
      {
        type: 'markdown',
        content: '# Test Tool Overview\n\nThis is a comprehensive overview of the test tool.',
      },
    ],
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('with valid tool', () => {
    it('renders tool page with all components', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId, getAllByTestId, getByText, getAllByText } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check main layout
      expect(getByTestId('content-page-layout')).toBeInTheDocument()
      expect(getByTestId('item-title')).toHaveTextContent('Test Tool')
      expect(getByTestId('item-description')).toHaveTextContent('A test AI tool for demonstration')
      expect(getByTestId('item-category')).toHaveTextContent('research')

      // Check prose prop is false for tools
      expect(getByTestId('content-page-layout')).toHaveAttribute('data-prose', 'false')

      // Check tags (3 regular badges + 3 use case badges = 6 total)
      const badges = getAllByTestId('badge')
      expect(badges.length).toBe(6)
      expect(getByText('ai')).toBeInTheDocument()
      expect(getAllByText('research').length).toBe(2)
      expect(getByText('test')).toBeInTheDocument()

      // Check enhanced schema content cards
      const cards = getAllByTestId('card')
      expect(cards.length).toBeGreaterThan(0)

      // Check disclaimer banner
      expect(getByTestId('disclaimer-banner')).toBeInTheDocument()
      expect(getByTestId('disclaimer-banner')).toHaveTextContent('Disclaimer for arsenal')

      // Check recommendations
      expect(getByTestId('smart-recommendations')).toBeInTheDocument()
    })

    it('renders personal review section', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText, getByTestId, getAllByTestId } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check personal review card
      expect(getByText('Mon Avis en Bref')).toBeInTheDocument()
      expect(getByText('This is a great tool for research purposes.')).toBeInTheDocument()

      // Check it's in a card structure
      const personalReviewCard = getAllByTestId('card').find(card =>
        card.textContent?.includes('Mon Avis en Bref'),
      )
      expect(personalReviewCard).toBeInTheDocument()
    })

    it('renders confidence score with stars', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText, getAllByTestId } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check confidence score section
      expect(getByText('Score de Confiance')).toBeInTheDocument()
      expect(getByText('Based on extensive testing and comparison with similar tools.')).toBeInTheDocument()

      // Check star rating
      const stars = getAllByTestId('star-icon')
      expect(stars.length).toBe(5)

      // First 4 stars should be filled (rating 4/5)
      const filledStars = stars.filter(star => star.className?.includes('text-yellow-400'))
      expect(filledStars.length).toBe(4)
    })

    it('renders strong points and vigilance points', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText, getAllByTestId } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check strong points
      expect(getByText('Points Forts')).toBeInTheDocument()
      expect(getByText('Fast response times')).toBeInTheDocument()
      expect(getByText('Accurate results')).toBeInTheDocument()
      expect(getByText('User-friendly interface')).toBeInTheDocument()

      // Check vigilance points
      expect(getByText('Points de Vigilance')).toBeInTheDocument()
      expect(getByText('Limited free tier')).toBeInTheDocument()
      expect(getByText('Requires account creation')).toBeInTheDocument()
      expect(getByText('Privacy concerns')).toBeInTheDocument()

      // Check list items have proper icons
      const strongPointsList = getAllByTestId('card').find(card =>
        card.textContent?.includes('Points Forts'),
      )
      expect(strongPointsList?.querySelectorAll('.text-green-500').length).toBe(3)

      const vigilancePointsList = getAllByTestId('card').find(card =>
        card.textContent?.includes('Points de Vigilance'),
      )
      expect(vigilancePointsList?.querySelectorAll('.text-orange-500').length).toBe(3)
    })

    it('renders free vs paid offer comparison', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText, getByTestId, getAllByTestId } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check free vs paid offer section
      expect(getByText('Offre Gratuite vs Payante')).toBeInTheDocument()
      expect(getByTestId('markdown-renderer')).toBeInTheDocument()
      expect(getByTestId('markdown-renderer')).toHaveTextContent('Feature | Free | Paid')
    })

    it('renders TLDR section', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check TLDR section
      expect(getByText('TL;DR')).toBeInTheDocument()
      expect(getByText('Great for research, but paid version needed for advanced features.')).toBeInTheDocument()
    })

    it('renders use cases', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText, getAllByTestId } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check use cases section
      expect(getByText('Cas d\'Usage Principaux')).toBeInTheDocument()

      const useCaseBadges = getAllByTestId('badge').filter(badge =>
        ['Literature review', 'Data analysis', 'Content generation'].some(text =>
          badge.textContent?.includes(text),
        ),
      )
      expect(useCaseBadges.length).toBe(3)
    })

    it('renders main content', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Check content renderer
      expect(getByTestId('content-renderer')).toBeInTheDocument()
      expect(getByTestId('content-block-0')).toHaveTextContent('markdown: # Test Tool Overview')
    })
  })

  describe('with minimal tool data', () => {
    it('handles tool with minimal fields', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      const minimalTool = createMinimalTool()
      vi.mocked(getExternalToolBySlug).mockReturnValue(minimalTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { queryByTestId, queryByText } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'minimal-tool' },
      })

      // Should render basic structure
      expect(queryByTestId('content-page-layout')).toBeInTheDocument()
      expect(queryByText('Minimal Tool')).toBeInTheDocument()

      // Should not render optional sections
      expect(queryByText('Mon Avis en Bref')).not.toBeInTheDocument()
      expect(queryByText('TL;DR')).not.toBeInTheDocument()
      expect(queryByText('Offre Gratuite vs Payante')).not.toBeInTheDocument()
      expect(queryByText('Cas d\'Usage Principaux')).not.toBeInTheDocument()
    })

    it('handles tool without confidence score', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      const toolWithoutConfidence = createToolWithoutConfidence()
      vi.mocked(getExternalToolBySlug).mockReturnValue(toolWithoutConfidence)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { queryByText } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Should not render confidence score section
      expect(queryByText('Score de Confiance')).not.toBeInTheDocument()
    })
  })

  describe('with invalid tool', () => {
    it('calls notFound when tool does not exist', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getExternalToolBySlug).mockReturnValue(undefined)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      await expect(renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'non-existent-tool' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })

    it('handles empty slug gracefully', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getExternalToolBySlug).mockReturnValue(undefined)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      await expect(renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: '' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('accessibility testing', () => {
    it('meets accessibility standards', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default
      const { testAccessibility } = await import('../utils/testing-utils')

      const renderResult = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      await testAccessibility(renderResult, {
        rules: {},
      })
    })

    it('has proper heading structure', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByRole } = await renderNextPage(ToolPage, {
        params: { contentType: 'l-arsenal-ia', slug: 'test-tool' },
      })

      // Should have an h1 heading
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Tool')
    })
  })

  describe('performance testing', () => {
    it('renders within performance budget', async () => {
      const { getExternalToolBySlug } = await import('@/lib/content-loader')
      vi.mocked(getExternalToolBySlug).mockReturnValue(mockTool)

      const ToolPage = (await import('@/app/[contentType]/[slug]/page')).default
      const { measureRenderPerformance } = await import('../utils/testing-utils')

      const performance = measureRenderPerformance(
        () => renderNextPage(ToolPage, { params: { contentType: 'l-arsenal-ia', slug: 'test-tool' } }),
        5,
      )

      // Expect render time to be under 50ms for server components
      performance.expectFastRender(50)
    })
  })
})
