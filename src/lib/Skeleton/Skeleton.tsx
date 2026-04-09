import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Skeleton.stylex'

type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export type SkeletonProps = {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  /** For text variant: number of repeated lines */
  lines?: number
  className?: string
  style?: React.CSSProperties
}

const variantClass: Record<SkeletonVariant, (typeof styles)[keyof typeof styles]> = {
  text: styles.text,
  circular: styles.circular,
  rectangular: styles.rectangular,
}

function SkeletonInner(
  {
    variant = 'text',
    width,
    height,
    lines = 1,
    className,
    style,
  }: SkeletonProps,
  ref: Ref<HTMLSpanElement>,
) {
  const sizeStyle: React.CSSProperties = {
    ...(width != null ? { width } : {}),
    ...(height != null ? { height } : {}),
    ...(variant === 'circular' && width != null && height == null
      ? { height: width }
      : {}),
  }

  if (variant === 'text' && lines > 1) {
    return (
      <span
        ref={ref}
        role="status"
        aria-busy
        aria-label="Loading..."
        {...mergeSx(stylex.props(), className, style)}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...style }}
      >
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            {...stylex.props(styles.root, variantClass[variant])}
            style={
              i === lines - 1
                ? { ...sizeStyle, width: '60%' }
                : sizeStyle
            }
          />
        ))}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      role="status"
      aria-busy
      aria-label="Loading..."
      {...mergeSx(
        stylex.props(styles.root, variantClass[variant]),
        className,
        { ...sizeStyle, ...style },
      )}
    />
  )
}

export const Skeleton = memo(forwardRef(SkeletonInner))
