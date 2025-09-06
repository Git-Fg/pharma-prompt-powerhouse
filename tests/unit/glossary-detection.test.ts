import { describe, expect, it } from 'vitest'
import { detectGlossaryTerms, parseTextWithGlossaryTerms } from '@/lib/glossary-detection'

describe('glossary Detection System', () => {
  describe('detectGlossaryTerms', () => {
    it('should detect simple glossary terms', () => {
      const text = 'Le token est important pour les LLM.'
      const matches = detectGlossaryTerms(text)

      expect(matches).toHaveLength(1)
      expect(matches[0]).toEqual({
        term: 'token',
        start: 3,
        end: 8,
        glossaryKey: 'token',
      })
    })

    it('should detect multiple terms', () => {
      const text = 'Le RAG utilise des tokens pour l\'embedding.'
      const matches = detectGlossaryTerms(text)

      expect(matches.length).toBeGreaterThan(0)
      const termNames = matches.map(m => m.glossaryKey)
      expect(termNames).toContain('rag')
      expect(termNames).toContain('token')
    })

    it('should respect word boundaries', () => {
      const text = 'Le tokenization n\'est pas la même chose qu\'un token.'
      const matches = detectGlossaryTerms(text)

      // Should only match "token" at the end, not in "tokenization"
      expect(matches).toHaveLength(1)
      expect(matches[0]?.term).toBe('token')
    })

    it('should handle case insensitive matching', () => {
      const text = 'Token, RAG et HALLUCINATION sont importants.'
      const matches = detectGlossaryTerms(text)

      expect(matches.length).toBeGreaterThan(0)
      const termNames = matches.map(m => m.glossaryKey)
      expect(termNames).toContain('token')
      expect(termNames).toContain('rag')
      expect(termNames).toContain('hallucination')
    })

    it('should avoid overlapping matches', () => {
      // En cas de termes qui se chevauchent, garder le plus long
      const text = 'Le Chain-of-Thought est une technique importante.'
      const matches = detectGlossaryTerms(text)

      // Vérifier qu'il n'y a pas de chevauchement
      for (let i = 0; i < matches.length - 1; i++) {
        const current = matches[i]!
        const next = matches[i + 1]!
        expect(current.end).toBeLessThanOrEqual(next.start)
      }
    })

    it('should handle terms with special characters', () => {
      const text = 'Le few-shot prompting est efficace.'
      const matches = detectGlossaryTerms(text)

      const fewShotMatch = matches.find(m => m.glossaryKey === 'few-shot-prompting')
      expect(fewShotMatch).toBeDefined()
    })
  })

  describe('parseTextWithGlossaryTerms', () => {
    it('should parse text with mixed content', () => {
      const text = 'Le token est utilisé par les IA pour le RAG.'
      const parsed = parseTextWithGlossaryTerms(text)

      expect(parsed).toEqual([
        { type: 'text', content: 'Le ' },
        { type: 'glossary', content: 'token', glossaryKey: 'token' },
        { type: 'text', content: ' est utilisé par les IA pour le ' },
        { type: 'glossary', content: 'RAG', glossaryKey: 'rag' },
        { type: 'text', content: '.' },
      ])
    })

    it('should handle text without glossary terms', () => {
      const text = 'Ceci est un texte normal sans termes spéciaux.'
      const parsed = parseTextWithGlossaryTerms(text)

      expect(parsed).toEqual([
        { type: 'text', content: text },
      ])
    })

    it('should handle text with only glossary terms', () => {
      const text = 'RAG'
      const parsed = parseTextWithGlossaryTerms(text)

      expect(parsed).toEqual([
        { type: 'glossary', content: 'RAG', glossaryKey: 'rag' },
      ])
    })
  })

  describe('performance and Edge Cases', () => {
    it('should handle empty text', () => {
      expect(detectGlossaryTerms('')).toEqual([])
      expect(parseTextWithGlossaryTerms('')).toEqual([
        { type: 'text', content: '' },
      ])
    })

    it('should handle text with only spaces', () => {
      const text = '   '
      expect(detectGlossaryTerms(text)).toEqual([])
      expect(parseTextWithGlossaryTerms(text)).toEqual([
        { type: 'text', content: text },
      ])
    })

    it('should handle long text efficiently', () => {
      const longText = 'Le token est important. '.repeat(100)
        + 'RAG est une technique. '.repeat(100)

      const start = performance.now()
      const matches = detectGlossaryTerms(longText)
      const end = performance.now()

      expect(matches.length).toBeGreaterThan(0)
      expect(end - start).toBeLessThan(100) // Should process in less than 100ms
    })
  })
})
