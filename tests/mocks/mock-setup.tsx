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
import { mockGuides, mockConcepts, mockWorkflows, mockTools } from './content.mock'

// Mock next/navigation
export const mockNextNavigation = () => {
  vi.mock('next/navigation', () => ({
    notFound: vi.fn(() => {
      throw new Error('NOT_FOUND')
    }),
  }))
}

// Mock content loader with default mock data
export const mockContentLoader = (customContentMocks = {}) => {
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
export const mockUiUtils = () => {
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
export const mockLayoutComponents = () => {
  vi.mock('@/components/layout/ContentPageLayout', () => ({
    ContentPageLayout: ({ children, item, prose }: any) => (
      <div data-testid="content-page-layout" data-prose={prose}>
        <h1 data-testid="item-title" role="heading" aria-level="1">{item?.title}</h1>
        <p data-testid="item-description">{item?.description}</p>
        <div data-testid="item-category">{item?.category}</div>
        {item?.difficulty && <div data-testid="item-difficulty">{item?.difficulty}</div>}
        {children}
      </div>
    ),
  }))
}

// Mock shared components
export const mockSharedComponents = () => {
  vi.mock('@/components/shared/ContentRenderer', () => ({
    ContentRenderer: ({ content }: any) => (
      <div data-testid="content-renderer">
        {content?.map((block: any, index: number) => (
          <div key={index} data-testid={`content-block-${index}`}>
            {block.type}: {block.content?.substring(0, 50) || block.title}
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
        Disclaimer for {type}
      </div>
    ),
  }))

  vi.mock('@/components/shared/SmartRecommendationsSection', () => ({
    SmartRecommendationsSection: ({ item }: any) => (
      <div data-testid="smart-recommendations">
        Recommendations for {item?.title}
      </div>
    ),
  }))
}

// Mock UI components
export const mockUiComponents = () => {
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
      <h3 data-testid="card-title" className={className} role="heading" aria-level="3" {...props}>
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
      <button data-testid="button" {...props}>
        {children}
      </button>
    ),
  }))
}

// Mock markdown components
export const mockMarkdownComponents = () => {
  vi.mock('@/components/markdown/MarkdownRenderer', () => ({
    MarkdownRenderer: ({ content }: any) => (
      <div data-testid="markdown-renderer">
        {content?.substring(0, 100)}
      </div>
    ),
  }))
}

// Mock icons
export const mockIcons = () => {
  vi.mock('lucide-react', () => ({
    Star: ({ className, ...props }: any) => (
      <span data-testid="star-icon" className={className} {...props}>
        ⭐
      </span>
    ),
    Target: () => <span data-testid="target-icon">🎯</span>,
    ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
    ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  }))
}

// Mock next/link
export const mockNextLink = () => {
  vi.mock('next/link', () => ({
    default: ({ href, children, ...props }: any) => (
      <a href={href} data-testid="link" {...props}>
        {children}
      </a>
    ),
  }))
}

// Mock utils
export const mockUtils = () => {
  vi.mock('@/lib/utils', () => ({
    normalizeSlug: (slug: string) => slug,
  }))
}

// Complete setup function that mocks everything
export const setupCommonMocks = (customContentMocks = {}) => {
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
export const setupPageTests = (customContentMocks = {}) => {
  mockNextNavigation()
  mockContentLoader(customContentMocks)
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockMarkdownComponents()
  mockIcons()
}

export const setupComponentTests = () => {
  mockUiComponents()
  mockIcons()
  mockUtils()
}

// Reset all mocks between tests
export const resetAllMocks = () => {
  vi.clearAllMocks()
  vi.resetModules()
}

// Helper functions for common test scenarios
export const setupNotFoundTest = () => {
  mockNextNavigation()
  mockContentLoader()
}

export const setupAccessibilityTest = () => {
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockIcons()
}

export const setupPerformanceTest = () => {
  mockContentLoader()
  mockLayoutComponents()
  mockSharedComponents()
  mockUiComponents()
  mockMarkdownComponents()
  mockIcons()
}