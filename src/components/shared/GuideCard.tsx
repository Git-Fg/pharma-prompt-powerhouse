'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  contentCardVariants, 
  categoryBadgeVariants, 
  difficultyBadgeVariants,
  getCategoryVariant,
  getDifficultyVariant
} from '@/components/ui/variants';
import { ArrowRight, Clock, BookOpen, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EnrichedGuide } from '@/lib/content-schema';
import { 
  getCategoryLabel, 
  getDifficultyLabel, 
  formatEstimatedTime,
  getContentUrl 
} from '@/lib/ui-utils';

interface GuideCardProps {
  guide: EnrichedGuide;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  // Utilisation des utilitaires centralisés
  const categoryLabel = getCategoryLabel(guide.category);
  const difficultyLabel = getDifficultyLabel(guide.difficulty);
  const estimatedTime = formatEstimatedTime(guide.estimatedTime, 'guide');
  const guideUrl = getContentUrl('guide', guide.slug);

  return (
    <Card className={cn(
      contentCardVariants({ variant: "guide", size: "default" }),
      "h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group"
    )}>
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4 min-w-0">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <BookOpen className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {guide.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge className={categoryBadgeVariants({ category: getCategoryVariant(guide.category) })}>
                  {categoryLabel}
                </Badge>
                <Badge className={difficultyBadgeVariants({ difficulty: getDifficultyVariant(guide.difficulty) })}>
                  {difficultyLabel}
                </Badge>
                {guide.isWorkflow && (
                  <Badge variant="default">
                    <Target className="mr-1 h-3 w-3" />
                    Workflow
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {guide.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>Temps de lecture : {estimatedTime}</span>
          </div>
          <Link href={guideUrl} className="block">
            <Button className="w-full" size="sm">
              Lire le guide
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};