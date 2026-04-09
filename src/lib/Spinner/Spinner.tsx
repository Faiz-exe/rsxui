import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type ComponentPropsWithoutRef, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Spinner.stylex'

const sizeClass = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const

const toneClass = {
  accent: styles.toneAccent,
  muted: styles.toneMuted,
  fg: styles.toneFg,
  danger: styles.toneDanger,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  info: styles.toneInfo,
} as const

export type SpinnerProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  size?: keyof typeof sizeClass
  tone?: keyof typeof toneClass
  /**
   * Accessible label announced by screen readers.
   * Pass `null` for decorative spinners that should be hidden from assistive tech.
   * Defaults to `'Loading'`.
   */
  label?: string | null
}

function SpinnerInner(
  {
    size = 'md',
    tone = 'accent',
    label = 'Loading',
    className,
    style,
    ...rest
  }: SpinnerProps,
  ref: Ref<HTMLSpanElement>,
) {
  const decorative = label === null
  return (
    <span
      ref={ref}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      {...mergeSx(stylex.props(styles.base, sizeClass[size], toneClass[tone]), className, style)}
      {...rest}
    >
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="42"
          strokeDashoffset="12"
          opacity={0.9}
        />
      </svg>
    </span>
  )
}

export const Spinner = memo(forwardRef(SpinnerInner))
