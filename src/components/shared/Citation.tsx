'use client'

import { BookOpen, ExternalLink, FileText, Quote } from 'lucide-react'
import { useMemo } from 'react'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CitationProps {
  source: string
  title?: string
  url?: string
  type?: 'article' | 'book' | 'website' | 'study' | 'guideline' | 'other'
  author?: string
  year?: string
  doi?: string
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  abstract?: string
  className?: string
  variant?: 'inline' | 'card' | 'compact'
}

const typeIcons = {
  article: FileText,
  book: BookOpen,
  website: ExternalLink,
  study: FileText,
  guideline: FileText,
  other: Quote,
}

const typeLabels = {
  article: 'Article',
  book: 'Livre',
  website: 'Site web',
  study: 'Étude',
  guideline: 'Recommandation',
  other: 'Source',
}

export function Citation({
  source,
  title,
  url,
  type = 'other',
  author,
  year,
  doi,
  journal,
  volume,
  issue,
  pages,
  abstract,
  className,
  variant = 'inline',
}: CitationProps) {
  const IconComponent = typeIcons[type]
  const isCompact = variant === 'compact'

  const citationText = useMemo(() => {
    const parts = []

    if (author)
      parts.push(author)
    if (year)
      parts.push(`(${year})`)
    if (title)
      parts.push(title)
    if (journal)
      parts.push(journal)
    if (volume)
      parts.push(`vol. ${volume}`)
    if (issue)
      parts.push(`no. ${issue}`)
    if (pages)
      parts.push(`pp. ${pages}`)
    if (doi)
      parts.push(`DOI: ${doi}`)

    return parts.join(', ')
  }, [author, year, title, journal, volume, issue, pages, doi])

  if (isCompact) {
    return (
      <span className={cn('inline-flex items-center gap-1 text-sm', className)}>
        <IconComponent className="size-3 text-muted-foreground" />
        <span className="text-muted-foreground">
          [
          {source}
          ]
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            <ExternalLink className="size-3" />
          </a>
        )}
      </span>
    )
  }

  if (variant === 'inline') {
    return (
      <span className={cn('inline-flex items-center gap-2 text-sm', className)}>
        <IconComponent className="size-3 text-muted-foreground" />
        <span className="text-muted-foreground">
          [
          {source}
          ]
        </span>
        {title && (
          <span className="font-medium">
            «
            {title}
            {' '}
            »
          </span>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            <ExternalLink className="size-3" />
            Source
          </a>
        )}
      </span>
    )
  }

  return (
    <Card className={cn('my-4', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconComponent className="size-4 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">
              {typeLabels[type]}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            [
            {source}
            ]
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
        {title && (
          <CardTitle className="text-base leading-tight">{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {citationText && (
          <p className="text-sm text-muted-foreground mb-2">
            {citationText}
          </p>
        )}
        {abstract && (
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium hover:text-primary transition-colors">
              Résumé
            </summary>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {abstract}
            </p>
          </details>
        )}
      </CardContent>
    </Card>
  )
}
