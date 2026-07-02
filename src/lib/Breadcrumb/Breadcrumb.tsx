import * as stylex from '@stylexjs/stylex'
import {
  Children,
  forwardRef,
  isValidElement,
  memo,
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Breadcrumb.stylex'

// ── Types ─────────────────────────────────────────────────────────────────────

export type BreadcrumbProps = Omit<ComponentPropsWithoutRef<'nav'>, 'className' | 'style'> & {
  /** Optional custom separator node. Defaults to › */
  separator?: ReactNode
  className?: string
  style?: ComponentPropsWithoutRef<'nav'>['style']
}

export type BreadcrumbItemProps = {
  /** Render as a clickable link when provided (ignored when onClick is also supplied) */
  href?: string
  /** Click handler — when provided the item renders as a <button> and href is discarded */
  onClick?: MouseEventHandler<HTMLButtonElement>
  /** Marks the item as the current page (adds aria-current="page") */
  current?: boolean
  /** Optional icon shown before the label */
  icon?: ReactNode
  /** Item label */
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

// ── BreadcrumbItem ───────────────────────────────────────────────────────────

function BreadcrumbItemInner(
  { href, onClick, current = false, icon, children, className, style }: BreadcrumbItemProps,
  ref: Ref<HTMLSpanElement | HTMLAnchorElement | HTMLButtonElement>,
) {
  if (current) {
    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        aria-current="page"
        {...mergeSx(stylex.props(styles.crumb, styles.current), className, style)}
      >
        {icon && <span {...stylex.props(styles.icon)} aria-hidden>{icon}</span>}
        {children}
      </span>
    )
  }

  if (onClick) {
    const sx = mergeSx(stylex.props(styles.crumb, styles.link), className, style)
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        {...sx}
        style={{
          // force-reset all UA button styles so it's visually identical to <a>
          appearance: 'none',
          WebkitAppearance: 'none',
          background: 'none',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          padding: 0,
          margin: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'pointer',
          // then re-apply whatever StyleX computed
          ...sx.style,
        }}
      >
        {icon && <span {...stylex.props(styles.icon)} aria-hidden>{icon}</span>}
        {children}
      </button>
    )
  }

  return (
    <a
      ref={ref as Ref<HTMLAnchorElement>}
      href={href}
      {...mergeSx(stylex.props(styles.crumb, styles.link), className, style)}
    >
      {icon && <span {...stylex.props(styles.icon)} aria-hidden>{icon}</span>}
      {children}
    </a>
  )
}

export const BreadcrumbItem = memo(forwardRef(BreadcrumbItemInner))

// ── Breadcrumb (root) ────────────────────────────────────────────────────────

/** Default chevron separator */
function DefaultSeparator() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BreadcrumbInner(
  {
    separator = <DefaultSeparator />,
    children,
    className,
    style,
    ...rest
  }: BreadcrumbProps,
  ref: Ref<HTMLElement>,
) {
  const validChildren = Children.toArray(children).filter(isValidElement)
  const sx = stylex.props(styles.root)

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      {...rest}
      {...mergeSx(sx, className, style)}
    >
      <ol {...stylex.props(styles.list)}>
        {validChildren.map((child, index) => {
          const isLast = index === validChildren.length - 1
          return (
            <li key={index} {...stylex.props(styles.item)}>
              {child}
              {!isLast && (
                <span {...stylex.props(styles.separator)} aria-hidden>
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export const Breadcrumb = memo(forwardRef(BreadcrumbInner))
