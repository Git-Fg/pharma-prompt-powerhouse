import type { ContentBlock } from '@/lib/content-schema'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ContentRenderer } from '@/components/shared/ContentRenderer'

// Mock child components to focus on ContentRenderer logic
vi.mock('@/components/markdown/MarkdownRenderer', () => ({
  MarkdownRenderer: ({ content }: { content: string }) => (
    <div data-testid="markdown-content">{content}</div>
  ),
}))

vi.mock('@/components/shared/ToolRecommendation', () => ({
  ToolRecommendation: ({ currentSlug }: { tags: string[], currentSlug: string }) => (
    <div data-testid="tool-recommendation">{currentSlug}</div>
  ),
}))

vi.mock('@/components/shared/GuideRecommendation', () => ({
  GuideRecommendation: ({ guideSlug, reason }: { guideSlug: string, reason: string }) => (
    <div data-testid="guide-recommendation">
      {guideSlug}
      :
      {' '}
      {reason}
    </div>
  ),
}))

vi.mock('@/components/shared/ConceptRecommendation', () => ({
  ConceptRecommendation: ({ conceptSlug, reason }: { conceptSlug: string, reason: string }) => (
    <div data-testid="concept-recommendation">
      {conceptSlug}
      :
      {' '}
      {reason}
    </div>
  ),
}))

vi.mock('@/components/ui/code-block', () => ({
  CodeBlock: ({ language, children, filename }: { language: string, children: string, filename?: string }) => (
    <div data-testid="code-block" data-language={language} data-filename={filename}>
      {children}
    </div>
  ),
}))

describe('contentRenderer', () => {
  describe('renders different content block types correctly', () => {
    it('should render markdown blocks', () => {
      const markdownBlock: ContentBlock = {
        type: 'markdown',
        content: '# Hello World\n\nThis is **bold** text.',
      }

      render(<ContentRenderer content={[markdownBlock]} />)

      expect(screen.getByTestId('markdown-content')).toHaveTextContent('# Hello World This is **bold** text.')
    })

    it('should render alert blocks with title and content', () => {
      const alertBlock: ContentBlock = {
        type: 'alert',
        variant: 'destructive',
        title: 'Important Notice',
        content: 'This is an important alert message.',
      }

      render(<ContentRenderer content={[alertBlock]} />)

      expect(screen.getByText('Important Notice')).toBeInTheDocument()
      expect(screen.getByTestId('markdown-content')).toHaveTextContent('This is an important alert message.')
    })

    it('should render alert blocks without title', () => {
      const alertBlock: ContentBlock = {
        type: 'alert',
        content: 'This is a simple alert.',
      }

      render(<ContentRenderer content={[alertBlock]} />)

      expect(screen.getByTestId('markdown-content')).toHaveTextContent('This is a simple alert.')
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should render tool recommendations', () => {
      const toolRecommendationBlock: ContentBlock = {
        type: 'toolRecommendation',
        slug: 'chatgpt',
        reason: 'Great for general conversations',
      }

      render(<ContentRenderer content={[toolRecommendationBlock]} />)

      expect(screen.getByTestId('tool-recommendation')).toHaveTextContent('chatgpt')
    })

    it('should render guide recommendations', () => {
      const guideRecommendationBlock: ContentBlock = {
        type: 'guideRecommendation',
        slug: 'getting-started',
        reason: 'Perfect for beginners',
      }

      render(<ContentRenderer content={[guideRecommendationBlock]} />)

      expect(screen.getByTestId('guide-recommendation')).toHaveTextContent('getting-started: Perfect for beginners')
    })

    it('should render concept recommendations', () => {
      const conceptRecommendationBlock: ContentBlock = {
        type: 'conceptRecommendation',
        slug: 'prompt-engineering',
        reason: 'Essential concept to understand',
      }

      render(<ContentRenderer content={[conceptRecommendationBlock]} />)

      expect(screen.getByTestId('concept-recommendation')).toHaveTextContent('prompt-engineering: Essential concept to understand')
    })

    it('should render code blocks with language and content', () => {
      const codeBlock: ContentBlock = {
        type: 'codeBlock',
        language: 'typescript',
        filename: 'example.ts',
        showLineNumbers: true,
        content: 'const message: string = "Hello, World!";',
      }

      render(<ContentRenderer content={[codeBlock]} />)

      const codeElement = screen.getByTestId('code-block')
      expect(codeElement).toHaveTextContent('const message: string = "Hello, World!";')
      expect(codeElement).toHaveAttribute('data-language', 'typescript')
      expect(codeElement).toHaveAttribute('data-filename', 'example.ts')
    })

    it('should render card blocks with title and description', () => {
      const cardBlock: ContentBlock = {
        type: 'card',
        title: 'Card Title',
        description: 'Card Description',
        content: 'Card content goes here',
        variant: 'outline',
      }

      render(<ContentRenderer content={[cardBlock]} />)

      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card Description')).toBeInTheDocument()
      expect(screen.getByTestId('markdown-content')).toHaveTextContent('Card content goes here')
    })

    it('should render tabs with multiple tab content', () => {
      const tabsBlock: ContentBlock = {
        type: 'tabs',
        defaultValue: 'tab1',
        tabs: [
          {
            value: 'tab1',
            title: 'First Tab',
            content: [
              {
                type: 'markdown',
                content: 'Content in first tab',
              },
            ],
          },
          {
            value: 'tab2',
            title: 'Second Tab',
            content: [
              {
                type: 'alert',
                content: 'Alert in second tab',
              },
            ],
          },
        ],
      }

      render(<ContentRenderer content={[tabsBlock]} />)

      expect(screen.getByRole('tab', { name: 'First Tab' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Second Tab' })).toBeInTheDocument()

      // First tab content should be visible by default
      expect(screen.getByText('Content in first tab')).toBeInTheDocument()
    })
  })

  describe('handles multiple content blocks', () => {
    it('should render multiple blocks in sequence', () => {
      const contentBlocks: ContentBlock[] = [
        {
          type: 'markdown',
          content: '# Main Title',
        },
        {
          type: 'alert',
          title: 'Notice',
          content: 'Important information',
        },
        {
          type: 'codeBlock',
          language: 'javascript',
          content: 'console.log("Hello");',
        },
      ]

      render(<ContentRenderer content={contentBlocks} />)

      expect(screen.getByText('# Main Title')).toBeInTheDocument()
      expect(screen.getByText('Notice')).toBeInTheDocument()
      expect(screen.getByText('Important information')).toBeInTheDocument()
      expect(screen.getByText('console.log("Hello");')).toBeInTheDocument()
    })
  })

  describe('handles empty content', () => {
    it('should handle empty content array gracefully', () => {
      render(<ContentRenderer content={[]} />)

      // Should not crash and should render empty container
      expect(document.body).toBeInTheDocument()
    })
  })

  describe('error handling', () => {
    it('should handle missing required fields gracefully', () => {
      // Test with malformed blocks (missing content field)
      const malformedBlock = {
        type: 'markdown',
        // missing content field
      } as ContentBlock

      // This should not crash the renderer
      expect(() => {
        render(<ContentRenderer content={[malformedBlock]} />)
      }).not.toThrow()
    })
  })
})
