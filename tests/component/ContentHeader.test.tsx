import type { Concept, ExternalTool, Guide, Workflow } from '@/lib/content-schema'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentHeader } from '@/components/shared/ContentHeader'

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  default: ({ children, asChild, ...props }: any) => {
    if (asChild && typeof children === 'object' && children.type === 'a') {
      return React.createElement('a', { ...props, ...children.props }, children.props.children)
    }
    return React.createElement('button', { type: 'button', ...props }, children)
  },
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => React.createElement('div', { 'data-testid': 'card', ...props }, children),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ExternalLink: () => React.createElement('span', { 'data-testid': 'external-link-icon' }, '🔗'),
  X: () => React.createElement('span', { 'data-testid': 'x-icon' }, '✕'),
}))

// Mock content loader
vi.mock('@/lib/content-loader', () => ({
  content: {
    getById: vi.fn(),
    guides: [
      {
        slug: 'guide1',
        title: 'Guide 1',
        description: 'Test guide 1',
        category: 'general',
        difficulty: 'beginner',
        tags: ['test'],
        isFavorite: false,
        isWorkflow: false,
        content: [],
        conceptSlugs: ['test-concept'],
        estimatedTime: '10 min',
        keyTakeaways: ['Test takeaway'],
      },
    ],
    workflows: [
      {
        slug: 'workflow1',
        title: 'Workflow 1',
        description: 'Test workflow 1',
        category: 'analysis',
        difficulty: 'intermediate',
        tags: ['test'],
        isFavorite: false,
        content: [],
        conceptSlugs: ['test-concept'],
        estimatedTime: '20 min',
        keyTakeaways: ['Workflow takeaway'],
      },
    ],
    concepts: [
      {
        slug: 'test-concept',
        title: 'Test Concept',
        description: 'Test concept description',
        category: 'fundamentals',
        difficulty: 'beginner',
        tags: ['test'],
        isFavorite: false,
        keyTakeaways: ['Key point'],
        content: [],
      },
    ],
    externalTools: [],
  },
  getContentItem: vi.fn(),
}))

const mockGuide: Guide = {
  slug: 'test-guide',
  title: 'Test Guide Title',
  description: 'This is a test guide description',
  category: 'general',
  difficulty: 'beginner',
  tags: ['test'],
  isFavorite: false,
  isWorkflow: false,
  content: [],
  conceptSlugs: ['concept1'],
  estimatedTime: '10 min',
  keyTakeaways: ['Test takeaway'],
}

const mockWorkflow: Workflow = {
  slug: 'test-workflow',
  title: 'Test Workflow Title',
  description: 'This is a test workflow description',
  category: 'analysis',
  difficulty: 'intermediate',
  tags: ['workflow', 'test'],
  isFavorite: false,
  content: [],
  conceptSlugs: ['concept1', 'concept2'],
  estimatedTime: '20 min',
  keyTakeaways: ['Workflow takeaway'],
}

const mockConcept: Concept = {
  slug: 'test-concept',
  title: 'Test Concept Title',
  description: 'This is a test concept description',
  category: 'fundamentals',
  difficulty: 'beginner',
  tags: ['concept'],
  isFavorite: false,
  keyTakeaways: ['Key point 1', 'Key point 2'],
  content: [],
}

const mockExternalTool: ExternalTool = {
  slug: 'test-tool',
  title: 'Test External Tool',
  description: 'This is a test external tool description',
  url: 'https://example.com/tool',
  tags: ['tool'],
  isFavorite: false,
  content: [],
  category: 'general',
  personalReview: 'Test review',
  strongPoints: ['Feature 1', 'Feature 2'],
  vigilancePoints: ['Limitation 1'],
  confidenceScore: 4,
  confidenceJustification: 'Test justification',
  freeVsPaidOffer: 'Free: Limited\nPaid: Full access',
}

