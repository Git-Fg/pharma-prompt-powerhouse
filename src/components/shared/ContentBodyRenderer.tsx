'use client'

import type { EnrichedGuide, EnrichedWorkflow } from '@/lib/content-schema'
import type { AnyEnrichedContent } from '@/types'
import { ArrowLeft, ArrowRight, Target } from 'lucide-react'
import Link from 'next/link'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { ConceptListSection } from '@/components/shared/ConceptListSection'
import { ContentRenderer as ContentBlockRenderer } from '@/components/shared/ContentBlockRenderer'
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner'
import { KeyTakeaways } from '@/components/shared/KeyTakeaways'
import { SmartRecommendationsSection } from '@/components/shared/SmartRecommendationsSection'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StarRating } from '@/components/ui/star-rating'

interface ContentBodyRendererProps {
  item: AnyEnrichedContent
  contentType: 'concept' | 'guide' | 'workflow' | 'tool'
}

export function ContentBodyRenderer({ item, contentType }: ContentBodyRendererProps) {
  // Guard pour s'assurer que le type est valide
  if (!['concept', 'guide', 'workflow', 'tool'].includes(contentType)) {
    console.error(`Invalid content type: ${contentType}`)
    return null
  }

  switch (contentType) {
    case 'concept':
      return <ConceptBody item={item} />
    case 'guide':
      return <GuideBody item={item} />
    case 'workflow':
      return <WorkflowBody item={item} />
    case 'tool':
      return <ToolBody item={item} />
    default:
      // TypeScript devrait nous empêcher d'arriver ici grâce au guard ci-dessus
      return null
  }
}

// Composant spécifique pour les Concepts
function ConceptBody({ item }: { item: AnyEnrichedContent }) {
  // Guard pour s'assurer que c'est bien un concept enrichi
  if (!('keyTakeaways' in item) || !('category' in item) || !('relatedItems' in item)) {
    return null
  }

  return (
    <>
      {/* Points clés à retenir */}
      {item.keyTakeaways && <KeyTakeaways points={item.keyTakeaways} />}

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
            <ContentBlockRenderer content={item.content} currentItem={item} enableAutoGlossary={false} />
          </div>
        </CardContent>
      </Card>

      {/* Recommandations intelligentes */}
      <SmartRecommendationsSection item={item} />
    </>
  )
}

// Composant spécifique pour les Guides
function GuideBody({ item }: { item: AnyEnrichedContent }) {
  // Guard pour s'assurer que c'est bien un guide enrichi
  if (!('estimatedTime' in item) || !('concepts' in item)) {
    return null
  }

  const guide = item as EnrichedGuide

  return (
    <>
      {/* Concepts fondamentaux abordés */}
      {guide.concepts && guide.concepts.length > 0 && (
        <>
          <ConceptListSection concepts={guide.concepts} />
          <Separator className="my-8" />
        </>
      )}

      {/* Points clés à retenir */}
      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <>
          <KeyTakeaways points={guide.keyTakeaways} animated={false} />
          <Separator className="my-8" />
        </>
      )}

      {/* Contenu principal */}
      <ContentBlockRenderer content={guide.content} currentItem={item} enableAutoGlossary={false} />

      <Separator className="my-12" />

      {/* Recommandations intelligentes */}
      <SmartRecommendationsSection item={guide} />
    </>
  )
}

// Composant spécifique pour les Workflows
function WorkflowBody({ item }: { item: AnyEnrichedContent }) {
  // Guard pour s'assurer que c'est bien un workflow enrichi
  // Les workflows ont une propriété 'cover' et 'keyTakeaways' obligatoire
  if (!('keyTakeaways' in item) || !Array.isArray(item.keyTakeaways) || !('concepts' in item)) {
    return null
  }

  const workflow = item as EnrichedWorkflow

  return (
    <>
      {/* Concepts fondamentaux abordés */}
      {workflow.concepts && workflow.concepts.length > 0 && (
        <>
          <ConceptListSection concepts={workflow.concepts} />
          <Separator className="my-8" />
        </>
      )}

      {/* Contenu du workflow */}
      <ContentBlockRenderer content={workflow.content} currentItem={item} enableAutoGlossary={false} />

      {/* Disclaimer Banner */}
      <div className="mt-16">
        <DisclaimerBanner type="workflow" />
      </div>

      {/* Recommandations intelligentes */}
      <div className="mt-16">
        <SmartRecommendationsSection item={workflow} />
      </div>

      {/* Navigation */}
      <div className="mt-16 flex justify-between">
        <Link href="/workflows">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Tous les workflows
          </Button>
        </Link>
        <Link href="/par-ou-commencer">
          <Button>
            Guide débutant
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </>
  )
}

// Composant spécifique pour les Tools
function ToolBody({ item }: { item: AnyEnrichedContent }) {
  // Guard pour s'assurer que c'est bien un tool
  if (!('url' in item)) {
    return null
  }

  return (
    <article className="space-y-8">
      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {item.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
      </div>

      {/* Enhanced Schema Content */}
      {(item.personalReview || item.strongPoints || item.vigilancePoints || item.confidenceScore) && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mon Avis en Bref */}
          {item.personalReview && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mon Avis en Bref</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{item.personalReview}</p>
              </CardContent>
            </Card>
          )}

          {/* Score de Confiance */}
          {item.confidenceScore && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Score de Confiance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-1">
                  <StarRating confidenceScore={item.confidenceScore} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {item.confidenceScore}
                    /5
                  </span>
                </div>
                {item.confidenceJustification && (
                  <p className="text-sm text-muted-foreground">{item.confidenceJustification}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Points Forts */}
          {item.strongPoints && item.strongPoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Points Forts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.strongPoints?.map((point: string, index: number) => (
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
          {item.vigilancePoints && item.vigilancePoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Points de Vigilance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.vigilancePoints?.map((point: string, index: number) => (
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
      {item.freeVsPaidOffer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Offre Gratuite vs Payante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert">
              <MarkdownRenderer content={item.freeVsPaidOffer} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* TLDR */}
      {('tldr' in item) && item.tldr && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
              TL;DR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 dark:text-blue-300">{item.tldr}</p>
          </CardContent>
        </Card>
      )}

      {/* Use Cases */}
      {item.use_cases && item.use_cases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cas d'Usage Principaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {item.use_cases?.map((useCase: string, index: number) => (
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
      {item.content && item.content.length > 0 && (
        <div className="prose dark:prose-invert">
          <ContentBlockRenderer content={item.content} currentItem={item} enableAutoGlossary={false} />
        </div>
      )}

      {/* Disclaimer Banner */}
      <div className="mt-8">
        <DisclaimerBanner type="arsenal" />
      </div>

      {/* Recommandations intelligentes */}
      <div className="mt-8">
        <SmartRecommendationsSection item={item} />
      </div>
    </article>
  )
}
