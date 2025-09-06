'use client'

import type { EnrichedWorkflow } from '@/lib/content-schema'
import { SimpleWorkflowCard } from '@/components/shared/SimpleWorkflowCard'

interface SimpleWorkflowRenderItemProps {
  item: EnrichedWorkflow
}

export function SimpleWorkflowRenderItem({ item }: SimpleWorkflowRenderItemProps) {
  return <SimpleWorkflowCard workflow={item} />
}
