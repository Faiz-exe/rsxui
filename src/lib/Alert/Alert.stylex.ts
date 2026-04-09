import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    display: 'flex',
    gap: space.md,
    padding: space.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  },

  /* Severities */
  info: {
    backgroundColor: colors.infoMuted,
    borderColor: colors.info,
    color: colors.fg,
  },
  success: {
    backgroundColor: colors.successMuted,
    borderColor: colors.success,
    color: colors.fg,
  },
  warning: {
    backgroundColor: colors.warningMuted,
    borderColor: colors.warning,
    color: colors.fg,
  },
  danger: {
    backgroundColor: colors.dangerMuted,
    borderColor: colors.danger,
    color: colors.fg,
  },

  /* Parts */
  icon: {
    flexShrink: 0,
    width: '20px',
    height: '20px',
    marginTop: '1px',
  },

  iconInfo: { color: colors.info },
  iconSuccess: { color: colors.success },
  iconWarning: { color: colors.warning },
  iconDanger: { color: colors.danger },

  body: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontWeight: 600,
    marginBottom: '4px',
    display: 'block',
  },

  content: {
    color: colors.fgMuted,
  },

  dismissBtn: {
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: colors.fgSubtle,
    cursor: 'pointer',
    padding: 0,
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.neutralMuted,
    },
  },
})
