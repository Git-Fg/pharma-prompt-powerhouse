'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { Card } from '@/components/ui/card'
import { ResponsiveDataTable } from '@/components/ui/data-table/ResponsiveDataTable'

interface ContentTableData {
  id: string
  cells: string[]
}

interface ContentTableProps {
  headers: string[]
  rows: string[][]
  caption?: string
  className?: string
}

export function ContentTable({ headers, rows, caption, className = '' }: ContentTableProps) {
  // Transform row data for ResponsiveDataTable
  const tableData: ContentTableData[] = rows.map((row, index) => ({
    id: `row-${index}`,
    cells: row,
  }))

  // Create columns for TanStack Table
  const columns: ColumnDef<ContentTableData>[] = headers.map((header, index) => ({
    id: `col-${index}`,
    header,
    cell: ({ row }) => (
      <MarkdownRenderer content={row.original.cells[index] || ''} />
    ),
    meta: {
      className: 'px-2 py-3 text-sm md:px-4 md:py-3 md:text-base',
    },
  }))

  // Mobile card renderer
  const renderMobileCard = (rowData: ContentTableData, index: number) => (
    <Card
      key={`mobile-row-${index}`}
      className="p-3 border-l-4 border-l-primary/20"
    >
      {rowData.cells.map((cell, cellIndex) => (
        <div

          key={`mobile-cell-${index}-${cellIndex}`}
          className="mb-2 last:mb-0"
        >
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {headers[cellIndex]}
          </div>
          <div className="text-sm leading-relaxed">
            <MarkdownRenderer content={cell} />
          </div>
        </div>
      ))}
    </Card>
  )

  return (
    <div className={className}>
      <ResponsiveDataTable
        data={tableData}
        columns={columns}
        renderMobileCard={renderMobileCard}
        tableCaption={caption || undefined}
        showMobileHeader={true}
        desktopClassName="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent rounded-lg border"
        mobileClassName="space-y-3"
      />
    </div>
  )
}
