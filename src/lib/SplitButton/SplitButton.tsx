import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from 'react'
import {
  type ButtonSeverity,
} from '../Button/Button'
import { styles as buttonStyles } from '../Button/Button.stylex'
import { mergeSx } from '../utils/mergeSx'
import { styles as splitStyles } from './SplitButton.stylex'

export type SplitButtonMenuItem = {
  id: string
  label: ReactNode
  disabled?: boolean
  onSelect?: () => void
}

export type SplitButtonProps = {
  /** Primary action label if `children` omitted */
  label?: string
  children?: ReactNode
  menuItems: readonly SplitButtonMenuItem[]
  /** Fires for the main button */
  onPrimaryClick?: () => void
  /** Convenience handler when any item omits its own `onSelect` */
  onMenuItemSelect?: (id: string) => void
  severity?: ButtonSeverity
  /**
   * @deprecated Use `severity` instead (`primary` -> `severity="primary"`, `secondary` -> `severity="secondary"`).
   */
  variant?: 'primary' | 'secondary'
  outlined?: boolean
  text?: boolean
  size?: 'sm' | 'md' | 'lg'
  raised?: boolean
  rounded?: boolean
  loading?: boolean
  disabled?: boolean
  /** Accessible name for the dropdown trigger */
  menuTriggerLabel?: string
  className?: string
  style?: React.ComponentPropsWithoutRef<'div'>['style']
  primaryButtonClassName?: string
  menuButtonClassName?: string
  type?: 'button' | 'submit' | 'reset'
}

const solidBySeverity = {
  primary: buttonStyles.solidPrimary,
  secondary: buttonStyles.solidSecondary,
  success: buttonStyles.solidSuccess,
  danger: buttonStyles.solidDanger,
  info: buttonStyles.solidInfo,
  warning: buttonStyles.solidWarning,
  help: buttonStyles.solidHelp,
} as const

const outlinedBySeverity = {
  primary: buttonStyles.outlinedPrimary,
  secondary: buttonStyles.outlinedSecondary,
  success: buttonStyles.outlinedSuccess,
  danger: buttonStyles.outlinedDanger,
  info: buttonStyles.outlinedInfo,
  warning: buttonStyles.outlinedWarning,
  help: buttonStyles.outlinedHelp,
} as const

const textBySeverity = {
  primary: buttonStyles.textPrimary,
  secondary: buttonStyles.textSecondary,
  success: buttonStyles.textSuccess,
  danger: buttonStyles.textDanger,
  info: buttonStyles.textInfo,
  warning: buttonStyles.textWarning,
  help: buttonStyles.textHelp,
} as const

function resolveAppearance(
  severity: ButtonSeverity | undefined,
  variant: 'primary' | 'secondary' | undefined,
  outlined: boolean,
  text: boolean,
) {
  const sev = severity ?? (variant === 'secondary' ? 'secondary' : 'primary')
  let appearanceStyle
  if (text) {
    appearanceStyle = textBySeverity[sev]
  } else if (outlined) {
    appearanceStyle = outlinedBySeverity[sev]
  } else {
    appearanceStyle = solidBySeverity[sev]
  }
  return { sev, appearanceStyle }
}

function isEmphasisFill(
  sev: ButtonSeverity,
  outlined: boolean,
  text: boolean,
): boolean {
  if (outlined || text) return false
  return sev !== 'secondary'
}

