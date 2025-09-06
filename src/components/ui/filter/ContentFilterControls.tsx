'use client'

import { X } from 'lucide-react'
import Button from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categoryLabels, difficultyLabels } from '@/lib/constants'

// Type pour les retours du hook useContentFilter
export interface ContentFilterState {
  searchTerm: string
  selectedCategory: string
  selectedDifficulty: string
  selectedTags: string[]
  showFavoritesOnly: boolean
  availableCategories: string[]
  availableDifficulties: string[]
  availableTags: string[]
  hasActiveFilters: boolean
}

export interface ContentFilterActions {
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedDifficulty: (difficulty: string) => void
  setSelectedTags: (tags: string[]) => void
  setShowFavoritesOnly: (show: boolean) => void
  resetFilters: () => void
}

export interface ContentFilterControlsProps {
  // State from useContentFilter
  state: ContentFilterState
  // Actions from useContentFilter
  actions: ContentFilterActions
  // Configuration options
  searchPlaceholder?: string
  showCategoryFilter?: boolean
  showDifficultyFilter?: boolean
  showResetButton?: boolean
  className?: string
  // Custom labels
  categoryLabel?: string
  difficultyLabel?: string
  // Width classes for responsive design
  searchWidth?: string
  categoryWidth?: string
  difficultyWidth?: string
}

export function ContentFilterControls({
  state,
  actions,
  searchPlaceholder = 'Rechercher...',
  showCategoryFilter = true,
  showDifficultyFilter = false,
  showResetButton = true,
  className = '',
  categoryLabel = 'Catégorie',
  difficultyLabel = 'Difficulté',
  searchWidth = 'flex-1',
  categoryWidth = 'w-full lg:w-[240px]',
  difficultyWidth = 'w-full lg:w-[180px]',
}: ContentFilterControlsProps) {
  const {
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    availableCategories,
    availableDifficulties,
    hasActiveFilters,
  } = state

  const {
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    resetFilters,
  } = actions

  // Generate category options
  const categoryOptions = showCategoryFilter
    ? ['all', ...availableCategories]
    : []

  // Generate difficulty options
  const difficultyOptions = showDifficultyFilter
    ? ['all', ...availableDifficulties]
    : []

  return (
    <div className={`flex flex-col lg:flex-row gap-4 container mx-auto mb-8 ${className}`}>
      {/* Search Input */}
      <div className={searchWidth}>
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      {showCategoryFilter && categoryOptions.length > 0 && (
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className={categoryWidth}>
            <SelectValue placeholder={categoryLabel} />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all'
                  ? `Toutes les ${categoryLabel.toLowerCase()}s`
                  : categoryLabels[category as keyof typeof categoryLabels] || category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Difficulty Filter */}
      {showDifficultyFilter && difficultyOptions.length > 0 && (
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className={difficultyWidth}>
            <SelectValue placeholder={difficultyLabel} />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty === 'all'
                  ? `Toutes les ${difficultyLabel.toLowerCase()}s`
                  : difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Reset Button */}
      {showResetButton && hasActiveFilters && (
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full lg:w-auto"
        >
          <X className="size-4 mr-2" />
          Réinitialiser
        </Button>
      )}
    </div>
  )
}
