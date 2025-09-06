import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { ConceptListSection } from '@/components/shared/ConceptListSection'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { KeyTakeaways } from '@/components/shared/KeyTakeaways'
import { SmartRecommendationsSection } from '@/components/shared/SmartRecommendationsSection'
import { Separator } from '@/components/ui/separator'
import { content, getGuideBySlug } from '@/lib/content-loader'
import { generateContentMetadata, generateNotFoundMetadata } from '@/lib/seo-optimization'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

// Génération des paramètres statiques pour le build
export async function generateStaticParams() {
  return content.guides.map(guide => ({
    slug: guide.slug,
  }))
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    return generateNotFoundMetadata('guide')
  }

  return generateContentMetadata(guide)
}

export default async function GuideDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  return (
    <ContentPageLayout item={guide}>
      {/* Concepts fondamentaux abordés */}
      {guide.concepts && guide.concepts.length > 0 && (
        <>
          <ConceptListSection concepts={guide.concepts} />
          <Separator className="my-8" />
        </>
      )}

      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <>
          <KeyTakeaways points={guide.keyTakeaways} animated={false} />
          <Separator className="my-8" />
        </>
      )}

      <ContentRenderer content={guide.content} />

      <Separator className="my-12" />

      {/* Recommandations intelligentes */}
      <SmartRecommendationsSection item={guide} />
    </ContentPageLayout>
  )
}
