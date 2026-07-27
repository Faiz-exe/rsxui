import * as stylex from '@stylexjs/stylex'
import { memo, useState, type CSSProperties } from 'react'
import { pagerStyles } from './Pagination.stylex'

// ─── Public types ────────────────────────────────────────────────────────────

export type PaginationVariant = 'text' | 'outlined'
export type PaginationShape = 'circular' | 'rounded'
export type PaginationColor = 'primary' | 'secondary' | 'standard'
export type PaginationSize = 'sm' | 'md' | 'lg'

export type PaginationProps = {
  /** Total number of pages. Required. */
  count: number
  /** Controlled current page (1-based index). */
  page?: number
  /** Uncontrolled default page (1-based). Default 1. */
  defaultPage?: number
  /** Called when the user changes page. Receives the new 1-based page number. */
  onChange?: (page: number) => void
  /** Pages shown on each side of the current page. Default 1. */
  siblingCount?: number
  /** Pages always shown at the start/end boundaries. Default 1. */
  boundaryCount?: number
  /** Show «  jump-to-first button. Default false. */
  showFirstButton?: boolean
  /** Show » jump-to-last button. Default false. */
  showLastButton?: boolean
  /** 'text' = borderless ghost buttons (default). 'outlined' = bordered. */
  variant?: PaginationVariant
  /** 'circular' = full pill (default). 'rounded' = square-ish corners. */
  shape?: PaginationShape
  /** Accent colour of the active page button. Default 'primary'. */
  color?: PaginationColor
  /** Size of all page items. Default 'md'. */
  size?: PaginationSize
  /** Disable all controls. */
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

// ─── Page window algorithm ───────────────────────────────────────────────────

export function buildPageWindows(
  current: number,   // 0-based internally
  total: number,
  siblingCount = 1,
  boundaryCount = 1,
): (number | 'ellipsis')[] {
  if (total <= 0) return []

  const startPages = Array.from(
    { length: Math.min(boundaryCount, total) },
    (_, i) => i,
  )
  const endPages = Array.from(
    { length: Math.min(boundaryCount, total) },
    (_, i) => total - 1 - i,
  ).reverse()

  const siblingsStart = Math.max(
    boundaryCount,
    Math.min(current - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
  )
  const siblingsEnd = Math.min(
    total - 1 - boundaryCount,
    Math.max(current + siblingCount, boundaryCount + siblingCount * 2),
  )
  const siblingPages = Array.from(
    { length: Math.max(0, siblingsEnd - siblingsStart + 1) },
    (_, i) => siblingsStart + i,
  )

  const allSet = new Set([...startPages, ...siblingPages, ...endPages])
  const sorted = Array.from(allSet).sort((a, b) => a - b)

  const result: (number | 'ellipsis')[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('ellipsis')
    result.push(sorted[i])
  }
  return result
}

// ─── SVG icons ───────────────────────────────────────────────────────────────

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const ChevronsLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
)
const ChevronsRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
)

// ─── Component ───────────────────────────────────────────────────────────────

function PaginationInner({
  count,
  page: controlledPage,
  defaultPage = 1,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = false,
  showLastButton = false,
  variant = 'text',
  shape = 'circular',
  color = 'primary',
  size = 'md',
  disabled = false,
  className,
  style,
}: PaginationProps) {
  const isControlled = controlledPage !== undefined
  const [internalPage, setInternalPage] = useState(defaultPage)
  // Normalise to 1-based; clamp within [1, count]
  const currentPage1 = Math.max(1, Math.min(isControlled ? (controlledPage ?? 1) : internalPage, count))
  // 0-based for the algorithm
  const current0 = currentPage1 - 1

  function goTo(page1: number) {
    const clamped = Math.max(1, Math.min(page1, count))
    if (!isControlled) setInternalPage(clamped)
    onChange?.(clamped)
  }

  // Build composite style list for a page item
  function itemProps(active: boolean) {
    return stylex.props(
      pagerStyles.item,
      size === 'sm' && pagerStyles.itemSm,
      size === 'lg' && pagerStyles.itemLg,
      variant === 'outlined' && pagerStyles.itemOutlined,
      shape === 'rounded' && pagerStyles.itemRounded,
      active && color === 'primary' && pagerStyles.itemActive,
      active && color === 'secondary' && pagerStyles.itemActiveSecondary,
      active && color === 'standard' && pagerStyles.itemActiveStandard,
      active && variant === 'outlined' && pagerStyles.itemOutlinedActive,
    )
  }

  const pages = buildPageWindows(current0, count, siblingCount, boundaryCount)

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={style}
      {...stylex.props(
        pagerStyles.root,
        disabled && pagerStyles.disabled,
      )}
    >
      {/* First page */}
      {showFirstButton && (
        <button
          type="button"
          disabled={disabled || currentPage1 <= 1}
          onClick={() => goTo(1)}
          aria-label="First page"
          {...itemProps(false)}
        >
          <ChevronsLeft />
        </button>
      )}

      {/* Previous page */}
      <button
        type="button"
        disabled={disabled || currentPage1 <= 1}
        onClick={() => goTo(currentPage1 - 1)}
        aria-label="Previous page"
        {...itemProps(false)}
      >
        <ChevronLeft />
      </button>

      {/* Page numbers + ellipsis */}
      {pages.map((item, idx) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            aria-hidden
            {...stylex.props(
              pagerStyles.ellipsis,
              size === 'sm' && pagerStyles.ellipsisSm,
              size === 'lg' && pagerStyles.ellipsisLg,
            )}
          >
            &#8230;
          </span>
        ) : (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={() => goTo(item + 1)}
            aria-label={`Page ${item + 1}`}
            aria-current={item === current0 ? 'page' : undefined}
            {...itemProps(item === current0)}
          >
            {item + 1}
          </button>
        ),
      )}

      {/* Next page */}
      <button
        type="button"
        disabled={disabled || currentPage1 >= count}
        onClick={() => goTo(currentPage1 + 1)}
        aria-label="Next page"
        {...itemProps(false)}
      >
        <ChevronRight />
      </button>

      {/* Last page */}
      {showLastButton && (
        <button
          type="button"
          disabled={disabled || currentPage1 >= count}
          onClick={() => goTo(count)}
          aria-label="Last page"
          {...itemProps(false)}
        >
          <ChevronsRight />
        </button>
      )}
    </nav>
  )
}

export const Pagination = memo(PaginationInner)
