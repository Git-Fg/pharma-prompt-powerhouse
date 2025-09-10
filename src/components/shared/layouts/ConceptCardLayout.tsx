import type { Concept } from '@/lib/content-schema'
import { BookOpen, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { InfoButton } from '@/components/shared/InfoButton'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryBadge, DifficultyBadge } from '@/components/ui/enhanced-badge'
import { contentCardVariants } from '@/components/ui/variants'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'

interface ConceptCardLayoutProps {
  concept: Concept
}

export function ConceptCardLayout({ concept }: ConceptCardLayoutProps) {
  return (
    <Card
      className={cn(
        contentCardVariants({ variant: 'concept', size: 'default' }),
        'h-full flex-col hover:shadow-lg hover:border-primary/50 transition-all duration-200 group',
      )}
      {...createTestIdProps(TestIds.Interactive.Card('concept', concept.slug))}
    >
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Lightbulb className="size-6 text-primary" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 flex-1">
              {concept.title}
            </CardTitle>
          </div>
          <InfoButton
            content={concept}
            size="md"
            className="ml-2 flex-shrink-0"
          />
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {concept.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="size-4" />
              <span>
                Difficulté:
                <DifficultyBadge difficulty={concept.difficulty} />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <CategoryBadge category={concept.category} />
            {concept.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/concepts/${concept.slug}`} className="block" {...createTestIdProps(TestIds.Interactive.Button('discover-concept'))}>
            <Button className="w-full" size="sm">
              Découvrir le concept
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
