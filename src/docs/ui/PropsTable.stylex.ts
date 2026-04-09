import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../../lib/theme/tokens.stylex'

export const propsTableStyles = stylex.create({
  wrap: {
    width: '100%',
    overflowX: 'auto' as const,
    marginBottom: space.xl,
    WebkitOverflowScrolling: 'touch',
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    boxShadow: [elevation.card, `inset 3px 0 0 0 ${colors.accent}`].join(', '),
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left' as const,
    paddingBlock: space.sm,
    paddingInline: space.md,
    backgroundColor: colors.bgSubtle,
    color: colors.fg,
    fontWeight: 600,
    fontSize: '0.75rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    verticalAlign: 'bottom' as const,
  },
  td: {
    verticalAlign: 'top' as const,
    paddingBlock: space.md,
    paddingInline: space.md,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    color: colors.fgMuted,
    lineHeight: 1.5,
    transitionProperty: 'background-color',
    transitionDuration: '0.12s',
  },
  row: {
    ':hover': {
      backgroundColor: colors.bgSubtle,
    },
  },
  tdLast: {
    borderBottomWidth: 0,
  },
  code: {
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    color: colors.fg,
    wordBreak: 'break-word' as const,
  },
  nameCell: {
    fontWeight: 600,
    color: colors.fg,
    whiteSpace: 'nowrap' as const,
  },
  requiredMark: {
    color: colors.danger,
    fontWeight: 700,
  },
  footnote: {
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    color: colors.fgSubtle,
    marginTop: space.sm,
    marginBottom: 0,
  },
})
