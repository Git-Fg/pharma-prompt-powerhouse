import type { ColumnDef } from '@tanstack/react-table'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ResponsiveDataTable } from '@/components/ui/data-table/ResponsiveDataTable'
import { useIsMobile } from '@/hooks/use-mobile'

interface TestData {
  id: number
  name: string
  category: string
  status: 'active' | 'inactive'
}

const mockData: TestData[] = [
  { id: 1, name: 'Item 1', category: 'Category A', status: 'active' },
  { id: 2, name: 'Item 2', category: 'Category B', status: 'inactive' },
  { id: 3, name: 'Item 3', category: 'Category A', status: 'active' },
]

const mockColumns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className={row.original.status === 'active' ? 'text-green-600' : 'text-red-600'}>
        {row.original.status}
      </span>
    ),
  },
]

// Mock the mobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

function mockRenderMobileCard(item: TestData, index: number) {
  return (
    <div key={index} data-testid={`mobile-card-${index}`}>
      <h3>{item.name}</h3>
      <p>{item.category}</p>
      <p>{item.status}</p>
    </div>
  )
}

describe('responsiveDataTable', () => {
  it('renders table in desktop mode', () => {
    render(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        renderMobileCard={mockRenderMobileCard}
      />,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()

    // Check data rows
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Category A')).toBeInTheDocument()
  })

  it('switches to mobile card view on mobile devices', () => {
    // Mock mobile device
    vi.mocked(useIsMobile).mockReturnValue(true)

    render(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        renderMobileCard={mockRenderMobileCard}
      />,
    )

    // Should show mobile cards instead of table
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    // Should still show data but in card format
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Category A')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    render(
      <ResponsiveDataTable
        data={[]}
        columns={mockColumns}
        ariaLabel="Empty data table"
      />,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()

    // Should not show any data rows
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        renderMobileCard={mockRenderMobileCard}
        className="custom-table-class"
      />,
    )

    const tableContainer = screen.getByRole('table').closest('div')
    expect(tableContainer).toHaveClass('custom-table-class')
  })

  it('renders custom cell content correctly', () => {
    render(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        renderMobileCard={mockRenderMobileCard}
      />,
    )

    // Check that custom cell rendering works (status column)
    const activeItems = screen.getAllByText('active')
    const inactiveItems = screen.getAllByText('inactive')

    expect(activeItems).toHaveLength(2)
    expect(inactiveItems).toHaveLength(1)
  })

  it('provides proper accessibility attributes', () => {
    render(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        ariaLabel="Accessible data table"
      />,
    )

    const table = screen.getByRole('table')
    expect(table).toHaveAccessibleName('Accessible data table')
  })

  it('handles sorting when sortable columns are provided', () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
      },
    ]

    render(
      <ResponsiveDataTable
        data={mockData}
        columns={sortableColumns}
        ariaLabel="Sortable data table"
      />,
    )

    // Should render sortable headers
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('maintains responsive behavior with large datasets', () => {
    const largeDataset = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      category: `Category ${i % 3 + 1}`,
      status: (i % 2 === 0 ? 'active' : 'inactive') as 'active' | 'inactive',
    }))

    render(
      <ResponsiveDataTable
        data={largeDataset}
        columns={mockColumns}
        ariaLabel="Large dataset table"
      />,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 100')).toBeInTheDocument()
  })
})
