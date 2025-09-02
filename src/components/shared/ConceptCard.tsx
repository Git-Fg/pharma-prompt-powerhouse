'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { BookOpen, Lightbulb, Star } from 'lucide-react';
import { getIcon } from '@/types/icon-taxonomy';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';

interface ConceptCardProps {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  guideCount: number;
  promptCount: number;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  slug,
  title,
  description,
  icon,
  guideCount,
  promptCount,
}) => {
  const IconComponent = getIcon(icon);
  const { toggleFavorite, isFavorite } = useFavorites('favoriteConcepts');

  return (
    <Card className="h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(slug);
            }}
          >
            <Star className={cn(
              'h-5 w-5',
              isFavorite(slug) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
            )} />
          </Button>
        </div>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {guideCount} Guides
            </Badge>
          </span>
          <span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lightbulb className="w-3 h-3" />
              {promptCount} Prompts
            </Badge>
          </span>
        </div>
        <Button asChild className="w-full">
          <Link href={`/concepts/${slug}`}>
            Explorer le concept
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};