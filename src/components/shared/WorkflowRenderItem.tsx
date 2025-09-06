'use client'

import type { EnrichedWorkflow } from '@/lib/content-schema'
import { WorkflowCard } from '@/components/shared/WorkflowCard'

interface WorkflowRenderItemProps {
  item: EnrichedWorkflow & { isWorkflow: true }
}

export function WorkflowRenderItem({ item }: WorkflowRenderItemProps) {
  return <WorkflowCard workflow={item} />
}
