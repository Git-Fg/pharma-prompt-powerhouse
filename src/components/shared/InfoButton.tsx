'use client'

import type { Concept, ExternalTool } from '@/lib/content-schema'
import { ExternalLink, Globe, Info, Lightbulb } from 'lucide-react'
import React from 'react'
import { Container } from '@/components/layout/Container'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface InfoButtonProps {
  content: Concept | ExternalTool
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function InfoButton({ content, size = 'md', className }: InfoButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size]

  const buttonSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }[size]

  const renderConceptContent = (concept: Concept) => (
    <Container variant="detail" className="space-y-3 px-0">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
          <Lightbulb className="size-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm mb-1 text-balance">{concept.title}</h4>
          <Badge variant="secondary" className="text-xs">
            {concept.category}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
        {concept.description}
      </p>

      {'difficulty' in concept && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            Difficulté:
            {concept.difficulty}
          </span>
        </div>
      )}

      {concept.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {concept.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {concept.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +
              {concept.tags.length - 3}
              {' '}
              autres
            </span>
          )}
        </div>
      )}
    </Container>
  )

  const renderToolContent = (tool: ExternalTool) => (
    <Container variant="detail" className="space-y-3 px-0">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
          <Globe className="size-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm mb-1 text-balance">{tool.title}</h4>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {tool.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {'⭐'.repeat(Math.floor(tool.confidenceScore / 2))}
              {' '}
              Confiance
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
        {tool.description}
      </p>

      {tool.url && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          asChild
        >
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="size-3" />
            Visiter le site
          </a>
        </Button>
      )}
    </Container>
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            iconSize,
            buttonSize,
            'p-0',
            className,
          )}
        >
          <Info className={iconSize} />
          <span className="sr-only">Plus d'informations</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="bottom" align="start">
        {'url' in content ? renderToolContent(content) : renderConceptContent(content)}
      </PopoverContent>
    </Popover>
  )
}
