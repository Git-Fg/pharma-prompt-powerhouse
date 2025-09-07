'use client'

import type { EnrichedConcept, EnrichedGuide, EnrichedWorkflow } from '@/lib/content-schema'
import React from 'react'
import { ConceptCard } from '@/components/shared/ConceptCard'
import { GuideCard } from '@/components/shared/GuideCard'
import { SimpleWorkflowCard } from '@/components/shared/SimpleWorkflowCard'
import { FilterableContentGrid } from './FilterableContentGrid'

export type CollectionType = 'concepts' | 'guides' | 'workflows'

export interface FilterableContentListProps {
  items: (EnrichedConcept | EnrichedGuide | EnrichedWorkflow)[]
  type: CollectionType
  searchPlaceholder: string
  showCategoryFilter: boolean
  showDifficultyFilter: boolean
  gridClassName?: string
  emptyMessage?: string
  emptyTitle?: string
}

// Wrapper components to avoid passing functions as props
function ConceptCardWrapper({ item }: { item: EnrichedConcept }) {
  return <ConceptCard concept={item} />
}

function GuideCardWrapper({ item }: { item: EnrichedGuide }) {
  return <GuideCard guide={item} />
}

function WorkflowCardWrapper({ item }: { item: EnrichedWorkflow }) {
  return <SimpleWorkflowCard workflow={item} />
}

export function FilterableContentList({
  items,
  type,
  searchPlaceholder,
  showCategoryFilter = true,
  showDifficultyFilter = false,
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  emptyMessage = 'Essayez de modifier votre recherche ou vos filtres.',
  emptyTitle = 'Aucun contenu trouvé',
}: FilterableContentListProps) {
  // Render the appropriate FilterableContentGrid based on type
  switch (type) {
    case 'concepts':
      return (
        <FilterableContentGrid
          items={items as EnrichedConcept[]}
          renderComponent={ConceptCardWrapper}
          searchPlaceholder={searchPlaceholder}
          showCategoryFilter={showCategoryFilter}
          showDifficultyFilter={showDifficultyFilter}
          gridClassName={gridClassName}
          emptyMessage={emptyMessage}
          emptyTitle={emptyTitle}
        />
      )
    case 'guides':
      return (
        <FilterableContentGrid
          items={items as EnrichedGuide[]}
          renderComponent={GuideCardWrapper}
          searchPlaceholder={searchPlaceholder}
          showCategoryFilter={showCategoryFilter}
          showDifficultyFilter={showDifficultyFilter}
          gridClassName={gridClassName}
          emptyMessage={emptyMessage}
          emptyTitle={emptyTitle}
        />
      )
    case 'workflows':
      return (
        <FilterableContentGrid
          items={items as EnrichedWorkflow[]}
          renderComponent={WorkflowCardWrapper}
          searchPlaceholder={searchPlaceholder}
          showCategoryFilter={showCategoryFilter}
          showDifficultyFilter={showDifficultyFilter}
          gridClassName={gridClassName}
          emptyMessage={emptyMessage}
          emptyTitle={emptyTitle}
        />
      )
    default:
      // Should never happen with proper typing
      return (
        <FilterableContentGrid
          items={items as EnrichedConcept[]}
          renderComponent={ConceptCardWrapper}
          searchPlaceholder={searchPlaceholder}
          showCategoryFilter={showCategoryFilter}
          showDifficultyFilter={showDifficultyFilter}
          gridClassName={gridClassName}
          emptyMessage={emptyMessage}
          emptyTitle={emptyTitle}
        />
      )
  }
}
