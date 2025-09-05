// src/components/shared/ComparisonTableColumns.tsx
'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { ExternalTool } from '@/lib/content-schema'
import { ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { getStarRatingProps } from '@/lib/ui-utils'

// Helper pour le rendu des étoiles
function renderStarRating(score?: number) {
  if (!score)
    return <span className="text-muted-foreground text-xs">N/A</span>

  const starProps = getStarRatingProps(score)
  return (
    <div className="flex items-center gap-1">
      {starProps.stars.map(star => (
        <Star
          key={star.index}
          className={`w-3 h-3 ${star.className}`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">
        {score}
        /5
      </span>
    </div>
  )
}

// Helper pour la disponibilité
function getAvailabilityBadge(tool: ExternalTool) {
  if (tool.freeVsPaidOffer && tool.freeVsPaidOffer.includes('Gratuit')) {
    return (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
        Gratuit + Payant
      </Badge>
    )
  }
  return (
    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
      Gratuit
    </Badge>
  )
}

// Définitions des colonnes pour TanStack Table
export const comparisonTableColumns: ColumnDef<ExternalTool>[] = [
  {
    accessorKey: 'title',
    header: 'Outil',
    cell: ({ row }) => {
      const tool = row.original
      return (
        <div className="space-y-1">
          <div className="font-medium responsive-text">
            {tool.title}
            {tool.isFavorite && (
              <Badge variant="secondary" className="ml-2 text-xs animate-bounce-subtle">
                ⭐ Favori
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-2 text-pretty">
            {tool.description}
          </div>
        </div>
      )
    },
    size: 200,
  },
  {
    accessorKey: 'personalReview',
    header: 'Mon Avis',
    cell: ({ getValue }) => {
      const personalReview = getValue() as string
      return personalReview
        ? (
            <p className="text-sm italic text-muted-foreground line-clamp-3 leading-relaxed text-pretty">
              "
              {personalReview}
              "
            </p>
          )
        : (
            <span className="text-muted-foreground">-</span>
          )
    },
    size: 300,
  },
  {
    accessorKey: 'freeVsPaidOffer',
    header: 'Disponibilité',
    cell: ({ row }) => getAvailabilityBadge(row.original),
    size: 120,
    meta: {
      className: 'hidden sm:table-cell',
    },
  },
  {
    accessorKey: 'confidenceScore',
    header: 'Confiance',
    cell: ({ getValue }) => renderStarRating(getValue() as number),
    size: 120,
  },
  {
    accessorKey: 'use_cases',
    header: 'Cas d\'Usage',
    cell: ({ getValue }) => {
      const useCases = getValue() as string[]
      return useCases
        ? (
            <div className="flex flex-wrap gap-1 max-w-xs">
              {useCases.slice(0, 2).map((useCase: string, i: number) => (
                <Badge key={`usecase-${useCase.replace(/\s+/g, '-').toLowerCase()}-${i}`} variant="outline" className="text-xs hover-scale text-pretty">
                  {useCase}
                </Badge>
              ))}
              {useCases.length > 2 && (
                <Badge variant="outline" className="text-xs hover-scale">
                  +
                  {useCases.length - 2}
                </Badge>
              )}
            </div>
          )
        : null
    },
    size: 200,
    meta: {
      className: 'hidden lg:table-cell',
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const tool = row.original
      return (
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/l-arsenal-ia/${tool.slug}`}>
              Détails
            </Link>
          </Button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors focus-ring hover-lift"
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
      )
    },
    size: 100,
  },
]
