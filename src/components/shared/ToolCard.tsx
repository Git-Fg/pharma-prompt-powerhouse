'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { ArrowRight, CheckCircle, Globe, Tag, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';
import { categoryLabels } from '@/lib/constants';

interface ToolCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  pricing?: string;
  url: string;
  use_cases?: string[];
  color: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  slug,
  title,
  description,
  category,
  pricing,
  url,
  use_cases,
  color,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites('favoriteTools');

  return (
    <Card className="h-full flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`} style={{ backgroundColor: color }}>
              <span className="text-2xl font-bold text-white">{title.charAt(0)}</span>
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">{title}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {categoryLabels[category as keyof typeof categoryLabels] || category}
              </Badge>
            </div>
          </div>
          <div className="flex-col items-end gap-1">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {pricing || 'Non spécifié'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
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
        </div>
        <CardDescription className="text-sm leading-relaxed line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex-col justify-between">
        {use_cases && use_cases.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Idéal pour :
            </h4>
            <ul className="space-y-2 mb-6">
              {use_cases.slice(0,3).map((useCase) => (
                <li key={useCase} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {useCase}
                </li>
              ))}
              {use_cases.length > 3 && (
                <li className="text-sm text-muted-foreground">
                  ... et {use_cases.length - 3} autres
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="flex-col sm:flex-row gap-2 mt-auto">
          <Button asChild className="flex-1" variant="outline">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Globe className="w-4 h-4 mr-2" />
              Visiter le Site Officiel
            </a>
          </Button>
          <Button asChild className="flex-1 group">
            <Link href={`/outils-externes/${slug}`}>
              Voir mon guide
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};