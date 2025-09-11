import type { BaseConcept } from '@/lib/content-schema'
import { BookOpen } from 'lucide-react'

import Link from 'next/link'

import { SectionCard } from '@/components/shared/SectionCard'
import Badge from '@/components/ui/badge'
import { designTokens } from '@/design-system/tokens'

interface ConceptListSectionProps {
  concepts: BaseConcept[]
  title?: string
  description?: string
}

export function ConceptListSection({
  concepts,
  title = 'Concepts fondamentaux abordés',
  description = 'Ce contenu s\'appuie sur les concepts suivants. Consultez-les si vous souhaitez approfondir vos connaissances.',
}: ConceptListSectionProps) {
  if (!concepts || concepts.length === 0) {
    return null
  }

  return (
    <SectionCard
      title={title}
      description={description}
      icon={BookOpen}
    >
      <div className="grid gap-4 md:grid-cols-2" style={{ gap: designTokens.spacing.md }}>
        {concepts.map(concept => (
          <Link
            key={concept.slug}
            href={`/concepts/${concept.slug}`}
            className="block border rounded-lg hover:bg-accent/50 transition-colors group"
            style={{ padding: designTokens.spacing.md, borderRadius: designTokens.radius.lg }}
          >
            <div className="flex items-start justify-between" style={{ gap: designTokens.spacing.md }}>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {concept.title}
                </h3>
                <p className="prose-caption text-muted-foreground line-clamp-2" style={{ marginTop: designTokens.spacing.xs }}>
                  {concept.description}
                </p>
                <div className="flex items-center gap-2" style={{ gap: designTokens.spacing.sm, marginTop: designTokens.spacing.md }}>
                  <Badge variant="secondary" className="text-xs">
                    {concept.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {concept.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionCard>
  )
}
