import * as stylex from '@stylexjs/stylex'
import { memo, type ComponentPropsWithoutRef } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Badge.stylex'

const variantClass = {
  neutral: styles.neutral,
  accent: styles.accent,
  danger: styles.danger,
  success: styles.success,
  outline: styles.outline,
} as const

export type BadgeProps = Omit<ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & {
  variant?: keyof typeof variantClass
  className?: string
  style?: ComponentPropsWithoutRef<'span'>['style']
}

function BadgeInner({
  variant = 'neutral',
  className,
  style,
  ...rest
}: BadgeProps) {
  const sx = stylex.props(styles.base, variantClass[variant])
  return <span {...rest} {...mergeSx(sx, className, style)} />
}

export const Badge = memo(BadgeInner)
