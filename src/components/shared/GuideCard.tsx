'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { ArrowRight, Clock, BookOpen, Star, Workflow } from 'lucide-react';
import { getIcon } from '@/types/icon-taxonomy';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';
import { categoryLabels, difficultyLabels } from '@/lib/constants';

interface GuideCardProps {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  estimatedTime?: string;
  isWorkflow?: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  slug,
  title,
  description,
  icon,
  category,
  difficulty,
  estimatedTime,
  isWorkflow,
}) => {
  const IconComponent = getIcon(icon);
  const { toggleFavorite, isFavorite } = useFavorites('favoriteGuides');

  return (
    <Card className="h-full flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="mb-2">
            {categoryLabels[category as keyof typeof categoryLabels] || category}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 -mt-2 -mr-2"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(slug);
            }}
          >
            <Star
              className={cn(
                'w-4 h-4',
                isFavorite(slug) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
              )}
            />
          </Button>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            {isWorkflow && (
              <Badge variant="default" className="text-xs mr-1">
                <Workflow className="w-3 h-3 mr-1" />
                Workflow
              </Badge>
            )}
            <BookOpen className="w-3 h-3 mr-1" />
            {difficultyLabels[difficulty]}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {estimatedTime || '5 min'}
          </div>
        </div>
        <Button asChild className="w-full">
          <Link href={`/guides/${slug}`}>
            {isWorkflow ? "Suivre le workflow" : "Lire le guide"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};