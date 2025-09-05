import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { ResponsiveComparisonTable } from '@/components/shared/ResponsiveComparisonTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

export default function ExternalToolsPage() {
  const tools = content.externalTools

  // Calculate statistics
  const totalTools = tools.length
  const favoriteCount = tools.filter(t => t.isFavorite).length
  const reviewedCount = tools.filter(t => t.personalReview).length
  const freeCount = tools.filter(t => !t.freeVsPaidOffer || t.freeVsPaidOffer.includes('Gratuit')).length

  const stats = [
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
      contentMaxWidth="7xl"
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
