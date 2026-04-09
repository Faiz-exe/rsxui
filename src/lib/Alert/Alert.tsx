import * as stylex from '@stylexjs/stylex'
import { forwardRef, memo, type ReactNode, type Ref } from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Alert.stylex'

type AlertSeverity = 'info' | 'success' | 'warning' | 'danger'

export type AlertProps = {
  severity?: AlertSeverity
  title?: ReactNode
  children: ReactNode
  /** When provided, shows a dismiss button */
  onDismiss?: () => void
  icon?: ReactNode
  className?: string
  style?: React.CSSProperties
}

const severityClass: Record<AlertSeverity, (typeof styles)[keyof typeof styles]> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
}

const iconColorClass: Record<AlertSeverity, (typeof styles)[keyof typeof styles]> = {
  info: styles.iconInfo,
  success: styles.iconSuccess,
  warning: styles.iconWarning,
  danger: styles.iconDanger,
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  )
}

function DangerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  )
}

const defaultIcons: Record<AlertSeverity, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
}

function AlertInner(
  {
    severity = 'info',
    title,
    children,
    onDismiss,
    icon,
    className,
    style,
  }: AlertProps,
  ref: Ref<HTMLDivElement>,
) {
  const renderedIcon = icon !== undefined ? icon : defaultIcons[severity]

  return (
    <div
      ref={ref}
      role="alert"
      {...mergeSx(
        stylex.props(styles.root, severityClass[severity]),
        className,
        style,
      )}
    >
      {renderedIcon != null && (
        <div {...stylex.props(styles.icon, iconColorClass[severity])}>
          {renderedIcon}
        </div>
      )}
      <div {...stylex.props(styles.body)}>
        {title != null && <span {...stylex.props(styles.title)}>{title}</span>}
        <div {...stylex.props(styles.content)}>{children}</div>
      </div>
      {onDismiss != null && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          {...stylex.props(styles.dismissBtn)}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export const Alert = memo(forwardRef(AlertInner))
