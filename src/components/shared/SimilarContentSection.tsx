import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

interface SimilarContentSectionProps {
  currentSlug: string
  currentTags: string[]
  contentType: 'guide' | 'workflow'
  maxItems?: number
}

function calculateSimilarity(tags1: string[], tags2: string[]): number {
  if (!tags1.length || !tags2.length) {
    return 0
  }

  const intersection = tags1.filter(tag => tags2.includes(tag))
  const union = [...new Set([...tags1, ...tags2])]

  return intersection.length / union.length
}

function findSimilarContent(
  currentSlug: string,
  currentTags: string[],
  contentType: 'guide' | 'workflow',
  maxItems: number = 3,
) {
  // Get all content of both types
  const allContent = [
    ...content.guides.map(g => ({ ...g, type: 'guide' as const })),
    ...content.workflows.map(w => ({ ...w, type: 'workflow' as const })),
  ]

  // Filter out current item and calculate similarity scores
  const similarContent = allContent
    .filter(item => item.slug !== currentSlug)
    .map(item => ({
      ...item,
      similarity: calculateSimilarity(currentTags, item.tags),
    }))
    .filter(item => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxItems)

  return similarContent
}

export function SimilarContentSection({
  currentSlug,
  currentTags,
  contentType,
  maxItems = 3,
}: SimilarContentSectionProps) {
  const similarContent = findSimilarContent(currentSlug, currentTags, contentType, maxItems)

  if (similarContent.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5" />
          Contenu similaire
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Découvrez d'autres contenus qui partagent des thématiques communes
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {similarContent.map(item => (
            <Link
              key={item.slug}
              href={`/${item.type === 'guide' ? 'guides' : 'workflows'}/${item.slug}`}
              className="block p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={item.type === 'guide' ? 'default' : 'secondary'} className="text-xs">
                      {item.type === 'guide' ? 'Guide' : 'Workflow'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(item.similarity * 100)}
                      % de similarité
                    </span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  {item.tags.length > 0 && (
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
