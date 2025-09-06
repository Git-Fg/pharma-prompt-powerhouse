'use client'

import type { EnrichedGuide } from '@/lib/content-schema'
import { GuideCard } from '@/components/shared/GuideCard'

interface GuideRenderItemProps {
  item: EnrichedGuide
}

export function GuideRenderItem({ item }: GuideRenderItemProps) {
  return <GuideCard guide={item} />
}
