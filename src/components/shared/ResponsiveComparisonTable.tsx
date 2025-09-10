'use client'

import type { ExternalTool } from '@/lib/content-schema'
import { ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Animate, StaggeredContainer } from '@/components/ui/Animate'
import Badge from '@/components/ui/badge'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveDataTable } from '@/components/ui/data-table/ResponsiveDataTable'
import { SimpleCard } from '@/components/ui/SimpleCard'
import { getStarRatingProps } from '@/lib/ui-utils'
import { comparisonTableColumns } from './ComparisonTableColumns'

interface ResponsiveComparisonTableProps {
  tools: ExternalTool[]
  className?: string
}

export function ResponsiveComparisonTable({ tools, className = '' }: ResponsiveComparisonTableProps) {
  const getAvailability = (tool: ExternalTool) => {
    if (tool.freeVsPaidOffer && tool.freeVsPaidOffer.includes('Gratuit')) {
      return { label: 'Gratuit + Payant', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' }
    }
    return { label: 'Gratuit', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' }
  }

  // Mobile card renderer function
  const renderMobileCard = (tool: ExternalTool, index: number) => {
    const availability = getAvailability(tool)

    return (
      <Animate variant="slideUp" staggerIndex={index}>
        <SimpleCard className="hover:border-primary transition-colors duration-300">
          <CardHeader className="card-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="card-title responsive-subheading text-pretty">
                  {tool.title}
                </CardTitle>
                {tool.isFavorite && (
                  <Badge variant="secondary" className="text-xs animate-pulse-subtle">
                    ⭐
                  </Badge>
                )}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors focus-ring hover-scale"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            <p className="responsive-text text-muted-foreground leading-relaxed text-pretty">{tool.description}</p>

            {tool.personalReview && (
              <blockquote className="text-sm italic border-l-2 border-muted pl-3 leading-relaxed text-pretty">
                "
                {tool.personalReview}
                "
              </blockquote>
            )}

            <div className="flex flex-wrap gap-2">
              <Badge className={availability.color}>
                {availability.label}
              </Badge>
              {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                // eslint-disable-next-line react/no-array-index-key -- Index acceptable pour des badges avec texte unique et prévisible
                <Badge key={`usecase-${useCase.replace(/\s+/g, '-').toLowerCase()}-${i}`} variant="outline" className="text-xs hover-scale text-pretty">
                  {useCase}
                </Badge>
              ))}
            </div>

            <div className="card-footer">
              <div>
                {tool.confidenceScore && (
                  <div className="flex items-center gap-1">
                    {getStarRatingProps(tool.confidenceScore).stars.map(star => (
                      <Star
                        key={star.index}
                        className={`w-3 h-3 ${star.className}`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      {tool.confidenceScore}
                      /5
                    </span>
                  </div>
                )}
                {!tool.confidenceScore && (
                  <span className="text-muted-foreground text-xs">N/A</span>
                )}
              </div>
              <Link
                href={`/l-arsenal-ia/${tool.slug}`}
                className="text-primary hover:underline text-sm font-medium focus-ring hover-lift inline-flex items-center gap-1"
              >
                Voir les détails
                <span className="transition-transform hover:scale-110">→</span>
              </Link>
            </div>
          </CardContent>
        </SimpleCard>
      </Animate>
    )
  }

  return (
    <Animate variant="fadeIn" delay={200} className={className}>
      <StaggeredContainer staggerDelay={100} className="content-spacing flex flex-col">
        <ResponsiveDataTable
          data={tools}
          columns={comparisonTableColumns}
          renderMobileCard={renderMobileCard}
          mobileClassName="space-y-4"
          desktopClassName="table-wrapper"
        />
      </StaggeredContainer>
    </Animate>
  )
}
