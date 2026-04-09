import * as stylex from '@stylexjs/stylex'
import { memo, type ComponentPropsWithoutRef } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Label.stylex'

export type LabelProps = ComponentPropsWithoutRef<'label'> & {
  requiredIndicator?: boolean
}

function LabelInner({
  children,
  requiredIndicator,
  className,
  style,
  ...rest
}: LabelProps) {
  const sx = stylex.props(styles.root)
  return (
    <label {...rest} {...mergeSx(sx, className, style)}>
      {children}
      {requiredIndicator ? (
        <span {...stylex.props(styles.required)} aria-hidden>
          *
        </span>
      ) : null}
    </label>
  )
}

export const Label = memo(LabelInner)
