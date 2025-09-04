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
    { value: totalTools, label: 'Outils testés', colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800' },
    { value: favoriteCount, label: 'Favoris', colorClass: 'text-green-600 dark:text-green-400', bgClass: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800' },
    { value: reviewedCount, label: 'Avis détaillés', colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800' },
    { value: freeCount, label: 'Accès gratuit', colorClass: 'text-orange-600 dark:text-orange-400', bgClass: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800' },
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
