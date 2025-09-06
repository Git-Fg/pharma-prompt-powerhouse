/**
 * Centralized Mock Setup
 *
 * This file provides common mocking utilities for tests,
 * centralizing the setup of frequently mocked dependencies.
 *
 * Usage:
 *   import { setupCommonMocks } from '@/tests/mocks/mock-setup'
 *   setupCommonMocks()
 */

import { vi } from 'vitest'
import { mockConcepts, mockGuides, mockTools, mockWorkflows } from './content.mock'

// Mock next/navigation
export function mockNextNavigation() {
  vi.mock('next/navigation', () => ({
    notFound: vi.fn(() => {
      throw new Error('NOT_FOUND')
    }),
  }))
}

// Mock content loader with default mock data
export function mockContentLoader(customContentMocks = {}) {
  vi.mock('@/lib/content-loader', () => ({
    getGuideBySlug: vi.fn(),
    getConceptBySlug: vi.fn(),
    getWorkflowBySlug: vi.fn(),
    getExternalToolBySlug: vi.fn(),
    content: {
      guides: mockGuides,
      concepts: mockConcepts,
      workflows: mockWorkflows,
      externalTools: mockTools,
      ...customContentMocks,
    },
  }))
}

// Mock UI utilities
export function mockUiUtils() {
  vi.mock('@/lib/ui-utils', () => ({
    getStarRatingProps: (score: number) => ({
      stars: Array.from({ length: 5 }, (_, i) => ({
        index: i,
        className: i < score ? 'text-yellow-400 fill-current' : 'text-gray-300',
      })),
    }),
  }))
}

// Mock layout components
export function mockLayoutComponents() {
  vi.mock('@/components/layout/ContentPageLayout', () => ({
    ContentPageLayout: ({ children, item, prose }: any) => (
      <div data-testid="content-page-layout" data-prose={prose}>
        <h1 data-testid="item-title" role="heading" aria-level={1}>{item?.title}</h1>
        <p data-testid="item-description">{item?.description}</p>
        <div data-testid="item-category">{item?.category}</div>
        {item?.difficulty && <div data-testid="item-difficulty">{item?.difficulty}</div>}
        {children}
      </div>
    ),
  }))
}

// Mock shared components
export function mockSharedComponents() {
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
}

// Mock UI components
export function mockUiComponents() {
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
      <h3 data-testid="card-title" className={className} role="heading" aria-level={3} {...props}>
        {children}
      </h3>
    ),
    CardContent: ({ children, ...props }: any) => (
      <div data-testid="card-content" {...props}>
        {children}
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
}

// Mock markdown components
export function mockMarkdownComponents() {
  vi.mock('@/components/markdown/MarkdownRenderer', () => ({
    MarkdownRenderer: ({ content }: any) => (
      <div data-testid="markdown-renderer">
        {content?.substring(0, 100)}
      </div>
    ),
  }))
}

