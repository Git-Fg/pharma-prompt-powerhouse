import type { StatCardProps } from '@/components/layout/PageHeader'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { FilterableContentList } from '@/components/shared/FilterableContentList'
import { ResponsiveComparisonTable } from '@/components/shared/ResponsiveComparisonTable'
import Button from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { content } from '@/lib/content-loader'

export type CollectionType = 'concepts' | 'guides' | 'workflows' | 'tools'

export interface CollectionPageProps {
  type: CollectionType
  title: string
  description: string
  displayMode?: 'grid' | 'table'
  children?: React.ReactNode
}

export function getCollectionStats(type: CollectionType): StatCardProps[] {
  switch (type) {
    case 'concepts': {
      const totalConcepts = content.concepts.length
      const categoriesCount = new Set(content.concepts.map(c => c.category)).size

      return [
        { value: totalConcepts, label: 'Concepts disponibles', type: 'concepts' },
        { value: categoriesCount, label: 'Catégories', type: 'guides' },
        { value: '100%', label: 'Contenus liés', type: 'primary' },
        { value: '∞', label: 'Possibilités', type: 'tools' },
      ]
    }

    case 'guides': {
      const guides = content.guides
      const totalGuides = guides.length
      const guideCategoriesCount = new Set(guides.map(g => g.category)).size
      const beginnerGuides = guides.filter(g => g.difficulty === 'débutant').length
      const averageReadingTime = Math.round(
        guides.reduce((acc, guide) => {
          const timeMatch = guide.estimatedTime?.match(/\d+/)
          return acc + (timeMatch ? Number.parseInt(timeMatch[0]) : 0)
        }, 0) / guides.length,
      )

      return [
        { value: totalGuides, label: 'Guides disponibles', type: 'guides' },
        { value: guideCategoriesCount, label: 'Catégories', type: 'concepts' },
        { value: beginnerGuides, label: 'Pour débuter', type: 'workflows' },
        { value: `${averageReadingTime}min`, label: 'Temps moyen', type: 'tools' },
      ]
    }

    case 'workflows': {
      const workflows = content.workflows
      const totalWorkflows = workflows.length
      const beginnerCount = workflows.filter(w => w.difficulty === 'débutant').length
      const tagCount = new Set(workflows.flatMap(w => w.tags)).size
      const avgTime = Math.round(
        workflows.reduce((acc, w) => {
          const timeMatch = w.estimatedTime?.match(/\d+/)
          return acc + (timeMatch ? Number.parseInt(timeMatch[0]) : 15)
        }, 0) / workflows.length,
      )

      return [
        { value: totalWorkflows, label: 'Workflows disponibles', type: 'workflows' },
        { value: beginnerCount, label: 'Pour débuter', type: 'guides' },
        { value: tagCount, label: 'Cas d\'usage', type: 'concepts' },
        { value: `${avgTime}min`, label: 'Temps moyen', type: 'tools' },
      ]
    }

    case 'tools': {
      const tools = content.externalTools
      const totalTools = tools.length
      const favoriteCount = tools.filter(t => t.isFavorite).length
      const reviewedCount = tools.filter(t => t.personalReview).length
      const freeCount = tools.filter((t) => {
        // Safe check for freeVsPaidOffer
        if (!t.freeVsPaidOffer)
          return true
        if (typeof t.freeVsPaidOffer !== 'string')
          return false
        return t.freeVsPaidOffer.includes('Gratuit')
      }).length

      return [
        { value: totalTools, label: 'Outils testés', type: 'tools' },
        { value: favoriteCount, label: 'Favoris', type: 'primary' },
        { value: reviewedCount, label: 'Avis détaillés', type: 'workflows' },
        { value: freeCount, label: 'Accès gratuit', type: 'guides' },
      ]
    }
  }
}

export function getCollectionItems(type: CollectionType) {
  switch (type) {
    case 'concepts':
      return content.concepts
    case 'guides':
      return content.guides
    case 'workflows':
      return content.workflows
    case 'tools':
      // Return empty array for tools since they don't use FilterableContentList
      return []
  }
}

export function getCollectionConfig(type: CollectionType) {
  switch (type) {
    case 'concepts':
      return {
        searchPlaceholder: 'Rechercher un concept...',
        showCategoryFilter: true,
        showDifficultyFilter: false,
        gridClassName: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      }
    case 'guides':
      return {
        searchPlaceholder: 'Rechercher un guide...',
        showCategoryFilter: true,
        showDifficultyFilter: true,
        gridClassName: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      }
    case 'workflows':
      return {
        searchPlaceholder: 'Rechercher un workflow...',
        showCategoryFilter: false,
        showDifficultyFilter: true,
        gridClassName: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      }
    case 'tools':
      return {
        searchPlaceholder: 'Rechercher un outil...',
        showCategoryFilter: true,
        showDifficultyFilter: false,
        gridClassName: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      }
  }
}

export function CollectionPage({ type, title, description, displayMode = 'grid', children }: CollectionPageProps) {
  const stats = getCollectionStats(type)
  const items = getCollectionItems(type)
  const config = getCollectionConfig(type)

  return (
    <CollectionPageLayout
      title={title}
      description={description}
      stats={stats}
    >
      {displayMode === 'grid' && type !== 'tools' && (
        <FilterableContentList
          items={items}
          type={type}
          searchPlaceholder={config.searchPlaceholder}
          showCategoryFilter={config.showCategoryFilter}
          showDifficultyFilter={config.showDifficultyFilter}
          gridClassName={config.gridClassName}
        />
      )}

      {displayMode === 'table' && type === 'tools' && (
        <Card>
          <CardHeader>
            <CardTitle>Tableau Comparatif</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveComparisonTable tools={content.externalTools} />
          </CardContent>
        </Card>
      )}

      {type === 'concepts' && (
        <>
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
        </>
      )}

      {type === 'workflows' && (
        <>
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
        </>
      )}

      {children}
    </CollectionPageLayout>
  )
}
