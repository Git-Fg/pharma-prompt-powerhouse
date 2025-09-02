'use client';
import Link from 'next/link';
import { content } from '@/lib/content-loader';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';

export function ToolRecommendation({ toolSlug, reason }: { toolSlug: string; reason: string; }) {
  const isMobile = useIsMobile();
  const tool = content.tools.find(t => t.slug === toolSlug);

  if (!tool) return <Badge variant="destructive">Outil introuvable: {toolSlug}</Badge>;

  const RecommendationContent = () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-semibold">{tool.title}</h4>
        <p className="text-sm text-muted-foreground">{tool.description}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-background">
          {tool.category}
        </Badge>
        {tool.pricing && (
          <Badge variant="secondary">
            {tool.pricing}
          </Badge>
        )}
      </div>

      {tool.tldr && (
          <div>
            <p className="text-xs font-medium mb-1">TLDR :</p>
            <p className="text-xs text-muted-foreground">{tool.tldr}</p>
          </div>
        )}

      <div className="flex items-center pt-2 border-t">
        <Info className="mr-2 h-4 w-4 shrink-0 opacity-70" />
        <span className="text-xs text-muted-foreground italic">{reason}</span>
      </div>
      
      <div className="flex gap-2">
         <Button asChild size="sm" className="flex-1">
            <Link href={`/outils-externes/${tool.slug}`}>Voir le guide</Link>
         </Button>
         <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visiter <ExternalLink className="ml-2 h-4 w-4" />
            </a>
         </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer">
            {tool.title}
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{tool.title}</SheetTitle>
            <SheetDescription>{tool.description}</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <RecommendationContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {tool.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <RecommendationContent />
      </HoverCardContent>
    </HoverCard>
  );
}