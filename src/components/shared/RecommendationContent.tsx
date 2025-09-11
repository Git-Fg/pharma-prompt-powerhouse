import type { AnyContent } from '@/types'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { getContentTypeToRouteMapping } from '@/lib/content-loader'

// Ce helper garantit que nous n'oublions jamais un cas dans notre switch.
// Si un nouveau `type` est ajouté à AnyContent, TypeScript lèvera une erreur ici.
function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

interface RecommendationContentProps {
  item: AnyContent
}

export function RecommendationContent({ item }: RecommendationContentProps) {
  const routeMapping = getContentTypeToRouteMapping()
  const itemPath = `/${routeMapping[item.type]}/${item.slug}`

  // Le contenu spécifique à chaque type
  const renderContentDetails = () => {
    switch (item.type) {
      case 'concept':
        // TypeScript sait ici que `item` est de type `Concept`
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <Badge variant="outline">{item.difficulty}</Badge>
          </div>
        )
      case 'guide':
        // TypeScript sait ici que `item` est de type `Guide`
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex gap-2">
              <Badge variant="secondary">{item.difficulty}</Badge>
              {item.estimatedTime && <Badge variant="outline">{item.estimatedTime}</Badge>}
            </div>
          </div>
        )
      case 'tool':
        // TypeScript sait ici que `item` est de type `ExternalTool`
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{item.personalReview}</p>
            <Badge variant="default">
              Confiance:
              {item.confidenceScore}
              /5
            </Badge>
          </div>
        )
      case 'workflow':
        // TypeScript sait ici que `item` est de type `Workflow`
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex gap-2">
              <Badge variant="secondary">{item.difficulty}</Badge>
              {item.estimatedTime && <Badge variant="outline">{item.estimatedTime}</Badge>}
            </div>
          </div>
        )
      default:
        return assertNever(item) // Sécurité maximale
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <header>
        <h4 className="font-semibold">{item.title}</h4>
        <Badge variant="secondary" className="capitalize mt-1">{item.type}</Badge>
      </header>

      <div className="flex-grow overflow-y-auto">
        {renderContentDetails()}
      </div>

      <footer className="mt-auto pt-4 border-t">
        <Button asChild size="sm" className="w-full">
          <Link href={itemPath}>Explorer</Link>
        </Button>
      </footer>
    </div>
  )
}
