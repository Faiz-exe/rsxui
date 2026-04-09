import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type ReactNode, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Divider.stylex'

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  /** Optional label shown in the middle of the line */
  label?: ReactNode
  /** Align label to start, center, or end */
  align?: 'start' | 'center' | 'end'
  className?: string
  style?: React.CSSProperties
}

function DividerInner(
  {
    orientation = 'horizontal',
    label,
    align = 'center',
    className,
    style,
  }: DividerProps,
  ref: Ref<HTMLDivElement>,
) {
  const isH = orientation === 'horizontal'
  const lineStyle = isH ? styles.lineH : styles.lineV

  if (label == null) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        {...mergeSx(
          stylex.props(styles.root, isH ? styles.horizontal : styles.vertical),
          className,
          style,
        )}
      >
        <div {...stylex.props(styles.line, lineStyle)} />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      {...mergeSx(
        stylex.props(styles.root, isH ? styles.horizontal : styles.vertical),
        className,
        style,
      )}
    >
      {align !== 'start' && <div {...stylex.props(styles.line, lineStyle)} />}
      <span {...stylex.props(styles.label)}>{label}</span>
      {align !== 'end' && <div {...stylex.props(styles.line, lineStyle)} />}
    </div>
  )
}

export const Divider = memo(forwardRef(DividerInner))
