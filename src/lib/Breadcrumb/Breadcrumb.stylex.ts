import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  // ── Root nav ─────────────────────────────────────────────────────────────────
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  // ── Ordered list ─────────────────────────────────────────────────────────────
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  // ── Single list item (wraps item + separator) ─────────────────────────────
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  // ── Separator ────────────────────────────────────────────────────────────────
  separator: {
    display: 'flex',
    alignItems: 'center',
    color: colors.fgSubtle,
    paddingInline: space.xs,
    userSelect: 'none',
    flexShrink: 0,
  },
  // ── Shared crumb base — resets both <a> and <button> defaults ────────────
  crumb: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.xs,
    borderRadius: radii.sm,
    // anchor resets
    textDecoration: 'none',
    // button resets
    appearance: 'none',
    background: 'none',
    border: 'none',
    margin: 0,
    paddingBlock: '2px',
    paddingInline: '4px',
    // shared
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    cursor: 'pointer',
    maxWidth: '18ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s ease, background-color 0.15s ease',
  },
  // ── Link (ancestor) state ─────────────────────────────────────────────────
  link: {
    color: colors.fgMuted,
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.neutralMuted,
    },
    ':focus-visible': {
      outline: `2px solid ${colors.focusRing}`,
      outlineOffset: '2px',
    },
  },
  // ── Current (last) page ───────────────────────────────────────────────────
  current: {
    color: colors.fg,
    fontWeight: 600,
    cursor: 'default',
    pointerEvents: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  // ── Icon slot ─────────────────────────────────────────────────────────────
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
  },
})
