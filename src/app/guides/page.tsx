import type { StatCardProps } from '@/components/layout/CollectionPageLayout'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { FilterableContentGrid } from '@/components/shared/FilterableContentGrid'
import { GuideCard } from '@/components/shared/GuideCard'
import { content } from '@/lib/content-loader'

export default function GuidesPage() {
  const guides = content.guides

  // Calculate statistics
  const totalGuides = guides.length
  const categoriesCount = new Set(guides.map(g => g.category)).size
  const beginnerGuides = guides.filter(g => g.difficulty === 'débutant').length
  const averageReadingTime = Math.round(
    guides.reduce((acc, guide) => {
      const timeMatch = guide.estimatedTime?.match(/\d+/)
      return acc + (timeMatch ? Number.parseInt(timeMatch[0]) : 0)
    }, 0) / guides.length,
  )

  const stats: StatCardProps[] = [
    { value: totalGuides, label: 'Guides disponibles', type: 'guides' },
    { value: categoriesCount, label: 'Catégories', type: 'concepts' },
    { value: beginnerGuides, label: 'Pour débuter', type: 'workflows' },
    { value: `${averageReadingTime}min`, label: 'Temps moyen', type: 'tools' },
  ]

  return (
    <CollectionPageLayout
      title="Mes Fiches & Méthodes"
      description="Voici les fiches de synthèse que j'ai créées au fil de mes révisions. Elles représentent ma méthodologie de structuration de l'information."
      stats={stats}
    >
      <FilterableContentGrid
        items={guides}
        renderItem={guide => <GuideCard guide={guide} />}
        searchPlaceholder="Rechercher un guide..."
        showCategoryFilter={true}
        showDifficultyFilter={true}
      />
    </CollectionPageLayout>
  )
}
