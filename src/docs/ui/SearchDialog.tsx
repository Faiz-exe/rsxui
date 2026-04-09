import * as stylex from '@stylexjs/stylex'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { colors, elevation, fonts, radii, space } from '../../lib/theme/tokens.stylex'
import { SEARCH_INDEX, type SearchEntry } from '../searchIndex'

/* ── Keyframes ── */
const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const slideUp = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(16px) scale(0.97)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
})

/* ── Styles ── */
const s = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 'min(12vh, 120px)',
    paddingInline: space.lg,
    animationName: fadeIn,
    animationDuration: '0.14s',
    animationFillMode: 'both',
  },

  dialog: {
    width: '100%',
    maxWidth: '560px',
    maxHeight: 'min(70vh, 520px)',
    borderRadius: radii.lg,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    boxShadow: `${elevation.cardHover}, 0 0 0 1px rgba(0,0,0,0.03)`,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    animationName: slideUp,
    animationDuration: '0.2s',
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },

  /* ── Input bar ── */
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    paddingInline: space.lg,
    paddingBlock: '2px',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    flexShrink: 0,
  },

  searchIcon: {
    flexShrink: 0,
    color: colors.accent,
  },

  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: fonts.sans,
    fontSize: '1rem',
    fontWeight: 400,
    color: colors.fg,
    paddingBlock: '14px',
    '::placeholder': {
      color: colors.fgSubtle,
    },
  },

  kbd: {
    fontFamily: fonts.mono,
    fontSize: '0.625rem',
    fontWeight: 600,
    color: colors.fgSubtle,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: '4px',
    paddingBlock: '2px',
    paddingInline: '5px',
    lineHeight: 1.4,
    flexShrink: 0,
  },

  /* ── Results list ── */
  results: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    paddingBlock: space.xs,
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `${colors.border} transparent`,
  },

  group: {
    paddingInline: space.sm,
  },

  groupLabel: {
    fontFamily: fonts.sans,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: colors.fgSubtle,
    paddingBlock: '6px',
    paddingInline: space.sm,
    marginTop: space.xs,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  groupCount: {
    fontFamily: fonts.mono,
    fontSize: '0.5625rem',
    fontWeight: 600,
    color: colors.fgSubtle,
    backgroundColor: colors.bgSubtle,
    borderRadius: radii.full,
    paddingBlock: '1px',
    paddingInline: '5px',
    lineHeight: 1.4,
  },

  /* ── Individual result item ── */
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    paddingBlock: '10px',
    paddingInline: space.sm,
    borderRadius: radii.sm,
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.06s',
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    marginBlock: '1px',
  },

  itemActive: {
    backgroundColor: colors.accentMuted,
    borderLeftColor: colors.accent,
  },

  itemContent: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1px',
  },

  itemTitle: {
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    fontWeight: 600,
    color: colors.fg,
    lineHeight: 1.3,
  },

  itemDesc: {
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    color: colors.fgMuted,
    lineHeight: 1.4,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
  },

  itemArrow: {
    flexShrink: 0,
    color: colors.fgSubtle,
    opacity: 0,
    transform: 'translateX(-4px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.1s',
  },

  itemArrowVisible: {
    opacity: 1,
    transform: 'translateX(0)',
  },

  itemIcon: {
    flexShrink: 0,
    width: '28px',
    height: '28px',
    borderRadius: radii.sm,
    backgroundColor: colors.bgSubtle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.fgMuted,
  },

  itemIconActive: {
    backgroundColor: colors.accent,
    color: colors.accentFg,
  },

  /* ── Footer ── */
  footer: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: space.md,
    paddingBlock: '8px',
    paddingInline: space.lg,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
    fontFamily: fonts.sans,
    fontSize: '0.6875rem',
    color: colors.fgSubtle,
    backgroundColor: colors.bgSubtle,
  },

  footerHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  footerRight: {
    marginLeft: 'auto',
  },

  /* ── Empty state ── */
  empty: {
    paddingBlock: space['2xl'],
    paddingInline: space.lg,
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: space.sm,
  },

  emptyIcon: {
    color: colors.fgSubtle,
    opacity: 0.5,
  },

  emptyText: {
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    color: colors.fgMuted,
  },

  emptyQuery: {
    fontWeight: 600,
    color: colors.fg,
  },

  /* ── Result count ── */
  resultCount: {
    fontFamily: fonts.sans,
    fontSize: '0.6875rem',
    color: colors.fgSubtle,
  },
})

