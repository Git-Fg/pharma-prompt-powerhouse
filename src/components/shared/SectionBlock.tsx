'use client'

import type { VariantProps } from 'class-variance-authority'
import type { badgeVariants } from '@/components/ui/badge-variants'
import { Animate } from '@/components/ui/Animate'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createTestIdProps, generateTestId } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

interface SectionBlockProps {
  type: 'introduction' | 'analogy' | 'section' | 'conclusion' | 'key-points' | 'examples' | 'warning' | 'definition'
  title: string
  content: string
  className?: string
  variant?: 'default' | 'highlighted' | 'subtle'
  testId?: string
}

interface TypeStyle {
  container: string
  title: string
  icon: string
  badge: string
  badgeVariant: VariantProps<typeof badgeVariants>['variant']
}

interface VariantStyle {
  container?: string
  title?: string
}

const typeStyles: Record<string, TypeStyle> = {
  'introduction': {
    container: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800',
    title: 'text-blue-700 dark:text-blue-300',
    icon: '💡',
    badge: 'Introduction',
    badgeVariant: 'default' as const,
  },
  'analogy': {
    container: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800',
    title: 'text-purple-700 dark:text-purple-300',
    icon: '🔗',
    badge: 'Analogie',
    badgeVariant: 'secondary' as const,
  },
  'section': {
    container: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800',
    title: 'text-green-700 dark:text-green-300',
    icon: '📋',
    badge: 'Section',
    badgeVariant: 'outline' as const,
  },
  'definition': {
    container: 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 border-slate-200 dark:border-slate-800',
    title: 'text-slate-700 dark:text-slate-300',
    icon: '📖',
    badge: 'Définition',
    badgeVariant: 'secondary' as const,
  },
  'conclusion': {
    container: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800',
    title: 'text-orange-700 dark:text-orange-300',
    icon: '🎯',
    badge: 'Conclusion',
    badgeVariant: 'default' as const,
  },
  'key-points': {
    container: 'bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 border-cyan-200 dark:border-cyan-800',
    title: 'text-cyan-700 dark:text-cyan-300',
    icon: '⭐',
    badge: 'Points Clés',
    badgeVariant: 'secondary' as const,
  },
  'examples': {
    container: 'bg-gradient-to-r from-yellow-50 to-lime-50 dark:from-yellow-950/20 dark:to-lime-950/20 border-yellow-200 dark:border-yellow-800',
    title: 'text-yellow-700 dark:text-yellow-300',
    icon: '💼',
    badge: 'Exemples',
    badgeVariant: 'outline' as const,
  },
  'warning': {
    container: 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-800',
    title: 'text-red-700 dark:text-red-300',
    icon: '⚠️',
    badge: 'Attention',
    badgeVariant: 'destructive' as const,
  },
}

const variantStyles: Record<'default' | 'highlighted' | 'subtle', VariantStyle> = {
  default: {},
  highlighted: {
    container: 'shadow-lg border-2',
    title: 'font-bold text-lg',
  },
  subtle: {
    container: 'border-opacity-50 bg-opacity-50',
    title: 'font-medium',
  },
}

export function SectionBlock({ type, title, content, className, variant = 'default', testId }: SectionBlockProps) {
  const styles = typeStyles[type]
  const variantStyle = variantStyles[variant] || variantStyles.default
  const sectionTestId = testId || generateTestId('section', type, title.replace(/\s+/g, '-').toLowerCase())

  if (!styles) {
    console.warn(`Unknown section type: "${type}". Using default fallback.`)
    // Return a fallback section with basic styling
    return (
      <Animate variant="slideUp" className="w-full">
        <Card
          {...createTestIdProps(sectionTestId)}
          className={cn(
            'my-6 transition-all duration-300 hover:shadow-md',
            'bg-muted/30 border-muted-foreground/20',
            className,
          )}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base leading-tight">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm leading-relaxed text-foreground/90">
              {content}
            </div>
          </CardContent>
        </Card>
      </Animate>
    )
  }

  return (
    <Animate variant="slideUp" className="w-full">
      <Card
        {...createTestIdProps(sectionTestId)}
        className={cn(
          'my-6 transition-all duration-300 hover:shadow-md',
          styles.container,
          variantStyle.container,
          className,
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{styles.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={styles.badgeVariant} className="text-xs">
                  {styles.badge}
                </Badge>
              </div>
              <CardTitle
                className={cn(
                  'text-base leading-tight',
                  styles.title,
                  variantStyle.title,
                )}
              >
                {title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm leading-relaxed text-foreground/90">
            {content}
          </div>
        </CardContent>
      </Card>
    </Animate>
  )
}