function ChevronDown() {
  return (
    <svg
      {...stylex.props(splitStyles.chevron)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function hasRenderableText(node: ReactNode): boolean {
  if (node == null || node === false || node === true) return false
  if (typeof node === 'string') return node.trim().length > 0
  if (typeof node === 'number' || typeof node === 'bigint') return true
  if (Array.isArray(node)) return node.some(hasRenderableText)
  return true
}

function SplitButtonInner(
  {
    label,
    children,
    menuItems,
    onPrimaryClick,
    onMenuItemSelect,
    severity,
    variant,
    outlined = false,
    text = false,
    size = 'md',
    raised = false,
    rounded = false,
    loading = false,
    disabled = false,
    menuTriggerLabel = 'Open menu',
    className,
    style,
    primaryButtonClassName,
    menuButtonClassName,
    type = 'button',
  }: SplitButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const uid = useId()
  const menuId = `${uid}-split-menu`
  const { sev, appearanceStyle } = resolveAppearance(
    severity,
    variant,
    outlined,
    text,
  )
  const sizeStyle =
    size === 'sm'
      ? buttonStyles.sm
      : size === 'lg'
        ? buttonStyles.lg
        : buttonStyles.md

  const body = children !== undefined && children !== null ? children : label
  const hasText = hasRenderableText(body)

  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const setPrimaryRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      }
    },
    [ref],
  )

  const enabledIndices = menuItems
    .map((it, i) => (!it.disabled ? i : -1))
    .filter((i) => i >= 0)

  const isDisabled = Boolean(disabled || loading)
  const hasEnabledMenuItem = menuItems.some((it) => !it.disabled)
  const menuDisabled =
    isDisabled || menuItems.length === 0 || !hasEnabledMenuItem

  const closeMenu = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => menuBtnRef.current?.focus())
  }, [])

  const openMenu = useCallback(() => {
    const first = menuItems.findIndex((it) => !it.disabled)
    setFocusIndex(first >= 0 ? first : 0)
    setOpen(true)
  }, [menuItems])

  const toggleMenu = useCallback(() => {
    if (menuDisabled) return
    if (open) {
      setOpen(false)
    } else {
      openMenu()
    }
  }, [menuDisabled, open, openMenu])

  const selectItem = useCallback(
    (item: SplitButtonMenuItem) => {
      if (item.disabled) return
      item.onSelect?.()
      if (item.onSelect == null) {
        onMenuItemSelect?.(item.id)
      }
      closeMenu()
    },
    [closeMenu, onMenuItemSelect],
  )

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    itemRefs.current[focusIndex]?.focus()
  }, [open, focusIndex])

  const onMenuButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) {
        openMenu()
      }
    }
    if (e.key === 'Escape' && open) {
      e.preventDefault()
      closeMenu()
    }
  }

  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeMenu()
      return
    }
    if (enabledIndices.length === 0) return
    const pos = enabledIndices.indexOf(focusIndex)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = enabledIndices[(pos + 1) % enabledIndices.length] ?? 0
      setFocusIndex(next)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next =
        enabledIndices[(pos - 1 + enabledIndices.length) % enabledIndices.length] ??
        0
      setFocusIndex(next)
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setFocusIndex(enabledIndices[0] ?? 0)
    }
    if (e.key === 'End') {
      e.preventDefault()
      setFocusIndex(enabledIndices[enabledIndices.length - 1] ?? 0)
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const item = menuItems[focusIndex]
      if (item && !item.disabled) selectItem(item)
    }
  }

  const emphasisDivider = isEmphasisFill(sev, outlined, text)

  const primarySx = stylex.props(
    buttonStyles.base,
    sizeStyle,
    appearanceStyle,
    loading && buttonStyles.loading,
    splitStyles.primary,
    rounded && splitStyles.primaryRounded,
  )

  const menuTriggerSx = stylex.props(
    buttonStyles.base,
    sizeStyle,
    appearanceStyle,
    splitStyles.menuTrigger,
    rounded && splitStyles.menuTriggerRounded,
    emphasisDivider
      ? splitStyles.dividerOnEmphasis
      : splitStyles.dividerNeutral,
  )

  return (
    <div
      ref={rootRef}
      {...mergeSx(
        stylex.props(
          splitStyles.root,
          raised && splitStyles.rootRaised,
          rounded && splitStyles.rootRounded,
        ),
        className,
        style,
      )}
    >
      <button
        ref={setPrimaryRef}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onClick={onPrimaryClick}
        {...mergeSx(primarySx, primaryButtonClassName)}
      >
        {loading ? (
          <span {...stylex.props(buttonStyles.spinner)} aria-hidden />
        ) : null}
        {hasText ? body : null}
      </button>
      <button
        ref={menuBtnRef}
        type="button"
        disabled={menuDisabled}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={menuTriggerLabel}
        {...mergeSx(menuTriggerSx, menuButtonClassName)}
        onClick={toggleMenu}
        onKeyDown={onMenuButtonKeyDown}
      >
        <ChevronDown />
      </button>

      {open && menuItems.length > 0 ? (
        <ul
          id={menuId}
          role="menu"
          tabIndex={-1}
          aria-orientation="vertical"
          {...stylex.props(splitStyles.menu)}
          onKeyDown={onMenuKeyDown}
        >
          {menuItems.map((item, i) => (
            <li key={item.id} role="none">
              <button
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                tabIndex={-1}
                {...stylex.props(
                  splitStyles.menuItem,
                  item.disabled && splitStyles.menuItemDisabled,
                )}
                onClick={() => selectItem(item)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export const SplitButton = memo(forwardRef(SplitButtonInner))
