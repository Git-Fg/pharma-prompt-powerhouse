'use client'

import type { EnrichedConcept } from '@/lib/content-schema'
import { ConceptCard } from '@/components/shared/ConceptCard'

interface ConceptRenderItemProps {
  item: EnrichedConcept
}

export function ConceptRenderItem({ item }: ConceptRenderItemProps) {
  return <ConceptCard concept={item} />
}
