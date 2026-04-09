import * as stylex from '@stylexjs/stylex'
import { colors, fonts, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    display: 'block',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1.35,
    color: colors.fg,
    marginBottom: space.xs,
  },
  required: {
    color: colors.danger,
    marginInlineStart: '2px',
  },
})
