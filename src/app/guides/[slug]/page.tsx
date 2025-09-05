import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { ConceptListSection } from '@/components/shared/ConceptListSection'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { KeyTakeaways } from '@/components/shared/KeyTakeaways'
import { SimilarContentSection } from '@/components/shared/SimilarContentSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content, getGuideBySlug } from '@/lib/content-loader'

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
    return {
      title: 'Guide non trouvé',
    }
  }
  return {
    title: `Guide : ${guide.title} | Pharma Prompt Powerhouse`,
    description: guide.description,
  }
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
          <KeyTakeaways points={guide.keyTakeaways} />
          <Separator className="my-8" />
        </>
      )}

      <ContentRenderer content={guide.content} />

      <Separator className="my-12" />

      {/* Similar content based on tags */}
      {guide.tags && guide.tags.length > 0 && (
        <>
          <SimilarContentSection
            currentSlug={guide.slug}
            currentTags={guide.tags}
            contentType="guide"
          />
          <Separator className="my-8" />
        </>
      )}

      {/* Related Guides - Moved after main content */}
      {guide.relatedGuides && guide.relatedGuides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pour aller plus loin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="size-4" />
                Guides similaires
              </h3>
              {guide.relatedGuides.map(relatedGuide => (
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  key={relatedGuide.slug}
                  className="block p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <p className="font-medium">{relatedGuide.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {relatedGuide.description}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </ContentPageLayout>
  )
}
