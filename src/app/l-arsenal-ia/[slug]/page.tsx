import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentPageLayout } from '@/components/layout/ContentPageLayout'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { ContentRenderer } from '@/components/shared/ContentRenderer'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import { SmartRecommendationsSection } from '@/components/shared/SmartRecommendationsSection'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StarRating } from '@/components/ui/star-rating'
import { content, getExternalToolBySlug } from '@/lib/content-loader'
import { generateContentMetadata, generateNotFoundMetadata } from '@/lib/seo-optimization'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

interface ToolPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return content.externalTools.map(tool => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getExternalToolBySlug(params.slug)

  if (!tool) {
    return generateNotFoundMetadata('tool')
  }

  return generateContentMetadata(tool)
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getExternalToolBySlug(params.slug)

  if (!tool) {
    notFound()
  }

  return (
    <ContentPageLayout
      item={tool}
      prose={false}
    >
      <article className="space-y-8">

        <div className="flex flex-wrap justify-center gap-2">
          {tool.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
        </div>

        {/* Enhanced Schema Content */}
        {(tool.personalReview || tool.strongPoints || tool.vigilancePoints || tool.confidenceScore) && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Mon Avis en Bref */}
            {tool.personalReview && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mon Avis en Bref</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">{tool.personalReview}</p>
                </CardContent>
              </Card>
            )}

            {/* Score de Confiance */}
            {tool.confidenceScore && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Score de Confiance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-1">
                    <StarRating confidenceScore={tool.confidenceScore} />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {tool.confidenceScore}
                      /5
                    </span>
                  </div>
                  {tool.confidenceJustification && (
                    <p className="text-sm text-muted-foreground">{tool.confidenceJustification}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Points Forts */}
            {tool.strongPoints && tool.strongPoints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Points Forts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.strongPoints?.map((point: string, index: number) => (
                      // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des listes courtes et non réordonnées
                      <li key={`strong-${point.slice(0, 20).replace(/\s+/g, '-')}-${index}`} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Points de Vigilance */}
            {tool.vigilancePoints && tool.vigilancePoints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-orange-600">Points de Vigilance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.vigilancePoints?.map((point: string, index: number) => (
                      // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des listes courtes et non réordonnées
                      <li key={`vigilance-${point.slice(0, 20).replace(/\s+/g, '-')}-${index}`} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">⚠</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Offre Gratuite vs Payante */}
        {tool.freeVsPaidOffer && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Offre Gratuite vs Payante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert">
                <MarkdownRenderer content={tool.freeVsPaidOffer} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* TLDR */}
        {('tldr' in tool) && tool.tldr && (
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                TL;DR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-blue-300">{tool.tldr}</p>
            </CardContent>
          </Card>
        )}

        {/* Use Cases */}
        {tool.use_cases && tool.use_cases.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cas d'Usage Principaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tool.use_cases?.map((useCase: string, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des badges avec texte unique
                  <Badge key={`usecase-${useCase.replace(/\s+/g, '-').toLowerCase()}-${index}`} variant="secondary">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {tool.content && tool.content.length > 0 && (
          <div className="prose dark:prose-invert">
            <ContentRenderer content={tool.content} />
          </div>
        )}

        {/* Disclaimer Banner */}
        <div className="mt-8">
          <DisclaimerBanner type="arsenal" />
        </div>

        {/* Recommandations intelligentes */}
        <div className="mt-8">
          <SmartRecommendationsSection item={tool} />
        </div>
      </article>
    </ContentPageLayout>
  )
}
