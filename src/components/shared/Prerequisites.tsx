import { BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'

interface PrerequisiteItem {
  type: 'concept' | 'guide' | 'workflow' | 'external'
  slug?: string
  title?: string
  url?: string
  reason: string
}

interface PrerequisitesProps {
  items: PrerequisiteItem[]
  title?: string
  variant?: 'default' | 'compact'
}

export function Prerequisites({
  items,
  title = 'Prérequis recommandés',
  variant = 'default',
}: PrerequisitesProps) {
  if (!items || items.length === 0) {
    return null
  }

  const getItemLink = (item: PrerequisiteItem) => {
    if (item.type === 'external' && item.url) {
      return item.url
    }
    if (item.slug) {
      const basePath: Record<string, string> = {
        concept: '/concepts',
        guide: '/guides',
        workflow: '/workflows',
      }
      return `${basePath[item.type]}/${item.slug}`
    }
    return '#'
  }

  const getItemTitle = (item: PrerequisiteItem) => {
    return item.title || item.slug || 'Ressource externe'
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'concept':
        return 'default' as const
      case 'guide':
        return 'secondary' as const
      case 'workflow':
        return 'outline' as const
      default:
        return 'destructive' as const
    }
  }

  if (variant === 'compact') {
    return (
      <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <BookOpen className="size-4" />
          {title}
        </h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={`${item.type}-${item.slug || index}`} className="flex items-start gap-2">
              <Badge variant={getBadgeVariant(item.type)} className="text-xs flex-shrink-0 mt-0.5">
                {item.type}
              </Badge>
              <div className="flex-1 min-w-0">
                <Link
                  href={getItemLink(item)}
                  className="text-sm font-medium hover:underline"
                  {...(item.type === 'external' && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {getItemTitle(item)}
                  {item.type === 'external' && <ExternalLink className="size-3 inline ml-1" />}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Alert className="mb-8">
      <BookOpen className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Pour tirer le meilleur parti de ce contenu, nous recommandons de consulter au préalable :
          </p>
          <div className="grid gap-3">
            {items.map((item, index) => (
              <div
                key={`${item.type}-${item.slug || index}`}
                className="flex items-center justify-between p-3 border rounded-lg bg-background"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getBadgeVariant(item.type)} className="text-xs">
                      {item.type}
                    </Badge>
                    <span className="font-medium text-sm">{getItemTitle(item)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
                <Link href={getItemLink(item)} {...(item.type === 'external' && { target: '_blank', rel: 'noopener noreferrer' })}>
                  <Button variant="outline" size="sm">
                    Consulter
                    {item.type === 'external' && <ExternalLink className="size-3 ml-1" />}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
