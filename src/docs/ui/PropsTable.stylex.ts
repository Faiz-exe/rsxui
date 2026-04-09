import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../../lib/theme/tokens.stylex'

export const propsTableStyles = stylex.create({
  section: {
    marginBottom: space['2xl'],
  },

  heading: {
    fontFamily: fonts.sans,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: colors.fgSubtle,
    marginTop: 0,
    marginBottom: space.sm,
  },

  wrap: {
    width: '100%',
    overflowX: 'auto' as const,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    boxShadow: elevation.card,
    WebkitOverflowScrolling: 'touch',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
  },

  th: {
    textAlign: 'left' as const,
    paddingBlock: space.sm,
    paddingInline: space.md,
    backgroundColor: colors.bgSubtle,
    color: colors.fgSubtle,
    fontWeight: 600,
    fontSize: '0.6875rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    verticalAlign: 'bottom' as const,
    whiteSpace: 'nowrap' as const,
  },

  td: {
    verticalAlign: 'top' as const,
    paddingBlock: space.md,
    paddingInline: space.md,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    color: colors.fgMuted,
    lineHeight: 1.55,
  },

  row: {
    transitionProperty: 'background-color',
    transitionDuration: '0.1s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
    },
  },

  tdLast: {
    borderBottomWidth: 0,
  },

  nameCode: {
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: colors.fg,
    letterSpacing: '-0.01em',
  },

  requiredDot: {
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: radii.full,
    backgroundColor: colors.danger,
    marginInlineStart: '5px',
    verticalAlign: 'middle',
    marginBottom: '2px',
  },

  /* ── Type pills ── */
  typePill: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: fonts.mono,
    fontSize: '0.75rem',
    fontWeight: 500,
    paddingBlock: '2px',
    paddingInline: '7px',
    borderRadius: radii.sm,
    lineHeight: 1.5,
  },

  typePillDefault: {
    backgroundColor: colors.bgSubtle,
    color: colors.fgMuted,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },

  typePillString: {
    backgroundColor: colors.infoMuted,
    color: colors.info,
  },

  typePillBoolean: {
    backgroundColor: colors.accentMuted,
    color: colors.accent,
  },

  typePillNumber: {
    backgroundColor: colors.successMuted,
    color: colors.success,
  },

  typePillNode: {
    backgroundColor: colors.warningMuted,
    color: colors.warning,
  },

  defaultCode: {
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    color: colors.fgMuted,
  },

  dash: {
    color: colors.fgSubtle,
  },

  nameCell: {
    whiteSpace: 'nowrap' as const,
  },

  code: {
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    color: colors.fg,
  },

  footnote: {
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    color: colors.fgSubtle,
    marginTop: space.sm,
    marginBottom: 0,
    paddingInline: space.md,
    paddingBottom: space.sm,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
})
