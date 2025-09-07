import type { AnyContent } from '@/types'
import { ArrowRight, BookOpen, Lightbulb, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SectionCard } from '@/components/shared/SectionCard'
import Badge from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

interface SmartRecommendationsSectionProps {
  item: AnyContent
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

function getItemUrl(item: AnyContent | { slug: string }, type: string): string {
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
}: SmartRecommendationsSectionProps) {
  // Récupérer les relatedItems calculés automatiquement
  let relatedItems: Array<{
    slug: string
    title: string
    description: string
    type: 'guide' | 'workflow' | 'concept' | 'tool'
    score: number
  }> = []

  // Les guides et workflows enrichis ont des relatedItems
  if ('relatedItems' in item && Array.isArray(item.relatedItems)) {
    relatedItems = item.relatedItems as Array<{
      slug: string
      title: string
      description: string
      type: 'guide' | 'workflow' | 'concept' | 'tool'
      score: number
    }>
  }

  // Pour les concepts, utiliser les relatedItems enrichis
  if (isConcept(item)) {
    const enrichedConcept = content.concepts.find(c => c.slug === item.slug)
    if (enrichedConcept && 'relatedItems' in enrichedConcept && Array.isArray(enrichedConcept.relatedItems)) {
      relatedItems = enrichedConcept.relatedItems
    }
  }

  // Pour les outils, trouver les contenus similaires dynamiquement
  if (isExternalTool(item)) {
    // Pour les outils, on peut calculer la similarité à la volée
    const allContent: AnyContent[] = [
      ...content.guides,
      ...content.workflows,
      ...content.concepts,
    ]

    relatedItems = allContent
      .filter((contentItem) => {
        // Similarité basée sur les tags et concepts
        const tagSimilarity = calculateTagSimilarity(item.tags || [], contentItem.tags || [])
        const conceptSimilarity = calculateConceptSimilarity(item.conceptSlugs || [], contentItem.conceptSlugs || [])
        return (tagSimilarity + conceptSimilarity) > 0.1
      })
      .map(contentItem => ({
        slug: contentItem.slug,
        title: contentItem.title,
        description: contentItem.description,
        type: getContentType(contentItem) as 'guide' | 'workflow' | 'concept',
        score: calculateTagSimilarity(item.tags || [], contentItem.tags || []) * 0.4
          + calculateConceptSimilarity(item.conceptSlugs || [], contentItem.conceptSlugs || []) * 0.6,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  // Grouper par type pour une meilleure présentation
  const guideRecommendations = relatedItems.filter(r => r.type === 'guide')
  const workflowRecommendations = relatedItems.filter(r => r.type === 'workflow')

  // Si aucune recommandation, ne rien afficher
  if (relatedItems.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Section "Contenu Similaire" - regroupe tout avec un score élevé */}
      {relatedItems.length > 0 && (
        <SectionCard
          title="Contenu similaire"
          description="Découvrez d'autres contenus qui partagent des thématiques communes"
          icon={Sparkles}
        >
          <div className="grid gap-4">
            {relatedItems.slice(0, 3).map(relatedItem => (
              <RecommendationCard
                key={`related-${relatedItem.slug}`}
                item={relatedItem}
                type={relatedItem.type}
                score={relatedItem.score}
                showScore={true}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Section "Guides liés" - afficher plus de guides si disponibles */}
      {guideRecommendations.length > 3 && (
        <SectionCard
          title="Guides liés"
          description="Approfondissez avec ces guides pratiques"
          icon={BookOpen}
        >
          <div className="grid gap-4">
            {guideRecommendations.slice(3).map(guide => (
              <RecommendationCard
                key={`guide-${guide.slug}`}
                item={guide}
                type="guide"
                score={guide.score}
                showScore={true}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Section "Workflows pratiques" - afficher plus de workflows si disponibles */}
      {workflowRecommendations.length > 2 && (
        <SectionCard
          title="Workflows pratiques"
          description="Mettez en pratique avec ces workflows interactifs"
          icon={Lightbulb}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {workflowRecommendations.slice(2).map(workflow => (
              <RecommendationCard
                key={`workflow-${workflow.slug}`}
                item={workflow}
                type="workflow"
                score={workflow.score}
                showScore={true}
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
  item: {
    slug: string
    title: string
    description: string
    type: 'guide' | 'workflow' | 'concept' | 'tool'
    score: number
  }
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
          <CardContent>
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
        </div>
        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </Link>
  )
}

// Fonctions utilitaires pour la similarité
function calculateTagSimilarity(tags1: string[], tags2: string[]): number {
  if (!tags1.length || !tags2.length)
    return 0

  const intersection = tags1.filter(tag => tags2.includes(tag))
  const union = [...new Set([...tags1, ...tags2])]

  return intersection.length / union.length
}

function calculateConceptSimilarity(concepts1: string[], concepts2: string[]): number {
  if (!concepts1.length || !concepts2.length)
    return 0

  const intersection = concepts1.filter(concept => concepts2.includes(concept))
  const union = [...new Set([...concepts1, ...concepts2])]

  return intersection.length / union.length
}

function getContentType(item: AnyContent): string {
  if (isExternalTool(item))
    return 'tool'
  if (isConcept(item))
    return 'concept'
  if (isGuide(item))
    return 'guide'
  return 'workflow'
}
