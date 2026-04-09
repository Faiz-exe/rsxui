import * as stylex from '@stylexjs/stylex'
import { useCallback, useState, type ReactNode } from 'react'
import { docPreviewStyles as styles } from './DocPreview.stylex'

function IconCode() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l-6-6 6-6M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPreview() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}

export type DocPreviewProps = {
  title?: string
  /** Snippet text shown in snippet view and copied by the Copy action. */
  code: string
  /** Interactive preview (component demo). */
  children: ReactNode
}

/**
 * Docs helper: preview + read-only snippet with Copy. Snippets are for copying into
 * your project; the preview is the runnable demo.
 */
export function DocPreview({ title, code, children }: DocPreviewProps) {
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const trimmed = code.trimEnd()

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [trimmed])

  return (
    <div {...stylex.props(styles.wrap)}>
      <div {...stylex.props(styles.toolbar)}>
        <div {...stylex.props(styles.toolbarLeft)}>
          <span {...stylex.props(styles.title)}>
            {title != null && title !== '' ? title : 'Example'}
          </span>
        </div>
        <div {...stylex.props(styles.toolbarActions)}>
          <button
            type="button"
            {...stylex.props(styles.toolBtn, copied && styles.toolBtnCopied)}
            onClick={copy}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          {view === 'preview' ? (
            <button
              type="button"
              {...stylex.props(styles.toolBtn, styles.toolBtnIcon)}
              onClick={() => setView('code')}
              aria-label="Show snippet"
              title="Show snippet"
            >
              <IconCode />
            </button>
          ) : (
            <button
              type="button"
              {...stylex.props(styles.toolBtn, styles.toolBtnIcon)}
              onClick={() => setView('preview')}
              aria-label="Show preview"
              title="Show preview"
            >
              <IconPreview />
            </button>
          )}
        </div>
      </div>
      {view === 'preview' ? (
        <div {...stylex.props(styles.previewBody)}>{children}</div>
      ) : (
        <div {...stylex.props(styles.codeBody)}>
          <pre {...stylex.props(styles.pre)}>
            <code {...stylex.props(styles.code)}>{trimmed}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
