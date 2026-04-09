import * as stylex from '@stylexjs/stylex'
import { colors, fonts } from '../theme/tokens.stylex'

export const styles = stylex.create({
  base: {
    fontFamily: fonts.sans,
    margin: 0,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.25,
    color: colors.fg,
  },
  subtitle: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.35,
    color: colors.fg,
  },
  body: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.fg,
  },
  small: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.fg,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    color: colors.fgMuted,
  },
  muted: {
    color: colors.fgMuted,
  },
  subtle: {
    color: colors.fgSubtle,
  },
  accent: {
    color: colors.accent,
  },
  danger: {
    color: colors.danger,
  },
  success: {
    color: colors.success,
  },
  mono: {
    fontFamily: fonts.mono,
  },
})