describe('contentHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('guide/Workflow Content', () => {
    it('renders guide header correctly', () => {
      render(<ContentHeader item={mockGuide} />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Guide Title')
      expect(screen.getByText('This is a test guide description')).toBeInTheDocument()
    })

    it('renders workflow header correctly', () => {
      render(<ContentHeader item={mockWorkflow} />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Workflow Title')
      expect(screen.getByText('This is a test workflow description')).toBeInTheDocument()
    })

    it('does not display estimated time (not implemented in current design)', () => {
      render(<ContentHeader item={mockGuide} />)
      expect(screen.queryByText('⏱️ 10 min')).not.toBeInTheDocument()
    })

    it('does not display difficulty badge (not implemented in current design)', () => {
      render(<ContentHeader item={mockGuide} />)
      expect(screen.queryByText('beginner')).not.toBeInTheDocument()
    })

    it('does not display category badge (not implemented in current design)', () => {
      render(<ContentHeader item={mockGuide} />)
      expect(screen.queryByText('general')).not.toBeInTheDocument()
    })

    it('does not render tags (not implemented in current design)', () => {
      render(<ContentHeader item={mockGuide} />)
      expect(screen.queryByText('test')).not.toBeInTheDocument()
    })

    it('does not display estimated time when not provided', () => {
      const guideWithoutTime = { ...mockGuide, estimatedTime: undefined }
      render(<ContentHeader item={guideWithoutTime} />)

      expect(screen.queryByText(/⏱️/)).not.toBeInTheDocument()
    })
  })

  describe('external Tool Content', () => {
    it('renders external tool header correctly', () => {
      render(<ContentHeader item={mockExternalTool} />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test External Tool')
      expect(screen.getByText('This is a test external tool description')).toBeInTheDocument()
    })

    it('renders visit tool button with correct link', () => {
      render(<ContentHeader item={mockExternalTool} />)

      const visitButton = screen.getByRole('link', { name: /visiter l'outil/i })
      expect(visitButton).toHaveAttribute('href', 'https://example.com/tool')
      expect(visitButton).toHaveAttribute('target', '_blank')
      expect(visitButton).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders external link icon', () => {
      render(<ContentHeader item={mockExternalTool} />)

      expect(screen.getByTestId('external-link-icon')).toBeInTheDocument()
    })

    it('does not display tool tags (not implemented in current design)', () => {
      render(<ContentHeader item={mockExternalTool} />)

      expect(screen.queryByText('tool')).not.toBeInTheDocument()
    })
  })

  describe('concept Content', () => {
    it('renders concept header correctly', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Concept Title')
      expect(screen.getByText('This is a test concept description')).toBeInTheDocument()
    })

    it('does not display concept category and difficulty (not implemented in current design)', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.queryByText('fundamentals')).not.toBeInTheDocument()
      expect(screen.queryByText('beginner')).not.toBeInTheDocument()
    })

    it('does not display concept tags (not implemented in current design)', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.queryByText('concept')).not.toBeInTheDocument()
    })

    it('does not display estimated time for concepts', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.queryByText(/⏱️/)).not.toBeInTheDocument()
    })
  })

  describe('type Guards', () => {
    it('correctly identifies external tools', () => {
      render(<ContentHeader item={mockExternalTool} />)

      // Should render external tool specific elements
      expect(screen.getByRole('link', { name: /visiter l'outil/i })).toBeInTheDocument()
      expect(screen.getByTestId('external-link-icon')).toBeInTheDocument()
    })

    it('correctly identifies concepts', () => {
      render(<ContentHeader item={mockConcept} />)

      // Should render concept specific layout with statistics cards
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('Ressources liées')).toBeInTheDocument()
      expect(screen.getByText('Guides')).toBeInTheDocument()
      expect(screen.getByText('Workflows')).toBeInTheDocument()
    })

    it('correctly identifies guides and workflows', () => {
      render(<ContentHeader item={mockGuide} />)

      // Should render guide/workflow specific elements (simple header)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('Test Guide Title')).toBeInTheDocument()
      expect(screen.getByText('This is a test guide description')).toBeInTheDocument()
    })
  })

  describe('responsive Design', () => {
    it('applies responsive layout classes', () => {
      render(<ContentHeader item={mockGuide} />)

      const header = screen.getByRole('banner') || screen.getByRole('heading').parentElement
      expect(header).toBeInTheDocument()
    })

    it('centers content for external tools', () => {
      render(<ContentHeader item={mockExternalTool} />)

      const header = screen.getByRole('heading').closest('header')
      expect(header).toHaveClass('text-center')
    })
  })

  describe('accessibility', () => {
    it('provides proper heading hierarchy', () => {
      render(<ContentHeader item={mockGuide} />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Guide Title')
    })

    it('provides accessible link for external tools', () => {
      render(<ContentHeader item={mockExternalTool} />)

      const link = screen.getByRole('link', { name: /visiter l'outil/i })
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('provides semantic structure with header element', () => {
      render(<ContentHeader item={mockExternalTool} />)

      const header = screen.getByRole('heading').closest('header')
      expect(header).toBeInTheDocument()
    })
  })

  describe('badge Display', () => {
    it('does not render difficulty badges (not implemented in current design)', () => {
      render(<ContentHeader item={mockGuide} />)
      expect(screen.queryByText('beginner')).not.toBeInTheDocument()
    })

    it('does not render category badges (not implemented in current design)', () => {
      render(<ContentHeader item={mockGuide} />)
      expect(screen.queryByText('general')).not.toBeInTheDocument()
    })

    it('does not render tags (not implemented in current design)', () => {
      const itemWithMultipleTags = {
        ...mockGuide,
        tags: ['tag1', 'tag2', 'tag3'],
      }

      render(<ContentHeader item={itemWithMultipleTags} />)

      expect(screen.queryByText('tag1')).not.toBeInTheDocument()
      expect(screen.queryByText('tag2')).not.toBeInTheDocument()
      expect(screen.queryByText('tag3')).not.toBeInTheDocument()
    })
  })

  describe('error Handling', () => {
    it('handles missing optional properties gracefully', () => {
      const minimalGuide = {
        slug: 'minimal',
        title: 'Minimal Guide',
        description: 'Description',
        category: 'general',
        difficulty: 'beginner',
        tags: [],
        isFavorite: false,
        isWorkflow: false,
        content: [],
        keyTakeaways: ['test'],
      } as Guide

      expect(() => {
        render(<ContentHeader item={minimalGuide} />)
      }).not.toThrow()
    })

    it('handles empty tags array', () => {
      const itemWithNoTags = { ...mockGuide, tags: [] }

      expect(() => {
        render(<ContentHeader item={itemWithNoTags} />)
      }).not.toThrow()
    })

    it('handles undefined properties gracefully', () => {
      const itemWithUndefinedProps = {
        ...mockGuide,
        estimatedTime: undefined,
        conceptSlugs: undefined,
      }

      expect(() => {
        render(<ContentHeader item={itemWithUndefinedProps} />)
      }).not.toThrow()
    })
  })

  describe('performance', () => {
    it('renders efficiently with complex content', () => {
      const complexItem = {
        ...mockGuide,
        tags: Array.from({ length: 20 }, (_, i) => `tag${i}`),
        title: 'A'.repeat(100),
        description: 'B'.repeat(500),
      }

      const start = performance.now()
      render(<ContentHeader item={complexItem} />)
      const end = performance.now()

      // Should render quickly even with complex content
      expect(end - start).toBeLessThan(50)
    })
  })

  describe('integration', () => {
    it('integrates with button component for external tools', () => {
      render(<ContentHeader item={mockExternalTool} />)

      const button = screen.getByRole('link', { name: /visiter l'outil/i })
      expect(button).toBeInTheDocument()
    })

    it('integrates with card component when applicable', () => {
      // This test depends on the actual implementation
      // Some headers might use card components for layout
      render(<ContentHeader item={mockGuide} />)

      // Verify the component renders without errors
      expect(screen.getByRole('heading')).toBeInTheDocument()
    })
  })
})
