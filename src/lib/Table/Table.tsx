import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import { Pagination } from '../Pagination/Pagination'
import { Spinner } from '../Spinner/Spinner'
import { mergeSx } from '../utils/mergeSx'
import { styles, tablePagerStyles } from './Table.stylex'

export type TableColumn<Row> = {
  field: string
  header: ReactNode
  sortable?: boolean
  body?: (row: Row) => ReactNode
  className?: string
  style?: React.ComponentPropsWithoutRef<'td'>['style']
  headerClassName?: string
  headerStyle?: React.ComponentPropsWithoutRef<'th'>['style']
}

export type TableSortState = {
  field?: string
  order: 1 | -1 | 0
}

export type TableSelectionMode = 'single' | 'multiple'

export type TableProps<Row> = {
  value: readonly Row[]
  columns: readonly TableColumn<Row>[]
  dataKey?: keyof Row | string
  size?: 'sm' | 'md' | 'lg'
  stripedRows?: boolean
  showGridlines?: boolean
  loading?: boolean
  loadingLabel?: ReactNode
  loadingTemplate?: (ctx: { colSpan: number }) => ReactNode
  emptyMessage?: ReactNode
  emptyTemplate?: (ctx: { colSpan: number }) => ReactNode
  header?: ReactNode
  footer?: ReactNode
  className?: string
  style?: React.ComponentPropsWithoutRef<'div'>['style']
  sortField?: string
  sortOrder?: 1 | -1 | 0
  removableSort?: boolean
  onSortChange?: (state: TableSortState) => void
  paginator?: boolean
  rows?: number
  first?: number
  rowsPerPageOptions?: readonly number[]
  onPageChange?: (state: { first: number; rows: number; page: number }) => void
  // Paginator options
  /** Number of pages shown on each side of the current page. Default 1. */
  siblingCount?: number
  /** Number of pages always shown at the beginning and end. Default 1. */
  boundaryCount?: number
  /** Show first-page jump button (‹‹). */
  showFirstButton?: boolean
  /** Show last-page jump button (››). */
  showLastButton?: boolean
  /** 'text' (no border, default) | 'outlined' (bordered). */
  paginatorVariant?: 'text' | 'outlined'
  /** 'circular' (pill, default) | 'rounded' (square-ish). */
  paginatorShape?: 'circular' | 'rounded'
  /** Accent colour applied to the active page pill. */
  paginatorColor?: 'primary' | 'secondary' | 'standard'
  /** Disable the entire paginator. */
  paginatorDisabled?: boolean
  selectionMode?: TableSelectionMode
  selection?: Row | Row[] | null
  defaultSelection?: Row | Row[] | null
  onSelectionChange?: (selection: Row | Row[] | null) => void
  showSelectionColumn?: boolean
  rowSelectable?: (row: Row) => boolean
  selectionPageOnly?: boolean
}

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

function nextSort(order: 1 | -1 | 0, removableSort: boolean): 1 | -1 | 0 {
  if (order === 1) return -1
  if (order === -1) return removableSort ? 0 : 1
  return 1
}

function rowKey<Row>(row: Row, dataKey: keyof Row | string | undefined, fallback: number): string {
  if (dataKey != null) return String(getByPath(row, String(dataKey)))
  return `row-${fallback}`
}


