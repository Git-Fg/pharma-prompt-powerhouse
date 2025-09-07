// tests/unit/AutoGlossaryProcessor.test.tsx
import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock du glossaire pour contrôler les données de test
vi.mock('@/content/glossary', () => ({
  glossary: {
    token: {
      term: 'Token',
      definition: 'Unité de base que l\'IA utilise pour comprendre et traiter le texte.',
      category: 'technique',
    },
    rag: {
      term: 'RAG (Retrieval-Augmented Generation)',
      definition: 'Technique qui permet à une IA de rechercher des informations dans une base de données.',
      category: 'technique',
    },
  },
}))

// Mock du composant DefinedTerm pour simplifier le test
vi.mock('@/components/shared/DefinedTerm', () => ({
  DefinedTerm: ({ children, term }: { children: React.ReactNode, term: string }) => (
    <span data-testid={`glossary-term-${term}`} className="glossary-term">
      {children}
    </span>
  ),
}))

// Mock du processus client pour forcer le traitement
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useState: (initial: any) => [true, vi.fn()], // Force isClient à true
    useEffect: vi.fn(), // Ignore l'effet pour les tests
  }
})

import { AutoGlossaryProcessor } from '@/components/shared/AutoGlossaryProcessor'

describe('autoGlossaryProcessor', () => {
  beforeEach(() => {
    // Simuler l'environnement de test pour le browser
    vi.stubGlobal('process', { env: { NODE_ENV: 'test' } })
  })

  it('devrait détecter et envelopper les termes du glossaire simples', () => {
    render(
      <AutoGlossaryProcessor>
        <p>Le token est important pour comprendre l'IA.</p>
      </AutoGlossaryProcessor>,
    )

    expect(screen.getByTestId('glossary-term-token')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-token')).toHaveTextContent('token')
  })

  it('devrait détecter plusieurs termes dans le même texte', () => {
    render(
      <AutoGlossaryProcessor>
        <p>Le RAG et le token sont des concepts importants.</p>
      </AutoGlossaryProcessor>,
    )

    expect(screen.getByTestId('glossary-term-rag')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-token')).toBeInTheDocument()
  })

  it('devrait gérer les textes sans termes du glossaire', () => {
    render(
      <AutoGlossaryProcessor>
        <p>Ceci est un texte sans termes techniques.</p>
      </AutoGlossaryProcessor>,
    )

    // Vérifie que le paragraphe existe mais n'a pas de termes enveloppés
    expect(screen.getByText('Ceci est un texte sans termes techniques.')).toBeInTheDocument()
    expect(screen.queryByTestId(/glossary-term-/)).not.toBeInTheDocument()
  })

  it('devrait préserver les éléments non textuels inchangés', () => {
    render(
      <AutoGlossaryProcessor>
        <div>
          <div data-testid="test-element">Élément de test</div>
          <p>Texte avec token ici.</p>
        </div>
      </AutoGlossaryProcessor>,
    )

    expect(screen.getByTestId('test-element')).toBeInTheDocument()
    expect(screen.getByTestId('glossary-term-token')).toBeInTheDocument()
  })

  it('devrait gérer le contenu vide', () => {
    render(
      <AutoGlossaryProcessor>
        <p></p>
      </AutoGlossaryProcessor>,
    )

    // Ne devrait pas lancer d'erreur et devrait rendre le paragraphe vide
    expect(screen.getByRole('paragraph')).toBeInTheDocument()
  })

  it('devrait ignorer le contenu dans les balises code', () => {
    render(
      <AutoGlossaryProcessor>
        <div>
          <p>Ce token devrait être enveloppé.</p>
          <code>ce token ne devrait pas être enveloppé.</code>
        </div>
      </AutoGlossaryProcessor>,
    )

    // Vérifie que seulement le token hors du code est enveloppé
    const tokens = screen.queryAllByTestId('glossary-term-token')
    expect(tokens.length).toBe(1)
  })
})
