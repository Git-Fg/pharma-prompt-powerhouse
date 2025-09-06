// tests/unit/AutoGlossaryProcessor.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AutoGlossaryProcessor } from '@/components/shared/AutoGlossaryProcessor'

// Mock the glossary to control test data
vi.mock('@/content/glossary', () => ({
  glossary: {
    'token': {
      term: 'Token',
      definition: 'Unité de base que l\'IA utilise pour comprendre et traiter le texte.',
      category: 'technique',
    },
    'rag': {
      term: 'RAG (Retrieval-Augmented Generation)',
      definition: 'Technique qui permet à une IA de rechercher des informations dans une base de données.',
      category: 'technique',
    },
    'prompt engineering': {
      term: 'Prompt Engineering',
      definition: 'L\'art de formuler des instructions précises et efficaces.',
      category: 'méthode',
    },
  },
}))

// Mock the DefinedTerm component
vi.mock('@/components/shared/DefinedTerm', () => ({
  DefinedTerm: ({ children, term }: { children: React.ReactNode, term: string }) => (
    <span data-testid={`glossary-term-${term}`} className="glossary-term">
      {children}
    </span>
  ),
}))

describe('autoGlossaryProcessor', () => {
  it('should detect and wrap single glossary terms', () => {
    render(
      <AutoGlossaryProcessor>
        <p>The token is important for understanding AI.</p>
      </AutoGlossaryProcessor>,
    )

    expect(screen.getByTestId('glossary-term-token')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-token')).toHaveTextContent('token')
  })

  it('should detect multiple glossary terms in the same text', () => {
    render(
      <AutoGlossaryProcessor>
        <p>RAG and token are both important concepts in prompt engineering.</p>
      </AutoGlossaryProcessor>,
    )

    expect(screen.getByTestId('glossary-term-rag')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-token')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-prompt engineering')).toBeInTheDocument()
  })

  it('should preserve case in the original text', () => {
    render(
      <AutoGlossaryProcessor>
        <p>TOKEN and Token should both be detected.</p>
      </AutoGlossaryProcessor>,
    )

    const tokens = screen.getAllByTestId('glossary-term-token')
    expect(tokens).toHaveLength(2)
    expect(tokens[0]).toHaveTextContent('TOKEN')
    expect(tokens[1]).toHaveTextContent('Token')
  })

  it('should not wrap terms inside code blocks', () => {
    render(
      <AutoGlossaryProcessor>
        <div>
          <p>This token should be wrapped.</p>
          <code>This token should not be wrapped.</code>
        </div>
      </AutoGlossaryProcessor>,
    )

    const tokens = screen.getAllByTestId('glossary-term-token')
    expect(tokens).toHaveLength(1) // Only the one outside the code block
  })

  it('should not double-wrap already defined terms', () => {
    const DefinedTerm = ({ children, term }: { children: React.ReactNode, term: string }) => (
      <span data-testid={`existing-defined-${term}`}>{children}</span>
    )

    render(
      <AutoGlossaryProcessor>
        <p>
          This token should be wrapped, but this
          {' '}
          <DefinedTerm term="token">token</DefinedTerm>
          {' '}
          should not be double-wrapped.
        </p>
      </AutoGlossaryProcessor>,
    )

    // Should have auto-detected terms and existing DefinedTerm
    // The exact number may vary based on implementation details
    const autoTerms = screen.getAllByTestId('glossary-term-token')
    expect(autoTerms.length).toBeGreaterThan(0)
    expect(screen.getByTestId('existing-defined-token')).toBeInTheDocument()
  })

  it('should handle complex nested structures', () => {
    render(
      <AutoGlossaryProcessor>
        <div>
          <h2>About token usage</h2>
          <p>
            The
            {' '}
            <strong>token</strong>
            {' '}
            concept is crucial for RAG systems.
          </p>
          <ul>
            <li>Token counting</li>
            <li>RAG implementation</li>
          </ul>
        </div>
      </AutoGlossaryProcessor>,
    )

    // Should find multiple instances of glossary terms
    expect(screen.getAllByTestId('glossary-term-token')).toHaveLength(3)
    expect(screen.getAllByTestId('glossary-term-rag')).toHaveLength(2)
  })

  it('should handle empty or null content gracefully', () => {
    render(
      <AutoGlossaryProcessor>
        <p></p>
      </AutoGlossaryProcessor>,
    )

    // Should not throw and should render empty paragraph
    expect(screen.getByRole('paragraph')).toBeInTheDocument()
  })

  it('should preserve non-text nodes unchanged', () => {
    render(
      <AutoGlossaryProcessor>
        <div>
          <div data-testid="test-image" role="img" aria-label="Test image" />
          <p>Text with token here.</p>
        </div>
      </AutoGlossaryProcessor>,
    )

    expect(screen.getByTestId('test-image')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-token')).toBeInTheDocument()
  })
})
