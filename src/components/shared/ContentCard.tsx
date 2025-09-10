import type { Concept, ExternalTool, Guide, Workflow } from '@/lib/content-schema'
import { ConceptCardLayout } from './layouts/ConceptCardLayout'
import { GuideCardLayout } from './layouts/GuideCardLayout'
import { ToolCardLayout } from './layouts/ToolCardLayout'
import { WorkflowCardLayout } from './layouts/WorkflowCardLayout'

// Type union discriminée pour les types de base (utilisés dans le content-loader)
type BaseContent = Concept | Guide | Workflow | ExternalTool

// Helper pour garantir que tous les cas sont traités
function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

interface ContentCardProps {
  item: BaseContent
}

export function ContentCard({ item }: ContentCardProps) {
  switch (item.type) {
    case 'concept':
      // Ici, TypeScript sait que 'item' est de type Concept grâce au discriminant
      return <ConceptCardLayout concept={item} />
    case 'guide':
      // Ici, TypeScript sait que 'item' est de type Guide grâce au discriminant
      return <GuideCardLayout guide={item} />
    case 'workflow':
      // Ici, TypeScript sait que 'item' est de type Workflow grâce au discriminant
      return <WorkflowCardLayout workflow={item} />
    case 'tool':
      // Ici, TypeScript sait que 'item' est de type ExternalTool grâce au discriminant
      return <ToolCardLayout tool={item} />
    default:
      // Si vous ajoutez un nouveau type de contenu sans l'ajouter ici,
      // TypeScript lèvera une erreur grâce à assertNever. C'est 100% sûr.
      return assertNever(item)
  }
}
