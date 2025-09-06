import type { AnyContent } from '@/types'
import { ArrowRight, BookOpen, Lightbulb, Sparkles, Target } from 'lucide-react'
import Link from 'next/link'
import { SectionCard } from '@/components/shared/SectionCard'
import Badge from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

interface SmartRecommendationsSectionProps {
  item: AnyContent
  maxSimilarItems?: number
}

// Interface pour le contenu avec score de pertinence
interface ScoredContent {
  item: AnyContent
  score: number
  type: 'guide' | 'workflow' | 'concept' | 'tool'
  reason: 'similar' | 'related' | 'concept'
}

// Guards de type pour une détection fiable
function isExternalTool(item: AnyContent): item is import('@/lib/content-schema').ExternalTool {
  return 'url' in item && typeof item.url === 'string'
}

function isConcept(item: AnyContent): item is import('@/lib/content-schema').Concept {
  return 'category' in item && 'keyTakeaways' in item && Array.isArray(item.keyTakeaways)
}

function isGuide(item: AnyContent): item is import('@/lib/content-schema').Guide {
  return 'category' in item && 'estimatedTime' in item && !('url' in item)
}

// Calcul du score de similarité combiné (tags + concepts partagés)
function calculateCombinedSimilarityScore(
  currentItem: AnyContent,
  otherItem: AnyContent,
): number {
  let score = 0

  // Similarité basée sur les tags (40% du poids)
  const tagSimilarity = calculateTagSimilarity(currentItem.tags || [], otherItem.tags || [])
  score += tagSimilarity * 0.4

  // Similarité basée sur les concepts partagés (60% du poids)
  const conceptSimilarity = calculateConceptSimilarity(currentItem, otherItem)
  score += conceptSimilarity * 0.6

  return score
}

function calculateTagSimilarity(tags1: string[], tags2: string[]): number {
  if (!tags1.length || !tags2.length)
    return 0

  const intersection = tags1.filter(tag => tags2.includes(tag))
  const union = [...new Set([...tags1, ...tags2])]

  return intersection.length / union.length
}

function calculateConceptSimilarity(item1: AnyContent, item2: AnyContent): number {
  const concepts1 = item1.conceptSlugs || []
  const concepts2 = item2.conceptSlugs || []

  if (!concepts1.length || !concepts2.length)
    return 0

  const intersection = concepts1.filter(concept => concepts2.includes(concept))
  const union = [...new Set([...concepts1, ...concepts2])]

  return intersection.length / union.length
}

// Trouver les contenus similaires basés sur le score combiné
function findSimilarContent(
  currentItem: AnyContent,
  maxItems: number = 3,
): ScoredContent[] {
  const allContent: AnyContent[] = [
    ...content.guides,
    ...content.workflows,
    ...content.concepts,
    ...content.externalTools,
  ]

  const scoredContent = allContent
    .filter(item => item.slug !== currentItem.slug)
    .map(item => ({
      item,
      score: calculateCombinedSimilarityScore(currentItem, item),
      type: getContentype(item) as 'guide' | 'workflow' | 'concept' | 'tool',
      reason: 'similar' as const,
    }))
    .filter(scored => scored.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)

  return scoredContent
}

// Trouver les contenus explicitement liés (pour guides et workflows enrichis)
function findRelatedContent(currentItem: AnyContent): ScoredContent[] {
  const relatedContent: ScoredContent[] = []

  // Pour les guides enrichis
  if ('relatedGuides' in currentItem && currentItem.relatedGuides && Array.isArray(currentItem.relatedGuides)) {
    currentItem.relatedGuides.forEach((guide: any) => {
      relatedContent.push({
        item: guide,
        score: 1.0, // Score maximum pour les relations explicites
        type: 'guide',
        reason: 'related',
      })
    })
  }

  // Pour les workflows enrichis
  if ('relatedWorkflows' in currentItem && currentItem.relatedWorkflows && Array.isArray(currentItem.relatedWorkflows)) {
    currentItem.relatedWorkflows.forEach((workflow: any) => {
      relatedContent.push({
        item: workflow,
        score: 1.0, // Score maximum pour les relations explicites
        type: 'workflow',
        reason: 'related',
      })
    })
  }

  return relatedContent
}

// Trouver les guides et workflows liés à un concept
function findConceptRelatedContent(concept: import('@/lib/content-schema').Concept): ScoredContent[] {
  const relatedContent: ScoredContent[] = []

  // Guides liés à ce concept
  const relatedGuides = content.guides.filter(guide =>
    guide.conceptSlugs?.includes(concept.slug),
  )

  relatedGuides.forEach((guide) => {
    relatedContent.push({
      item: guide,
      score: 0.8, // Score élevé pour les relations conceptuelles
      type: 'guide',
      reason: 'concept',
    })
  })

  // Workflows liés à ce concept
  const relatedWorkflows = content.workflows.filter(workflow =>
    workflow.conceptSlugs?.includes(concept.slug),
  )

  relatedWorkflows.forEach((workflow) => {
    relatedContent.push({
      item: workflow,
      score: 0.8,
      type: 'workflow',
      reason: 'concept',
    })
  })

  return relatedContent
}

