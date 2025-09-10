import type { ExternalTool } from '@/types'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content, getExternalToolBySlug } from '@/lib/content-loader'

interface ToolRecommendationProps {
  tags: string[]
  currentSlug: string
}

interface QuickLinkProps {
  tool: ExternalTool
  reason: string
}

function QuickLink({ tool, reason }: QuickLinkProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-base leading-tight">{tool.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
          </div>
          {tool.isFavorite && (
            <Badge variant="default" className="text-xs">
              Favori
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <p className="text-xs font-medium text-blue-800 mb-1">Pourquoi cet outil ?</p>
          <p className="text-xs text-blue-700">{reason}</p>
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/outils/${tool.slug}`}>
              <ExternalLink className="size-3 mr-1" />
              Voir l'outil
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={tool.url} target="_blank" rel="noopener noreferrer">
              Essayer
              <ArrowRight className="size-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ToolRecommendation({ tags, currentSlug }: ToolRecommendationProps) {
  const currentTool = getExternalToolBySlug(currentSlug)

  // Find tools with similar tags or category
  const recommendedTools = content.externalTools
    .filter((t) => {
      if (t.slug === currentSlug)
        return false

      // High priority: same category
      if (currentTool && t.category === currentTool.category)
        return true

      // Medium priority: shared tags
      const sharedTags = t.tags.filter((tag: string) => tags.includes(tag))
      return sharedTags.length >= 2
    })
    .slice(0, 3)

  if (recommendedTools.length === 0) {
    return null
  }

  // Generate reasons for recommendations
  const toolsWithReasons = recommendedTools.map((tool) => {
    let reason = ''

    if (currentTool && tool.category === currentTool.category) {
      reason = `Même catégorie que ${currentTool.title}`
    }
    else {
      const sharedTags = tool.tags.filter((tag: string) => tags.includes(tag))
      if (sharedTags.length > 0) {
        reason = `Partage les tags: ${sharedTags.slice(0, 2).join(', ')}`
      }
    }

    return { tool, reason }
  })

  return (
    <section className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Outils Similaires</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/outils">
            Voir tous les outils
            <ArrowRight className="size-3 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {toolsWithReasons.map(({ tool, reason }) => (
          <QuickLink key={tool.slug} tool={tool} reason={reason} />
        ))}
      </div>

      {/* Alternative tools section */}
      {currentTool && (
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Alternatives par usage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendedTools.slice(0, 2).map(tool => (
              <Link
                key={tool.slug}
                href={`/outils/${tool.slug}`}
                className="flex items-center justify-between p-3 bg-background rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{tool.title}</p>
                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                  </div>
                </div>
                <ArrowRight className="size-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
