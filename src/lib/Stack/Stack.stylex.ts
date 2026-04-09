import * as stylex from '@stylexjs/stylex'
import { space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  base: {
    display: 'flex',
    boxSizing: 'border-box',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  gapXs: { gap: space.xs },
  gapSm: { gap: space.sm },
  gapMd: { gap: space.md },
  gapLg: { gap: space.lg },
  gapXl: { gap: space.xl },
})
