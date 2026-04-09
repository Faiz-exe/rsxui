import * as stylex from '@stylexjs/stylex'
import { createPortal } from 'react-dom'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Toast.stylex'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'primary'
  | 'help'
  | 'contrast'

export type ToastMessage = {
  id: string
  severity: ToastSeverity
  summary?: ReactNode
  detail?: ReactNode
  life?: number
  sticky?: boolean
  content?: (ctx: { message: ToastMessage }) => ReactNode
}

export type ToastMessageInput = {
  id?: string
  severity?: ToastSeverity
  summary?: ReactNode
  detail?: ReactNode
  life?: number
  sticky?: boolean
  content?: (ctx: { message: ToastMessage }) => ReactNode
}

export type ToastHandle = {
  /** Queue one or more messages. */
  show: (message: ToastMessageInput | ToastMessageInput[]) => void
  /** Remove all messages. */
  clear: () => void
  /** Remove a single message by id. */
  remove: (id: string) => void
}

const positionClass = {
  'top-left': styles.topLeft,
  'top-center': styles.topCenter,
  'top-right': styles.topRight,
  center: styles.center,
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right': styles.bottomRight,
} as const

const severitySurface = {
  success: styles.filledSuccess,
  info: styles.neutralDark,
  warning: styles.filledWarning,
  danger: styles.filledDanger,
  secondary: styles.paper,
  primary: styles.filledPrimary,
  help: styles.filledHelp,
  contrast: styles.contrast,
} as const

const severityDetail = {
  success: styles.filledMuted,
  info: styles.detailOnDark,
  warning: styles.filledMuted,
  danger: styles.filledMuted,
  secondary: styles.detailOnPaper,
  primary: styles.filledMuted,
  help: styles.filledMuted,
  contrast: styles.detailOnDark,
} as const

const severityClose = {
  success: styles.closeInverse,
  info: styles.closeInverse,
  warning: styles.closeInverse,
  danger: styles.closeInverse,
  secondary: styles.closeOnPaper,
  primary: styles.closeInverse,
  help: styles.closeInverse,
  contrast: styles.closeInverse,
} as const

const DEFAULT_LIFE = 3000

let idCounter = 0

function nextId(prefix: string) {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

function enterWrapClass(position: ToastPosition) {
  if (position === 'center') return styles.itemWrapGrow
  if (position.startsWith('bottom')) return styles.itemWrapSlideUp
  return styles.itemWrapSlideDown
}

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

type ToastItemProps = {
  message: ToastMessage
  /** Anchor at mount — frozen so changing global `position` does not restart enter animations. */
  entranceAnchor: ToastPosition
  onDismiss: () => void
  closeLabel: string
}

function ToastItem({ message, entranceAnchor, onDismiss, closeLabel }: ToastItemProps) {
  const { severity, summary, detail, life = DEFAULT_LIFE, sticky, content } = message
  /** Parent `position` changes when user switches anchor; keep first-mount value so CSS enter animation does not restart. */
  const [frozenEntranceAnchor] = useState(() => entranceAnchor)
  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  useEffect(() => {
    if (sticky) return undefined
    const t = window.setTimeout(() => dismissRef.current(), life)
    return () => window.clearTimeout(t)
  }, [sticky, life, message.id])

  const shellSx = stylex.props(styles.item, severitySurface[severity])
  const detailSx = stylex.props(styles.detail, severityDetail[severity])
  const closeSx = stylex.props(styles.close, severityClose[severity])
  const wrapSx = stylex.props(enterWrapClass(frozenEntranceAnchor))

  return (
    <div {...wrapSx}>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic
        {...shellSx}
      >
        <div {...stylex.props(styles.row)}>
          <div {...stylex.props(styles.body)}>
            {content != null ? (
              content({ message })
            ) : (
              <>
                {summary != null && (
                  <div {...stylex.props(styles.summary)}>{summary}</div>
                )}
                {detail != null && <div {...detailSx}>{detail}</div>}
              </>
            )}
          </div>
          <button
            type="button"
            {...closeSx}
            onClick={onDismiss}
            aria-label={closeLabel}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export type ToastProps = {
  /** Corner or edge where toasts stack (Material `anchorOrigin` style). */
  position?: ToastPosition
  /** Accessible label for the dismiss control (per toast). */
  closeLabel?: string
  className?: string
  style?: CSSProperties
}

function ToastInner(
  {
    position = 'bottom-center',
    closeLabel = 'Close',
    className,
    style,
  }: ToastProps,
  ref: Ref<ToastHandle>,
) {
  const baseId = useId()
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /** Dismiss oldest toast on Escape — matches Material Snackbar behavior. */
  useEffect(() => {
    if (messages.length === 0) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      setMessages((prev) => prev.slice(1))
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [messages.length])

  const remove = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const show = useCallback(
    (input: ToastMessageInput | ToastMessageInput[]) => {
      const list = Array.isArray(input) ? input : [input]
      setMessages((prev) => {
        const next = list.map((m): ToastMessage => {
          const id = m.id ?? nextId(baseId)
          return {
            id,
            severity: m.severity ?? 'info',
            summary: m.summary,
            detail: m.detail,
            life: m.life,
            sticky: m.sticky,
            content: m.content,
          }
        })
        return [...prev, ...next]
      })
    },
    [baseId],
  )

  const clear = useCallback(() => {
    setMessages([])
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      show,
      clear,
      remove,
    }),
    [show, clear, remove],
  )

  const regionSx = useMemo(
    () => stylex.props(styles.region, positionClass[position]),
    [position],
  )

  const portal = mounted
    ? createPortal(
        <div {...mergeSx(regionSx, className, style)}>
          {messages.map((msg) => (
            <ToastItem
              key={msg.id}
              message={msg}
              entranceAnchor={position}
              onDismiss={() => remove(msg.id)}
              closeLabel={closeLabel}
            />
          ))}
        </div>,
        document.body,
      )
    : null

  return portal
}

export const Toast = memo(forwardRef(ToastInner))
