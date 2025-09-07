'use client'

import type { EnrichedGuide } from '@/lib/content-schema'
import Link from 'next/link'
import React from 'react'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryBadge, DifficultyBadge } from '@/components/ui/enhanced-badge'
import { contentCardVariants } from '@/components/ui/variants'
import { getIcon } from '@/lib/icon-loader'
import { getContentUrl } from '@/lib/navigation'
import { formatEstimatedTime } from '@/lib/ui-utils'
import { cn } from '@/lib/utils'

interface GuideCardProps {
  guide: EnrichedGuide
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  // Utilisation des utilitaires centralisés
  const estimatedTime = formatEstimatedTime(guide.estimatedTime, 'guide')
  const guideUrl = getContentUrl('guide', guide.slug)

  return (
    <Card className={cn(
      contentCardVariants({ variant: 'guide', size: 'default' }),
      'h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group',
    )}
    >
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              {getIcon('BookOpen')({ className: 'size-6 text-primary' })}
            </div>
            <div className="flex-1">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {guide.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <CategoryBadge category={guide.category} />
                <DifficultyBadge difficulty={guide.difficulty} />
                {guide.isWorkflow && (
                  <Badge variant="default">
                    {getIcon('Target')({ className: 'mr-1 h-3 w-3' })}
                    Workflow
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {guide.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getIcon('Clock')({ className: 'size-4' })}
            <span>
              Temps de lecture :
              {estimatedTime}
            </span>
          </div>
          <Link href={guideUrl} className="block">
            <Button className="w-full" size="sm">
              Lire le guide
              {getIcon('ArrowRight')({ className: 'ml-1 size-4' })}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
