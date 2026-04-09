import * as stylex from '@stylexjs/stylex'
import { colors, fonts } from './tokens.stylex'

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bg,
    color: colors.fg,
    fontFamily: fonts.sans,
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
})
