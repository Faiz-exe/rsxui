import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type ComponentPropsWithoutRef, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Label.stylex'

export type LabelProps = ComponentPropsWithoutRef<'label'> & {
  requiredIndicator?: boolean
}

function LabelInner(
  { children, requiredIndicator, className, style, ...rest }: LabelProps,
  ref: Ref<HTMLLabelElement>,
) {
  const sx = stylex.props(styles.root)
  return (
    <label ref={ref} {...rest} {...mergeSx(sx, className, style)}>
      {children}
      {requiredIndicator ? (
        <span {...stylex.props(styles.required)} aria-hidden>
          *
        </span>
      ) : null}
    </label>
  )
}

export const Label = memo(forwardRef(LabelInner))
