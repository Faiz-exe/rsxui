import { useState } from 'react'
import { Table, type TableColumn } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocP,
  InlineCode,
} from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

type Product = {
  id: string
  code: string
  name: string
  category: string
  quantity: number
  price: number
}

const products: Product[] = [
  { id: '1', code: 'A100', name: 'Keyboard', category: 'Accessories', quantity: 21, price: 49 },
  { id: '2', code: 'A101', name: 'Mouse', category: 'Accessories', quantity: 75, price: 24 },
  { id: '3', code: 'A102', name: 'Monitor', category: 'Display', quantity: 9, price: 219 },
  { id: '4', code: 'A103', name: 'Dock', category: 'Accessories', quantity: 14, price: 89 },
  { id: '5', code: 'A104', name: 'Headset', category: 'Audio', quantity: 28, price: 79 },
  { id: '6', code: 'A105', name: 'Webcam', category: 'Video', quantity: 17, price: 59 },
  { id: '7', code: 'A106', name: 'USB Hub', category: 'Accessories', quantity: 36, price: 29 },
]

const columns: TableColumn<Product>[] = [
  { field: 'code', header: 'Code', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category', sortable: true },
  { field: 'quantity', header: 'Qty', sortable: true },
  {
    field: 'price',
    header: 'Price',
    sortable: true,
    body: (row) => `$${row.price}`,
  },
]

const tableProps = [
  { name: 'value', type: 'Row[]', description: 'Rows rendered by the table.' },
  { name: 'columns', type: 'TableColumn<Row>[]', description: 'Column model (field, header, sortable, optional body template).' },
  { name: 'dataKey', type: 'string', description: 'Optional unique row key path.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Density for cell padding and text size.' },
  { name: 'stripedRows', type: 'boolean', default: 'false', description: 'Alternating row background.' },
  { name: 'showGridlines', type: 'boolean', default: 'false', description: 'Vertical and horizontal borders between cells.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading row instead of data.' },
  { name: 'loadingTemplate', type: '(ctx) => ReactNode', description: 'Custom loading row renderer.' },
  { name: 'emptyMessage', type: 'ReactNode', default: "'No records found.'", description: 'Message when there are no rows.' },
  { name: 'emptyTemplate', type: '(ctx) => ReactNode', description: 'Custom empty-state row renderer.' },
  { name: 'sortField', type: 'string', description: 'Controlled sort field.' },
  { name: 'sortOrder', type: '1 | -1 | 0', default: '0', description: 'Controlled sort order.' },
  { name: 'onSortChange', type: '(state) => void', description: 'Sort callback for controlled mode.' },
  { name: 'selectionMode', type: "'single' | 'multiple'", description: 'Enables row selection behavior.' },
  { name: 'selection', type: 'Row | Row[] | null', description: 'Controlled selected row(s).' },
  { name: 'defaultSelection', type: 'Row | Row[] | null', description: 'Uncontrolled initial selected row(s).' },
  { name: 'onSelectionChange', type: '(selection) => void', description: 'Selection callback (single row, row array, or null).' },
  { name: 'showSelectionColumn', type: 'boolean', default: 'false', description: 'Shows radio/checkbox selection column.' },
  { name: 'rowSelectable', type: '(row) => boolean', description: 'Disable selection for specific rows.' },
  { name: 'selectionPageOnly', type: 'boolean', default: 'false', description: 'In multiple mode, header checkbox affects only visible page rows.' },
  { name: 'paginator', type: 'boolean', default: 'false', description: 'Enables built-in paginator footer.' },
  { name: 'rows', type: 'number', default: '10', description: 'Rows per page.' },
  { name: 'first', type: 'number', default: '0', description: 'Zero-based first row index in controlled paging.' },
  { name: 'rowsPerPageOptions', type: 'number[]', default: '[5, 10, 25, 50]', description: 'Rows-per-page select options.' },
  { name: 'onPageChange', type: '(state) => void', description: 'Paging callback for controlled mode.' },
  { name: 'header', type: 'ReactNode', description: 'Optional content above the table container.' },
  { name: 'footer', type: 'ReactNode', description: 'Optional content below the table container.' },
  { name: 'className', type: 'string', description: 'Merged on the root wrapper.' },
  { name: 'style', type: 'React.CSSProperties', description: 'Inline styles on the root wrapper.' },
] as const

export function TableDoc() {
  useDocMeta('Table', 'Sortable columns, pagination, loading, and empty states.')
  const [sortField, setSortField] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<1 | -1 | 0>(1)
  const [selectedOne, setSelectedOne] = useState<Product | null>(null)
  const [selectedMany, setSelectedMany] = useState<Product[]>([])

  return (
    <DocArticle>
      <DocH1>Table</DocH1>
      <DocLead>
        Data table component for tabular datasets with sortable columns, optional
        pagination, striped rows, grid lines, and loading/empty states.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Table, type TableColumn" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Define column metadata and pass row data via <InlineCode>value</InlineCode>.
        Set <InlineCode>sortable</InlineCode> per column to enable header sorting.
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<Table value={products} columns={columns} dataKey="id" />`}
      >
        <Table value={products} columns={columns} dataKey="id" />
      </DocPreview>

      <DocH2 id="styles">Striped + Grid</DocH2>
      <DocPreview
        title="Striped + Grid"
        code={`<Table
  value={products}
  columns={columns}
  dataKey="id"
  stripedRows
  showGridlines
  size="sm"
/>`}
      >
        <Table
          value={products}
          columns={columns}
          dataKey="id"
          stripedRows
          showGridlines
          size="sm"
        />
      </DocPreview>

      <DocH2 id="sorting">Controlled sorting</DocH2>
      <DocPreview
        title="Controlled sorting"
        code={`<Table
  value={products}
  columns={columns}
  dataKey="id"
  sortField={sortField}
  sortOrder={sortOrder}
  onSortChange={(s) => {
    setSortField(s.field ?? '')
    setSortOrder(s.order)
  }}
/>`}
      >
        <Table
          value={products}
          columns={columns}
          dataKey="id"
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={(s) => {
            setSortField(s.field ?? '')
            setSortOrder(s.order)
          }}
        />
      </DocPreview>

      <DocH2 id="pagination">Pagination</DocH2>
      <DocPreview
        title="Paginator"
        code={`<Table
  value={products}
  columns={columns}
  dataKey="id"
  paginator
  rows={3}
/>`}
      >
        <Table value={products} columns={columns} dataKey="id" paginator rows={3} />
      </DocPreview>

      <DocH2 id="selection">Selection</DocH2>
      <DocPreview
        title="Single + Multiple (checkbox column)"
        code={`<Table
  value={products}
  columns={columns}
  dataKey="id"
  selectionMode="single"
  selection={selectedOne}
  onSelectionChange={(s) => setSelectedOne((s as Product | null) ?? null)}
  showSelectionColumn
/>
<Table
  value={products}
  columns={columns}
  dataKey="id"
  selectionMode="multiple"
  selection={selectedMany}
  onSelectionChange={(s) => setSelectedMany((s as Product[]) ?? [])}
  showSelectionColumn
  selectionPageOnly
  paginator
  rows={4}
/>`}
      >
        <div style={{ display: 'grid', gap: 16 }}>
          <Table
            value={products}
            columns={columns}
            dataKey="id"
            selectionMode="single"
            selection={selectedOne}
            onSelectionChange={(s) => setSelectedOne((s as Product | null) ?? null)}
            showSelectionColumn
          />
          <Table
            value={products}
            columns={columns}
            dataKey="id"
            selectionMode="multiple"
            selection={selectedMany}
            onSelectionChange={(s) => setSelectedMany((s as Product[]) ?? [])}
            showSelectionColumn
            selectionPageOnly
            paginator
            rows={4}
          />
        </div>
      </DocPreview>

      <DocH2 id="states">Loading / Empty</DocH2>
      <DocPreview
        title="States"
        code={`<Table value={[]} columns={columns} emptyMessage="No products" />
<Table value={products} columns={columns} loading />
<Table
  value={[]}
  columns={columns}
  emptyTemplate={() => <em>No matches. Try clearing filters.</em>}
/>`}
      >
        <div style={{ display: 'grid', gap: 16 }}>
          <Table value={[]} columns={columns} emptyMessage="No products" />
          <Table value={products} columns={columns} loading />
          <Table
            value={[]}
            columns={columns}
            emptyTemplate={() => <em>No matches. Try clearing filters.</em>}
          />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...tableProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Uses native <InlineCode>&lt;table&gt;</InlineCode> semantics with headers in{' '}
        <InlineCode>&lt;th&gt;</InlineCode> and data cells in{' '}
        <InlineCode>&lt;td&gt;</InlineCode>. Sortable headers expose{' '}
        <InlineCode>aria-sort</InlineCode> when active.
      </DocP>
      <DocP>
        Keyboard interaction uses native controls: sort headers are clickable and
        paginator actions are regular buttons/selects in tab order.
      </DocP>
    </DocArticle>
  )
}
