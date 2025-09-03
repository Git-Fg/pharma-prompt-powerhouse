import { content } from '@/lib/content-loader'
import { ContentCard } from '@/components/shared/ContentCard'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'

// Server Component pur
export function ConceptListServer() {
  const concepts = content.concepts
  
  const totalConcepts = concepts.length
  const categoriesCount = new Set(concepts.map(c => c.category)).size
  
  const stats = [
    { value: totalConcepts, label: 'Concepts disponibles', colorClass: 'text-primary', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    { value: categoriesCount, label: 'Catégories', colorClass: 'text-green-600 dark:text-green-400', bgClass: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
  ]
  
  return (
    <CollectionPageLayout
      title="Hub de Concepts"
      description="Chaque concept est un dossier complet reliant la théorie, la pratique et les outils."
      stats={stats}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => (
          <ContentCard
            key={concept.slug}
            title={concept.title}
            description={concept.description}
            category={concept.category}
            variant="concept"
            href={`/concepts/${concept.slug}`}
          />
        ))}
      </div>
    </CollectionPageLayout>
  )
}