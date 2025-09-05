import type { AnyContent } from '@/types'
import { BookOpen, Clock, Tag } from 'lucide-react'
import Badge from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DifficultyBadge } from '@/components/ui/enhanced-badge'

interface ContentMetadataProps {
  item: AnyContent
}

export function ContentMetadata({ item }: ContentMetadataProps) {
  // Check if item has difficulty property (Concept, Guide, Workflow)
  const hasDifficulty = 'difficulty' in item && item.difficulty
  // Check if item has estimatedTime property (Guide, Workflow)
  const hasEstimatedTime = 'estimatedTime' in item && item.estimatedTime
  // All content types have tags
  const hasTags = item.tags && item.tags.length > 0
  
  const hasMetadata = hasDifficulty || hasEstimatedTime || hasTags

  if (!hasMetadata) {
    return null
  }

  return (
    <Card className="my-8 bg-muted/50">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {hasDifficulty && (
            <div className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <DifficultyBadge difficulty={item.difficulty as string} size="sm" />
            </div>
          )}

          {hasEstimatedTime && (
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>{(item as any).estimatedTime}</span>
            </div>
          )}

          {hasTags && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="size-4" />
              {item.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}