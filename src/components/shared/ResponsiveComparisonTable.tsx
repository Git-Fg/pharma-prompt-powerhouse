// src/components/shared/ResponsiveComparisonTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import { table } from '@/lib/design-system'

interface ToolData {
  slug: string
  title: string
  description: string
  isFavorite?: boolean
  personalReview?: string
  confidenceScore?: number
  freeVsPaidOffer?: string
  use_cases?: string[]
  url: string
  tags?: string[]
}

interface ResponsiveComparisonTableProps {
  tools: ToolData[]
  className?: string
}

export function ResponsiveComparisonTable({ tools, className = '' }: ResponsiveComparisonTableProps) {
  const renderStarRating = (score?: number) => {
    if (!score) return <span className="text-muted-foreground">N/A</span>
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">
          {score}/5
        </span>
      </div>
    )
  }

  const getAvailability = (tool: ToolData) => {
    if (tool.freeVsPaidOffer && tool.freeVsPaidOffer.includes('Gratuit')) {
      return { label: 'Gratuit + Payant', color: 'bg-green-100 text-green-800' }
    }
    return { label: 'Gratuit', color: 'bg-blue-100 text-blue-800' }
  }

  return (
    <div className={className}>
      {/* Desktop Table View */}
      <div className={table.mobile.tableView}>
        <div className={table.responsive.container}>
          <Table className={table.responsive.table}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Outil</TableHead>
                <TableHead className="max-w-[300px]">Mon Avis</TableHead>
                <TableHead className={`w-[120px] ${table.mobile.hideColumns}`}>
                  Disponibilité
                </TableHead>
                <TableHead className="w-[120px]">Confiance</TableHead>
                <TableHead className={`w-[200px] ${table.mobile.hideColumns}`}>
                  Cas d'Usage
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => {
                const availability = getAvailability(tool)
                
                return (
                  <TableRow key={tool.slug} className="group hover:bg-muted/50">
                    <TableCell className={table.responsive.cell.normal}>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {tool.title}
                          {tool.isFavorite && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              ⭐ Favori
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tool.description}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className={`max-w-xs ${table.responsive.cell.normal}`}>
                      {tool.personalReview ? (
                        <p className="text-sm italic text-muted-foreground line-clamp-3">
                          "{tool.personalReview}"
                        </p>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    
                    <TableCell className={`${table.responsive.cell.normal} ${table.mobile.hideColumns}`}>
                      <Badge className={availability.color}>
                        {availability.label}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className={table.responsive.cell.normal}>
                      {renderStarRating(tool.confidenceScore)}
                    </TableCell>
                    
                    <TableCell className={`${table.responsive.cell.normal} ${table.mobile.hideColumns}`}>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                        {tool.use_cases && tool.use_cases.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tool.use_cases.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className={table.responsive.cell.normal}>
                      <div className="flex gap-2">
                        <Link 
                          href={`/l-arsenal-ia/${tool.slug}`}
                          className="text-primary hover:underline text-sm"
                        >
                          Détails
                        </Link>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className={table.mobile.cardView}>
        <div className="space-y-4">
          {tools.map((tool) => {
            const availability = getAvailability(tool)
            
            return (
              <Card key={tool.slug} className="hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {tool.title}
                      </CardTitle>
                      {tool.isFavorite && (
                        <Badge variant="secondary" className="text-xs">
                          ⭐
                        </Badge>
                      )}
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  
                  {tool.personalReview && (
                    <blockquote className="text-sm italic border-l-2 border-muted pl-3">
                      "{tool.personalReview}"
                    </blockquote>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className={availability.color}>
                      {availability.label}
                    </Badge>
                    {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {tool.confidenceScore && renderStarRating(tool.confidenceScore)}
                    <Link 
                      href={`/l-arsenal-ia/${tool.slug}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Voir les détails →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}