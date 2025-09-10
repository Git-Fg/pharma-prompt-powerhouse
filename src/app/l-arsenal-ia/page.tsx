import { PageRenderer } from '@/components/layout/PageRenderer'
import { ResponsiveComparisonTable } from '@/components/shared/ResponsiveComparisonTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

// Désactiver le rendu statique pour les pages avec des composants complexes
export const dynamic = 'force-dynamic'

export default function ExternalToolsPage() {
  const tools = content.externalTools

  return (
    <PageRenderer
      collectionType="tools"
      collectionTitle="L'Arsenal IA 2025"
      collectionDescription="Mon guide personnel des outils IA pour les étudiants en pharmacie"
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
    </PageRenderer>
  )
}
