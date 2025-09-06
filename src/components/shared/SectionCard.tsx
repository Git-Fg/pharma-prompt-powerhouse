'use client'

import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  iconSize?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  titleClassName?: string
  iconClassName?: string
  testId?: string
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  iconSize = 'md',
  children,
  className,
  headerClassName,
  contentClassName,
  titleClassName,
  iconClassName,
  testId,
}: SectionCardProps) {
  const iconSizeClasses = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }

  const iconContainerSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  }

  return (
    <Card className={cn('w-full', className)} data-testid={testId}>
      <CardHeader className={cn('pb-4', headerClassName)}>
        <CardTitle className={cn(
          'flex items-center gap-2 text-lg font-semibold text-foreground',
          titleClassName,
        )}
        >
          {Icon && (
            <div className={cn(
              'flex items-center justify-center rounded-md bg-primary/10',
              iconContainerSizeClasses[iconSize],
              iconClassName,
            )}
            >
              <Icon className={cn(
                'text-primary',
                iconSizeClasses[iconSize],
              )}
              />
            </div>
          )}
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className={cn('pt-0', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