function TableInner<Row>(
  {
    value,
    columns,

    dataKey,
    size = 'md',
    stripedRows = false,
    showGridlines = false,
    loading = false,
    loadingLabel = 'Loading…',
    loadingTemplate,
    emptyMessage = 'No records found.',
    emptyTemplate,
    header,
    footer,
    className,
    style,
    sortField,
    sortOrder = 0,
    removableSort = true,
    onSortChange,
    paginator = false,
    rows = 10,
    first = 0,
    rowsPerPageOptions = [5, 10, 25, 50],
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    showFirstButton = false,
    showLastButton = false,
    paginatorVariant = 'text',
    paginatorShape = 'circular',
    paginatorColor = 'primary',
    paginatorDisabled = false,
    selectionMode,
    selection,
    defaultSelection = null,
    onSelectionChange,
    showSelectionColumn = false,
    rowSelectable,
    selectionPageOnly = false,
  }: TableProps<Row>,
  ref: Ref<HTMLDivElement>,
) {
  const tableUid = useId()
  const radioGroupName = `rsx-table-sel-${tableUid}`

  const sortControlled = sortField !== undefined || onSortChange !== undefined
  const pageControlled = onPageChange !== undefined

  const [internalSort, setInternalSort] = useState<TableSortState>({
    field: undefined,
    order: 0,
  })
  const [internalPage, setInternalPage] = useState({ first, rows })
  const [internalSelection, setInternalSelection] = useState<Row | Row[] | null>(
    defaultSelection == null
      ? null
      : Array.isArray(defaultSelection)
        ? [...defaultSelection]
        : defaultSelection,
  )

  const activeSort = sortControlled
    ? { field: sortField, order: sortOrder }
    : internalSort
  const page = pageControlled ? { first, rows } : internalPage
  const selectionControlled = selection !== undefined
  const activeSelection = selectionControlled ? selection : internalSelection

  const sorted = useMemo(() => {
    if (!activeSort.field || activeSort.order === 0) return [...value]
    const next = [...value]
    next.sort((a, b) => {
      const av = getByPath(a, activeSort.field!)
      const bv = getByPath(b, activeSort.field!)
      return compareValues(av, bv) * activeSort.order
    })
    return next
  }, [value, activeSort.field, activeSort.order])

  const total = sorted.length
  const pageRows = paginator ? page.rows : total
  const pageFirst = paginator ? page.first : 0
  const pageLast = Math.min(pageFirst + pageRows, total)
  const visible = sorted.slice(pageFirst, pageLast)
  const currentPage = pageRows > 0 ? Math.floor(pageFirst / pageRows) : 0
  const totalPages = pageRows > 0 ? Math.max(1, Math.ceil(total / pageRows)) : 1

  const setSortState = (state: TableSortState) => {
    if (sortControlled) {
      onSortChange?.(state)
      return
    }
    setInternalSort(state)
  }

  const changePage = (nextFirst: number, nextRows: number) => {
    const safeRows = Math.max(1, nextRows)
    const safeFirst = Math.max(0, Math.min(nextFirst, Math.max(0, total - 1)))
    const state = {
      first: safeFirst - (safeFirst % safeRows),
      rows: safeRows,
      page: Math.floor(safeFirst / safeRows),
    }
    if (!pageControlled) {
      setInternalPage({ first: state.first, rows: state.rows })
    }
    onPageChange?.(state)
  }

  const onHeaderClick = (col: TableColumn<Row>) => {
    if (!col.sortable) return
    const sameField = activeSort.field === col.field
    const next = {
      field: col.field,
      order: sameField ? nextSort(activeSort.order, removableSort) : 1,
    } as TableSortState
    setSortState(next)
  }

  const onHeaderKeyDown = (e: KeyboardEvent<HTMLTableCellElement>, col: TableColumn<Row>) => {
    if (!col.sortable) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onHeaderClick(col)
    }
  }

  const tdSize = size === 'sm' ? styles.tdSm : size === 'lg' ? styles.tdLg : styles.tdMd
  const colSpan = columns.length + (selectionMode != null && showSelectionColumn ? 1 : 0)

  const selectedKeySet = useMemo(() => {
    const set = new Set<string>()
    if (selectionMode == null || activeSelection == null) return set
    if (selectionMode === 'single') {
      const row = activeSelection as Row
      set.add(rowKey(row, dataKey, -1))
      return set
    }
    for (const row of activeSelection as readonly Row[]) {
      set.add(rowKey(row, dataKey, -1))
    }
    return set
  }, [selectionMode, activeSelection, dataKey])

  const selectableRows = useMemo(
    () => visible.filter((r) => (rowSelectable ? rowSelectable(r) : true)),
    [visible, rowSelectable],
  )

  const allVisibleSelected =
    selectionMode === 'multiple' &&
    selectableRows.length > 0 &&
    selectableRows.every((r, i) =>
      selectedKeySet.has(rowKey(r, dataKey, pageFirst + i)),
    )

  const commitSelection = (next: Row | Row[] | null) => {
    if (!selectionControlled) {
      setInternalSelection(next)
    }
    onSelectionChange?.(next)
  }

  const toggleRowSelection = (row: Row, rowIndex: number) => {
    if (selectionMode == null) return
    if (rowSelectable && !rowSelectable(row)) return
    const key = rowKey(row, dataKey, rowIndex)

    if (selectionMode === 'single') {
      const isSelected = selectedKeySet.has(key)
      commitSelection(isSelected ? null : row)
      return
    }

    const base = Array.isArray(activeSelection) ? [...activeSelection] : []
    const idx = base.findIndex((r, i) => rowKey(r, dataKey, i) === key)
    if (idx >= 0) base.splice(idx, 1)
    else base.push(row)
    commitSelection(base)
  }

  const toggleAllVisible = (checked: boolean) => {
    if (selectionMode !== 'multiple') return
    const base = Array.isArray(activeSelection) ? [...activeSelection] : []
    const visibleKeys = new Set(
      selectableRows.map((r, i) => rowKey(r, dataKey, pageFirst + i)),
    )
    let next = selectionPageOnly
      ? base.filter((r, i) => !visibleKeys.has(rowKey(r, dataKey, i)))
      : []
    if (checked) {
      next = selectionPageOnly ? [...next, ...selectableRows] : [...selectableRows]
    } else if (!selectionPageOnly) {
      next = []
    }
    commitSelection(next)
  }

  return (
    <div ref={ref} {...mergeSx(stylex.props(styles.wrap), className, style)}>
      {header != null ? <div {...stylex.props(styles.headerFooter)}>{header}</div> : null}

      <div {...stylex.props(styles.container)}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr>
              {selectionMode != null && showSelectionColumn ? (
                <th
                  {...stylex.props(
                    styles.th,
                    styles.thSelection,
                    showGridlines && styles.gridlinesTh,
                  )}
                >
                  {selectionMode === 'multiple' ? (
                    <Checkbox
                      checked={Boolean(allVisibleSelected)}
                      onChange={(e) => toggleAllVisible(e.target.checked)}
                      style={{ margin: 0 }}
                      aria-label="Select all visible rows"
                    />
                  ) : null}
                </th>
              ) : null}
              {columns.map((col, ci) => {
                const active = activeSort.field === col.field ? activeSort.order : 0
                return (
                  <th
                    key={`${col.field}-${ci}`}
                    onClick={() => onHeaderClick(col)}
                    onKeyDown={(e) => onHeaderKeyDown(e, col)}
                    tabIndex={col.sortable ? 0 : undefined}
                    {...mergeSx(
                      stylex.props(
                        styles.th,
                        col.sortable && styles.thSortable,
                        showGridlines && styles.gridlinesTh,
                        ci === columns.length - 1 && styles.cellLast,
                      ),
                      col.headerClassName,
                      col.headerStyle,
                    )}
                    aria-sort={
                      active === 1
                        ? 'ascending'
                        : active === -1
                          ? 'descending'
                          : col.sortable
                            ? 'none'
                            : undefined
                    }
                  >
                    <span>{col.header}</span>
                    {col.sortable ? (
                      <span {...stylex.props(styles.sortIcon)} aria-hidden>
                        {active === 1 ? '▲' : active === -1 ? '▼' : '↕'}
                      </span>
                    ) : null}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={colSpan}
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                  {...stylex.props(styles.td, tdSize, styles.muted, styles.rowLastCell)}
                >
                  {loadingTemplate != null ? (
                    loadingTemplate({ colSpan })
                  ) : (
                    <div {...stylex.props(styles.loadingContent)}>
                      <Spinner size="sm" tone="muted" />
                      {loadingLabel}
                    </div>
                  )}
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  {...stylex.props(styles.td, tdSize, styles.empty, styles.rowLastCell)}
                >
                  {emptyTemplate != null ? emptyTemplate({ colSpan }) : emptyMessage}
                </td>
              </tr>
            ) : (
              visible.map((row, ri) => {
                const rowIndex = pageFirst + ri
                return (
                  <tr
                    key={
                      rowKey(row, dataKey, rowIndex)
                    }
                    {...stylex.props(
                      styles.rowHover,
                      stripedRows && rowIndex % 2 === 1 && styles.rowStriped,
                      selectedKeySet.has(rowKey(row, dataKey, rowIndex)) && styles.rowSelected,
                    )}
                    onClick={() => {
                      if (selectionMode == null || showSelectionColumn) return
                      toggleRowSelection(row, rowIndex)
                    }}
                  >
                    {selectionMode != null && showSelectionColumn ? (
                      <td
                        {...stylex.props(
                          styles.td,
                          styles.tdSelection,
                          tdSize,
                          showGridlines && styles.gridlinesTd,
                          ri === visible.length - 1 && styles.rowLastCell,
                        )}
                      >
                        {selectionMode === 'multiple' ? (
                          <Checkbox
                            checked={selectedKeySet.has(rowKey(row, dataKey, rowIndex))}
                            onChange={() => toggleRowSelection(row, rowIndex)}
                            onClick={(e) => e.stopPropagation()}
                            disabled={rowSelectable ? !rowSelectable(row) : false}
                            style={{ margin: 0 }}
                            aria-label="Select row"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={radioGroupName}
                            checked={selectedKeySet.has(rowKey(row, dataKey, rowIndex))}
                            onChange={() => toggleRowSelection(row, rowIndex)}
                            onClick={(e) => e.stopPropagation()}
                            disabled={rowSelectable ? !rowSelectable(row) : false}
                            {...stylex.props(
                              styles.checkbox,
                              rowSelectable && !rowSelectable(row) && styles.checkboxDisabled,
                            )}
                            aria-label="Select row"
                          />
                        )}
                      </td>
                    ) : null}
                    {columns.map((col, ci) => (
                      <td
                        key={`${col.field}-${ci}`}
                        {...mergeSx(
                          stylex.props(
                            styles.td,
                            tdSize,
                            showGridlines && styles.gridlinesTd,
                            ci === columns.length - 1 && styles.cellLast,
                            ri === visible.length - 1 && styles.rowLastCell,
                          ),
                          col.className,
                          col.style,
                        )}
                      >
                        {col.body != null ? col.body(row) : String(getByPath(row, col.field) ?? '')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {footer != null ? <div {...stylex.props(styles.headerFooter)}>{footer}</div> : null}

      {paginator ? (
        <div
          {...stylex.props(
            tablePagerStyles.footer,
            paginatorDisabled && tablePagerStyles.footerDisabled,
          )}
        >
          {/* Left: rows-per-page select + "X–Y of Z" record range */}
          <div {...stylex.props(tablePagerStyles.info)}>
            <select
              value={pageRows}
              onChange={(e) => changePage(0, Number(e.target.value))}
              {...stylex.props(tablePagerStyles.select)}
              aria-label="Rows per page"
              disabled={paginatorDisabled}
            >
              {rowsPerPageOptions.map((n) => (
                <option key={n} value={n}>{n} / page</option>
              ))}
            </select>
            <span {...stylex.props(tablePagerStyles.count)}>
              {total === 0 ? '0' : `${pageFirst + 1}–${pageLast}`} of {total}
            </span>
          </div>

          {/* Right: Pagination component — page numbers + prev/next */}
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(p) => changePage((p - 1) * pageRows, pageRows)}
            siblingCount={siblingCount}
            boundaryCount={boundaryCount}
            showFirstButton={showFirstButton}
            showLastButton={showLastButton}
            variant={paginatorVariant}
            shape={paginatorShape}
            color={paginatorColor}
            size={size}
            disabled={paginatorDisabled}
          />
        </div>
      ) : null}
    </div>
  )
}

export const Table = memo(forwardRef(TableInner)) as <Row>(
  props: TableProps<Row> & { ref?: Ref<HTMLDivElement> },
) => React.ReactElement


