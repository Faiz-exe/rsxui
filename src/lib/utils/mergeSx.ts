import type { CSSProperties } from 'react'

type SxResult = Readonly<{
  className?: string
  style?: Readonly<CSSProperties>
  'data-style-src'?: string
}>

/**
 * Merges StyleX `props()` output with host `className` / `style` (common for library components).
 */
export function mergeSx(
  sx: SxResult,
  className?: string,
  style?: CSSProperties | undefined,
): {
  className: string
  style?: CSSProperties
  'data-style-src'?: string
} {
  const mergedClass = [sx.className, className].filter(Boolean).join(' ')
  const mergedStyle =
    style != null
      ? ({ ...(sx.style ?? {}), ...style } as CSSProperties)
      : (sx.style as CSSProperties | undefined)
  return {
    className: mergedClass,
    ...(mergedStyle != null && Object.keys(mergedStyle).length > 0
      ? { style: mergedStyle }
      : {}),
    ...(sx['data-style-src'] != null && {
      'data-style-src': sx['data-style-src'],
    }),
  }
}
