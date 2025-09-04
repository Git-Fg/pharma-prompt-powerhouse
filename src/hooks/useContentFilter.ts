// =================================================================
// HOOK DE FILTRAGE UNIVERSEL POUR LE CONTENU
// =================================================================
import { useCallback, useMemo, useState } from 'react'

// Interface de base que tous les contenus doivent respecter
interface BaseContent {
  title: string
  description: string
  category: string
  difficulty?: string
  tags?: string[]
  isFavorite?: boolean
}

// Configuration avancée du filtrage
interface FilterOptions {
  enableTagFiltering?: boolean
  enableFavoriteFiltering?: boolean
  caseSensitive?: boolean
  searchFields?: (keyof BaseContent)[]
}

export function useContentFilter<T extends BaseContent>(
  initialItems: T[],
  options: FilterOptions = {},
) {
  // Configuration par défaut
  const {
    enableTagFiltering = true,
    enableFavoriteFiltering = true,
    caseSensitive = false,
    searchFields = ['title', 'description'],
  } = options

  // États du filtrage
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Récupération des valeurs uniques pour les filtres
  const availableCategories = useMemo(() => {
    return Array.from(new Set(initialItems.map(item => item.category))).sort()
  }, [initialItems])

  const availableDifficulties = useMemo(() => {
    return Array.from(new Set(
      initialItems
        .map(item => item.difficulty)
        .filter((d): d is string => Boolean(d)),
    )).sort()
  }, [initialItems])

  const availableTags = useMemo(() => {
    if (!enableTagFiltering) { return [] }
    return Array.from(new Set(
      initialItems
        .flatMap(item => item.tags || [])
        .filter(Boolean),
    )).sort()
  }, [initialItems, enableTagFiltering])

  // Logique de filtrage optimisée
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Filtrage par recherche textuelle
      if (searchTerm) {
        const searchQuery = caseSensitive ? searchTerm : searchTerm.toLowerCase()
        const matchesSearch = searchFields.some((field) => {
          const fieldValue = item[field]
          if (typeof fieldValue === 'string') {
            const value = caseSensitive ? fieldValue : fieldValue.toLowerCase()
            return value.includes(searchQuery)
          }
          return false
        })
        if (!matchesSearch) { return false }
      }

      // Filtrage par catégorie
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }

      // Filtrage par difficulté
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
        return false
      }

      // Filtrage par tags
      if (enableTagFiltering && selectedTags.length > 0) {
        const itemTags = item.tags || []
        const hasSelectedTag = selectedTags.some(tag => itemTags.includes(tag))
        if (!hasSelectedTag) { return false }
      }

      // Filtrage par favoris
      if (enableFavoriteFiltering && showFavoritesOnly && !item.isFavorite) {
        return false
      }

      return true
    })
  }, [
    initialItems,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    selectedTags,
    showFavoritesOnly,
    caseSensitive,
    searchFields,
    enableTagFiltering,
    enableFavoriteFiltering,
  ])

  // Fonctions d'action
  const resetFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedDifficulty('all')
    setSelectedTags([])
    setShowFavoritesOnly(false)
  }, [])

  const addTag = useCallback((tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev : [...prev, tag])
  }, [])

  const removeTag = useCallback((tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }, [])

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag],
    )
  }, [])

  // Statistiques utiles
  const stats = useMemo(() => ({
    total: initialItems.length,
    filtered: filteredItems.length,
    favorites: initialItems.filter(item => item.isFavorite).length,
    categories: availableCategories.length,
    difficulties: availableDifficulties.length,
    tags: availableTags.length,
  }), [
    initialItems,
    filteredItems,
    availableCategories,
    availableDifficulties,
    availableTags,
  ])

  return {
    // Items filtrés
    filteredItems,

    // États des filtres
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    selectedTags,
    showFavoritesOnly,

    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedTags,
    setShowFavoritesOnly,

    // Actions sur les tags
    addTag,
    removeTag,
    toggleTag,

    // Données disponibles pour les filtres
    availableCategories,
    availableDifficulties,
    availableTags,

    // Actions
    resetFilters,

    // Statistiques
    stats,

    // État utile pour l'UI
    hasActiveFilters: searchTerm !== ''
      || selectedCategory !== 'all'
      || selectedDifficulty !== 'all'
      || selectedTags.length > 0
      || showFavoritesOnly,
  }
}
