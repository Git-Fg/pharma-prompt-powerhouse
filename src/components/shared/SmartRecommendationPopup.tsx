'use client'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { getContentItem } from '@/lib/content-loader'
import { RecommendationContent } from './RecommendationContent'

interface SmartRecommendationPopupProps {
  type: 'concept' | 'guide' | 'tool' | 'workflow'
  slug: string
  children: React.ReactNode
}

export function SmartRecommendationPopup({ type, slug, children }: SmartRecommendationPopupProps) {
  const isMobile = useIsMobile()
  const item = getContentItem(type, slug)

  // Si le contenu n'est pas trouvé, on affiche simplement le texte sans interactivité
  // pour éviter les erreurs.
  if (!item) {
    return (
      <span className="font-semibold text-destructive">
        {children}
        {' '}
        (lien brisé)
      </span>
    )
  }

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer">
            {children}
          </span>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-lg p-0">
          <RecommendationContent item={item} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <RecommendationContent item={item} />
      </HoverCardContent>
    </HoverCard>
  )
}
