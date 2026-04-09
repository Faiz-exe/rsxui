import * as stylex from '@stylexjs/stylex'
import {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { styles } from './Tooltip.stylex'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export type TooltipProps = {
  content: ReactNode
  position?: TooltipPosition
  /** Delay in ms before showing */
  delay?: number
  children: ReactElement
}

function getPosition(
  rect: DOMRect,
  tipRect: DOMRect,
  pos: TooltipPosition,
): { top: number; left: number } {
  const gap = 8
  switch (pos) {
    case 'top':
      return {
        top: rect.top - tipRect.height - gap,
        left: rect.left + rect.width / 2 - tipRect.width / 2,
      }
    case 'bottom':
      return {
        top: rect.bottom + gap,
        left: rect.left + rect.width / 2 - tipRect.width / 2,
      }
    case 'left':
      return {
        top: rect.top + rect.height / 2 - tipRect.height / 2,
        left: rect.left - tipRect.width - gap,
      }
    case 'right':
      return {
        top: rect.top + rect.height / 2 - tipRect.height / 2,
        left: rect.right + gap,
      }
  }
}

function TooltipInner({
  content,
  position = 'top',
  delay = 200,
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const id = useId()

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(true), delay)
  }, [delay])

  const hide = useCallback(() => {
    if (timerRef.current != null) clearTimeout(timerRef.current)
    setOpen(false)
    setCoords(null)
  }, [])

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const tip = tipRef.current
    if (trigger == null || tip == null) return
    const rect = trigger.getBoundingClientRect()
    const tipRect = tip.getBoundingClientRect()
    setCoords(getPosition(rect, tipRect, position))
  }, [open, position])

  useEffect(() => {
    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current)
    }
  }, [])

  if (!isValidElement(children)) return children

  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    ref: triggerRef,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    'aria-describedby': open ? id : undefined,
  })

  return (
    <>
      {trigger}
      {open &&
        createPortal(
          <div
            ref={tipRef}
            id={id}
            role="tooltip"
            {...stylex.props(styles.tooltip)}
            style={
              coords != null
                ? { top: coords.top, left: coords.left }
                : { visibility: 'hidden' as const }
            }
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}

export const Tooltip = memo(TooltipInner)
