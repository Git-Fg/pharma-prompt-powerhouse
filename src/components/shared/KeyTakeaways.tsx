'use client'

import { CheckCircle, Info, Lightbulb, Target, TrendingUp, Zap } from 'lucide-react'
import React from 'react'
import { Animate } from '@/components/ui/Animate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { keyTakeawaysIconVariants, keyTakeawaysItemIconVariants, keyTakeawaysItemsVariants, keyTakeawaysItemTextVariants, keyTakeawaysItemVariants, keyTakeawaysTitleVariants, keyTakeawaysVariants } from '@/components/ui/variants'
import { cn } from '@/lib/utils'

interface KeyTakeawaysProps {
  points: string[]
  /**
   * Enhanced visual treatment for better narrative flow
   */
  variant?: 'default' | 'highlighted' | 'compact' | 'featured'
  /**
   * Add contextual icons based on content type
   */
  contentType?: 'guide' | 'concept' | 'workflow' | 'tool'
  /**
   * Enable staggered animation
   */
  animated?: boolean
  className?: string
}

const contentIcons = {
  guide: Lightbulb,
  concept: Target,
  workflow: TrendingUp,
  tool: Zap,
}

export function KeyTakeaways({
  points,
  variant = 'default',
  contentType = 'guide',
  animated = false,
  className,
}: KeyTakeawaysProps) {
  if (!points || points.length === 0) {
    return null
  }

  const IconComponent = contentIcons[contentType] || Info

  const cardContent = (
    <Card className={cn(keyTakeawaysVariants({ variant }), className)}>
      {/* Background decoration for featured variant */}
      {variant === 'featured' && (
        <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10">
          <IconComponent className="w-full h-full" />
        </div>
      )}

      <CardHeader className={variant === 'compact' ? 'pb-3' : undefined}>
        <CardTitle className={cn(
          keyTakeawaysTitleVariants({ variant }),
        )}
        >
          <div className={keyTakeawaysIconVariants({ variant })}>
            <IconComponent className={cn(
              'text-primary',
              variant === 'featured' ? 'size-5' : 'size-4',
            )}
            />
          </div>

          {contentType === 'guide' && 'À Retenir (TL;DR)'}
          {contentType === 'concept' && 'Concepts Essentiels'}
          {contentType === 'workflow' && 'Points Clés du Workflow'}
          {contentType === 'tool' && 'Fonctionnalités Importantes'}
        </CardTitle>
      </CardHeader>

      <CardContent className={variant === 'compact' ? 'pt-0' : undefined}>
        <ul className={keyTakeawaysItemsVariants({ variant })}>
          {points.map((point, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des points clés avec contenu unique
              key={`takeaway-${point.slice(0, 30).replace(/\s+/g, '-')}-${index}`}
              className={keyTakeawaysItemVariants({ variant })}
            >
              <div className={keyTakeawaysItemIconVariants({ variant })}>
                <CheckCircle className={cn(
                  'text-green-600 dark:text-green-400',
                  variant === 'compact' ? 'size-2.5' : 'size-3',
                )}
                />
              </div>

              <p className={keyTakeawaysItemTextVariants({ variant })}>
                {point}
              </p>

              {/* Progress indicator for featured variant */}
              {variant === 'featured' && (
                <div className="w-1 h-6 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/60 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Call to action for featured variant */}
        {variant === 'featured' && points.length > 2 && (
          <div className="mt-6 pt-4 border-t border-primary/30">
            <p className="text-sm text-primary/90 font-medium text-center italic">
              💡 Gardez ces points en tête pour maximiser votre apprentissage
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (animated) {
    return (
      <Animate
        variant="slideUp"
        delay={200}
        className="my-8"
      >
        {cardContent}
      </Animate>
    )
  }

  return (
    <div className="my-8">
      {cardContent}
    </div>
  )
}
