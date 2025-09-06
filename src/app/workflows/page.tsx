import type { StatCardProps } from '@/components/layout/CollectionPageLayout'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { FilterableContentGrid } from '@/components/shared/FilterableContentGrid'
import { SimpleWorkflowCard } from '@/components/shared/SimpleWorkflowCard'
import Button from '@/components/ui/button'
import { content } from '@/lib/content-loader'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

// Wrapper component to avoid passing functions as props
function WorkflowCardWrapper({ item }: { item: any }) {
  return <SimpleWorkflowCard workflow={item} />
}

export default function WorkflowsPage() {
  // Calculate statistics
  const totalWorkflows = content.workflows.length
  const beginnerCount = content.workflows.filter(w => w.difficulty === 'débutant').length
  const tagCount = new Set(content.workflows.flatMap(w => w.tags)).size
  const avgTime = Math.round(
    content.workflows.reduce((acc, w) => {
      const timeMatch = w.estimatedTime?.match(/\d+/)
      return acc + (timeMatch ? Number.parseInt(timeMatch[0]) : 15)
    }, 0) / content.workflows.length,
  )

  const stats: StatCardProps[] = [
    { value: totalWorkflows, label: 'Workflows disponibles', type: 'workflows' },
    { value: beginnerCount, label: 'Pour débuter', type: 'guides' },
    { value: tagCount, label: 'Cas d\'usage', type: 'concepts' },
    { value: `${avgTime}min`, label: 'Temps moyen', type: 'tools' },
  ]

  return (
    <CollectionPageLayout
      title="Workflows Stratégiques"
      description="Mes méthodes éprouvées pour utiliser l'IA efficacement dans vos études. Chaque workflow est une étude de cas personnelle avec ma stratégie pas-à-pas."
      stats={stats}
      contentMaxWidth="6xl"
    >
      <FilterableContentGrid
        items={content.workflows}
        renderComponent={WorkflowCardWrapper}
        searchPlaceholder="Rechercher un workflow..."
        showCategoryFilter={false}
        showDifficultyFilter={true}
        gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      />

      {/* Bottom CTA */}
      <div className="mt-16 text-center bg-muted p-6 md:p-8 rounded-lg">
        <h3 className="responsive-subheading mb-4">Nouveau dans l'IA ?</h3>
        <p className="prose-description mb-6">
          Je recommande de commencer par comprendre les concepts essentiels avant de vous lancer
          dans un workflow. Cela vous évitera les erreurs courantes que j'ai faites à mes débuts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/par-ou-commencer">
            <Button>
              Par où commencer ?
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
          <Link href="/concepts">
            <Button variant="outline">
              Les concepts essentiels
            </Button>
          </Link>
        </div>
      </div>
    </CollectionPageLayout>
  )
}
