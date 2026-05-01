import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: space.md,
    width: '100%',
    minWidth: 0,
    fontFamily: fonts.sans,
    boxSizing: 'border-box',
    maxWidth: '100%',
  },

  footer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    paddingTop: space.md,
    marginTop: space.xs,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    minWidth: 0,
  },

  monthLabel: {
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: colors.fg,
    letterSpacing: '-0.02em',
    flex: 1,
    textAlign: 'center' as const,
    minWidth: 0,
  },

  monthTitleBtn: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
    margin: 0,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: colors.fg,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: radii.sm,
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
      color: colors.accent,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },


  yearTitleBtn: {
    flex: 1,
    minWidth: 0,
    margin: 0,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    fontFamily: fonts.sans,
    fontSize: '1.0625rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: colors.fg,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: radii.sm,
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
      color: colors.accent,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },
  yearLabel: {
    fontSize: '1.0625rem',
    fontWeight: 700,
    color: colors.fg,
    letterSpacing: '-0.02em',
    flex: 1,
    textAlign: 'center' as const,
    minWidth: 0,
  },

  /** Fills the calendar width; month grid is a proper block, not a compact inline strip. */
  monthPickerView: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    minWidth: 0,
    alignSelf: 'stretch' as const,
  },

  monthPickerGrid: {
    display: 'grid',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box' as const,
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(6, minmax(2.75rem, auto))',
    gap: space.sm,
    padding: space.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    boxShadow: elevation.card,
    ':focus-visible': {
      outline: 'none',
      boxShadow: `${elevation.card}, 0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },

  monthCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    minHeight: '2.75rem',
    paddingBlock: space.sm,
    paddingInline: space.md,
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: colors.bg,
    color: colors.fgMuted,
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: 1.2,
    cursor: 'pointer',
    transitionProperty: 'color, background-color, box-shadow',
    transitionDuration: '0.12s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
      color: colors.fg,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },

  monthCellCurrent: {
    fontWeight: 700,
    color: colors.accent,
    boxShadow: `inset 0 0 0 1px ${colors.accentMuted}`,
  },

  monthCellSelected: {
    backgroundColor: colors.accent,
    color: colors.accentFg,
    fontWeight: 600,
    ':hover': {
      backgroundColor: colors.accent,
      color: colors.accentFg,
      opacity: 0.92,
    },
  },

  monthCellDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'transparent',
      color: colors.fgMuted,
    },
  },


  yearPickerGrid: {
    display: 'grid',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box' as const,
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(4, minmax(2.5rem, auto))',
    gap: space.sm,
    padding: space.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    boxShadow: elevation.card,
    ':focus-visible': {
      outline: 'none',
      boxShadow: `${elevation.card}, 0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },

  yearCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2.5rem',
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: colors.bg,
    color: colors.fgMuted,
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    fontWeight: 500,
    cursor: 'pointer',
    transitionProperty: 'color, background-color, box-shadow',
    transitionDuration: '0.12s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
      color: colors.fg,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },

  yearCellCurrent: {
    fontWeight: 700,
    color: colors.accent,
    boxShadow: `inset 0 0 0 1px ${colors.accentMuted}`,
  },

  yearCellSelected: {
    backgroundColor: colors.accent,
    color: colors.accentFg,
    fontWeight: 600,
    ':hover': {
      backgroundColor: colors.accent,
      color: colors.accentFg,
      opacity: 0.92,
    },
  },
  navBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    flexShrink: 0,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    color: colors.fgMuted,
    cursor: 'pointer',
    transitionProperty: 'color, background-color, border-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
      borderColor: colors.borderStrong,
    },
    ':disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
  },

  weekdays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
    gap: '2px',
    marginBottom: '2px',
  },

  weekday: {
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: colors.fgSubtle,
    textAlign: 'center' as const,
    paddingBlock: '4px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
    gap: '4px',
    padding: space.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    boxShadow: elevation.card,
    ':focus-visible': {
      outline: 'none',
      boxShadow: `${elevation.card}, 0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },

  gridRow: {
    display: 'contents',
  },

  dayBtn: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '1',
    minWidth: '2rem',
    minHeight: '2rem',
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: colors.fgMuted,
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 500,
    cursor: 'pointer',
    transitionProperty: 'color, background-color, box-shadow',
    transitionDuration: '0.12s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
      color: colors.fg,
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${colors.bg}, 0 0 0 4px ${colors.focusRing}`,
    },
  },

  dayOutside: {
    color: colors.fgSubtle,
    opacity: 0.55,
    ':hover': {
      opacity: 0.85,
    },
  },

  dayToday: {
    fontWeight: 700,
    color: colors.accent,
    boxShadow: `inset 0 0 0 1px ${colors.accentMuted}`,
  },

  daySelected: {
    backgroundColor: colors.accent,
    color: colors.accentFg,
    fontWeight: 600,
    ':hover': {
      backgroundColor: colors.accent,
      color: colors.accentFg,
      opacity: 0.92,
    },
  },

  dayDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'transparent',
      color: colors.fgMuted,
    },
  },
})
