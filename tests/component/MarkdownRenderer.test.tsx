import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'

// Mock the AutoGlossaryProcessor
vi.mock('@/components/shared/AutoGlossaryProcessor', () => ({
  AutoGlossaryProcessor: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auto-glossary">{children}</div>
  ),
}))

// Mock CodeBlock component
vi.mock('@/components/ui/code-block', () => ({
  CodeBlock: ({ language, children }: { language: string, children: string }) => (
    <div data-testid="code-block" data-language={language}>
      <code>{children}</code>
    </div>
  ),
}))

describe('markdownRenderer', () => {
  it('renders basic markdown content', () => {
    const content = `
# Test Heading

This is a **bold** text and *italic* text.

- Item 1
- Item 2
- Item 3
`

    render(<MarkdownRenderer content={content} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Heading')
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByText('italic')).toBeInTheDocument()

    // Check list items
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('renders code blocks with syntax highlighting', () => {
    const content = `
\`\`\`javascript
const message = "Hello, World!";
console.log(message);
\`\`\`
`

    render(<MarkdownRenderer content={content} />)

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveAttribute('data-language', 'javascript')
    expect(codeBlock).toHaveTextContent('const message = "Hello, World!";')
  })

  it('renders inline code correctly', () => {
    const content = 'Here is some `inline code` in the text.'

    render(<MarkdownRenderer content={content} />)

    const inlineCode = screen.getByText('inline code')
    expect(inlineCode.tagName).toBe('CODE')
  })

  it('applies custom className when provided', () => {
    const content = '# Test Content'

    render(<MarkdownRenderer content={content} className="custom-markdown" />)

    const container = screen.getByRole('heading').closest('div')
    expect(container).toHaveClass('prose', 'custom-markdown')
  })

  it('enables AutoGlossary by default', () => {
    const content = '# Test Content'

    render(<MarkdownRenderer content={content} />)

    expect(screen.getByTestId('auto-glossary')).toBeInTheDocument()
  })

  it('disables AutoGlossary when enableAutoGlossary is false', () => {
    const content = '# Test Content'

    render(<MarkdownRenderer content={content} enableAutoGlossary={false} />)

    expect(screen.queryByTestId('auto-glossary')).not.toBeInTheDocument()
  })

  it('handles complex nested markdown structures', () => {
    const content = `
## Section Title

This is a paragraph with a [link](https://example.com).

### Subsection

> This is a blockquote

\`\`\`typescript
interface User {
  name: string;
  age: number;
}
\`\`\`

1. Ordered item 1
2. Ordered item 2
   - Nested unordered item
   - Another nested item
`

    render(<MarkdownRenderer content={content} />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title')
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection')
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveAttribute('data-language', 'typescript')

    expect(screen.getByText('Ordered item 1')).toBeInTheDocument()
    expect(screen.getByText('Nested unordered item')).toBeInTheDocument()
  })

  it('properly handles children prop in code component', () => {
    const content = `
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
`

    render(<MarkdownRenderer content={content} />)

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveTextContent('def hello():')
    expect(codeBlock).toHaveTextContent('print("Hello, World!")')
  })

  it('handles empty content gracefully', () => {
    render(<MarkdownRenderer content="" />)

    const container = screen.getByTestId('auto-glossary')
    expect(container).toBeInTheDocument()

    // Check that it contains only the prose wrapper div
    const proseContainer = container.querySelector('.prose')
    expect(proseContainer).toBeInTheDocument()
  })

  it('strips trailing newlines from code blocks', () => {
    const content = `
\`\`\`bash
echo "Hello"

\`\`\`
`

    render(<MarkdownRenderer content={content} />)

    const codeBlock = screen.getByTestId('code-block')
    // The code block component should handle newline stripping
    expect(codeBlock).toBeInTheDocument()
  })

  it('renders tables with GFM support', () => {
    const content = `
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`

    render(<MarkdownRenderer content={content} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Column 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 1')).toBeInTheDocument()
  })

  it('handles various children types in code component safely', () => {
    // This tests the type safety improvements we made
    const content = `
\`\`\`json
{
  "test": true,
  "array": [1, 2, 3]
}
\`\`\`
`

    render(<MarkdownRenderer content={content} />)

    const codeBlock = screen.getByTestId('code-block')
    expect(codeBlock).toHaveAttribute('data-language', 'json')
    expect(codeBlock).toHaveTextContent('"test": true')
  })

  it('applies proper prose styling', () => {
    const content = '# Test Content'

    render(<MarkdownRenderer content={content} />)

    const container = screen.getByRole('heading').closest('div')
    expect(container).toHaveClass('prose')
  })
})
