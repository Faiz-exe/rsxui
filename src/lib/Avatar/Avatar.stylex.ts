import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    overflow: 'hidden',
    flexShrink: 0,
    userSelect: 'none',
    fontFamily: fonts.sans,
    fontWeight: 600,
    lineHeight: 1,
    verticalAlign: 'middle',
    backgroundColor: colors.accentMuted,
    color: colors.accent,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: 'inherit',
  },

  /* Sizes */
  xs: { width: '24px', height: '24px', fontSize: '0.625rem' },
  sm: { width: '32px', height: '32px', fontSize: '0.75rem' },
  md: { width: '40px', height: '40px', fontSize: '0.875rem' },
  lg: { width: '48px', height: '48px', fontSize: '1rem' },
  xl: { width: '64px', height: '64px', fontSize: '1.25rem' },

  /* Shapes */
  square: { borderRadius: radii.md },

  /* Severity colors */
  primary: { backgroundColor: colors.accentMuted, color: colors.accent },
  secondary: { backgroundColor: colors.neutralMuted, color: colors.fgMuted },
  success: { backgroundColor: colors.successMuted, color: colors.success },
  danger: { backgroundColor: colors.dangerMuted, color: colors.danger },
  warning: { backgroundColor: colors.warningMuted, color: colors.warning },
  info: { backgroundColor: colors.infoMuted, color: colors.info },

  /* Group */
  group: {
    display: 'inline-flex',
    flexDirection: 'row-reverse' as const,
    alignItems: 'center',
  },
  groupItem: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.bg,
    marginInlineEnd: '-8px',
  },
  groupItemFirst: {
    marginInlineEnd: 0,
  },
})
