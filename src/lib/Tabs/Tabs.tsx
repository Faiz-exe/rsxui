import * as stylex from '@stylexjs/stylex'
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Tabs.stylex'

type TabsCtx = {
  value: string
  setValue: (v: string) => void
  baseId: string
  /** Mount order of Tab values (tab strip order). Used for roving tabindex when nothing matches `value`. */
  tabOrder: string[]
  registerTab: (id: string) => void
  unregisterTab: (id: string) => void
}

const TabsContext = createContext<TabsCtx | null>(null)

export type TabsProps = {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  style?: CSSProperties
}

function TabsInner({
  children,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  className,
  style,
}: TabsProps) {
  const baseId = useId()
  const controlled = valueProp !== undefined
  const [inner, setInner] = useState(defaultValue)
  const value = controlled ? (valueProp ?? '') : inner
  const [tabOrder, setTabOrder] = useState<string[]>([])

  const registerTab = useCallback((id: string) => {
    setTabOrder((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unregisterTab = useCallback((id: string) => {
    setTabOrder((prev) => prev.filter((x) => x !== id))
  }, [])

  const setValue = useCallback(
    (v: string) => {
      if (!controlled) {
        setInner(v)
      }
      onValueChange?.(v)
    },
    [controlled, onValueChange],
  )

  const ctx = useMemo(
    (): TabsCtx => ({
      value,
      setValue,
      baseId,
      tabOrder,
      registerTab,
      unregisterTab,
    }),
    [baseId, registerTab, setValue, tabOrder, unregisterTab, value],
  )

  return (
    <TabsContext.Provider value={ctx}>
      <div {...mergeSx(stylex.props(styles.root), className, style)}>{children}</div>
    </TabsContext.Provider>
  )
}

export const Tabs = memo(TabsInner)

export type TabListProps = ComponentPropsWithoutRef<'div'> & {
  /** Accessible label for the tab strip (e.g. “Settings sections”). */
  'aria-label'?: string
}

function TabListInner({
  children,
  className,
  style,
  'aria-label': ariaLabel,
  onKeyDown: onKeyDownProp,
  ...rest
}: TabListProps) {
  const ctx = useContext(TabsContext)
  const listRef = useRef<HTMLDivElement>(null)

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      onKeyDownProp?.(e)
      if (e.defaultPrevented) return
      const root = listRef.current
      if (!root) return
      const tabs = [...root.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])')]
      if (tabs.length === 0) return
      const active = document.activeElement as HTMLElement | null
      const i = tabs.indexOf(active as HTMLElement)
      if (i < 0) return

      let next = i
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        next = (i + 1) % tabs.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        next = (i - 1 + tabs.length) % tabs.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        next = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        next = tabs.length - 1
      } else {
        return
      }
      tabs[next]?.focus()
    },
    [onKeyDownProp],
  )

  if (ctx == null) {
    throw new Error('TabList must be used inside Tabs.')
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      {...mergeSx(stylex.props(styles.list), className, style)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </div>
  )
}

export const TabList = memo(TabListInner)

export type TabProps = Omit<ComponentPropsWithoutRef<'button'>, 'value'> & {
  /** Tab id; must match a TabPanel `value`. */
  value: string
}

function TabInner({
  children,
  value: tabValue,
  className,
  style,
  disabled,
  type = 'button',
  onClick,
  ...rest
}: TabProps) {
  const ctx = useContext(TabsContext)
  const registerTab = ctx?.registerTab
  const unregisterTab = ctx?.unregisterTab

  useLayoutEffect(() => {
    if (registerTab == null || unregisterTab == null) return undefined
    registerTab(tabValue)
    return () => unregisterTab(tabValue)
  }, [registerTab, unregisterTab, tabValue])

  if (ctx == null) {
    throw new Error('Tab must be used inside Tabs.')
  }

  const selected = ctx.value === tabValue
  const valueMatchesATab =
    ctx.value !== '' && ctx.tabOrder.includes(ctx.value)
  const fallbackFocus =
    !valueMatchesATab &&
    !disabled &&
    ctx.tabOrder[0] === tabValue
  const tabId = `${ctx.baseId}-tab-${sanitizeId(tabValue)}`
  const panelId = `${ctx.baseId}-panel-${sanitizeId(tabValue)}`
  const tabIndex = selected || fallbackFocus ? 0 : -1

  return (
    <button
      type={type}
      role="tab"
      id={tabId}
      disabled={disabled}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={tabIndex}
      data-state={selected ? 'active' : 'inactive'}
      {...mergeSx(
        stylex.props(
          styles.tab,
          selected && styles.tabSelected,
          disabled && styles.tabDisabled,
        ),
        className,
        style,
      )}
      onClick={(e) => {
        if (!disabled) ctx.setValue(tabValue)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

function sanitizeId(v: string) {
  return v.replace(/[^a-zA-Z0-9_-]/g, '-')
}

export const Tab = memo(TabInner)

export type TabPanelProps = ComponentPropsWithoutRef<'div'> & {
  value: string
}

function TabPanelInner({
  children,
  value: panelValue,
  className,
  style,
  ...rest
}: TabPanelProps) {
  const ctx = useContext(TabsContext)
  if (ctx == null) {
    throw new Error('TabPanel must be used inside Tabs.')
  }

  const selected = ctx.value === panelValue
  const tabId = `${ctx.baseId}-tab-${sanitizeId(panelValue)}`
  const panelId = `${ctx.baseId}-panel-${sanitizeId(panelValue)}`

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!selected}
      {...mergeSx(stylex.props(styles.panel), className, style)}
      {...rest}
    >
      {children}
    </div>
  )
}

export const TabPanel = memo(TabPanelInner)
