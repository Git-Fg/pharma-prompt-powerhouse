import { PageRenderer } from '@/components/layout/PageRenderer'

export default function WorkflowsPage() {
  return (
    <PageRenderer
      collectionType="workflows"
      collectionTitle="Workflows Stratégiques"
      collectionDescription="Mes méthodes éprouvées pour utiliser l'IA efficacement dans vos études. Chaque workflow est une étude de cas personnelle avec ma stratégie pas-à-pas."
      showCollectionCTA={true}
    />
  )
}
