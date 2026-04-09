import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useState,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Avatar.stylex'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

export type AvatarProps = {
  src?: string | null
  alt?: string
  label?: string
  icon?: ReactNode
  size?: AvatarSize
  shape?: 'circle' | 'square'
  severity?: AvatarSeverity
  className?: string
  style?: React.CSSProperties
}

const sizeClass: Record<AvatarSize, (typeof styles)[keyof typeof styles]> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
}

const severityClass: Record<AvatarSeverity, (typeof styles)[keyof typeof styles]> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function AvatarInner(
  {
    src,
    alt,
    label,
    icon,
    size = 'md',
    shape = 'circle',
    severity = 'primary',
    className,
    style,
  }: AvatarProps,
  ref: Ref<HTMLSpanElement>,
) {
  const [imgError, setImgError] = useState(false)
  const showImage = src != null && src !== '' && !imgError

  const content = showImage ? (
    <img
      {...stylex.props(styles.image)}
      src={src!}
      alt={alt ?? label ?? ''}
      onError={() => setImgError(true)}
    />
  ) : icon != null ? (
    icon
  ) : label != null && label !== '' ? (
    getInitials(label)
  ) : (
    <svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )

  return (
    <span
      ref={ref}
      role="img"
      aria-label={alt ?? label ?? undefined}
      {...mergeSx(
        stylex.props(
          styles.root,
          sizeClass[size],
          severityClass[severity],
          shape === 'square' && styles.square,
        ),
        className,
        style,
      )}
    >
      {content}
    </span>
  )
}

export const Avatar = memo(forwardRef(AvatarInner))

/* ── Avatar Group ── */
export type AvatarGroupProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

function AvatarGroupInner(
  { children, className, style }: AvatarGroupProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      role="group"
      {...mergeSx(stylex.props(styles.group), className, style)}
    >
      {children}
    </div>
  )
}

export const AvatarGroup = memo(forwardRef(AvatarGroupInner))
