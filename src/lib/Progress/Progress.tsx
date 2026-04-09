import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Progress.stylex'

type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

export type ProgressProps = {
  /** 0–100. Omit or set to `null` for indeterminate. */
  value?: number | null
  size?: ProgressSize
  severity?: ProgressSeverity
  label?: string
  /** Show numeric percentage alongside label */
  showValue?: boolean
  className?: string
  style?: React.CSSProperties
}

const sizeClass: Record<ProgressSize, (typeof styles)[keyof typeof styles]> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

const severityClass: Record<ProgressSeverity, (typeof styles)[keyof typeof styles]> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
}

function ProgressInner(
  {
    value,
    size = 'md',
    severity = 'primary',
    label,
    showValue = false,
    className,
    style,
  }: ProgressProps,
  ref: Ref<HTMLDivElement>,
) {
  const isIndeterminate = value == null
  const clamped = isIndeterminate ? 0 : Math.min(100, Math.max(0, value))

  const bar = (
    <div
      {...mergeSx(
        stylex.props(styles.root, sizeClass[size]),
        label == null ? className : undefined,
        label == null ? style : undefined,
      )}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? undefined}
      ref={label == null ? ref : undefined}
    >
      <div
        {...stylex.props(
          styles.bar,
          severityClass[severity],
          isIndeterminate && styles.indeterminate,
        )}
        style={isIndeterminate ? undefined : { width: `${clamped}%` }}
      />
    </div>
  )

  if (label == null && !showValue) return bar

  return (
    <div
      ref={ref}
      {...mergeSx(stylex.props(styles.wrapper), className, style)}
    >
      {(label != null || showValue) && (
        <div {...stylex.props(styles.labelRow)}>
          {label != null && <span>{label}</span>}
          {showValue && !isIndeterminate && (
            <span {...stylex.props(styles.valueText)}>{clamped}%</span>
          )}
        </div>
      )}
      {bar}
    </div>
  )
}

export const Progress = memo(forwardRef(ProgressInner))
