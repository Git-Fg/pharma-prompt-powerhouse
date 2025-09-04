// =================================================================
// UTILITAIRES POUR L'INTERFACE UTILISATEUR
// =================================================================

import type { Category, Difficulty } from './constants'
import {

  categoryColors,
  categoryLabels,
  confidenceLevels,

  difficultyLabels,
} from './constants'

/**
 * Obtenir le label d'affichage d'une catégorie avec fallback sécurisé
 */
export function getCategoryLabel(category: string): string {
  return categoryLabels[category as Category] ?? category
}

/**
 * Obtenir le label d'affichage d'une difficulté avec fallback sécurisé
 */
export function getDifficultyLabel(difficulty: string): string {
  return difficultyLabels[difficulty as Difficulty] ?? difficulty
}

/**
 * Obtenir la couleur associée à une catégorie
 */
export function getCategoryColor(category: string): string {
  return categoryColors[category as Category] ?? 'gray'
}

/**
 * Obtenir les informations d'affichage pour un score de confiance
 */
export function getConfidenceInfo(score: number) {
  const key = Math.max(1, Math.min(5, Math.round(score))) as keyof typeof confidenceLevels
  return confidenceLevels[key]
}

/**
 * Génère les propriétés CSS pour l'affichage d'étoiles de notation
 * Utilisé pour créer des composants d'étoiles cohérents
 */
export function getStarRatingProps(score: number, totalStars: number = 5) {
  const validScore = Math.max(0, Math.min(totalStars, Math.round(score)))

  return {
    score: validScore,
    totalStars,
    stars: Array.from({ length: totalStars }, (_, i) => ({
      index: i,
      filled: i < validScore,
      className: i < validScore ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
    })),
  }
}

// =================================================================
// UTILITAIRES DE FORMATAGE
// =================================================================

/**
 * Formate un temps estimé avec des valeurs par défaut
 */
export function formatEstimatedTime(time?: string, contentType: string = 'guide'): string {
  if (time) { return time }

  // Valeurs par défaut selon le type de contenu
  const defaults = {
    concept: '5-10 min',
    guide: '15-30 min',
    workflow: '30-60 min',
    tool: '5-15 min',
  } as const

  return defaults[contentType as keyof typeof defaults] ?? '10-20 min'
}

/**
 * Formate une liste de tags pour l'affichage
 */
export function formatTags(tags?: string[]): string[] {
  if (!tags || tags.length === 0) { return [] }
  return tags.filter(Boolean).map(tag => tag.trim()).filter(tag => tag.length > 0)
}

/**
 * Génère un slug à partir d'un titre
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garde seulement lettres, chiffres, espaces et tirets
    .trim()
    .replace(/\s+/g, '-') // Remplace espaces par tirets
    .replace(/-+/g, '-') // Élimine les tirets multiples
    .replace(/^-|-$/g, '') // Supprime tirets en début/fin
}

// =================================================================
// UTILITAIRES DE TRI ET FILTRAGE
// =================================================================

/**
 * Trie un array d'objets par favoris puis par titre
 */
export function sortByFavoritesThenTitle<T extends { isFavorite?: boolean, title: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    // Favoris d'abord
    if (a.isFavorite && !b.isFavorite) { return -1 }
    if (!a.isFavorite && b.isFavorite) { return 1 }

    // Puis par titre alphabétique
    return a.title.localeCompare(b.title, 'fr', { numeric: true, sensitivity: 'base' })
  })
}

/**
 * Filtre et trie les éléments par pertinence de recherche
 */
export function filterAndSortByRelevance<T extends { title: string, description: string, tags?: string[] }>(
  items: T[],
  searchTerm: string,
): T[] {
  if (!searchTerm) { return items }

  const query = searchTerm.toLowerCase()

  return items
    .map(item => ({
      item,
      score: calculateRelevanceScore(item, query),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
}

/**
 * Calcule un score de pertinence pour la recherche
 */
function calculateRelevanceScore<T extends { title: string, description: string, tags?: string[] }>(
  item: T,
  query: string,
): number {
  let score = 0
  const title = item.title.toLowerCase()
  const description = item.description.toLowerCase()
  const tags = item.tags?.map(t => t.toLowerCase()) ?? []

  // Correspondance exacte du titre = score max
  if (title === query) { score += 100 }

  // Titre commence par la recherche
  else if (title.startsWith(query)) { score += 50 }

  // Titre contient la recherche
  else if (title.includes(query)) { score += 25 }

  // Description contient la recherche
  if (description.includes(query)) { score += 10 }

  // Tags correspondent
  const matchingTags = tags.filter(tag => tag.includes(query))
  score += matchingTags.length * 5

  // Bonus pour les mots complets
  const titleWords = title.split(/\s+/)
  const descriptionWords = description.split(/\s+/)

  if (titleWords.includes(query)) { score += 15 }
  if (descriptionWords.includes(query)) { score += 8 }

  return score
}

// =================================================================
// UTILITAIRES DE VALIDATION
// =================================================================

/**
 * Valide qu'une catégorie est supportée
 */
export function isValidCategory(category: string): category is Category {
  return category in categoryLabels
}

/**
 * Valide qu'une difficulté est supportée
 */
export function isValidDifficulty(difficulty: string): difficulty is Difficulty {
  return difficulty in difficultyLabels
}

/**
 * Valide un score de confiance
 */
export function isValidConfidenceScore(score: number): boolean {
  return Number.isInteger(score) && score >= 1 && score <= 5
}

// =================================================================
// UTILITAIRES D'URL ET NAVIGATION
// =================================================================

/**
 * Génère l'URL complète d'un élément de contenu
 */
export function getContentUrl(type: 'workflow' | 'guide' | 'concept' | 'tool', slug: string): string {
  const basePaths = {
    workflow: '/workflows',
    guide: '/guides',
    concept: '/concepts',
    tool: '/l-arsenal-ia',
  }

  return `${basePaths[type]}/${slug}`
}

/**
 * Extrait le type de contenu depuis une URL
 */
export function getContentTypeFromUrl(url: string): 'workflow' | 'guide' | 'concept' | 'tool' | null {
  if (url.startsWith('/workflows/')) { return 'workflow' }
  if (url.startsWith('/guides/')) { return 'guide' }
  if (url.startsWith('/concepts/')) { return 'concept' }
  if (url.startsWith('/l-arsenal-ia/')) { return 'tool' }
  return null
}
