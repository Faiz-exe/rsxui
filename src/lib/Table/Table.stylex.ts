import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  wrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
  },
  container: {
    width: '100%',
    overflowX: 'auto' as const,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.bg,
  },
  table: {
    width: '100%',
    borderCollapse: 'separate' as const,
    borderSpacing: 0,
    fontFamily: fonts.sans,
    color: colors.fg,
    minWidth: '28rem',
  },
  th: {
    textAlign: 'left' as const,
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    backgroundColor: colors.bgSubtle,
    color: colors.fgSubtle,
    paddingInline: space.md,
    paddingBlock: space.sm,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    whiteSpace: 'nowrap' as const,
  },
  thSortable: {
    cursor: 'pointer',
    userSelect: 'none' as const,
  },
  sortIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    marginInlineStart: '6px',
    width: '0.75rem',
  },
  thSelection: {
    width: '2.25rem',
    textAlign: 'center' as const,
    paddingInline: '6px',
  },
  tdSelection: {
    width: '2.25rem',
    textAlign: 'center' as const,
    paddingInline: '6px',
  },
  rowSelected: {
    backgroundColor: colors.accentMuted,
  },
  td: {
    paddingInline: space.md,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    color: colors.fg,
    verticalAlign: 'middle' as const,
  },
  tdSm: {
    paddingBlock: '6px',
    fontSize: '0.8125rem',
  },
  tdMd: {
    paddingBlock: space.sm,
    fontSize: '0.875rem',
  },
  tdLg: {
    paddingBlock: space.md,
    fontSize: '0.9375rem',
  },
  rowStriped: {
    backgroundColor: colors.bgSubtle,
  },
  rowHover: {
    ':hover': {
      backgroundColor: colors.bgElevated,
    },
  },
  gridlinesTd: {
    borderInlineEndWidth: 1,
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: colors.border,
  },
  gridlinesTh: {
    borderInlineEndWidth: 1,
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: colors.border,
  },
  cellLast: {
    borderInlineEndWidth: 0,
  },
  rowLastCell: {
    borderBottomWidth: 0,
  },
  empty: {
    color: colors.fgMuted,
  },
  muted: {
    color: colors.fgMuted,
  },
  headerFooter: {
    fontFamily: fonts.sans,
    color: colors.fgMuted,
    fontSize: '0.875rem',
  },
  paginator: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    fontFamily: fonts.sans,
    color: colors.fgMuted,
    fontSize: '0.8125rem',
  },
  pagerBtns: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  pagerBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.bg,
    color: colors.fg,
    paddingInline: space.sm,
    paddingBlock: '6px',
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  pagerSelect: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.bg,
    color: colors.fg,
    paddingInline: space.sm,
    paddingBlock: '6px',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
  },
  checkbox: {
    width: '1rem',
    height: '1rem',
    accentColor: colors.accent,
    cursor: 'pointer',
  },
  checkboxDisabled: {
    cursor: 'not-allowed',
  },
})
