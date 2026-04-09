import * as stylex from '@stylexjs/stylex'
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Accordion.stylex'

type AccordionCtx = {
  multiple: boolean
  collapsible: boolean
  isOpen: (itemValue: string) => boolean
  toggle: (itemValue: string) => void
}

const AccordionContext = createContext<AccordionCtx | null>(null)

type ItemCtx = {
  itemValue: string
  disabled: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext = createContext<ItemCtx | null>(null)

function setToValue(set: Set<string>, multiple: boolean): string | null | string[] {
  if (multiple) return Array.from(set)
  const [first] = set
  return first ?? null
}

function valueToSet(
  v: string | null | string[] | undefined,
  multiple: boolean,
): Set<string> {
  if (v == null) return new Set()
  if (multiple) return new Set(Array.isArray(v) ? v : [])
  return new Set(typeof v === 'string' && v !== '' ? [v] : [])
}

function computeNext(
  prev: Set<string>,
  id: string,
  multiple: boolean,
  collapsible: boolean,
): Set<string> {
  const next = new Set(prev)
  if (multiple) {
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  }
  if (next.has(id)) {
    if (collapsible) {
      next.delete(id)
      return next
    }
    return prev
  }
  return new Set([id])
}

export type AccordionProps = {
  children: ReactNode
  multiple?: boolean
  collapsible?: boolean
  value?: string | null | string[]
  defaultValue?: string | null | string[]
  onValueChange?: (next: string | null | string[]) => void
  className?: string
  style?: CSSProperties
}

function AccordionInner({
  children,
  multiple = false,
  collapsible = false,
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  style,
}: AccordionProps) {
  const controlled = valueProp !== undefined
  const [innerSet, setInnerSet] = useState(() =>
    valueToSet(defaultValue ?? null, multiple),
  )

  const openSet = useMemo(
    () => (controlled ? valueToSet(valueProp, multiple) : innerSet),
    [controlled, valueProp, multiple, innerSet],
  )

  const toggle = useCallback(
    (id: string) => {
      if (controlled) {
        const next = computeNext(openSet, id, multiple, collapsible)
        onValueChange?.(setToValue(next, multiple))
        return
      }
      setInnerSet((prev) => {
        const next = computeNext(prev, id, multiple, collapsible)
        onValueChange?.(setToValue(next, multiple))
        return next
      })
    },
    [collapsible, controlled, multiple, onValueChange, openSet],
  )

  const ctx = useMemo(
    (): AccordionCtx => ({
      multiple,
      collapsible,
      isOpen: (v) => openSet.has(v),
      toggle,
    }),
    [collapsible, multiple, openSet, toggle],
  )

  return (
    <AccordionContext.Provider value={ctx}>
      <div {...mergeSx(stylex.props(styles.root), className, style)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export const Accordion = memo(AccordionInner)

export type AccordionItemProps = ComponentPropsWithoutRef<'div'> & {
  value: string
  disabled?: boolean
}

function AccordionItemInner({
  value: itemValue,
  disabled = false,
  className,
  style,
  children,
  ...rest
}: AccordionItemProps) {
  const uid = useId()
  const triggerId = `${uid}-trigger`
  const contentId = `${uid}-content`
  const itemCtx = useMemo(
    (): ItemCtx => ({ itemValue, disabled, triggerId, contentId }),
    [itemValue, disabled, triggerId, contentId],
  )
  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div {...mergeSx(stylex.props(styles.item), className, style)} {...rest}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export const AccordionItem = memo(AccordionItemInner)

export type AccordionTriggerProps = ComponentPropsWithoutRef<'button'>

function AccordionTriggerInner({
  children,
  className,
  style,
  disabled: disabledProp,
  type = 'button',
  onClick,
  ...rest
}: AccordionTriggerProps) {
  const acc = useContext(AccordionContext)
  const item = useContext(AccordionItemContext)
  if (acc == null || item == null) {
    throw new Error('AccordionTrigger must be used inside AccordionItem and Accordion.')
  }
  const disabled = Boolean(disabledProp || item.disabled)
  const open = acc.isOpen(item.itemValue)

  return (
    <button
      type={type}
      id={item.triggerId}
      disabled={disabled}
      aria-expanded={open}
      aria-controls={item.contentId}
      data-state={open ? 'open' : 'closed'}
      {...mergeSx(
        stylex.props(styles.trigger, disabled && styles.triggerDisabled),
        className,
        style,
      )}
      onClick={(e) => {
        if (!disabled) acc.toggle(item.itemValue)
        onClick?.(e)
      }}
      {...rest}
    >
      <span {...stylex.props(styles.triggerLabel)}>{children}</span>
      <span
        {...stylex.props(styles.chevron, open && styles.chevronOpen)}
        aria-hidden
      >
        <ChevronIcon />
      </span>
    </button>
  )
}

function ChevronIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const AccordionTrigger = memo(AccordionTriggerInner)

export type AccordionContentProps = ComponentPropsWithoutRef<'div'>

function AccordionContentInner({ children, className, style, ...rest }: AccordionContentProps) {
  const acc = useContext(AccordionContext)
  const item = useContext(AccordionItemContext)
  if (acc == null || item == null) {
    throw new Error('AccordionContent must be used inside AccordionItem and Accordion.')
  }
  const open = acc.isOpen(item.itemValue)

  return (
    <div
      {...stylex.props(styles.contentOuter, open && styles.contentOuterOpen)}
      data-state={open ? 'open' : 'closed'}
    >
      <div {...stylex.props(styles.contentInner)}>
        <div
          id={item.contentId}
          role="region"
          aria-labelledby={item.triggerId}
          hidden={!open}
          {...mergeSx(stylex.props(styles.contentBody), className, style)}
          {...rest}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const AccordionContent = memo(AccordionContentInner)
