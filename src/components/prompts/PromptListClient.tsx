'use client';

import { Prompt } from '@/lib/content-schema';
import { SearchInput } from '@/components/ui/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { PromptCard } from '@/components/prompts/PromptCard';
import { Button } from '@/components/ui/button';
import { categoryLabels, difficultyLabels } from '@/lib/constants';
import { useContentFilter } from '@/hooks/useContentFilter';

interface PromptListProps {
  initialPrompts: Prompt[];
}

export function PromptListClient({ initialPrompts }: PromptListProps) {
    const {
    filteredItems: filteredPrompts,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    resetFilters
  } = useContentFilter<Prompt>(initialPrompts);

  const categories = [
    'all',
    ...Array.from(new Set(initialPrompts.map(p => p.category))),
  ];
  const difficulties = [
    'all',
    ...Array.from(new Set(initialPrompts.map(p => p.difficulty))),
  ];

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
        <div className="flex-1">
          <SearchInput
            placeholder="Rechercher un prompt..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[240px]">
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
      {filteredPrompts.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun prompt trouvé</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {searchTerm 
              ? `Aucun prompt ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun prompt ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button 
            variant="outline" 
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Prompts Grid */}
      {filteredPrompts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => (
            <PromptCard
              key={prompt.slug}
              slug={prompt.slug}
              title={prompt.title}
              description={prompt.description}
              difficulty={prompt.difficulty}
              tags={prompt.tags}
              icon={prompt.icon}
              promptContent={prompt.promptContent}
            />
          ))}
        </div>
      )}
    </>
  );
}