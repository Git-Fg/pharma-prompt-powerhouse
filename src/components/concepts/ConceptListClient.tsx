'use client';

import { Concept } from '@/lib/content-schema';
import { SearchInput } from '@/components/ui/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { ConceptCard } from '@/components/shared/ConceptCard';
import { Button } from '@/components/ui/button';
import { categoryLabels } from '@/lib/constants';
import { useContentFilter } from '@/hooks/useContentFilter';
import { content } from '@/lib/content-loader';

interface ConceptListClientProps {
  initialConcepts: Concept[];
}

export function ConceptListClient({ initialConcepts }: ConceptListClientProps) {
    const {
    filteredItems: filteredConcepts,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    resetFilters
  } = useContentFilter<Concept>(initialConcepts);

 const categories = [
    'all',
    ...Array.from(new Set(initialConcepts.map(c => c.category))),
  ];

  // Calculate guide and prompt counts for each concept
  const conceptsWithStats = filteredConcepts.map((concept) => {
    const guideCount = content.guides.filter((g) =>
      g.conceptSlugs?.includes(concept.slug)
    ).length;
    const workflowCount = content.workflows.filter((w) =>
      w.conceptSlugs?.includes(concept.slug)
    ).length;
    return {
      ...concept,
      guideCount,
      workflowCount
    };
  });

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
        <div className="flex-1">
          <SearchInput
            placeholder="Rechercher un concept..."
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
      </div>

      {/* Empty State */}
      {filteredConcepts.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun concept trouvé</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {searchTerm
              ? `Aucun concept ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun concept ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button
            variant="outline"
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Concepts Grid */}
      {filteredConcepts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conceptsWithStats.map(concept => (
            <ConceptCard
              key={concept.slug}
              concept={concept}
            />
          ))}
        </div>
      )}
    </>
  );
}