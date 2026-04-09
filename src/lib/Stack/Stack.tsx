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

const alignClass = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
  baseline: styles.alignBaseline,
} as const

const justifyClass = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
  evenly: styles.justifyEvenly,
} as const

export type StackProps = Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & {
  direction?: 'row' | 'column'
  gap?: keyof typeof gapClass
  /** Override `alignItems`. Row default: `center`. Column default: `stretch`. */
  align?: keyof typeof alignClass
  /** Override `justifyContent`. */
  justify?: keyof typeof justifyClass
  /** Enable `flex-wrap`. */
  wrap?: boolean
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

function StackInner(
  {
    direction = 'column',
    gap = 'md',
    align,
    justify,
    wrap = false,
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
    wrap && styles.wrap,
    align != null ? alignClass[align] : null,
    justify != null ? justifyClass[justify] : null,
  )
  return <div ref={ref} {...rest} {...mergeSx(sx, className, style)} />
}

export const Stack = memo(forwardRef(StackInner))
