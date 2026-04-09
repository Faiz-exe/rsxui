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
  children?: ReactNode
  className?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, 'as' | 'style' | 'className'>

function TextInner({
  as = 'p',
  variant = 'body',
  tone = 'default',
  mono = false,
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
  )

  return createElement(as, {
    ...rest,
    ...mergeSx(sx, className, style),
  })
}

export const Text = memo(TextInner)
