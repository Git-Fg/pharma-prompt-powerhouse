'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { AnimatedList, AnimatedItem, ScrollAnimated } from "@/components/ui/animated";
import { MagneticCard } from "@/components/ui/interactions";
import { ExternalTool } from '@/lib/content-schema';
import { comparisonTableColumns } from './ComparisonTableColumns';

interface ResponsiveComparisonTableProps {
  tools: ExternalTool[];
  className?: string;
}

export function ResponsiveComparisonTable({ tools, className = '' }: ResponsiveComparisonTableProps) {
  // Initialize TanStack Table
  const table = useReactTable({
    data: tools,
    columns: comparisonTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

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

  const getAvailability = (tool: ExternalTool) => {
    if (tool.freeVsPaidOffer && tool.freeVsPaidOffer.includes('Gratuit')) {
      return { label: 'Gratuit + Payant', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' }
    }
    return { label: 'Gratuit', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' }
  }

  return (
    <ScrollAnimated className={className} variant="slideUp">
      {/* Desktop Table View - Using TanStack Table */}
      <div className="desktop-table">
        <div className="table-wrapper">
          <Table className="table-responsive">
            <TableHeader className="table-header">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // Type assertion for meta className - TanStack Table supports this pattern
                    const metaClass = (header.column.columnDef.meta as { className?: string })?.className || '';
                    return (
                      <TableHead 
                        key={header.id}
                        className={`table-header-cell ${metaClass}`}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())
                        }
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group hover:bg-muted/50 hover-lift transition-all duration-200">
                  {row.getVisibleCells().map((cell) => {
                    // Type assertion for meta className
                    const metaClass = (cell.column.columnDef.meta as { className?: string })?.className || '';
                    return (
                      <TableCell 
                        key={cell.id}
                        className={`table-cell ${metaClass}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View - Keep existing implementation */}
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
                        "{tool.personalReview}"
                      </blockquote>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={availability.color}>
                        {availability.label}
                      </Badge>
                      {tool.use_cases?.slice(0, 2).map((useCase: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs hover-scale text-pretty">
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