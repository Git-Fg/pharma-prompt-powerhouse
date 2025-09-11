'use client'

import { BookOpen, ExternalLink, FileText, Quote } from 'lucide-react'
import { useMemo } from 'react'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { designTokens } from '@/design-system/tokens'

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
      <span className={cn('inline-flex items-center gap-1 prose-caption', className)} style={{ gap: designTokens.spacing.xs }}>
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
      <span className={cn('inline-flex items-center gap-2 prose-caption', className)} style={{ gap: designTokens.spacing.sm }}>
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
    <Card className={cn('my-4', className)} style={{ marginTop: designTokens.spacing.lg, marginBottom: designTokens.spacing.lg }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between" style={{ gap: designTokens.spacing.md }}>
          <div className="flex items-center gap-2" style={{ gap: designTokens.spacing.sm }}>
            <IconComponent className="size-4 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">
              {typeLabels[type]}
            </Badge>
          </div>
          <div className="flex items-center gap-1 prose-caption prose-caption-xs text-muted-foreground" style={{ gap: designTokens.spacing.xs }}>
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
          <CardTitle className="prose-lg leading-tight">{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {citationText && (
          <p className="prose-caption text-muted-foreground" style={{ marginBottom: designTokens.spacing.sm }}>
            {citationText}
          </p>
        )}
        {abstract && (
          <details className="group">
            <summary className="cursor-pointer prose-caption prose-caption-sm font-medium hover:text-primary transition-colors">
              Résumé
            </summary>
            <p className="prose-caption text-muted-foreground leading-relaxed" style={{ marginTop: designTokens.spacing.sm }}>
              {abstract}
            </p>
          </details>
        )}
      </CardContent>
    </Card>
  )
}
