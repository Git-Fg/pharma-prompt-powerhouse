/**
 * Utilitaires partagés pour le système de glossaire
 * Centralise la logique de normalisation et d'accès au glossaire
 */

import { glossary } from '@/content/glossary'

/**
 * Normalise un terme pour l'accès au glossaire
 */
export function normalizeGlossaryTerm(term: string): string {
  return term.toLowerCase().trim()
}

/**
 * Récupère une définition du glossaire de façon sécurisée
 */
export function getGlossaryDefinition(term: string) {
  const normalizedTerm = normalizeGlossaryTerm(term)
  return glossary[normalizedTerm] || null
}

/**
 * Vérifie si un terme existe dans le glossaire
 */
export function isGlossaryTerm(term: string): boolean {
  return getGlossaryDefinition(term) !== null
}

/**
 * Obtient tous les termes du glossaire normalisés
 */
export function getAllGlossaryTerms(): string[] {
  return Object.keys(glossary)
}

/**
 * Obtient la liste des termes avec leurs variations
 */
export function getGlossaryTermsWithVariations(): Array<{
  key: string
  term: string
  variations: string[]
}> {
  return Object.entries(glossary).map(([key, value]) => ({
    key,
    term: value.term.toLowerCase(),
    variations: generateTermVariations(value.term),
  }))
}

/**
 * Génère les variations possibles d'un terme (partagé avec glossary-detection)
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