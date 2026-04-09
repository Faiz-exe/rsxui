import * as stylex from '@stylexjs/stylex'
import { createPortal } from 'react-dom'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Dialog.stylex'

export type DialogSize = 'sm' | 'md' | 'lg' | 'full'

export type DialogProps = Omit<ComponentPropsWithoutRef<'div'>, 'role' | 'children'> & {
  /** When false, nothing is rendered in the portal. */
  open: boolean
  /** Called when the dialog should close (backdrop, Escape, close button). */
  onOpenChange?: (open: boolean) => void
  /** Optional heading; sets `aria-labelledby` on the dialog panel. */
  title?: ReactNode
  /** Main content between header and footer. */
  children?: ReactNode
  /** Footer actions (e.g. Cancel / Confirm). */
  footer?: ReactNode
  size?: DialogSize
  /** Show the top-right dismiss control (default true when `title` is set). */
  showCloseButton?: boolean
  /** Close when clicking the dimmed backdrop (default true). */
  closeOnBackdrop?: boolean
  /** Close when pressing Escape (default true). */
  closeOnEscape?: boolean
  className?: string
  style?: CSSProperties
}

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  full: styles.sizeFull,
} as const

function CloseIcon() {
  return (
    <svg width="1.25em" height="1.25em" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  )
}

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  const sel = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')
  return Array.from(root.querySelectorAll<HTMLElement>(sel)).filter(
    (el) => el.closest('[aria-hidden="true"]') == null,
  )
}

function DialogInner(
  {
    open,
    onOpenChange,
    title,
    children,
    footer,
    size = 'md',
    showCloseButton,
    closeOnBackdrop = true,
    closeOnEscape = true,
    className,
    style,
    onClick,
    ...rest
  }: DialogProps,
  ref: Ref<HTMLDivElement>,
) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const prevActiveRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  const showX = showCloseButton ?? title != null

  const requestClose = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    prevActiveRef.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    if (!panel) return

    const runFocus = () => {
      const focusables = getFocusableElements(panel)
      if (focusables.length > 0) {
        focusables[0]?.focus()
      } else {
        panel.focus()
      }
    }
    const id = window.requestAnimationFrame(runFocus)

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        requestClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = getFocusableElements(panel)
      if (focusables.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKeyDown, true)
      prevActiveRef.current?.focus?.()
    }
  }, [open, closeOnEscape, requestClose])

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  const headerSx = stylex.props(styles.header)

  const bodySx = stylex.props(styles.body)

  const panelSx = stylex.props(styles.panel, sizeClass[size])

  const mergedPanel = mergeSx(panelSx, className, style)

  if (!mounted || !open) return null

  return createPortal(
    <div {...stylex.props(styles.overlay)}>
      <div
        role="presentation"
        {...stylex.props(styles.backdrop)}
        onClick={closeOnBackdrop ? requestClose : undefined}
      />
      <div
        ref={setPanelRef}
        role="dialog"
        aria-modal
        aria-labelledby={title != null ? titleId : undefined}
        tabIndex={-1}
        {...mergedPanel}
        {...rest}
        onClick={onClick}
      >
        {(title != null || showX) && (
          <div {...headerSx}>
            {title != null ? (
              <h2 id={titleId} {...stylex.props(styles.title)}>
                {title}
              </h2>
            ) : (
              <span {...stylex.props(styles.headerSpacer)} />
            )}
            {showX ? (
              <button
                type="button"
                {...stylex.props(styles.close)}
                onClick={requestClose}
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
            ) : null}
          </div>
        )}
        {children != null ? <div {...bodySx}>{children}</div> : null}
        {footer != null ? <div {...stylex.props(styles.footer)}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}

export const Dialog = memo(forwardRef(DialogInner))