// Mock icons
export function mockIcons() {
  vi.mock('lucide-react', () => ({
    // Existing icons
    Star: ({ className, ...props }: any) => (
      <span data-testid="star-icon" className={className} {...props}>
        ⭐
      </span>
    ),
    Target: () => <span data-testid="target-icon">🎯</span>,
    ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
    ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
    
    // Missing icons from components
    AlertCircle: () => <span data-testid="alert-circle-icon">⚠️</span>,
    AlertTriangle: () => <span data-testid="alert-triangle-icon">⚠️</span>,
    BookOpen: () => <span data-testid="book-open-icon">📖</span>,
    Brain: () => <span data-testid="brain-icon">🧠</span>,
    Check: () => <span data-testid="check-icon">✓</span>,
    CheckCircle: () => <span data-testid="check-circle-icon">✅</span>,
    CheckCircle2: () => <span data-testid="check-circle2-icon">✅</span>,
    CheckIcon: () => <span data-testid="check-icon">✓</span>,
    ChevronDownIcon: () => <span data-testid="chevron-down-icon">▼</span>,
    ChevronRight: () => <span data-testid="chevron-right-icon">▶</span>,
    ChevronRightIcon: () => <span data-testid="chevron-right-icon">▶</span>,
    ChevronUpIcon: () => <span data-testid="chevron-up-icon">▲</span>,
    Circle: () => <span data-testid="circle-icon">○</span>,
    CircleIcon: () => <span data-testid="circle-icon">○</span>,
    Clock: () => <span data-testid="clock-icon">🕒</span>,
    Code: () => <span data-testid="code-icon">💻</span>,
    Cookie: () => <span data-testid="cookie-icon">🍪</span>,
    Copy: () => <span data-testid="copy-icon">📋</span>,
    Download: () => <span data-testid="download-icon">⬇️</span>,
    ExternalLink: () => <span data-testid="external-link-icon">🔗</span>,
    FileCode: () => <span data-testid="file-code-icon">📄</span>,
    FileText: () => <span data-testid="file-text-icon">📄</span>,
    Globe: () => <span data-testid="globe-icon">🌍</span>,
    HelpCircle: () => <span data-testid="help-circle-icon">❓</span>,
    Info: () => <span data-testid="info-icon">ℹ️</span>,
    Lightbulb: () => <span data-testid="lightbulb-icon">💡</span>,
    LucideIcon: () => <span data-testid="lucide-icon">⭐</span>,
    MoreHorizontal: () => <span data-testid="more-horizontal-icon">⋯</span>,
    PanelLeftIcon: () => <span data-testid="panel-left-icon">⬅️</span>,
    PlayCircle: () => <span data-testid="play-circle-icon">▶️</span>,
    Quote: () => <span data-testid="quote-icon">💬</span>,
    Search: () => <span data-testid="search-icon">🔍</span>,
    SearchIcon: () => <span data-testid="search-icon">🔍</span>,
    Settings: () => <span data-testid="settings-icon">⚙️</span>,
    Shield: () => <span data-testid="shield-icon">🛡️</span>,
    Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
    Tag: () => <span data-testid="tag-icon">🏷️</span>,
    TrendingUp: () => <span data-testid="trending-up-icon">📈</span>,
    User: () => <span data-testid="user-icon">👤</span>,
    Users: () => <span data-testid="users-icon">👥</span>,
    Wifi: () => <span data-testid="wifi-icon">📶</span>,
    WifiOff: () => <span data-testid="wifi-off-icon">📶</span>,
    X: () => <span data-testid="x-icon">✕</span>,
    XIcon: () => <span data-testid="x-icon">✕</span>,
    Zap: () => <span data-testid="zap-icon">⚡</span>,
  }))
}

// Mock next/link
export function mockNextLink() {
  vi.mock('next/link', () => ({
    default: ({ href, children, ...props }: any) => (
      <a href={href} data-testid="link" {...props}>
        {children}
      </a>
    ),
  }))
}

// Mock utils
export function mockUtils() {
  vi.mock('@/lib/utils', () => ({
    normalizeSlug: (slug: string) => slug,
  }))
}

// Complete setup function that mocks everything
export function setupCommonMocks(customContentMocks = {}) {
  mockNextNavigation()
  mockContentLoader(customContentMocks)
  mockUiUtils()
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockMarkdownComponents()
  mockIcons()
  mockNextLink()
  mockUtils()
}

// Individual setup functions for more granular control
export function setupPageTests(customContentMocks = {}) {
  mockNextNavigation()
  mockContentLoader(customContentMocks)
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockMarkdownComponents()
  mockIcons()
}

export function setupComponentTests() {
  mockUiComponents()
  mockIcons()
  mockUtils()
}

// Reset all mocks between tests
export function resetAllMocks() {
  vi.clearAllMocks()
  vi.resetModules()
}

// Helper functions for common test scenarios
export function setupNotFoundTest() {
  mockNextNavigation()
  mockContentLoader()
}

export function setupAccessibilityTest() {
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockIcons()
}

export function setupPerformanceTest() {
  mockContentLoader()
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockMarkdownComponents()
  mockIcons()
}
