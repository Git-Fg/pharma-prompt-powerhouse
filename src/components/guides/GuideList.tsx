'use client'

import type { ContentFilterActions, ContentFilterState } from '@/components/ui/filter/ContentFilterControls'
import type { EnrichedGuide } from '@/lib/content-schema'
import { FileText } from 'lucide-react'
import { GuideCard } from '@/components/shared/GuideCard'
import Button from '@/components/ui/button'
import { ContentFilterControls } from '@/components/ui/filter/ContentFilterControls'
import { useAutoAnimateList } from '@/hooks/useAutoAnimate'
import { useContentFilter } from '@/hooks/useContentFilter'

interface GuideListProps {
  initialGuides: EnrichedGuide[]
}

export function GuideList({ initialGuides }: GuideListProps) {
  const {
    filteredItems: filteredGuides,
    ...filterStateAndActions
  } = useContentFilter<EnrichedGuide>(initialGuides)

  // AutoAnimate ref for smooth transitions
  const listRef = useAutoAnimateList()

  // Separate state and actions for ContentFilterControls
  const filterState: ContentFilterState = {
    searchTerm: filterStateAndActions.searchTerm,
    selectedCategory: filterStateAndActions.selectedCategory,
    selectedDifficulty: filterStateAndActions.selectedDifficulty,
    selectedTags: filterStateAndActions.selectedTags,
    showFavoritesOnly: filterStateAndActions.showFavoritesOnly,
    availableCategories: filterStateAndActions.availableCategories,
    availableDifficulties: filterStateAndActions.availableDifficulties,
    availableTags: filterStateAndActions.availableTags,
    hasActiveFilters: filterStateAndActions.hasActiveFilters,
  }

  const filterActions: ContentFilterActions = {
    setSearchTerm: filterStateAndActions.setSearchTerm,
    setSelectedCategory: filterStateAndActions.setSelectedCategory,
    setSelectedDifficulty: filterStateAndActions.setSelectedDifficulty,
    setSelectedTags: filterStateAndActions.setSelectedTags,
    setShowFavoritesOnly: filterStateAndActions.setShowFavoritesOnly,
    resetFilters: filterStateAndActions.resetFilters,
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <ContentFilterControls
        state={filterState}
        actions={filterActions}
        searchPlaceholder="Rechercher un guide..."
        showCategoryFilter={true}
        showDifficultyFilter={true}
        categoryWidth="w-full lg:w-[200px]"
        difficultyWidth="w-full lg:w-[180px]"
      />

      {/* Empty State */}
      {filteredGuides.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
          <p className="prose-description mb-4">
            {filterState.searchTerm
              ? `Aucun guide ne correspond à "${filterState.searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun guide ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button
            variant="outline"
            onClick={filterActions.resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Guides Grid */}
      {filteredGuides.length > 0 && (
        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map(guide => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </>
  )
}
