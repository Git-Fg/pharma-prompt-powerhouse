/**
 * Système de détection automatique des termes du glossaire
 * Améliore l'expérience utilisateur en transformant automatiquement
 * les termes du glossaire en liens cliquables dans le contenu markdown
 */

import { glossary } from '@/content/glossary'

interface GlossaryMatch {
  term: string
  start: number
  end: number
  glossaryKey: string
}

/**
 * Détecte automatiquement les termes du glossaire dans un texte
 * en utilisant un algorithme de correspondance efficace
 */
export function detectGlossaryTerms(text: string): GlossaryMatch[] {
  const matches: GlossaryMatch[] = []
  const processedRanges: Set<string> = new Set()

  // Créer un index des termes pour une recherche efficace
  const glossaryTerms = Object.entries(glossary).map(([key, value]) => ({
    key,
    term: value.term.toLowerCase(),
    // Inclure aussi les variations possibles (singulier/pluriel, etc.)
    variations: generateTermVariations(value.term),
  }))

  // Trier par longueur décroissante pour prioriser les termes plus longs
  const sortedTerms = glossaryTerms.sort((a, b) => b.term.length - a.term.length)

  const normalizedText = text.toLowerCase()

  for (const glossaryItem of sortedTerms) {
    // Chercher le terme principal et ses variations
    const termsToSearch = [glossaryItem.term, ...glossaryItem.variations]

    for (const searchTerm of termsToSearch) {
      const regex = createTermRegex(searchTerm)
      let match

      // eslint-disable-next-line no-cond-assign
      while ((match = regex.exec(normalizedText)) !== null) {
        const start = match.index
        const end = start + match[0].length
        const rangeKey = `${start}-${end}`

        // Éviter les chevauchements avec des termes déjà détectés
        if (!hasOverlapWithProcessedRanges(start, end, processedRanges)) {
          matches.push({
            term: text.substring(start, end), // Conserver la casse originale
            start,
            end,
            glossaryKey: glossaryItem.key,
          })
          processedRanges.add(rangeKey)
        }
      }
    }
  }

  // Trier par position dans le texte
  return matches.sort((a, b) => a.start - b.start)
}

/**
 * Transforme un texte en ajoutant automatiquement les liens vers le glossaire
 */
export function enhanceTextWithGlossary(text: string): string {
  const matches = detectGlossaryTerms(text)
  
  if (matches.length === 0) {
    return text
  }

  let result = ''
  let lastIndex = 0

  for (const match of matches) {
    // Ajouter le texte avant le match
    result += text.substring(lastIndex, match.start)
    
    // Ajouter le terme avec le composant DefinedTerm
    result += `<DefinedTerm term="${match.glossaryKey}">${match.term}</DefinedTerm>`
    
    lastIndex = match.end
  }

  // Ajouter le reste du texte
  result += text.substring(lastIndex)

  return result
}

/**
 * Génère les variations possibles d'un terme (pluriel, singulier, etc.)
 */
function generateTermVariations(term: string): string[] {
  const variations: string[] = []
  const normalizedTerm = term.toLowerCase()

  // Règles simples pour le français
  // Pluriel -> Singulier
  if (normalizedTerm.endsWith('s') && normalizedTerm.length > 3) {
    variations.push(normalizedTerm.slice(0, -1))
  }
  
  // Singulier -> Pluriel
  if (!normalizedTerm.endsWith('s')) {
    variations.push(normalizedTerm + 's')
  }

  // Variations avec tirets/espaces
  if (normalizedTerm.includes('-')) {
    variations.push(normalizedTerm.replace(/-/g, ' '))
  }
  if (normalizedTerm.includes(' ')) {
    variations.push(normalizedTerm.replace(/\s+/g, '-'))
  }

  // Supprimer les parenthèses et leur contenu pour les variantes
  const withoutParens = normalizedTerm.replace(/\s*\([^)]*\)/g, '').trim()
  if (withoutParens !== normalizedTerm && withoutParens.length > 2) {
    variations.push(withoutParens)
  }

  return [...new Set(variations)] // Dédupliquer
}

/**
 * Crée une regex pour détecter un terme en respectant les limites de mots
 */
function createTermRegex(term: string): RegExp {
  // Échapper les caractères spéciaux pour la regex
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  
  // Créer une regex qui respecte les limites de mots
  // mais permet les caractères comme les apostrophes
  return new RegExp(`\\b${escapedTerm}\\b`, 'gi')
}

/**
 * Vérifie s'il y a un chevauchement avec les ranges déjà traités
 */
function hasOverlapWithProcessedRanges(
  start: number,
  end: number,
  processedRanges: Set<string>,
): boolean {
  for (const rangeStr of processedRanges) {
    const rangeParts = rangeStr.split('-').map(Number)
    if (rangeParts.length !== 2) continue
    
    const [rangeStart, rangeEnd] = rangeParts
    if (rangeStart === undefined || rangeEnd === undefined) continue
    
    // Vérifier le chevauchement
    if (!(end <= rangeStart || start >= rangeEnd)) {
      return true
    }
  }
  return false
}

/**
 * Version React-friendly qui retourne des composants JSX
 */
export function parseTextWithGlossaryTerms(text: string): Array<{
  type: 'text' | 'glossary'
  content: string
  glossaryKey?: string
}> {
  const matches = detectGlossaryTerms(text)
  
  if (matches.length === 0) {
    return [{ type: 'text', content: text }]
  }

  const result: Array<{
    type: 'text' | 'glossary'
    content: string
    glossaryKey?: string
  }> = []
  
  let lastIndex = 0

  for (const match of matches) {
    // Ajouter le texte avant le match
    if (match.start > lastIndex) {
      result.push({
        type: 'text',
        content: text.substring(lastIndex, match.start),
      })
    }
    
    // Ajouter le terme avec le glossaire
    result.push({
      type: 'glossary',
      content: match.term,
      glossaryKey: match.glossaryKey,
    })
    
    lastIndex = match.end
  }

  // Ajouter le reste du texte
  if (lastIndex < text.length) {
    result.push({
      type: 'text',
      content: text.substring(lastIndex),
    })
  }

  return result
}