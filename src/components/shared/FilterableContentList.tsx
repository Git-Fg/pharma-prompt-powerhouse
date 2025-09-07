'use client'

import type { EnrichedConcept, EnrichedGuide, EnrichedWorkflow } from '@/lib/content-schema'
import { BookOpen, Search } from 'lucide-react'
import React from 'react'
import { ConceptCard } from '@/components/shared/ConceptCard'
import { GuideCard } from '@/components/shared/GuideCard'
import { SimpleWorkflowCard } from '@/components/shared/SimpleWorkflowCard'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAutoAnimateList } from '@/hooks/useAutoAnimate'
import { useContentFilter } from '@/hooks/useContentFilter'
import { categoryLabels, difficultyLabels } from '@/lib/constants'
import { createTestIdProps, TestIds } from '@/lib/test-utils'

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
  const listRef = useAutoAnimateList()

  // Use the centralized filtering hook
  const {
    filteredItems,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    resetFilters,
  } = useContentFilter(items)

  // Generate filter options
  const categories = showCategoryFilter
    ? ['all', ...Array.from(new Set(items.map(item => item.category).filter((cat): cat is string => Boolean(cat))))]
    : []

  const difficulties = showDifficultyFilter
    ? ['all', ...Array.from(new Set(items.map(item => item.difficulty).filter((diff): diff is string => Boolean(diff))))]
    : []

  // Empty state
  if (filteredItems.length === 0) {
    return (
      <div className="space-y-6" {...createTestIdProps(TestIds.Content.Section('empty-state'))}>
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative dialog-content-width mx-auto" {...createTestIdProps(TestIds.Form.Input('search'))}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {(showCategoryFilter && categories.length > 1) && (
            <div className="flex justify-center gap-2 flex-wrap" {...createTestIdProps(TestIds.Form.Select('category'))}>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>
                      {categoryLabels[category as keyof typeof categoryLabels] || category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(showDifficultyFilter && difficulties.length > 1) && (
            <div className="flex justify-center gap-2 flex-wrap">
              <Button
                variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDifficulty('all')}
              >
                Tous
              </Button>
              {difficulties.slice(1).map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficulty}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">{emptyTitle}</h3>
          <p className="text-muted-foreground mb-4">
            {emptyMessage}
          </p>
          <Button variant="outline" onClick={resetFilters} {...createTestIdProps(TestIds.Interactive.Button('reset-filters'))}>
            Réinitialiser les filtres
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative dialog-content-width mx-auto" {...createTestIdProps(TestIds.Form.Input('search'))}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap" {...createTestIdProps(TestIds.Content.Section('filters'))}>
          {(showCategoryFilter && categories.length > 1) && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory} {...createTestIdProps(TestIds.Form.Select('category'))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>
                    {categoryLabels[category as keyof typeof categoryLabels] || category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {(showDifficultyFilter && difficulties.length > 1) && (
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty} {...createTestIdProps(TestIds.Form.Select('difficulty'))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Difficulté" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les difficultés</SelectItem>
                {difficulties.slice(1).map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div ref={listRef} className={gridClassName} {...createTestIdProps(TestIds.Content.Section('grid'))}>
        {type === 'concepts' && (filteredItems as EnrichedConcept[]).map(item => (
          <div key={item.slug} {...createTestIdProps(TestIds.Interactive.Card('item', item.slug))}>
            <ConceptCardWrapper item={item} />
          </div>
        ))}
        {type === 'guides' && (filteredItems as EnrichedGuide[]).map(item => (
          <div key={item.slug} {...createTestIdProps(TestIds.Interactive.Card('item', item.slug))}>
            <GuideCardWrapper item={item} />
          </div>
        ))}
        {type === 'workflows' && (filteredItems as EnrichedWorkflow[]).map(item => (
          <div key={item.slug} {...createTestIdProps(TestIds.Interactive.Card('item', item.slug))}>
            <WorkflowCardWrapper item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
