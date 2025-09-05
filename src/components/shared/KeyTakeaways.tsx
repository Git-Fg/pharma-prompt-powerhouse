'use client'

import { Check, CheckCircle, Info, Lightbulb, Target, TrendingUp, Zap } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedElement } from '@/components/ui/css-animations'
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

const variantStyles = {
  default: {
    container: 'bg-primary/5 border-primary/20',
    title: 'text-primary',
    items: 'space-y-3',
    icon: 'bg-primary/20',
  },
  highlighted: {
    container: 'bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg',
    title: 'text-primary font-bold text-xl',
    items: 'space-y-4',
    icon: 'bg-primary/30',
  },
  compact: {
    container: 'bg-muted/30 border-l-4 border-l-primary/60',
    title: 'text-sm text-foreground font-medium',
    items: 'space-y-2',
    icon: 'bg-primary/15',
  },
  featured: {
    container: 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/40 shadow-xl relative overflow-hidden',
    title: 'text-primary font-bold text-xl',
    items: 'space-y-5',
    icon: 'bg-primary/40',
  },
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
  animated = true,
  className,
}: KeyTakeawaysProps) {
  if (!points || points.length === 0) {
    return null
  }

  const styles = variantStyles[variant]
  const IconComponent = contentIcons[contentType] || Info

  return (
    <Card className={cn(styles.container, className)}>
      {/* Background decoration for featured variant */}
      {variant === 'featured' && (
        <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10">
          <IconComponent className="w-full h-full" />
        </div>
      )}

      <CardHeader className={variant === 'compact' ? 'pb-3' : undefined}>
        <CardTitle className={cn(
          'flex items-center gap-3',
          styles.title,
          variant === 'compact' ? 'text-base' : 'text-lg',
        )}
        >
          <div className={cn(
            'flex items-center justify-center rounded-lg',
            variant === 'featured' ? 'w-10 h-10 bg-primary/30' : 'w-6 h-6 bg-primary/20',
          )}
          >
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
          {contentType === 'guide' && variant === 'default' && 'À Retenir (TL;DR)'}
        </CardTitle>
      </CardHeader>

      <CardContent className={variant === 'compact' ? 'pt-0' : undefined}>
        <ul className={styles.items}>
          {points.map((point, index) => (
            <li
              key={`takeaway-${point.slice(0, 30).replace(/\s+/g, '-')}-${index}`}
              className={cn(
                'flex items-start gap-3 group',
                variant === 'featured' && 'p-3 rounded-lg hover:bg-background/30 transition-colors',
              )}
            >
              <div className={cn(
                'flex items-center justify-center rounded-full flex-shrink-0',
                variant === 'compact' ? 'w-4 h-4 mt-1' : 'w-5 h-5 mt-1',
                variant === 'featured'
                  ? 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40'
                  : 'bg-green-100 dark:bg-green-900/30',
              )}
              >
                <CheckCircle className={cn(
                  'text-green-600 dark:text-green-400',
                  variant === 'compact' ? 'size-2.5' : 'size-3',
                )}
                />
              </div>

              <p className={cn(
                'text-muted-foreground leading-relaxed',
                variant === 'compact' ? 'text-sm' : 'text-base',
                variant === 'featured' && 'text-foreground font-medium',
              )}
              >
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
      <AnimatedElement
        variant="slideUp"
        delay={200}
        className="my-8"
      >
        <Card className={cn(styles.container, className)}>
          {/* Background decoration for featured variant */}
          {variant === 'featured' && (
            <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10">
              <IconComponent className="w-full h-full" />
            </div>
          )}

          <CardHeader className={variant === 'compact' ? 'pb-3' : undefined}>
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex items-center justify-center rounded-full',
                variant === 'compact' ? 'w-5 h-5' : 'w-6 h-6',
                styles.icon,
              )}
              >
                <IconComponent className={variant === 'compact' ? 'w-3 h-3' : 'w-4 h-4'} />
              </div>
              <CardTitle className={cn(
                variant === 'compact' ? 'text-base' : 'text-lg',
                styles.title,
              )}
              >
                {contentType === 'concept' && 'Concepts Clés'}
                {contentType === 'workflow' && 'Points Clés du Workflow'}
                {contentType === 'tool' && 'Fonctionnalités Importantes'}
                {contentType === 'guide' && variant === 'default' && 'À Retenir (TL;DR)'}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className={variant === 'compact' ? 'pt-0' : undefined}>
            <ul className={styles.items}>
              {points.map((point, index) => (
                <li
                  key={`takeaway-${point.slice(0, 30).replace(/\s+/g, '-')}-${index}`}
                  className={cn(
                    'flex items-start gap-3 group',
                    variant === 'featured' && 'p-3 rounded-lg hover:bg-background/30 transition-colors',
                  )}
                >
                  <div className={cn(
                    'flex items-center justify-center rounded-full flex-shrink-0',
                    variant === 'compact' ? 'w-4 h-4 mt-1' : 'w-5 h-5 mt-1',
                    variant === 'featured'
                      ? 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40'
                      : 'bg-primary/20',
                  )}
                  >
                    <Check className={variant === 'compact' ? 'w-2 h-2' : 'w-3 h-3'} />
                  </div>

                  <p className={cn(
                    'text-muted-foreground leading-relaxed',
                    variant === 'compact' ? 'text-sm' : 'text-base',
                    variant === 'featured' && 'text-foreground font-medium',
                  )}
                  >
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
      </AnimatedElement>
    )
  }

  return (
    <div className="my-8">
      <Card className={cn(styles.container, className)}>
        {/* Background decoration for featured variant */}
        {variant === 'featured' && (
          <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10">
            <IconComponent className="w-full h-full" />
          </div>
        )}

        <CardHeader className={variant === 'compact' ? 'pb-3' : undefined}>
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex items-center justify-center rounded-full',
              variant === 'compact' ? 'w-5 h-5' : 'w-6 h-6',
              styles.icon,
            )}
            >
              <IconComponent className={variant === 'compact' ? 'w-3 h-3' : 'w-4 h-4'} />
            </div>
            <CardTitle className={cn(
              variant === 'compact' ? 'text-base' : 'text-lg',
              styles.title,
            )}
            >
              {contentType === 'concept' && 'Concepts Clés'}
              {contentType === 'workflow' && 'Points Clés du Workflow'}
              {contentType === 'tool' && 'Fonctionnalités Importantes'}
              {contentType === 'guide' && variant === 'default' && 'À Retenir (TL;DR)'}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className={variant === 'compact' ? 'pt-0' : undefined}>
          <ul className={styles.items}>
            {points.map((point, index) => (
              <li
                key={`takeaway-${point.slice(0, 30).replace(/\s+/g, '-')}-${index}`}
                className={cn(
                  'flex items-start gap-3 group',
                  variant === 'featured' && 'p-3 rounded-lg hover:bg-background/30 transition-colors',
                )}
              >
                <div className={cn(
                  'flex items-center justify-center rounded-full flex-shrink-0',
                  variant === 'compact' ? 'w-4 h-4 mt-1' : 'w-5 h-5 mt-1',
                  variant === 'featured'
                    ? 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40'
                    : 'bg-primary/20',
                )}
                >
                  <Check className={variant === 'compact' ? 'w-2 h-2' : 'w-3 h-3'} />
                </div>

                <p className={cn(
                  'text-muted-foreground leading-relaxed',
                  variant === 'compact' ? 'text-sm' : 'text-base',
                  variant === 'featured' && 'text-foreground font-medium',
                )}
                >
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
    </div>
  )
}
