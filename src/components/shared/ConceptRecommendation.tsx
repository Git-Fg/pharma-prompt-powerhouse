'use client';
import Link from 'next/link';
import { content } from '@/lib/content-loader';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';

interface ConceptRecommendationProps {
  conceptSlug: string;
  reason: string;
}

export function ConceptRecommendation({ conceptSlug, reason }: ConceptRecommendationProps) {
  const isMobile = useIsMobile();
  const concept = content.concepts.find(c => c.slug === conceptSlug);

  if (!concept) return <Badge variant="destructive">Concept introuvable: {conceptSlug}</Badge>;

  const RecommendationContent = () => (
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

      {concept.keyTakeaways && concept.keyTakeaways.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-1">TLDR :</p>
          <p className="text-xs text-muted-foreground">
            {concept.keyTakeaways[0]} {concept.keyTakeaways.length > 1 && `+ ${concept.keyTakeaways.length - 1} points clés`}
          </p>
        </div>
      )}

      <div className="flex items-center pt-2 border-t">
        <Info className="mr-2 size-4 shrink-0 opacity-70" />
        <span className="text-xs text-muted-foreground italic">{reason}</span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer">
            {concept.title}
          </span>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-lg">
          <div className="flex flex-col h-full">
            <SheetHeader className="text-left pb-4">
              <SheetTitle className="text-lg">{concept.title}</SheetTitle>
              <SheetDescription className="text-sm">{concept.description}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <RecommendationContent />
            </div>
            <div className="pt-4 border-t bg-background/95 backdrop-blur">
              <Button asChild size="default" className="w-full">
                <Link href={`/concepts/${concept.slug}`} target="_blank" className="flex items-center gap-2">
                  <Lightbulb className="size-4" />
                  Explorer le concept
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {concept.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <RecommendationContent />
        <div className="mt-4 pt-4 border-t">
          <Button asChild size="sm" className="w-full">
            <Link href={`/concepts/${concept.slug}`} target="_blank" className="flex items-center gap-2">
              <Lightbulb className="size-4" />
              Explorer le concept
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}