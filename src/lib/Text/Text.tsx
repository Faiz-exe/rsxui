import * as stylex from '@stylexjs/stylex'
import {
  createElement,
  memo,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Text.stylex'

const variantClass = {
  title: styles.title,
  subtitle: styles.subtitle,
  body: styles.body,
  small: styles.small,
  caption: styles.caption,
} as const

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'a'

export type TextProps = {
  as?: TextElement
  variant?: keyof typeof variantClass
  tone?: 'default' | 'muted' | 'subtle' | 'accent' | 'danger' | 'success'
  mono?: boolean
  /** Truncate to a single line with ellipsis. */
  truncate?: boolean
  /**
   * Clamp to N lines with trailing ellipsis.
   * Accepts `2`, `3`, or `4`. Has no effect when `truncate` is true.
   */
  clamp?: 2 | 3 | 4
  children?: ReactNode
  className?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, 'as' | 'style' | 'className'>

const clampClass = {
  2: styles.clamp2,
  3: styles.clamp3,
  4: styles.clamp4,
} as const

function TextInner({
  as = 'p',
  variant = 'body',
  tone = 'default',
  mono = false,
  truncate = false,
  clamp,
  className,
  style,
  ...rest
}: TextProps) {
  const toneStyle =
    tone === 'default'
      ? null
      : tone === 'muted'
        ? styles.muted
        : tone === 'subtle'
          ? styles.subtle
          : tone === 'accent'
            ? styles.accent
            : tone === 'danger'
              ? styles.danger
              : styles.success

  const sx = stylex.props(
    styles.base,
    variantClass[variant],
    toneStyle,
    mono && styles.mono,
    truncate && styles.truncate,
    !truncate && clamp != null ? clampClass[clamp] : null,
  )

  return createElement(as, {
    ...rest,
    ...mergeSx(sx, className, style),
  })
}

export const Text = memo(TextInner)
