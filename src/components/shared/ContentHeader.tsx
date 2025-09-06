import type { AnyContent } from '@/types'
import { content } from '@/lib/content-loader'
import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Button from '@/components/ui/button'

interface ContentHeaderProps {
  item: AnyContent
}

export function ContentHeader({ item }: ContentHeaderProps) {
  // Vérifier si c'est un external tool (qui a une URL)
  if ('url' in item) {
    const tool = item
    return (
      <header className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">{tool.title}</h1>
        <p className="prose-description text-lg">{tool.description}</p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              Visiter l'outil
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </header>
    )
  }

  // Vérifier si c'est un concept (qui n'a pas de category ou qui a une category spécifique)
  if ('category' in item && item.category === undefined) {
    const concept = item as any
    const relatedGuides = content.guides.filter(
      g => g.conceptSlugs?.includes(concept.slug),
    )
    const relatedWorkflows = content.workflows.filter(
      w => w.conceptSlugs?.includes(concept.slug),
    )

    return (
      <header className="mb-8 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{concept.title}</h1>
          <p className="prose-description text-xl">{concept.description}</p>
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

  // En-tête par défaut pour guides et workflows
  return (
    <header className="mb-8 space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>
      <p className="text-xl text-muted-foreground">{item.description}</p>
    </header>
  )
}