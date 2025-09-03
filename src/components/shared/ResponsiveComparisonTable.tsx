import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import { AnimatedList, AnimatedItem, ScrollAnimated } from "@/components/ui/animated"
import { MagneticCard } from "@/components/ui/interactions"

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
    if (!score) return <span className="text-muted-foreground text-xs">N/A</span>
    
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
      return { label: 'Gratuit + Payant', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' }
    }
    return { label: 'Gratuit', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' }
  }

  return (
    <ScrollAnimated className={className} variant="slideUp">
      {/* Desktop Table View - Using centralized CSS classes */}
      <div className="desktop-table">
        <div className="table-wrapper">
          <Table className="table-responsive">
            <TableHeader className="table-header">
              <TableRow>
                <TableHead className="table-header-cell w-[200px]">Outil</TableHead>
                <TableHead className="table-header-cell max-w-[300px]">Mon Avis</TableHead>
                <TableHead className="table-header-cell w-[120px] hidden sm:table-cell">
                  Disponibilité
                </TableHead>
                <TableHead className="table-header-cell w-[120px]">Confiance</TableHead>
                <TableHead className="table-header-cell w-[200px] hidden lg:table-cell">
                  Cas d'Usage
                </TableHead>
                <TableHead className="table-header-cell w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => {
                const availability = getAvailability(tool)
                
                return (
                  <TableRow key={tool.slug} className="group hover:bg-muted/50 hover-lift transition-all duration-200">
                    <TableCell className="table-cell">
                      <div className="space-y-1">
                        <div className="font-medium responsive-text">
                          {tool.title}
                          {tool.isFavorite && (
                            <Badge variant="secondary" className="ml-2 text-xs animate-bounce-subtle">
                              ⭐ Favori
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {tool.description}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="table-cell max-w-xs">
                      {tool.personalReview ? (
                        <p className="text-sm italic text-muted-foreground line-clamp-3 leading-relaxed">
                          "{tool.personalReview}"
                        </p>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    
                    <TableCell className="table-cell hidden sm:table-cell">
                      <Badge className={availability.color}>
                        {availability.label}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="table-cell">
                      {renderStarRating(tool.confidenceScore)}
                    </TableCell>
                    
                    <TableCell className="table-cell hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs hover-scale">
                            {useCase}
                          </Badge>
                        ))}
                        {tool.use_cases && tool.use_cases.length > 2 && (
                          <Badge variant="outline" className="text-xs hover-scale">
                            +{tool.use_cases.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className="table-cell">
                      <div className="flex gap-2">
                        <Link 
                          href={`/l-arsenal-ia/${tool.slug}`}
                          className="text-primary hover:underline text-sm font-medium focus-ring hover-lift"
                        >
                          Détails
                        </Link>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors focus-ring hover-lift"
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

      {/* Mobile Card View - Using centralized CSS classes with animations */}
      <div className="mobile-card">
        <AnimatedList className="content-spacing flex flex-col" staggerDelay={0.1}>
          {tools.map((tool, index) => {
            const availability = getAvailability(tool)
            
            return (
              <AnimatedItem key={tool.slug} delay={index * 0.1}>
                <MagneticCard className="hover:border-primary transition-colors duration-300">
                  <CardHeader className="card-header">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="card-title responsive-subheading">
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
                    <p className="responsive-text text-muted-foreground leading-relaxed">{tool.description}</p>
                    
                    {tool.personalReview && (
                      <blockquote className="text-sm italic border-l-2 border-muted pl-3 leading-relaxed">
                        "{tool.personalReview}"
                      </blockquote>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={availability.color}>
                        {availability.label}
                      </Badge>
                      {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs hover-scale">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="card-footer">
                      <div>{tool.confidenceScore && renderStarRating(tool.confidenceScore)}</div>
                      <Link 
                        href={`/l-arsenal-ia/${tool.slug}`}
                        className="text-primary hover:underline text-sm font-medium focus-ring hover-lift inline-flex items-center gap-1"
                      >
                        Voir les détails
                        <span className="transition-transform hover:scale-110">→</span>
                      </Link>
                    </div>
                  </CardContent>
                </MagneticCard>
              </AnimatedItem>
            )
          })}
        </AnimatedList>
      </div>
    </ScrollAnimated>
  )
}