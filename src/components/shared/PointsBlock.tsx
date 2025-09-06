'use client'

import { SectionCard } from '@/components/shared/SectionCard'
import { AnimatedElement } from '@/components/ui/css-animations'
import { createTestIdProps, generateTestId } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

interface PointsBlockProps {
  title?: string
  points: Array<{
    title: string
    description: string
  }>
  className?: string
  testId?: string
}

export function PointsBlock({ title, points, className, testId }: PointsBlockProps) {
  if (!points || points.length === 0) {
    return null
  }

  const pointsTestId = testId || generateTestId('points', 'block', title?.replace(/\s+/g, '-').toLowerCase())

  return (
    <SectionCard
      {...createTestIdProps(pointsTestId)}
      title={title || ''}
      className={cn('my-6', className)}
    >
      <div className="space-y-4">
        {points.map((point, index) => (
          <AnimatedElement
            key={`point-${index}`}
            variant="slideUp"
            delay={index * 100}
            className="group"
          >
            <div
              {...createTestIdProps(generateTestId('points', 'item', index))}
              className="p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <h4 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                {point.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionCard>
  )
}
