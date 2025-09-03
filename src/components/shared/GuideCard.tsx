'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BookOpen, Target } from 'lucide-react';
import type { EnrichedGuide } from '@/lib/content-schema';
import { categoryLabels, difficultyLabels } from '@/lib/constants';

interface GuideCardProps {
  guide: EnrichedGuide;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  const categoryLabel = categoryLabels[guide.category] || guide.category;
  const difficultyLabel = difficultyLabels[guide.difficulty] || guide.difficulty;

  return (
    <Card className="h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {guide.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{categoryLabel}</Badge>
                <Badge variant="outline">{difficultyLabel}</Badge>
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
          {guide.estimatedTime && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Temps de lecture : {guide.estimatedTime}</span>
            </div>
          )}
          <Link href={`/guides/${guide.slug}`} className="block">
            <Button className="w-full" size="sm">
              Lire le guide
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};