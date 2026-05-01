function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Format a date using a token pattern (subset). Long tokens first: `yyyy`, `yy`, `mm`, `dd`, then `m`, `d`. */
export function formatCalendarDate(
  d: Date,
  dateFormat: string,
  _locale?: string,
): string {
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  let s = dateFormat
  s = s.replace(/yyyy/g, String(y))
  s = s.replace(/yy/g, String(y).slice(-2))
  s = s.replace(/mm/g, String(m).padStart(2, '0'))
  s = s.replace(/dd/g, String(day).padStart(2, '0'))
  s = s.replace(/m/g, String(m))
  s = s.replace(/d/g, String(day))
  return s
}

/**
 * Parse a user-typed string using the same delimiter order as `dateFormat`.
 * Supports tokens: `yyyy`, `yy`, `mm`, `m`, `dd`, `d` separated by `/`, `-`, or `.`
 */
export function parseCalendarDate(str: string, dateFormat: string): Date | null {
  const trimmed = str.trim()
  if (!trimmed) return null

  const lower = dateFormat.toLowerCase()
  let delim: string | null = null
  if (lower.includes('/')) delim = '/'
  else if (lower.includes('-')) delim = '-'
  else if (lower.includes('.')) delim = '.'
  if (!delim) return null

  const valueParts = trimmed.split(delim).map((p) => p.trim())
  const formatParts = dateFormat.split(delim).map((p) => p.trim().toLowerCase())

  if (valueParts.length !== formatParts.length || valueParts.some((v) => v === '')) {
    return null
  }

  let y = 0
  let m = 0
  let d = 0

  for (let i = 0; i < formatParts.length; i++) {
    const fp = formatParts[i]!
    const raw = valueParts[i]!
    const pv = parseInt(raw, 10)
    if (Number.isNaN(pv)) return null

    if (fp === 'yyyy') y = pv
    else if (fp === 'yy') {
      y = pv <= 69 ? 2000 + pv : 1900 + pv
    } else if (fp === 'mm' || fp === 'm') m = pv
    else if (fp === 'dd' || fp === 'd') d = pv
    else return null
  }

  if (y < 1 || y > 9999 || m < 1 || m > 12 || d < 1 || d > 31) return null

  const date = new Date(y, m - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null
  }
  return startOfDay(date)
}
