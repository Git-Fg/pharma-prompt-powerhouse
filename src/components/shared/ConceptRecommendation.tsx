'use client';
import Link from 'next/link';
import { content } from '@/lib/content-loader';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConceptRecommendationProps {
  conceptSlug: string;
  reason: string;
}

export function ConceptRecommendation({ conceptSlug, reason }: ConceptRecommendationProps) {
  const concept = content.concepts.find(c => c.slug === conceptSlug);

  if (!concept) return <Badge variant="destructive">Concept introuvable: {conceptSlug}</Badge>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {concept.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-semibold">{concept.title}</h4>
            <p className="text-sm text-muted-foreground">{concept.description}</p>
          </div>
          
          {concept.tags && concept.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {concept.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="bg-background">
                  {tag}
                </Badge>
              ))}
              {concept.tags.length > 3 && (
                <Badge variant="outline" className="bg-background text-xs">
                  +{concept.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Concise TLDR display */}
          {concept.keyTakeaways && concept.keyTakeaways.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">TLDR :</p>
              <p className="text-xs text-muted-foreground">
                {concept.keyTakeaways[0]} {concept.keyTakeaways.length > 1 && `+ ${concept.keyTakeaways.length - 1} points clés`}
              </p>
            </div>
          )}

          <div className="flex items-center pt-2 border-t">
            <Info className="mr-2 h-4 w-4 shrink-0 opacity-70" />
            <span className="text-xs text-muted-foreground italic">{reason}</span>
          </div>
          
          <Button asChild size="sm" className="w-full">
            <Link href={`/concepts/${concept.slug}`} className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Explorer le concept
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}