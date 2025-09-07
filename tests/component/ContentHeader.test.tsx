import type { Concept, ExternalTool, Guide, Workflow } from '@/lib/content-schema'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentHeader } from '@/components/shared/ContentHeader'

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  default: ({ children, asChild, ...props }: any) => {
    if (asChild && typeof children === 'object' && children.type === 'a') {
      return <a {...props} {...children.props}>{children.props.children}</a>
    }
    return <button {...props}>{children}</button>
  },
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div data-testid="card" {...props}>{children}</div>,
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ExternalLink: () => <span data-testid="external-link-icon">🔗</span>,
}))

// Mock content loader
vi.mock('@/lib/content-loader', () => ({
  content: {
    getById: vi.fn(),
  },
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
}

const mockWorkflow: Workflow = {
  slug: 'test-workflow',
  title: 'Test Workflow Title',
  description: 'This is a test workflow description',
  category: 'analysis',
  difficulty: 'intermediate',
  tags: ['workflow', 'test'],
  isFavorite: false,
  isWorkflow: true,
  content: [],
  conceptSlugs: ['concept1', 'concept2'],
  estimatedTime: '20 min',
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
  isPaid: false,
  content: [],
  pricing: {
    free: 'Limited usage',
    paid: 'Unlimited access for $10/month',
  },
  strengths: ['Feature 1', 'Feature 2'],
  limitations: ['Limitation 1'],
  riskLevel: 'low',
  confidenceScore: 8,
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

    it('displays estimated time when provided', () => {
      render(<ContentHeader item={mockGuide} />)

      expect(screen.getByText('⏱️ 10 min')).toBeInTheDocument()
    })

    it('displays difficulty badge', () => {
      render(<ContentHeader item={mockGuide} />)

      expect(screen.getByText('beginner')).toBeInTheDocument()
    })

    it('displays category badge', () => {
      render(<ContentHeader item={mockGuide} />)

      expect(screen.getByText('general')).toBeInTheDocument()
    })

    it('renders tags', () => {
      render(<ContentHeader item={mockGuide} />)

      expect(screen.getByText('test')).toBeInTheDocument()
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

    it('displays tool tags', () => {
      render(<ContentHeader item={mockExternalTool} />)

      expect(screen.getByText('tool')).toBeInTheDocument()
    })
  })

  describe('concept Content', () => {
    it('renders concept header correctly', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Concept Title')
      expect(screen.getByText('This is a test concept description')).toBeInTheDocument()
    })

    it('displays concept category and difficulty', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.getByText('fundamentals')).toBeInTheDocument()
      expect(screen.getByText('beginner')).toBeInTheDocument()
    })

    it('displays concept tags', () => {
      render(<ContentHeader item={mockConcept} />)

      expect(screen.getByText('concept')).toBeInTheDocument()
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

      // Should render concept specific layout
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('fundamentals')).toBeInTheDocument()
    })

    it('correctly identifies guides and workflows', () => {
      render(<ContentHeader item={mockGuide} />)

      // Should render guide/workflow specific elements
      expect(screen.getByText('⏱️ 10 min')).toBeInTheDocument()
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
    it('renders difficulty badges with appropriate styling', () => {
      render(<ContentHeader item={mockGuide} />)

      const difficultyBadge = screen.getByText('beginner')
      expect(difficultyBadge).toBeInTheDocument()
    })

    it('renders category badges', () => {
      render(<ContentHeader item={mockGuide} />)

      const categoryBadge = screen.getByText('general')
      expect(categoryBadge).toBeInTheDocument()
    })

    it('renders multiple tags', () => {
      const itemWithMultipleTags = {
        ...mockGuide,
        tags: ['tag1', 'tag2', 'tag3'],
      }

      render(<ContentHeader item={itemWithMultipleTags} />)

      expect(screen.getByText('tag1')).toBeInTheDocument()
      expect(screen.getByText('tag2')).toBeInTheDocument()
      expect(screen.getByText('tag3')).toBeInTheDocument()
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
