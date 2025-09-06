/**
 * Workflow Page Server Component Tests
 * Modern testing patterns for Next.js 15 Server Components with async params
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
// Import mock factories directly from content.mock
import { createMockEnrichedWorkflow, createWorkflowWithoutConcepts } from '../mocks/content.mock'

import { renderNextPage } from '../utils/testing-utils'

// Mock the notFound function from next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
}))

// Mock content loader
vi.mock('@/lib/content-loader', () => ({
  getWorkflowBySlug: vi.fn(),
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
    workflows: [],
    guides: [],
    concepts: [],
    externalTools: [],
  },
}))

// Comprehensive lucide-react mock
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

// Mock layout components
vi.mock('@/components/layout/ContentPageLayout', () => ({
  ContentPageLayout: ({ children, item, prose }: any) => (
    <div data-testid="content-page-layout" data-prose={prose}>
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

vi.mock('@/components/ui/separator', () => ({
  Separator: ({ className }: any) => (
    <hr data-testid="separator" className={className} />
  ),
}))

vi.mock('@/components/ui/button', () => ({
  default: ({ children, ...props }: any) => (
    <button data-testid="button" type="button" {...props}>
      {children}
    </button>
  ),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} data-testid="link" {...props}>
      {children}
    </a>
  ),
}))

describe('workflow Page Server Component', () => {
  const mockWorkflow = createMockEnrichedWorkflow({
    slug: 'test-workflow',
    title: 'Test Workflow',
    description: 'A test workflow for demonstration',
    category: 'test',
    difficulty: 'intermediate',
    tags: ['test', 'workflow'],
    isFavorite: true,
    content: [
      {
        type: 'markdown',
        content: '# Test Workflow\n\nThis is a test workflow content.',
      },
      {
        type: 'codeBlock',
        content: 'console.log("Workflow step")',
        language: 'javascript',
      },
    ],
    keyTakeaways: ['Step 1', 'Step 2', 'Step 3'],
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('with valid workflow', () => {
    it('renders workflow page with all components', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId, getByText, getAllByTestId } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      // Check main layout
      expect(getByTestId('content-page-layout')).toBeInTheDocument()
      expect(getByTestId('item-title')).toHaveTextContent('Test Workflow')
      expect(getByTestId('item-description')).toHaveTextContent('A test workflow for demonstration')

      // Check prose prop is false for workflows
      expect(getByTestId('content-page-layout')).toHaveAttribute('data-prose', 'false')

      // Check content components
      expect(getByTestId('concept-list-section')).toBeInTheDocument()
      expect(getByTestId('concept-workflow-concept')).toBeInTheDocument()
      expect(getByTestId('content-renderer')).toBeInTheDocument()
      expect(getByTestId('disclaimer-banner')).toBeInTheDocument()
      expect(getByTestId('smart-recommendations')).toBeInTheDocument()

      // Check navigation buttons
      const buttons = getAllByTestId('button')
      expect(buttons.length).toBe(2)
      expect(getByText('Tous les workflows')).toBeInTheDocument()
      expect(getByText('Guide débutant')).toBeInTheDocument()

      // Check navigation links
      const links = getAllByTestId('link')
      expect(links.length).toBe(2)
      expect(links[0]).toHaveAttribute('href', '/workflows')
      expect(links[1]).toHaveAttribute('href', '/par-ou-commencer')

      // Check icons
      expect(getByTestId('arrow-left-icon')).toBeInTheDocument()
      expect(getByTestId('arrow-right-icon')).toBeInTheDocument()
    })

    it('renders workflow content correctly', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      const contentRenderer = getByTestId('content-renderer')
      expect(contentRenderer).toBeInTheDocument()

      // Check individual content blocks
      const markdownBlock = getByTestId('content-block-0')
      expect(markdownBlock).toHaveTextContent('markdown: # Test Workflow')

      const codeBlock = getByTestId('content-block-1')
      expect(codeBlock).toHaveTextContent('codeBlock: console.log("Workflow step")')
    })

    it('handles workflow without concepts', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      const baseWorkflow = createWorkflowWithoutConcepts()
      const workflowWithoutConcepts = {
        ...baseWorkflow,
        concepts: [],
        relatedItems: [],
      }
      vi.mocked(getWorkflowBySlug).mockReturnValue(workflowWithoutConcepts)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { queryByTestId } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      // Should not render concept section when no concepts
      expect(queryByTestId('concept-list-section')).not.toBeInTheDocument()
    })

    it('always renders disclaimer banner', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      // Disclaimer banner should always be present for workflows
      expect(getByTestId('disclaimer-banner')).toBeInTheDocument()
      expect(getByTestId('disclaimer-banner')).toHaveTextContent('Disclaimer for workflow')
    })
  })

  describe('with invalid workflow', () => {
    it('calls notFound when workflow does not exist', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getWorkflowBySlug).mockReturnValue(undefined)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      await expect(renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'non-existent-workflow' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })

    it('handles empty slug gracefully', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      const { notFound } = await import('next/navigation')

      vi.mocked(getWorkflowBySlug).mockReturnValue(undefined)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      await expect(renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: '' },
      })).rejects.toThrow('NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('navigation functionality', () => {
    it('has correct navigation structure', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByText, getAllByRole } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      // Check navigation links
      const links = getAllByRole('link')
      expect(links.length).toBe(2)

      const backLink = links.find(link => link.getAttribute('href') === '/workflows')
      const guideLink = links.find(link => link.getAttribute('href') === '/par-ou-commencer')

      expect(backLink).toBeInTheDocument()
      expect(guideLink).toBeInTheDocument()

      expect(backLink).toHaveTextContent('Tous les workflows')
      expect(guideLink).toHaveTextContent('Guide débutant')
    })

    it('includes proper icons in navigation', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByTestId } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      expect(getByTestId('arrow-left-icon')).toBeInTheDocument()
      expect(getByTestId('arrow-right-icon')).toBeInTheDocument()
    })
  })

  describe('accessibility testing', () => {
    it('meets accessibility standards', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default
      const { testAccessibility } = await import('../utils/testing-utils')

      const renderResult = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      await testAccessibility(renderResult, {
        rules: {
          'heading-order': { enabled: true },
          'link-name': { enabled: true },
          'button-name': { enabled: true },
        },
      })
    })

    it('has proper heading structure', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default

      const { getByRole } = await renderNextPage(WorkflowPage, {
        params: { contentType: 'workflows', slug: 'test-workflow' },
      })

      // Should have an h1 heading
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Workflow')
    })
  })

  describe('performance testing', () => {
    it('renders within performance budget', async () => {
      const { getWorkflowBySlug } = await import('@/lib/content-loader')
      vi.mocked(getWorkflowBySlug).mockReturnValue(mockWorkflow)

      const WorkflowPage = (await import('@/app/[contentType]/[slug]/page')).default
      const { measureRenderPerformance } = await import('../utils/testing-utils')

      const performance = measureRenderPerformance(
        () => renderNextPage(WorkflowPage, { params: { contentType: 'workflows', slug: 'test-workflow' } }),
        5,
      )

      // Expect render time to be under 50ms for server components
      performance.expectFastRender(50)
    })
  })
})
