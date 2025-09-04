'use client';
import Link from 'next/link';
import { content } from '@/lib/content-loader';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { BookOpen, Info, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { categoryLabels, difficultyLabels } from '@/lib/constants';

interface GuideRecommendationProps {
  guideSlug: string;
  reason: string;
}

export function GuideRecommendation({ guideSlug, reason }: GuideRecommendationProps) {
  const isMobile = useIsMobile();
  const guide = content.guides.find(g => g.slug === guideSlug);

  if (!guide) return <Badge variant="destructive">Guide introuvable: {guideSlug}</Badge>;

  const RecommendationContent = ({ includeTitle = true }: { includeTitle?: boolean }) => (
    <div className="flex flex-col gap-4">
      {includeTitle && (
        <div>
          <h4 className="text-sm font-semibold">{guide.title}</h4>
          <p className="text-sm text-muted-foreground">{guide.description}</p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-background">
          {categoryLabels[guide.category as keyof typeof categoryLabels] || guide.category}
        </Badge>
        {guide.difficulty && (
          <Badge variant="secondary">
            {difficultyLabels[guide.difficulty as keyof typeof difficultyLabels]}
          </Badge>
        )}
        {guide.estimatedTime && (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {guide.estimatedTime}
          </Badge>
        )}
      </div>

      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-1">TLDR :</p>
          <p className="text-xs text-muted-foreground">
            {guide.keyTakeaways[0]} {guide.keyTakeaways.length > 1 && `+ ${guide.keyTakeaways.length - 1} points`}
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
            {guide.title}
          </span>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-lg">
          <div className="flex flex-col h-full">
            <SheetHeader className="text-left pb-4">
              <SheetTitle className="text-lg">{guide.title}</SheetTitle>
              <SheetDescription className="text-sm">{guide.description}</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <RecommendationContent includeTitle={false} />
            </div>
            <div className="pt-4 border-t bg-background/95 backdrop-blur p-4">
              <Button asChild size="default" className="w-full">
                <Link href={`/guides/${guide.slug}`} target="_blank" className="flex items-center gap-2">
                  <BookOpen className="size-4" />
                  Lire le guide
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
          {guide.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <RecommendationContent includeTitle={true} />
        <div className="mt-4 pt-4 border-t">
          <Button asChild size="sm" className="w-full">
            <Link href={`/guides/${guide.slug}`} target="_blank" className="flex items-center gap-2">
              <BookOpen className="size-4" />
              Lire le guide
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}