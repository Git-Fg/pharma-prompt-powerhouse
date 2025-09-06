import type { BaseConcept } from '@/lib/content-schema'
import { BookOpen } from 'lucide-react'

import Link from 'next/link'

import { SectionCard } from '@/components/shared/SectionCard'
import Badge from '@/components/ui/badge'

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
      <div className="grid gap-4 md:grid-cols-2">
        {concepts.map(concept => (
          <Link
            key={concept.slug}
            href={`/concepts/${concept.slug}`}
            className="block p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {concept.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {concept.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
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
