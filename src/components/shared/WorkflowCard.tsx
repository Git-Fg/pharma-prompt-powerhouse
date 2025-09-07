'use client'

import type { EnrichedGuide } from '@/lib/content-schema'
import { ArrowRight, BookOpen, Clock, Star, Target, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MagneticHover } from '@/components/ui/css-animations'
import { CategoryBadge, DifficultyBadge } from '@/components/ui/enhanced-badge'
import { getContentUrl } from '@/lib/navigation'
import { formatEstimatedTime } from '@/lib/ui-utils'
import { cn } from '@/lib/utils'

interface WorkflowCardProps {
  workflow: EnrichedGuide & { isWorkflow: true }
  /**
   * Enhanced display mode with three-zone layout
   * - glimpse: Quick visual scan (icon, title, category)
   * - scan: Detailed information scanning (description, metadata)
   * - interact: Action zone (buttons, links)
   */
  enhanced?: boolean
  /**
   * Show usage statistics and social proof
   */
  showStats?: boolean
  /**
   * Variant for different contexts
   */
  variant?: 'default' | 'featured' | 'compact'
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  enhanced = true,
  showStats = false,
  variant = 'default',
}) => {
  const estimatedTime = formatEstimatedTime(workflow.estimatedTime, 'guide')
  const workflowUrl = getContentUrl('guide', workflow.slug)

  // Mock statistics for demonstration
  const mockStats = {
    completions: Math.floor(Math.random() * 1000) + 100,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    saves: Math.floor(Math.random() * 500) + 50,
  }

  if (!enhanced) {
    // Fallback to simpler layout
    return (
      <Card className="h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Target className="size-5 text-primary" />
            </div>
            <CardTitle className="line-clamp-2">{workflow.title}</CardTitle>
          </div>
          <CardDescription className="line-clamp-3">{workflow.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={workflowUrl}>
            <Button className="w-full" size="sm">
              Voir le workflow
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const cardVariants = {
    default: 'h-full',
    featured: 'h-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent',
    compact: 'h-auto',
  }

  return (
    <MagneticHover intensity="subtle">
      <Card className={cn(
        cardVariants[variant],
        'flex-col hover:shadow-xl hover:border-primary/50 transition-all duration-300 group overflow-hidden',
        variant === 'featured' && 'shadow-lg',
      )}
      >
        {/* Zone 1: GLIMPSE - Quick Visual Scan */}
        <div className="relative">
          {variant === 'featured' && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="default" className="bg-primary text-primary-foreground shadow-md">
                <Star className="mr-1 h-3 w-3" />
                Populaire
              </Badge>
            </div>
          )}

          <CardHeader className="pb-3">
            <div className="flex items-start gap-4">
              {/* Visual Anchor - Icon with status indicator */}
              <div className="relative">
                <div className={cn(
                  'p-3 rounded-xl transition-all duration-300 group-hover:scale-110',
                  variant === 'featured'
                    ? 'bg-primary/20 group-hover:bg-primary/30'
                    : 'bg-primary/10 group-hover:bg-primary/20',
                )}
                >
                  <Target className={cn(
                    'size-6 transition-colors',
                    variant === 'featured' ? 'text-primary' : 'text-primary',
                  )}
                  />
                </div>
                {/* Difficulty indicator dot */}
                <div className={cn(
                  'absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background',
                  workflow.difficulty === 'beginner' && 'bg-green-500',
                  workflow.difficulty === 'intermediate' && 'bg-yellow-500',
                  workflow.difficulty === 'advanced' && 'bg-red-500',
                )}
                />
              </div>

              {/* Title and Primary Metadata */}
              <div className="flex-1 min-w-0">
                <CardTitle className={cn(
                  'group-hover:text-primary transition-colors line-clamp-2 mb-2',
                  variant === 'featured' ? 'text-lg' : 'text-base',
                )}
                >
                  {workflow.title}
                </CardTitle>

                {/* Quick Scan Badges */}
                <div className="flex flex-wrap gap-2">
                  <CategoryBadge category={workflow.category} />
                  <DifficultyBadge difficulty={workflow.difficulty} />
                  <Badge variant="outline" className="text-xs">
                    <Zap className="mr-1 h-3 w-3" />
                    Workflow
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </div>

        {/* Zone 2: SCAN - Detailed Information */}
        <div className="flex-1 px-6 pb-4">
          <CardDescription className={cn(
            'text-sm text-muted-foreground mb-4',
            variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3',
          )}
          >
            {workflow.description}
          </CardDescription>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-primary/70" />
              <span>{estimatedTime}</span>
            </div>

            {showStats && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4 text-primary/70" />
                <span>
                  {mockStats.completions}
                  {' '}
                  complétions
                </span>
              </div>
            )}
          </div>

          {/* Key Takeaways Preview */}
          {workflow.keyTakeaways && workflow.keyTakeaways.length > 0 && variant !== 'compact' && (
            <div className="mb-4">
              <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Points Clés
              </h3>
              <div className="space-y-1">
                {workflow.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                  // eslint-disable-next-line react/no-array-index-key -- Liste statique de points clés, pas de réordonnancement possible
                  <div key={`takeaway-${takeaway.slice(0, 20).replace(/\s+/g, '-')}-${index}`} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground line-clamp-1">{takeaway}</span>
                  </div>
                ))}
                {workflow.keyTakeaways.length > 2 && (
                  <div className="text-xs text-muted-foreground/70">
                    +
                    {workflow.keyTakeaways.length - 2}
                    {' '}
                    autres points
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Zone 3: INTERACT - Action Zone */}
        <CardContent className="pt-0 mt-auto">
          {showStats && (
            <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="size-3 text-yellow-500 fill-current" />
                  <span className="font-medium">{mockStats.rating}</span>
                </div>
                <div className="text-muted-foreground">
                  {mockStats.saves}
                  {' '}
                  sauvegardes
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Link href={workflowUrl} className="flex-1">
              <Button
                className={cn(
                  'w-full transition-all duration-200 group-hover:shadow-md',
                  variant === 'featured' && 'bg-primary hover:bg-primary/90',
                )}
                size="sm"
              >
                Démarrer le workflow
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            {variant === 'featured' && (
              <Button variant="outline" size="sm" className="px-3">
                <BookOpen className="size-4" />
              </Button>
            )}
          </div>

          {/* Trust Indicators */}
          {showStats && (
            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
              <span>Vérifié par experts</span>
              <span>•</span>
              <span>Mis à jour 2025</span>
            </div>
          )}
        </CardContent>
      </Card>
    </MagneticHover>
  )
}
