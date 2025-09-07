'use client'

import type { FilterableContentClientProps } from './CollectionPage'
import type { EnrichedConcept, EnrichedGuide, EnrichedWorkflow } from '@/lib/content-schema'
import React from 'react'
import { ConceptCard } from '@/components/shared/ConceptCard'
import { FilterableContentGrid } from '@/components/shared/FilterableContentGrid'
import { GuideCard } from '@/components/shared/GuideCard'
import { SimpleWorkflowCard } from '@/components/shared/SimpleWorkflowCard'

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

export function FilterableContentClient({
  items,
  type,
  searchPlaceholder,
  showCategoryFilter,
  showDifficultyFilter,
  gridClassName,
  emptyMessage,
  emptyTitle,
}: FilterableContentClientProps) {
  // Use type assertion based on the content type
  if (type === 'concepts') {
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

  if (type === 'guides') {
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
  }

  if (type === 'workflows') {
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
  }

  throw new Error(`Unknown content type: ${type}`)
}
