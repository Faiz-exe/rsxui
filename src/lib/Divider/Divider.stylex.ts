import * as stylex from '@stylexjs/stylex'
import { colors, fonts, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: space.md,
    margin: 0,
    borderWidth: 0,
    borderStyle: 'none',
    flexShrink: 0,
  },

  horizontal: {
    flexDirection: 'row' as const,
    width: '100%',
  },

  vertical: {
    flexDirection: 'column' as const,
    alignSelf: 'stretch',
    height: 'auto',
  },

  line: {
    flex: 1,
    backgroundColor: colors.border,
  },

  lineH: {
    height: '1px',
    minWidth: '16px',
  },

  lineV: {
    width: '1px',
    minHeight: '16px',
    flex: 1,
  },

  label: {
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: colors.fgSubtle,
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },

  alignStart: {
    '::before': { display: 'none' },
  },

  alignEnd: {
    '::after': { display: 'none' },
  },
})
