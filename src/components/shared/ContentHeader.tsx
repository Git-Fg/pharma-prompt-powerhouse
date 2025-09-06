import type { AnyContent } from '@/types'
import { ExternalLink } from 'lucide-react'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { content } from '@/lib/content-loader'

interface ContentHeaderProps {
  item: AnyContent
}

// Guards de type pour une détection fiable
function isExternalTool(item: AnyContent): item is import('@/lib/content-schema').ExternalTool {
  return 'url' in item && typeof item.url === 'string'
}

function isConcept(item: AnyContent): item is import('@/lib/content-schema').Concept {
  return 'category' in item && 'keyTakeaways' in item && Array.isArray(item.keyTakeaways)
}

export function ContentHeader({ item }: ContentHeaderProps) {
  // Cas 1: External tools (ont une URL)
  if (isExternalTool(item)) {
    return (
      <header className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">{item.title}</h1>
        <p className="prose-description text-lg">{item.description}</p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Visiter l'outil
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </header>
    )
  }

  // Cas 2: Concepts (ont keyTakeaways et pas de estimatedTime)
  if (isConcept(item)) {
    const relatedGuides = content.guides.filter(
      g => g.conceptSlugs?.includes(item.slug),
    )
    const relatedWorkflows = content.workflows.filter(
      w => w.conceptSlugs?.includes(item.slug),
    )

    return (
      <header className="mb-8 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>
          <p className="prose-description text-xl">{item.description}</p>
        </div>

        {/* Statistiques du concept */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">
              {relatedGuides.length + relatedWorkflows.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Ressources liées
            </div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {relatedGuides.length}
            </div>
            <div className="text-sm text-muted-foreground">Guides</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {relatedWorkflows.length}
            </div>
            <div className="text-sm text-muted-foreground">Workflows</div>
          </Card>
        </div>
      </header>
    )
  }

  // Cas 3: En-tête par défaut pour guides et workflows
  return (
    <header className="mb-8 space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>
      <p className="prose-description text-xl">{item.description}</p>
    </header>
  )
}
