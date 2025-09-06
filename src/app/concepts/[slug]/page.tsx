import type { Metadata } from 'next'
import { Target } from 'lucide-react'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { KeyTakeaways } from '@/components/shared/KeyTakeaways'
import { SmartRecommendationsSection } from '@/components/shared/SmartRecommendationsSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content, getConceptBySlug } from '@/lib/content-loader'
import { generateContentMetadata, generateNotFoundMetadata } from '@/lib/seo-optimization'
import { normalizeSlug } from '@/lib/utils'

// Génération des pages statiques au build
export async function generateStaticParams() {
  return content.concepts.map(concept => ({
    slug: normalizeSlug(concept.slug),
  }))
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const concept = getConceptBySlug(params.slug)

  if (!concept) {
    return generateNotFoundMetadata('concept')
  }

  return generateContentMetadata(concept)
}

export default async function ConceptDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const concept = getConceptBySlug(params.slug)

  if (!concept) {
    notFound()
  }

  return (
    <ContentPageLayout
      item={concept}
      prose={false}
    >
      {/* NOUVELLE SECTION : Points clés à retenir */}
      {concept.keyTakeaways && <KeyTakeaways points={concept.keyTakeaways} />}

      {/* Contenu principal du concept */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="size-5" />
            À propos de ce concept
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert">
            <ContentRenderer content={concept.content} />
          </div>
        </CardContent>
      </Card>

      {/* Recommandations intelligentes */}
      <SmartRecommendationsSection item={concept} />
    </ContentPageLayout>
  )
}
