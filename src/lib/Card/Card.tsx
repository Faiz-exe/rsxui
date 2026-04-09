import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Card.stylex'

const padClass = {
  none: styles.padNone,
  md: styles.padMd,
  lg: styles.padLg,
} as const

export type CardProps = Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & {
  padding?: keyof typeof padClass
  interactive?: boolean
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

function CardInner(
  {
    padding = 'md',
    interactive = false,
    className,
    style,
    ...rest
  }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  const sx = stylex.props(
    styles.root,
    padClass[padding],
    interactive && styles.interactive,
  )
  return (
    <div ref={ref} {...rest} {...mergeSx(sx, className, style)} />
  )
}

export const Card = memo(forwardRef(CardInner))
