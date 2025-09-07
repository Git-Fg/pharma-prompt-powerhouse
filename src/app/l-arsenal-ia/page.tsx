import type { StatCardProps } from '@/components/layout/CollectionPageLayout'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { ResponsiveComparisonTable } from '@/components/shared/ResponsiveComparisonTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

export default function ExternalToolsPage() {
  const tools = content.externalTools

  // Calculate statistics with error handling
  let totalTools = 0
  let favoriteCount = 0
  let reviewedCount = 0
  let freeCount = 0

  try {
    totalTools = tools.length
    favoriteCount = tools.filter(t => t.isFavorite).length
    reviewedCount = tools.filter(t => t.personalReview).length
    freeCount = tools.filter((t) => {
      // Safe check for freeVsPaidOffer
      if (!t.freeVsPaidOffer)
        return true
      if (typeof t.freeVsPaidOffer !== 'string')
        return false
      return t.freeVsPaidOffer.includes('Gratuit')
    }).length
  }
  catch (error) {
    console.error('Error calculating tool statistics:', error)
    // Fallback values
    totalTools = tools?.length || 0
    favoriteCount = 0
    reviewedCount = 0
    freeCount = 0
  }

  const stats: StatCardProps[] = [
    { value: totalTools, label: 'Outils testés', type: 'tools' },
    { value: favoriteCount, label: 'Favoris', type: 'primary' },
    { value: reviewedCount, label: 'Avis détaillés', type: 'workflows' },
    { value: freeCount, label: 'Accès gratuit', type: 'guides' },
  ]

  return (
    <CollectionPageLayout
      title="L'Arsenal IA 2025"
      description="Mon guide personnel des outils IA pour les étudiants en pharmacie"
      stats={stats}
    >
      {/* Comparative Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tableau Comparatif</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveComparisonTable tools={tools} />
        </CardContent>
      </Card>
    </CollectionPageLayout>
  )
}
