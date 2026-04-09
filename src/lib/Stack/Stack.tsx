import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type ComponentPropsWithoutRef, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Stack.stylex'

const gapClass = {
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
} as const

export type StackProps = Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & {
  direction?: 'row' | 'column'
  gap?: keyof typeof gapClass
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

function StackInner(
  {
    direction = 'column',
    gap = 'md',
    className,
    style,
    ...rest
  }: StackProps,
  ref: Ref<HTMLDivElement>,
) {
  const sx = stylex.props(
    styles.base,
    direction === 'row' ? styles.row : styles.column,
    gapClass[gap],
  )
  return <div ref={ref} {...rest} {...mergeSx(sx, className, style)} />
}

export const Stack = memo(forwardRef(StackInner))
