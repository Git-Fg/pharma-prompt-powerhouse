import type { StatCardProps } from '@/components/layout/CollectionPageLayout'
import * as LucideIcons from 'lucide-react'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { FilterableContentGrid } from '@/components/shared/FilterableContentGrid'
import { Separator } from '@/components/ui/separator'
import { content } from '@/lib/content-loader'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

export default function ConceptsPage() {
  const totalConcepts = content.concepts.length
  const categoriesCount = new Set(content.concepts.map(c => c.category)).size

  const stats: StatCardProps[] = [
    { value: totalConcepts, label: 'Concepts disponibles', type: 'concepts' },
    { value: categoriesCount, label: 'Catégories', type: 'guides' },
    { value: '100%', label: 'Contenus liés', type: 'primary' },
    { value: '∞', label: 'Possibilités', type: 'tools' },
  ]

  return (
    <CollectionPageLayout
      title="Hub de Concepts"
      description="Chaque concept est un dossier complet reliant la théorie, la pratique et les outils. Choisissez un concept pour commencer."
      stats={stats}
    >
      <FilterableContentGrid
        items={content.concepts}
        renderType="concept"
        searchPlaceholder="Rechercher un concept..."
        showCategoryFilter={true}
        showDifficultyFilter={false}
      />

      <Separator className="my-12" />

      {/* Section d'aide */}
      <div className="mt-16 text-center">
        <Separator className="mb-8" />
        <h2 className="text-2xl font-semibold mb-4">
          Comment utiliser le Hub de Concepts ?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 container mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.BookOpen className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Choisissez un concept</h3>
            <p className="text-sm text-muted-foreground">
              Explorez les concepts qui correspondent à vos besoins
              d'apprentissage
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.Lightbulb className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Découvrez les ressources</h3>
            <p className="text-sm text-muted-foreground">
              Accédez aux guides, workflows et outils liés à ce concept
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LucideIcons.Wrench className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Mettez en pratique</h3>
            <p className="text-sm text-muted-foreground">
              Utilisez l'éditeur de prompts pour tester et adapter les
              workflows pratiques
            </p>
          </div>
        </div>
      </div>
    </CollectionPageLayout>
  )
}
