'use client';

import { ExternalTool } from '@/lib/content-schema';
import { SearchInput } from '@/components/ui/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { ToolCard } from '@/components/shared/ToolCard';
import { Button } from '@/components/ui/button';
import { categoryLabels } from '@/lib/constants';
import { useContentFilter } from '@/hooks/useContentFilter';

interface ToolListClientProps {
  initialTools: ExternalTool[];
}

export function ToolListClient({ initialTools }: ToolListClientProps) {
    const {
    filteredItems: filteredTools,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    resetFilters
  } = useContentFilter<ExternalTool>(initialTools);

  const categories = [
    'all',
    ...Array.from(new Set(initialTools.map(t => t.category))),
  ];

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
        <div className="flex-1">
          <SearchInput
            placeholder="Rechercher un outil..."
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
      {filteredTools.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <FileText className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun outil trouvé</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {searchTerm 
              ? `Aucun outil ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun outil ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button 
            variant="outline" 
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Tools Grid */}
      {filteredTools.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.slug}
              tool={tool}
            />
          ))}
        </div>
      )}
    </>
  );
}