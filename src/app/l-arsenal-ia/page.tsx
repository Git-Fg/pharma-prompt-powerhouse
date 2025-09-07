import { getCollectionStats } from '@/components/layout/CollectionPage'
import { CollectionPageLayout } from '@/components/layout/CollectionPageLayout'
import { ResponsiveComparisonTable } from '@/components/shared/ResponsiveComparisonTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

export default function ExternalToolsPage() {
  const stats = getCollectionStats('tools')
  const tools = content.externalTools

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
