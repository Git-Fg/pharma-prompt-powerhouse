import { ToolCard } from '@/components/shared/ToolCard'
import { content } from '@/lib/content-loader'

interface ToolRecommendationProps {
  tags: string[]
  currentSlug: string
}

export function ToolRecommendation({ tags, currentSlug }: ToolRecommendationProps) {
  const recommendedTools = content.externalTools.filter(t =>
    t.slug !== currentSlug && t.tags.some((tag: string) => tags.includes(tag)),
  ).slice(0, 2)

  if (recommendedTools.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Outils Recommandés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedTools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}
