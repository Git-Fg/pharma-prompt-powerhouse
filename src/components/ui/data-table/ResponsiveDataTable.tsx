'use client'

import type {
  ColumnDef,
  RowData,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ResponsiveDataTableProps<TData extends RowData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  renderMobileCard: (item: TData, index: number) => React.ReactNode
  className?: string
  mobileClassName?: string
  desktopClassName?: string
  tableCaption?: string
  showMobileHeader?: boolean
}

export function ResponsiveDataTable<TData extends RowData>({
  data,
  columns,
  renderMobileCard,
  className = '',
  mobileClassName = '',
  desktopClassName = '',
  tableCaption,
  showMobileHeader = true,
}: ResponsiveDataTableProps<TData>) {
  // Initialize TanStack Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={className}>
      {/* Desktop Table View - Using TanStack Table */}
      <div className={`hidden md:block ${desktopClassName}`}>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <Table className="w-full min-w-[600px]">
            {tableCaption && (
              <caption className="text-sm text-muted-foreground mb-2 text-left">
                {tableCaption}
              </caption>
            )}
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // Type assertion for meta className - TanStack Table supports this pattern
                    const metaClass = (header.column.columnDef.meta as { className?: string })?.className || ''
                    return (
                      <TableHead
                        key={header.id}
                        className={metaClass}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="group hover:bg-muted/50 hover-lift transition-all duration-200 even:bg-muted/30">
                  {row.getVisibleCells().map((cell) => {
                    // Type assertion for meta className
                    const metaClass = (cell.column.columnDef.meta as { className?: string })?.className || ''
                    return (
                      <TableCell
                        key={cell.id}
                        className={metaClass}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className={`block md:hidden ${mobileClassName}`}>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div

              key={`mobile-row-${index}`}
            >
              {renderMobileCard(item, index)}
            </div>
          ))}
          {tableCaption && showMobileHeader && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              {tableCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
