import * as stylex from '@stylexjs/stylex'
import React, {
  createElement,
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ElementType,
  type KeyboardEvent,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Card.stylex'

const padClass = {
  none: styles.padNone,
  md: styles.padMd,
  lg: styles.padLg,
} as const

export type CardElement =
  | 'div'
  | 'article'
  | 'section'
  | 'aside'
  | 'main'
  | 'header'
  | 'footer'
  | 'li'
  | 'nav'

export type CardProps = Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & {
  /** Render as a different HTML element. Defaults to `'div'`. */
  as?: CardElement
  padding?: keyof typeof padClass
  /**
   * Adds hover/focus styles and makes the card keyboard-activatable.
   * When true, the card receives `tabIndex={0}`, `role="button"` (unless
   * overridden), and fires `onClick` on Enter/Space.
   */
  interactive?: boolean
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

function CardInner(
  {
    as: Tag = 'div',
    padding = 'md',
    interactive = false,
    className,
    style,
    onClick,
    onKeyDown,
    tabIndex,
    role,
    ...rest
  }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  const sx = stylex.props(
    styles.root,
    padClass[padding],
    interactive && styles.interactive,
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (!interactive || e.defaultPrevented) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
    }
  }

  return createElement(Tag as ElementType, {
    ref,
    role: role ?? (interactive ? 'button' : undefined),
    tabIndex: tabIndex ?? (interactive ? 0 : undefined),
    onClick,
    onKeyDown: handleKeyDown,
    ...rest,
    ...mergeSx(sx, className, style),
  })
}

export const Card = memo(forwardRef(CardInner))
