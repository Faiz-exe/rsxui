import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.02em',
    paddingInline: space.sm,
    paddingBlock: space.xs,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: 'solid',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  neutral: {
    color: colors.fgMuted,
    backgroundColor: colors.neutralMuted,
    borderColor: 'transparent',
  },
  accent: {
    color: colors.accent,
    backgroundColor: colors.accentMuted,
    borderColor: 'transparent',
  },
  danger: {
    color: colors.danger,
    backgroundColor: colors.dangerMuted,
    borderColor: 'transparent',
  },
  success: {
    color: colors.success,
    backgroundColor: colors.successMuted,
    borderColor: 'transparent',
  },
  outline: {
    color: colors.fg,
    backgroundColor: 'transparent',
    borderColor: colors.borderStrong,
  },
})