function getContentype(item: AnyContent): string {
  if (isExternalTool(item))
    return 'tool'
  if (isConcept(item))
    return 'concept'
  if (isGuide(item))
    return 'guide'
  return 'workflow'
}

function getItemUrl(item: AnyContent, type: string): string {
  switch (type) {
    case 'tool':
      return `/l-arsenal-ia/${item.slug}`
    case 'concept':
      return `/concepts/${item.slug}`
    case 'guide':
      return `/guides/${item.slug}`
    case 'workflow':
      return `/workflows/${item.slug}`
    default:
      return `/${type}/${item.slug}`
  }
}

export function SmartRecommendationsSection({
  item,
  maxSimilarItems = 3,
}: SmartRecommendationsSectionProps) {
  // Récupérer tous les types de recommandations
  const similarContent = findSimilarContent(item, maxSimilarItems)
  const relatedContent = findRelatedContent(item)

  // Pour les concepts, trouver les contenus liés
  const conceptRelatedContent = isConcept(item) ? findConceptRelatedContent(item) : []

  // Combiner et dédupliquer les recommandations
  const allRecommendations = [
    ...similarContent,
    ...relatedContent,
    ...conceptRelatedContent,
  ].filter((rec, index, self) =>
    index === self.findIndex(r => r.item.slug === rec.item.slug),
  )

  // Grouper par type de recommandation
  const similarRecommendations = allRecommendations.filter(r => r.reason === 'similar')
  const relatedRecommendations = allRecommendations.filter(r => r.reason === 'related')
  const conceptRecommendations = allRecommendations.filter(r => r.reason === 'concept')

  // Si aucune recommandation, ne rien afficher
  if (allRecommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Section "Contenu Similaire" - basée sur les tags et concepts partagés */}
      {similarRecommendations.length > 0 && (
        <SectionCard
          title="Contenu similaire"
          description="Découvrez d'autres contenus qui partagent des thématiques communes"
          icon={Sparkles}
        >
          <div className="grid gap-4">
            {similarRecommendations.map(({ item, score, type }) => (
              <RecommendationCard
                key={`similar-${item.slug}`}
                item={item}
                type={type}
                score={score}
                showScore={true}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Section "Pour aller plus loin" - relations explicites */}
      {relatedRecommendations.length > 0 && (
        <SectionCard
          title="Pour aller plus loin"
          description="Continuez votre exploration avec ces contenus recommandés"
          icon={Target}
        >
          <div className="grid gap-4">
            {relatedRecommendations.map(({ item, type }) => (
              <RecommendationCard
                key={`related-${item.slug}`}
                item={item}
                type={type}
                score={1.0}
                showScore={false}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Section "Guides liés" - pour les concepts */}
      {conceptRecommendations.filter(r => r.type === 'guide').length > 0 && (
        <SectionCard
          title="Guides liés à ce concept"
          description="Approfondissez ce concept avec ces guides pratiques"
          icon={BookOpen}
        >
          <div className="grid gap-4">
            {conceptRecommendations
              .filter(r => r.type === 'guide')
              .map(({ item }) => (
                <RecommendationCard
                  key={`concept-guide-${item.slug}`}
                  item={item}
                  type="guide"
                  score={0.8}
                  showScore={false}
                />
              ))}
          </div>
        </SectionCard>
      )}

      {/* Section "Workflows pratiques" - pour les concepts */}
      {conceptRecommendations.filter(r => r.type === 'workflow').length > 0 && (
        <SectionCard
          title="Appliquer : Les Workflows Pratiques"
          description="Mettez en pratique ce concept avec ces workflows interactifs"
          icon={Lightbulb}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {conceptRecommendations
              .filter(r => r.type === 'workflow')
              .map(({ item }) => (
                <RecommendationCard
                  key={`concept-workflow-${item.slug}`}
                  item={item}
                  type="workflow"
                  score={0.8}
                  showScore={false}
                  compact={true}
                />
              ))}
          </div>
        </SectionCard>
      )}
    </div>
  )
}

// Composant interne pour afficher une carte de recommandation
interface RecommendationCardProps {
  item: AnyContent
  type: 'guide' | 'workflow' | 'concept' | 'tool'
  score: number
  showScore: boolean
  compact?: boolean
}

function RecommendationCard({ item, type, score, showScore, compact = false }: RecommendationCardProps) {
  const url = getItemUrl(item, type)

  if (compact) {
    return (
      <Link href={url} className="block">
        <Card className="hover:bg-accent/50 transition-colors">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link
      href={url}
      className="block p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={type === 'guide' ? 'default' : type === 'workflow' ? 'secondary' : 'outline'} className="text-xs">
              {type === 'guide' ? 'Guide' : type === 'workflow' ? 'Workflow' : type === 'concept' ? 'Concept' : 'Outil'}
            </Badge>
            {showScore && (
              <span className="text-xs text-muted-foreground">
                {Math.round(score * 100)}
                % de pertinence
              </span>
            )}
          </div>
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {item.description}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +
                  {item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </Link>
  )
}
