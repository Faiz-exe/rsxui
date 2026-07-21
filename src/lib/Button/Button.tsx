import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useCallback,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Button.stylex'
import { useRipple } from './useRipple'

export type ButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'help'
  | 'danger'

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'type'> & {
  /** Visual intent — semantic “severity” presets (accent, neutral, status colors). */
  severity?: ButtonSeverity
  /**
   * @deprecated Use `severity` instead (`primary` → `severity="primary"`, `secondary` → `severity="secondary"`).
   */
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  outlined?: boolean
  /** Text-style button (minimal chrome). */
  text?: boolean
  raised?: boolean
  rounded?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPos?: 'left' | 'right'
  /** Shown when `children` are omitted (children take precedence). */
  label?: string
  /** Underlined, link-like presentation (still a `<button>` unless you change element elsewhere). */
  link?: boolean
  /** Stretch the button to fill its container's full width. */
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const solidBySeverity = {
  primary: styles.solidPrimary,
  secondary: styles.solidSecondary,
  success: styles.solidSuccess,
  danger: styles.solidDanger,
  info: styles.solidInfo,
  warning: styles.solidWarning,
  help: styles.solidHelp,
} as const

const outlinedBySeverity = {
  primary: styles.outlinedPrimary,
  secondary: styles.outlinedSecondary,
  success: styles.outlinedSuccess,
  danger: styles.outlinedDanger,
  info: styles.outlinedInfo,
  warning: styles.outlinedWarning,
  help: styles.outlinedHelp,
} as const

const textBySeverity = {
  primary: styles.textPrimary,
  secondary: styles.textSecondary,
  success: styles.textSuccess,
  danger: styles.textDanger,
  info: styles.textInfo,
  warning: styles.textWarning,
  help: styles.textHelp,
} as const

function resolveSeverity(
  severity: ButtonSeverity | undefined,
  variant: 'primary' | 'secondary' | undefined,
): ButtonSeverity {
  if (severity !== undefined) return severity
  if (variant === 'secondary') return 'secondary'
  return 'primary'
}

function hasRenderableText(node: ReactNode): boolean {
  if (node == null || node === false || node === true) return false
  if (typeof node === 'string') return node.trim().length > 0
  if (typeof node === 'number' || typeof node === 'bigint') return true
  if (Array.isArray(node)) return node.some(hasRenderableText)
  return true
}

function ButtonInner(
  {
    severity,
    variant,
    size = 'md',
    outlined = false,
    text: textProp = false,
    raised = false,
    rounded = false,
    loading = false,
    icon,
    iconPos = 'left',
    label,
    link = false,
    fullWidth = false,
    className,
    style,
    disabled,
    children,
    type = 'button',
    onPointerDown,
    ...rest
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  // Solid buttons get a white ripple; transparent-bg variants (outlined/text/link)
  // get a currentColor ripple so it's always visible against any background.
  const isSolidBackground = !outlined && !textProp && !link
  const { ref: rippleRef, onPointerDown: ripplePointerDown } =
    useRipple<HTMLButtonElement>(isSolidBackground)

  // Merge forwarded ref with internal ripple ref via a callback ref.
  const mergedRef = useCallback(
    (node: HTMLButtonElement | null) => {
      ;(rippleRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
      if (typeof ref === 'function') ref(node)
      else if (ref != null) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      ripplePointerDown(e)
      onPointerDown?.(e)
    },
    [ripplePointerDown, onPointerDown],
  )

  const sev = resolveSeverity(severity, variant)

  let appearanceStyle
  if (link) {
    appearanceStyle = textBySeverity[sev]
  } else if (textProp) {
    appearanceStyle = textBySeverity[sev]
  } else if (outlined) {
    appearanceStyle = outlinedBySeverity[sev]
  } else {
    appearanceStyle = solidBySeverity[sev]
  }

  const sizeStyle =
    size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : styles.md

  const body = children !== undefined && children !== null ? children : label
  const hasText = hasRenderableText(body)
  const iconOnly = Boolean(icon && !hasText)

  const iconOnlySize =
    size === 'sm'
      ? styles.iconOnlySm
      : size === 'lg'
        ? styles.iconOnlyLg
        : undefined

  const sx = stylex.props(
    styles.base,
    sizeStyle,
    appearanceStyle,
    rounded && styles.rounded,
    raised && styles.raised,
    loading && styles.loading,
    iconOnly && styles.iconOnly,
    iconOnly && iconOnlySize,
    link && styles.linkUnderline,
    fullWidth && styles.fullWidth,
  )

  const isDisabled = Boolean(disabled || loading)

  let leftSlot: ReactNode = null
  let rightSlot: ReactNode = null

  if (loading) {
    leftSlot = <span {...stylex.props(styles.spinner)} aria-hidden />
  } else if (icon && iconPos === 'left') {
    leftSlot = icon
  }

  if (!loading && icon && iconPos === 'right') {
    rightSlot = icon
  }

  return (
    <button
      ref={mergedRef}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onPointerDown={handlePointerDown}
      {...rest}
      {...mergeSx(sx, className, style)}
    >
      {leftSlot}
      {hasText ? body : null}
      {rightSlot}
    </button>
  )
}

export const Button = memo(forwardRef(ButtonInner))
