'use client'

import { AlertTriangle, BookOpen, Code, Lightbulb, PlayCircle } from 'lucide-react'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { difficultyLabels, type Difficulty } from '@/lib/constants'

interface ExampleProps {
  title: string
  description?: string
  content: string
  type?: 'prompt' | 'code' | 'workflow' | 'scenario' | 'other'
  language?: string
  filename?: string
  outcome?: string
  tags?: string[]
  difficulty?: Difficulty
  warnings?: string[]
  className?: string
  variant?: 'card' | 'inline' | 'compact'
}

const typeIcons = {
  prompt: BookOpen,
  code: Code,
  workflow: PlayCircle,
  scenario: Lightbulb,
  other: BookOpen,
}

const typeLabels = {
  prompt: 'Exemple de prompt',
  code: 'Exemple de code',
  workflow: 'Workflow',
  scenario: 'Scénario',
  other: 'Exemple',
}

const difficultyColors = {
  débutant: 'bg-green-100 text-green-800 border-green-200',
  intermédiaire: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  avancé: 'bg-red-100 text-red-800 border-red-200',
}

// Default values to avoid unstable array expressions
const DEFAULT_TAGS: string[] = []
const DEFAULT_WARNINGS: string[] = []

export function Example({
  title,
  description,
  content,
  type = 'other',
  language,
  filename,
  outcome,
  tags = DEFAULT_TAGS,
  difficulty,
  warnings = DEFAULT_WARNINGS,
  className,
  variant = 'card',
}: ExampleProps) {
  const IconComponent = typeIcons[type]

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <IconComponent className="size-3 text-muted-foreground" />
        <span className="font-medium">{title}</span>
        {difficulty && (
          <Badge variant="outline" className={cn('text-xs', difficultyColors[difficulty])}>
            {difficultyLabels[difficulty]}
          </Badge>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={cn('my-3 p-3 bg-muted/50 rounded-lg border', className)}>
        <div className="flex items-center gap-2 mb-2">
          <IconComponent className="size-4 text-muted-foreground" />
          <span className="font-medium text-sm">{title}</span>
          {type !== 'other' && (
            <Badge variant="outline" className="text-xs">
              {typeLabels[type]}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
        )}
        {type === 'code' && language
          ? (
              <CodeBlock language={language} filename={filename}>
                {content}
              </CodeBlock>
            )
          : (
              <div className="text-sm leading-relaxed">
                <MarkdownRenderer content={content} />
              </div>
            )}
      </div>
    )
  }

  return (
    <Card className={cn('my-4', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconComponent className="size-4 text-muted-foreground" />
            <CardTitle className="text-base leading-tight">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {type !== 'other' && (
              <Badge variant="outline" className="text-xs">
                {typeLabels[type]}
              </Badge>
            )}
            {difficulty && (
              <Badge variant="outline" className={cn('text-xs', difficultyColors[difficulty])}>
                {difficultyLabels[difficulty]}
              </Badge>
            )}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {warnings.length > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Points de vigilance</p>
                <ul className="text-amber-700 space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index} className="text-sm">
                      •
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="example" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="example" className="text-xs">
              Exemple
            </TabsTrigger>
            {outcome && (
              <TabsTrigger value="outcome" className="text-xs">
                Résultat attendu
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="example" className="mt-4">
            {type === 'code' && language
              ? (
                  <CodeBlock language={language} filename={filename}>
                    {content}
                  </CodeBlock>
                )
              : (
                  <div className="text-sm leading-relaxed">
                    <MarkdownRenderer content={content} />
                  </div>
                )}
          </TabsContent>

          {outcome && (
            <TabsContent value="outcome" className="mt-4">
              <div className="text-sm leading-relaxed">
                <MarkdownRenderer content={outcome} />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
