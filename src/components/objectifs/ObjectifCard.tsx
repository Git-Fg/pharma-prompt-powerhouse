'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, ArrowRight } from 'lucide-react';
import type { Objectif } from '@/lib/content-schema';

interface ObjectifCardProps {
  objectif: Objectif;
}

export const ObjectifCard: React.FC<ObjectifCardProps> = ({ objectif }) => {
  return (
    <Link href={`/objectifs/${objectif.slug}`}>
      <Card className="hover:border-primary transition-colors h-full group cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Target className="w-6 h-6 text-primary" />
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </div>
          <CardTitle className="text-lg">{objectif.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-3">
            {objectif.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {objectif.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};