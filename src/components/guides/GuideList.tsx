'use client'

import type { EnrichedGuide } from '@/lib/content-schema'
import { FileText } from 'lucide-react'
import { GuideCard } from '@/components/shared/GuideCard'
import Button from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
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

interface GuideListProps {
  initialGuides: EnrichedGuide[]
}

export function GuideList({ initialGuides }: GuideListProps) {
  const {
    filteredItems: filteredGuides,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    resetFilters,
  } = useContentFilter<EnrichedGuide>(initialGuides)

  // AutoAnimate ref for smooth transitions
  const listRef = useAutoAnimateList()

  const categories = [
    'all',
    ...Array.from(new Set(initialGuides.map(g => g.category))),
  ]
  const difficulties = [
    'all',
    ...Array.from(new Set(initialGuides.map(g => g.difficulty))),
  ]

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
        <div className="flex-1">
          <SearchInput
            placeholder="Rechercher un guide..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[200px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all'
                  ? 'Toutes les catégories'
                  : categoryLabels[category as keyof typeof categoryLabels] || category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedDifficulty}
          onValueChange={setSelectedDifficulty}
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Difficulté" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty === 'all'
                  ? 'Toutes les difficultés'
                  : difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      {filteredGuides.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {searchTerm
              ? `Aucun guide ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun guide ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button
            variant="outline"
            onClick={resetFilters}
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
