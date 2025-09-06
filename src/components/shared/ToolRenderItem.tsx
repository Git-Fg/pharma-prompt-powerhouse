'use client'

import type { BaseExternalTool } from '@/lib/content-schema'
import { ToolCard } from '@/components/shared/ToolCard'

interface ToolRenderItemProps {
  item: BaseExternalTool
}

export function ToolRenderItem({ item }: ToolRenderItemProps) {
  return <ToolCard tool={item} />
}
