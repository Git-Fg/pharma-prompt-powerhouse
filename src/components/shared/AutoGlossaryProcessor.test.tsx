import React from 'react'
// AutoGlossaryProcessor.test.tsx
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import { AutoGlossaryProcessor } from './AutoGlossaryProcessor'

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
vi.mock('./DefinedTerm', () => ({
  DefinedTerm: ({ children, term }: { children: React.ReactNode, term: string }) => (
    <span className="glossary-term" aria-label={`Glossary term: ${term}`}>
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

describe('autoGlossaryProcessor', () => {
  beforeEach(() => {
    // Simuler l'environnement de test pour le browser
    vi.stubGlobal('process', { env: { NODE_ENV: 'test' } })
  })

  it('devrait détecter et envelopper les termes du glossaire simples', async () => {
    const screen = await render(
      <AutoGlossaryProcessor>
        <p>Le token est important pour comprendre l'IA.</p>
      </AutoGlossaryProcessor>,
    )

    const tokenTerm = screen.getByLabelText('Glossary term: token')
    await expect.element(tokenTerm).toBeVisible()
    await expect.element(tokenTerm).toHaveTextContent('token')
  })

  it('devrait détecter plusieurs termes dans le même texte', async () => {
    const screen = await render(
      <AutoGlossaryProcessor>
        <p>Le RAG et le token sont des concepts importants.</p>
      </AutoGlossaryProcessor>,
    )

    await expect.element(screen.getByLabelText('Glossary term: rag')).toBeVisible()
    await expect.element(screen.getByLabelText('Glossary term: token')).toBeVisible()
  })

  it('devrait gérer les textes sans termes du glossaire', async () => {
    const screen = await render(
      <AutoGlossaryProcessor>
        <p>Ceci est un texte sans termes techniques.</p>
      </AutoGlossaryProcessor>,
    )

    // Vérifie que le paragraphe existe mais n'a pas de termes enveloppés
    await expect.element(screen.getByText('Ceci est un texte sans termes techniques.')).toBeVisible()
    // Test that no glossary terms are present by checking the container directly
    const glossaryElements = screen.container.querySelectorAll('[aria-label*="Glossary term:"]')
    expect(glossaryElements).toHaveLength(0)
  })

  it('devrait préserver les éléments non textuels inchangés', async () => {
    const screen = await render(
      <AutoGlossaryProcessor>
        <div>
          <div role="article">Élément de test</div>
          <p>Texte avec token ici.</p>
        </div>
      </AutoGlossaryProcessor>,
    )

    await expect.element(screen.getByRole('article')).toBeVisible()
    await expect.element(screen.getByLabelText('Glossary term: token')).toBeVisible()
  })

  it('devrait gérer le contenu vide', async () => {
    const screen = await render(
      <AutoGlossaryProcessor>
        <p></p>
      </AutoGlossaryProcessor>,
    )

    // Ne devrait pas lancer d'erreur et devrait rendre le paragraphe vide
    await expect.element(screen.getByRole('paragraph')).toBeInTheDocument()
  })

  it('devrait ignorer le contenu dans les balises code', async () => {
    const screen = await render(
      <AutoGlossaryProcessor>
        <div>
          <p>Ce token devrait être enveloppé.</p>
          <code>ce token ne devrait pas être enveloppé.</code>
        </div>
      </AutoGlossaryProcessor>,
    )

    // Vérifie que seulement le token hors du code est enveloppé
    // Count glossary term instances by testing for them individually
    let tokenCount = 0
    try {
      screen.getByLabelText('Glossary term: token')
      tokenCount = 1
      // Try to find a second one - should fail
      try {
        const allTokens = screen.container.querySelectorAll('[aria-label="Glossary term: token"]')
        tokenCount = allTokens.length
      }
      catch {
        // Expected if only one exists
      }
    }
    catch {
      // No tokens found
    }
    expect(tokenCount).toBe(1)
  })
})
