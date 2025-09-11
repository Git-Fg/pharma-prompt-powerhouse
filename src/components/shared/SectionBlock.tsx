'use client'

import type { VariantProps } from 'tailwind-variants'
import type { badgeVariants } from '@/design-system/variants'
import { Animate } from '@/components/ui/Animate'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sectionBlockVariants } from '@/design-system/variants'
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

// Badge variant mapping for each section type
const badgeVariantMapping: Record<string, VariantProps<typeof badgeVariants>['variant']> = {
  'introduction': 'default',
  'analogy': 'secondary',
  'section': 'outline',
  'definition': 'secondary',
  'conclusion': 'default',
  'key-points': 'secondary',
  'examples': 'outline',
  'warning': 'destructive',
}

export function SectionBlock({ type, title, content, className, variant = 'default', testId }: SectionBlockProps) {
  const sectionTestId = testId || generateTestId('section', type, title.replace(/\s+/g, '-').toLowerCase())

  // Check if type is valid
  const validTypes = ['introduction', 'analogy', 'section', 'definition', 'conclusion', 'key-points', 'examples', 'warning'] as const
  const isValidType = validTypes.includes(type as typeof validTypes[number])

  if (!isValidType) {
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
          sectionBlockVariants({ type, variant }),
          className,
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className={sectionBlockIconVariants({ type })} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={badgeVariantMapping[type]} className="text-xs">
                  {sectionBlockBadgeVariants({ type })}
                </Badge>
              </div>
              <CardTitle
                className={cn(
                  sectionBlockTitleVariants({ type, variant }),
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
