'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';
import type { ExternalTool } from '@/lib/content-schema';
import { categoryLabels } from '@/lib/constants';

interface ToolCardProps {
  tool: ExternalTool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const categoryLabel = categoryLabels[tool.category] || tool.category;

  return (
    <Card className="h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {tool.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{categoryLabel}</Badge>
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full" size="sm">
                Visiter l'outil
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
            <Link href={`/outils-externes/${tool.slug}`} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};