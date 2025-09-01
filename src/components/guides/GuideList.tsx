'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allGuides } from 'content-collections';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Clock, BookOpen, ArrowRight, Heart, FileText } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { getIcon } from '@/types/icon-taxonomy';
import { categoryLabels, difficultyLabels } from '@/lib/constants';

type Guide = (typeof allGuides)[0];

interface GuideListProps {
  initialGuides: Guide[];
}

export function GuideList({ initialGuides }: GuideListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { toggleFavorite, isFavorite } = useFavorites('favoriteGuides');

  const filteredGuides = initialGuides.filter(guide => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || guide.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [
    'all',
    ...Array.from(new Set(initialGuides.map(g => g.category))),
  ];
  const difficulties = [
    'all',
    ...Array.from(new Set(initialGuides.map(g => g.difficulty))),
  ];

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un guide..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
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
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {searchTerm 
              ? `Aucun guide ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
              : 'Aucun guide ne correspond aux filtres sélectionnés. Essayez de modifier vos critères.'}
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Guides Grid */}
      {filteredGuides.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map(guide => {
            const IconComponent = getIcon(guide.icon);
            
            return (
            <Card
              key={guide.slug}
              className="group flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex-grow">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    {categoryLabels[guide.category as keyof typeof categoryLabels] || guide.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 -mt-2 -mr-2"
                    onClick={e => {
                      e.preventDefault();
                      toggleFavorite(guide.slug);
                    }}
                  >
                    <Heart
                      className={cn(
                        'w-4 h-4',
                        isFavorite(guide.slug)
                          ? 'fill-red-500 text-red-500'
                          : 'text-muted-foreground'
                      )}
                    />
                  </Button>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {guide.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {difficultyLabels[guide.difficulty as keyof typeof difficultyLabels] || guide.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {guide.readingTime}
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/guides/${guide.slug}`}>
                    Commencer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </>
  );
}
