'use client'
import { AlertCircle, Info, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { getConceptBySlug } from '@/lib/content-loader'

interface ConceptRecommendationProps {
  conceptSlug: string
  reason: string
}

function RecommendationContent({ concept, reason }: { concept: any, reason: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-semibold">{concept.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{concept.description}</p>
      </div>

      {concept.difficulty && (
        <Badge variant="outline" className="text-xs w-fit">
          {concept.difficulty}
        </Badge>
      )}

      {concept.tags && concept.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {concept.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-background">
              {tag}
            </Badge>
          ))}
          {concept.tags.length > 3 && (
            <Badge variant="outline" className="bg-background text-xs">
              +
              {concept.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {concept.keyTakeaways && concept.keyTakeaways.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs font-medium mb-2 flex items-center gap-1">
            <Lightbulb className="size-3" />
            Points clés
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {concept.keyTakeaways.slice(0, 2).map((takeaway: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground mt-1">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
            {concept.keyTakeaways.length > 2 && (
              <li className="text-xs text-muted-foreground italic">
                +
                {' '}
                {concept.keyTakeaways.length - 2}
                {' '}
                autres points...
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="flex items-center pt-2 border-t">
        <Info className="mr-2 size-4 shrink-0 opacity-70" />
        <span className="text-xs text-muted-foreground italic">{reason}</span>
      </div>

      <Button variant="outline" size="sm" asChild className="w-full">
        <Link href={`/concepts/${concept.slug}`}>
          Explorer le concept
        </Link>
      </Button>
    </div>
  )
}

export function ConceptRecommendation({ conceptSlug, reason }: ConceptRecommendationProps) {
  const isMobile = useIsMobile()
  const concept = getConceptBySlug(conceptSlug)

  if (!concept) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-2 py-1 rounded-md">
        <AlertCircle className="size-3" />
        Concept non trouvé
      </span>
    )
  }

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
              <RecommendationContent concept={concept} reason={reason} />
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
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {concept.title}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <RecommendationContent concept={concept} reason={reason} />
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
  )
}
