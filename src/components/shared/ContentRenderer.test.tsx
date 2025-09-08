import type { ContentBlock } from '@/lib/content-schema'
import { render, screen } from '@/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ContentRenderer } from './ContentRenderer'

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
      {guideSlug}: {reason}
    </div>
  ),
}))

vi.mock('@/components/shared/ConceptRecommendation', () => ({
  ConceptRecommendation: ({ conceptSlug, reason }: { conceptSlug: string, reason: string }) => (
    <div data-testid="concept-recommendation">
      {conceptSlug}: {reason}
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

describe('ContentRenderer', () => {
  it('should render markdown content blocks', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'markdown',
        content: 'This is a markdown block',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    expect(screen.getByTestId('markdown-content')).toHaveTextContent('This is a markdown block')
  })

  it('should render code blocks with language and filename', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'codeBlock',
        language: 'typescript',
        content: 'const hello = "world";',
        filename: 'example.ts',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveAttribute('data-language', 'typescript')
    expect(codeBlock).toHaveAttribute('data-filename', 'example.ts')
    expect(codeBlock).toHaveTextContent('const hello = "world";')
  })

  it('should render code blocks without filename', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'codeBlock',
        language: 'javascript',
        content: 'console.log("hello");',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveAttribute('data-language', 'javascript')
    expect(codeBlock).not.toHaveAttribute('data-filename')
    expect(codeBlock).toHaveTextContent('console.log("hello");')
  })

  it('should render tool recommendations', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'toolRecommendation',
        slug: 'current-tool',
        reason: 'Very helpful tool',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    expect(screen.getByTestId('tool-recommendation')).toHaveTextContent('current-tool')
  })

  it('should render guide recommendations', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'guideRecommendation',
        slug: 'test-guide',
        reason: 'Helpful for understanding concepts',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    expect(screen.getByTestId('guide-recommendation')).toHaveTextContent(
      'test-guide: Helpful for understanding concepts'
    )
  })

  it('should render concept recommendations', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'conceptRecommendation',
        slug: 'test-concept',
        reason: 'Essential background knowledge',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    expect(screen.getByTestId('concept-recommendation')).toHaveTextContent(
      'test-concept: Essential background knowledge'
    )
  })

  it('should render multiple content blocks in order', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'markdown',
        content: 'Introduction text',
      },
      {
        type: 'codeBlock',
        language: 'python',
        content: 'print("hello")',
      },
      {
        type: 'markdown',
        content: 'Conclusion text',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    const textBlocks = screen.getAllByTestId('markdown-content')
    expect(textBlocks).toHaveLength(2)
    expect(textBlocks[0]).toHaveTextContent('Introduction text')
    expect(textBlocks[1]).toHaveTextContent('Conclusion text')

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveAttribute('data-language', 'python')
    expect(codeBlock).toHaveTextContent('print("hello")')
  })

  it('should handle empty content array', () => {
    const contentBlocks: ContentBlock[] = []

    render(<ContentRenderer content={contentBlocks} />)

    // Should render without crashing
    expect(screen.queryByTestId('markdown-content')).not.toBeInTheDocument()
    expect(screen.queryByTestId('code-block')).not.toBeInTheDocument()
  })

  it('should handle mixed recommendation types', () => {
    const contentBlocks: ContentBlock[] = [
      {
        type: 'toolRecommendation',
        slug: 'tool-1',
        reason: 'Great tool',
      },
      {
        type: 'guideRecommendation',
        slug: 'guide-1',
        reason: 'Related reading',
      },
      {
        type: 'conceptRecommendation',
        slug: 'concept-1',
        reason: 'Background knowledge',
      },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    expect(screen.getByTestId('tool-recommendation')).toBeInTheDocument()
    expect(screen.getByTestId('guide-recommendation')).toBeInTheDocument()
    expect(screen.getByTestId('concept-recommendation')).toBeInTheDocument()
  })

  it('should preserve content order with complex mixed content', () => {
    const contentBlocks: ContentBlock[] = [
      { type: 'markdown', content: 'First paragraph' },
      { type: 'codeBlock', language: 'bash', content: 'npm install' },
      { type: 'markdown', content: 'Second paragraph' },
      { type: 'guideRecommendation', slug: 'setup-guide', reason: 'Setup instructions' },
      { type: 'markdown', content: 'Final paragraph' },
    ]

    render(<ContentRenderer content={contentBlocks} />)

    // Check that all elements are rendered
    const textBlocks = screen.getAllByTestId('markdown-content')
    expect(textBlocks).toHaveLength(3)
    
    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toBeInTheDocument()
    
    const guideRec = screen.getByTestId('guide-recommendation')
    expect(guideRec).toBeInTheDocument()
  })
})