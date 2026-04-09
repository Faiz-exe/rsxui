import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type ComponentPropsWithoutRef, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Badge.stylex'

const variantClass = {
  neutral: styles.neutral,
  accent: styles.accent,
  danger: styles.danger,
  success: styles.success,
  warning: styles.warning,
  info: styles.info,
  outline: styles.outline,
} as const

const sizeClass = {
  sm: styles.sizeSm,
  md: null,
  lg: styles.sizeLg,
} as const

export type BadgeProps = Omit<ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & {
  variant?: keyof typeof variantClass
  size?: keyof typeof sizeClass
  className?: string
  style?: ComponentPropsWithoutRef<'span'>['style']
}

function BadgeInner(
  { variant = 'neutral', size = 'md', className, style, ...rest }: BadgeProps,
  ref: Ref<HTMLSpanElement>,
) {
  const sx = stylex.props(styles.base, variantClass[variant], sizeClass[size])
  return <span ref={ref} {...rest} {...mergeSx(sx, className, style)} />
}

export const Badge = memo(forwardRef(BadgeInner))
