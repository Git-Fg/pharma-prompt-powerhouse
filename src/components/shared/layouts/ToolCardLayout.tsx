import type { ExternalTool } from '@/lib/content-schema'
import Link from 'next/link'
import { InfoButton } from '@/components/shared/InfoButton'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryBadge, ConfidenceBadge } from '@/components/ui/enhanced-badge'
import { contentCardVariants } from '@/components/ui/variants'
import { getContentUrl } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { getIcon } from '@/types/icon-taxonomy'

interface ToolCardLayoutProps {
  tool: ExternalTool
}

export function ToolCardLayout({ tool }: ToolCardLayoutProps) {
  // Utilisation des utilitaires centralisés
  const toolUrl = getContentUrl('tool', tool.slug)

  // Créer les composants d'icônes
  const GlobeIcon = getIcon('Globe')
  const ExternalLinkIcon = getIcon('ExternalLink')

  return (
    <Card className={cn(
      contentCardVariants({ variant: 'tool', size: 'default' }),
      'h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group',
    )}
    >
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <GlobeIcon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {tool.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <CategoryBadge category={tool.category} />
                <ConfidenceBadge score={tool.confidenceScore} />
              </div>
            </div>
          </div>
          <InfoButton
            content={tool}
            size="md"
            className="ml-2 flex-shrink-0"
          />
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full" size="sm">
                Visiter l'outil
                <ExternalLinkIcon className="ml-1 size-4" />
              </Button>
            </a>
            <Link href={toolUrl} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
