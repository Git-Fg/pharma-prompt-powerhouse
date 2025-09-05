import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { Concept, ExternalTool, Guide, Workflow } from '@/lib/content-schema'
import Badge from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface RelatedContentSectionProps {
  title: string
  icon: LucideIcon
  items: (Guide | Workflow | Concept | ExternalTool)[]
  type: 'guides' | 'workflows' | 'concepts' | 'tools'
}

export function RelatedContentSection({
  title,
  icon: Icon,
  items,
  type,
}: RelatedContentSectionProps) {
  if (items.length === 0) {
    return null
  }

  const getGridClasses = () => {
    return type === 'workflows' ? 'grid md:grid-cols-2 gap-6' : 'grid gap-4'
  }

  const renderItem = (item: Guide | Workflow | Concept | ExternalTool) => {
    const itemSlug = item.slug
    const basePath = type === 'workflows' ? '/workflows' : `/${type}`

    return (
      <Link href={`${basePath}/${itemSlug}`} key={itemSlug}>
        <Card className="hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            {'category' in item && item.category && (
              <div className="flex gap-2 pt-2">
                <Badge variant="outline">{item.category}</Badge>
                {'difficulty' in item && item.difficulty && (
                  <Badge variant="secondary">{item.difficulty}</Badge>
                )}
              </div>
            )}
          </CardHeader>
        </Card>
      </Link>
    )
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold flex items-center gap-3 mb-4">
        <Icon className="size-8 text-primary" />
        {title}
      </h2>
      <div className={getGridClasses()}>
        {items.map(renderItem)}
      </div>
    </section>
  )
}