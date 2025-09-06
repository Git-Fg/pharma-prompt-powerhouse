'use client'

import type { ContentFilterActions, ContentFilterState } from '@/components/ui/filter/ContentFilterControls'
import type { Concept } from '@/lib/content-schema'
import { FileText } from 'lucide-react'
import { ConceptCard } from '@/components/shared/ConceptCard'
import Button from '@/components/ui/button'
import { ContentFilterControls } from '@/components/ui/filter/ContentFilterControls'
import { useAutoAnimateList } from '@/hooks/useAutoAnimate'
import { useContentFilter } from '@/hooks/useContentFilter'
import { content } from '@/lib/content-loader'

interface ConceptListClientProps {
  initialConcepts: Concept[]
}

export function ConceptListClient({ initialConcepts }: ConceptListClientProps) {
  const {
    filteredItems: filteredConcepts,
    ...filterStateAndActions
  } = useContentFilter<Concept>(initialConcepts)

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

  // Calculate guide and prompt counts for each concept
  const conceptsWithStats = filteredConcepts.map((concept) => {
    const guideCount = content.guides.filter(g =>
      g.conceptSlugs?.includes(concept.slug),
    ).length
    const workflowCount = content.workflows.filter(w =>
      w.conceptSlugs?.includes(concept.slug),
    ).length
    return {
      ...concept,
      guideCount,
      workflowCount,
    }
  })

  return (
    <>
      {/* Search and Filter Controls */}
      <ContentFilterControls
        state={filterState}
        actions={filterActions}
        searchPlaceholder="Rechercher un concept..."
        showCategoryFilter={true}
        showDifficultyFilter={false}
        categoryWidth="w-full lg:w-[240px]"
      />

      {/* Empty State */}
      {filteredConcepts.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun concept trouvé</h3>
          <p className="prose-description mb-4">
            {filterState.searchTerm
              ? `Aucun concept ne correspond à "${filterState.searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun concept ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button
            variant="outline"
            onClick={filterActions.resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Concepts Grid */}
      {filteredConcepts.length > 0 && (
        <div ref={listRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conceptsWithStats.map(concept => (
            <ConceptCard
              key={concept.slug}
              concept={concept}
            />
          ))}
        </div>
      )}
    </>
  )
}
