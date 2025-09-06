'use client'
import { BookOpen, Clock, Info } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { categoryLabels, difficultyLabels } from '@/lib/constants'
import { content } from '@/lib/content-loader'

interface GuideRecommendationProps {
  guideSlug: string
  reason: string
}

function GuideRecommendationContent({ guide, reason, includeTitle = true }: {
  // eslint-disable-next-line ts/no-explicit-any -- Composant générique pour différents types de contenu, accès aux propriétés communes
  guide: any
  reason: string
  includeTitle?: boolean
}) {
  return (
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
          <Badge variant="outline" className="bg-background text-xs">
            <Clock className="mr-1 size-3" />
            {guide.estimatedTime}
          </Badge>
        )}
      </div>

      <div className="flex items-center pt-2 border-t">
        <Info className="mr-2 size-4 shrink-0 opacity-70" />
        <span className="text-xs text-muted-foreground italic">{reason}</span>
      </div>

      <Button variant="outline" size="sm" asChild>
        <Link href={`/guides/${guide.slug}`}>
          Consulter le guide
        </Link>
      </Button>
    </div>
  )
}

export function GuideRecommendation({ guideSlug, reason }: GuideRecommendationProps) {
  const isMobile = useIsMobile()
  const guide = content.guides.find(g => g.slug === guideSlug)

  if (!guide) {
    return (
      <Badge variant="destructive">
        Guide introuvable:
        {guideSlug}
      </Badge>
    )
  }

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
              <GuideRecommendationContent guide={guide} reason={reason} includeTitle={false} />
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
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {guide.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <GuideRecommendationContent guide={guide} reason={reason} includeTitle={true} />
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
  )
}
