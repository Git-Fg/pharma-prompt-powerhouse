import { PageRenderer } from '@/components/layout/PageRenderer'

export default function ConceptsPage() {
  return (
    <PageRenderer
      collectionType="concepts"
      collectionTitle="Hub de Concepts"
      collectionDescription="Chaque concept est un dossier complet reliant la théorie, la pratique et les outils. Choisissez un concept pour commencer."
      showCollectionHelp={true}
    />
  )
}
