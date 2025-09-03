'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { contentCardVariants, statusBadgeVariants } from '@/components/ui/variants';
import { BookOpen, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Concept } from '@/lib/content-schema';

interface ConceptCardProps {
  concept: Concept;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  return (
    <Card className={cn(
      contentCardVariants({ variant: "concept", size: "default" }),
      "h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group"
    )}>
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
              {concept.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {concept.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>Difficulté: {concept.difficulty}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className={statusBadgeVariants({ status: "available" })}>
              {concept.category}
            </Badge>
            {concept.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/concepts/${concept.slug}`} className="block">
            <Button className="w-full" size="sm">
              Découvrir le concept
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};