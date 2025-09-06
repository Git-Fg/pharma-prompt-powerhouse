import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'

describe('markdownRenderer with automatic glossary detection', () => {
  it('should automatically detect and link glossary terms', () => {
    const content = 'Le token est important pour le RAG en IA.'

    render(<MarkdownRenderer content={content} enableGlossaryDetection={true} />)

    // Vérifier que les termes sont détectés et transformés en liens
    expect(screen.getByText('token')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()

    // Les termes devraient être dans des boutons (DefinedTerm components)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should allow disabling glossary detection', () => {
    const content = 'Le token est important pour le RAG en IA.'

    render(<MarkdownRenderer content={content} enableGlossaryDetection={false} />)

    // Sans détection automatique, pas de boutons
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  it('should work with complex markdown content', () => {
    const content = `
# Titre avec token

Voici un paragraphe qui parle de **RAG** et d'hallucination.

- Liste avec token
- Item avec few-shot prompting

> Quote avec chain-of-thought
    `

    render(<MarkdownRenderer content={content} enableGlossaryDetection={true} />)

    // Vérifier que le rendu fonctionne et que les termes sont détectés
    expect(screen.getByText('Titre avec token')).toBeInTheDocument()
    expect(screen.getByText('token')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()
  })
})