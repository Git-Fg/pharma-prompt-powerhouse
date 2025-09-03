'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Target } from 'lucide-react';
import type { Prompt } from '@/lib/content-schema';
import { categoryLabels, difficultyLabels } from '@/lib/constants';

export interface PromptCardProps {
  prompt: Prompt;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  
  const categoryLabel = categoryLabels[prompt.category] || prompt.category;
  const difficultyLabel = difficultyLabels[prompt.difficulty] || prompt.difficulty;

  const handleCopy = async () => {
    if (prompt.promptContent) {
      await navigator.clipboard.writeText(prompt.promptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {prompt.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{categoryLabel}</Badge>
                <Badge variant="outline">{difficultyLabel}</Badge>
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {prompt.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {prompt.promptContent && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex-1"
              >
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? 'Copié!' : 'Copier'}
              </Button>
            )}
            <Link href={`/prompts/${prompt.slug}`} className="flex-1">
              <Button className="w-full" size="sm">
                Voir le prompt
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};