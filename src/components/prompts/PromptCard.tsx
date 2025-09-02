'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from '@/components/ui';
import { Clock, User, Star, Target, Tag, Copy, Check } from 'lucide-react';
import { getIcon } from '@/types/icon-taxonomy';

// Type co-localisé avec le composant
export interface PromptCardProps {
  slug: string;
  title: string;
  description: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  estimatedTime: string;
  author?: string;
  isFavorite?: boolean;
  tags?: string[];
  category?: string;
  targetTool?: string;
  icon?: string;
  promptContent?: string; // For copying the actual prompt content
  onFavorite?: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  slug,
  title,
  description,
  difficulty,
  estimatedTime,
  author,
  isFavorite,
  tags,
  category: _category,
  targetTool,
  icon,
  promptContent,
  onFavorite: _onFavorite,
}) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = getIcon(icon);

  const difficultyLabels = {
    débutant: 'Débutant',
    intermédiaire: 'Intermédiaire',
    avancé: 'Avancé',
  };

  const copyToClipboard = async () => {
    try {
      // Copy the actual prompt content if available, otherwise use description
      const textToCopy = promptContent || description;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card 
      className='h-full flex flex-col hover:shadow-lg transition-shadow'
      data-testid="prompt-card"
    >
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className='text-lg line-clamp-2'>{title}</CardTitle>
          </div>
          {isFavorite && (
            <Star className='h-5 w-5 text-yellow-500 fill-current' />
          )}
        </div>
        <CardDescription className='line-clamp-3'>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col'>
        <div className='flex flex-wrap gap-2 mb-4'>
          <Badge
            variant={
              difficulty === 'débutant'
                ? 'default'
                : difficulty === 'intermédiaire'
                  ? 'secondary'
                  : 'destructive'
            }
          >
            {difficultyLabels[difficulty]}
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Clock className='h-3 w-3' />
            {estimatedTime}
          </Badge>
          {author && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <User className='h-3 w-3' />
              {author}
            </Badge>
          )}
          {targetTool && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Target className='h-3 w-3' />
              {targetTool}
            </Badge>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mb-4'>
            {tags.map((tag, index) => (
              <Badge key={index} variant='secondary' className='text-xs'>
                <Tag className='h-3 w-3 mr-1' />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className='mt-auto space-y-2'>
          <div className='flex gap-2'>
            <Button 
              asChild
              className='flex-1'
              data-testid="view-prompt-details-button"
            >
              <Link href={`/prompts/${slug}`}>
                Voir les détails
              </Link>
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={copyToClipboard}
              className='px-3'
              aria-label='Copier le prompt'
              data-testid="copy-prompt-button"
            >
              {copied ? (
                <Check className='h-4 w-4 text-green-600' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </Button>
          </div>
          <Button 
            asChild
            variant='outline'
            size='sm'
            className='w-full'
            data-testid="use-prompt-button"
          >
            <Link href={`/boite-a-outils/prompt-editor?template=${slug}`}>
              Utiliser directement
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