/* ── Category icon mapping ── */
const CATEGORY_ICONS: Record<string, string> = {
  'Getting started': '🚀',
  'Theming': '🎨',
  'Inputs': '✏️',
  'Components': '🧩',
  'Display': '👁',
}

/* ── Helpers ── */
function search(query: string): SearchEntry[] {
  if (!query.trim()) return SEARCH_INDEX
  const q = query.toLowerCase().trim()
  const terms = q.split(/\s+/)

  const scored = SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase()
    const desc = entry.desc.toLowerCase()
    const kw = entry.keywords.join(' ').toLowerCase()
    const haystack = `${title} ${desc} ${entry.category.toLowerCase()} ${kw}`
    if (!terms.every((t) => haystack.includes(t))) return null

    let score = 0
    for (const t of terms) {
      if (title === t) score += 100
      else if (title.startsWith(t)) score += 50
      else if (title.includes(t)) score += 20
      else if (kw.includes(t)) score += 10
      else score += 1
    }
    return { entry, score }
  }).filter(Boolean) as { entry: SearchEntry; score: number }[]

  scored.sort((a, b) => b.score - a.score)
  return scored.map((s) => s.entry)
}

function groupBy(entries: SearchEntry[]) {
  const map = new Map<string, SearchEntry[]>()
  for (const e of entries) {
    const list = map.get(e.category) ?? []
    list.push(e)
    map.set(e.category, list)
  }
  return map
}

/* ── Component ── */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => search(query), [query])
  const grouped = useMemo(() => groupBy(results), [results])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      setQuery('')
      setActiveIdx(0)
      requestAnimationFrame(() => inputRef.current?.focus())
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  const go = useCallback(
    (entry: SearchEntry) => {
      navigate(entry.to)
      onClose()
    },
    [navigate, onClose],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (results[activeIdx]) go(results[activeIdx])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [results, activeIdx, go, onClose],
  )

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    if (el) (el as HTMLElement).scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  if (!open) return null

  let flatIdx = -1

  return createPortal(
    <div {...stylex.props(s.backdrop)} onClick={onClose} role="presentation">
      <div
        {...stylex.props(s.dialog)}
        role="dialog"
        aria-label="Search documentation"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input bar */}
        <div {...stylex.props(s.inputRow)}>
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            {...stylex.props(s.searchIcon)}
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth={2} />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search docs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            {...stylex.props(s.input)}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <span {...stylex.props(s.resultCount)}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </span>
          )}
          <kbd {...stylex.props(s.kbd)}>Esc</kbd>
        </div>

        {/* Results */}
        <div {...stylex.props(s.results)} ref={listRef}>
          {results.length === 0 ? (
            <div {...stylex.props(s.empty)}>
              <svg
                width={32}
                height={32}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                {...stylex.props(s.emptyIcon)}
              >
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth={1.5} />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                <path d="M8 11h6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
              <span {...stylex.props(s.emptyText)}>
                No results for <span {...stylex.props(s.emptyQuery)}>&ldquo;{query}&rdquo;</span>
              </span>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([category, entries]) => (
              <div key={category} {...stylex.props(s.group)}>
                <div {...stylex.props(s.groupLabel)}>
                  <span aria-hidden>{CATEGORY_ICONS[category] ?? '📄'}</span>
                  {category}
                  <span {...stylex.props(s.groupCount)}>{entries.length}</span>
                </div>
                {entries.map((entry) => {
                  flatIdx++
                  const idx = flatIdx
                  const isActive = idx === activeIdx
                  return (
                    <div
                      key={entry.to}
                      data-active={isActive || undefined}
                      {...stylex.props(s.item, isActive && s.itemActive)}
                      onClick={() => go(entry)}
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      <div {...stylex.props(s.itemIcon, isActive && s.itemIconActive)}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div {...stylex.props(s.itemContent)}>
                        <span {...stylex.props(s.itemTitle)}>{entry.title}</span>
                        <span {...stylex.props(s.itemDesc)}>{entry.desc}</span>
                      </div>
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        {...stylex.props(s.itemArrow, isActive && s.itemArrowVisible)}
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div {...stylex.props(s.footer)}>
          <span {...stylex.props(s.footerHint)}>
            <kbd {...stylex.props(s.kbd)}>↑↓</kbd> navigate
          </span>
          <span {...stylex.props(s.footerHint)}>
            <kbd {...stylex.props(s.kbd)}>↵</kbd> open
          </span>
          <span {...stylex.props(s.footerHint, s.footerRight)}>
            <kbd {...stylex.props(s.kbd)}>esc</kbd> close
          </span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
