'use client'

import { BookOpen, Search } from 'lucide-react'
import React from 'react'
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

// Interface de base que les items doivent respecter pour utiliser ce composant
export interface BaseContentItem {
  title: string
  description: string
  category: string
  difficulty?: string
  tags?: string[]
  slug?: string
}

export interface FilterableContentGridProps<TItem extends BaseContentItem> {
  /** Le tableau initial de contenu à filtrer */
  items: TItem[]
  /** Composant de rendu pour chaque item */
  renderComponent: React.ComponentType<{ item: TItem }>
  /** Placeholder pour la barre de recherche */
  searchPlaceholder: string
  /** Afficher le filtre par catégorie */
  showCategoryFilter?: boolean
  /** Afficher le filtre par difficulté */
  showDifficultyFilter?: boolean
  /** Classes CSS personnalisées pour la grille */
  gridClassName?: string
  /** Message personnalisé pour l'état vide */
  emptyMessage?: string
  /** Titre pour l'état vide */
  emptyTitle?: string
}

export function FilterableContentGrid<TItem extends BaseContentItem>({
  items,
  renderComponent,
  searchPlaceholder,
  showCategoryFilter = true,
  showDifficultyFilter = false,
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  emptyMessage = 'Essayez de modifier votre recherche ou vos filtres.',
  emptyTitle = 'Aucun contenu trouvé',
}: FilterableContentGridProps<TItem>) {
  const listRef = useAutoAnimateList()

  // Utiliser le hook de filtrage centralisé
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

  // Le composant de rendu est passé directement en prop

  // Générer les options de filtres disponibles
  const categories = showCategoryFilter
    ? ['all', ...Array.from(new Set(items.map(item => item.category).filter((cat): cat is string => Boolean(cat))))]
    : []

  const difficulties = showDifficultyFilter
    ? ['all', ...Array.from(new Set(items.map(item => item.difficulty).filter((diff): diff is string => Boolean(diff))))]
    : []

  // État vide
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
        {filteredItems.map((item, index) => (
          <div key={(item as BaseContentItem).slug || `item-${index}`} {...createTestIdProps(TestIds.Interactive.Card('item', (item as BaseContentItem).slug || `item-${index}`))}>
            {React.createElement(renderComponent, { item })}
          </div>
        ))}
      </div>
    </div>
  )
}
