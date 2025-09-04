'use client'

import type { Concept, ExternalTool } from '@/lib/content-schema'
import { ExternalLink, Globe, Info, Lightbulb } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface InfoButtonProps {
  variant: 'concept' | 'tool'
  item: Concept | ExternalTool
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  variant,
  item,
  size = 'sm',
  className,
}) => {
  const [open, setOpen] = React.useState(false)

  const iconSize = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5',
  }[size]

  const buttonSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }[size]

  const renderConceptContent = (concept: Concept) => (
    <div className="space-y-3 max-w-sm">
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

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>
          Difficulté:
          {concept.difficulty}
        </span>
      </div>

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
    </div>
  )

  const renderToolContent = (tool: ExternalTool) => (
    <div className="space-y-3 max-w-sm">
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

      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +
              {tool.tags.length - 3}
              {' '}
              autres
            </span>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-2 border-t">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="size-3" />
          Visiter l'outil
        </a>
      </div>
    </div>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            buttonSize,
            'rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'group relative',
            className,
          )}
          aria-label={`Plus d'informations sur ${item.title}`}
        >
          <Info className={cn(iconSize, 'transition-transform group-hover:scale-110')} />

          {/* Subtle indicator for interactive element */}
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-4 animate-in fade-in-0 zoom-in-95 duration-200"
        side="top"
        align="center"
        sideOffset={8}
      >
        {variant === 'concept'
          ? renderConceptContent(item as Concept)
          : renderToolContent(item as ExternalTool)}
      </PopoverContent>
    </Popover>
  )
}
