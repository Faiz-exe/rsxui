import * as stylex from '@stylexjs/stylex'
import { useCallback, useState, type ReactNode } from 'react'
import { docPreviewStyles as styles } from './DocPreview.stylex'

function IconCopy() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth={2} />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export type DocPreviewProps = {
  title?: string
  /** Snippet text shown in code view and copied by the Copy action. */
  code: string
  /** Interactive preview (live component demo). */
  children: ReactNode
}

/**
 * Two-pane docs preview: "Preview" tab shows the live component,
 * "Code" tab shows the copyable snippet.
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

  const label = title != null && title !== '' ? title : 'Example'

  return (
    <div {...stylex.props(styles.wrap)} aria-label={label}>
      {/* Tab bar */}
      <div {...stylex.props(styles.tabBar)} role="tablist" aria-label={`${label} tabs`}>
        <button
          role="tab"
          type="button"
          aria-selected={view === 'preview'}
          aria-controls="doc-preview-panel"
          {...stylex.props(styles.tab, view === 'preview' && styles.tabActive)}
          onClick={() => setView('preview')}
        >
          Preview
        </button>
        <button
          role="tab"
          type="button"
          aria-selected={view === 'code'}
          aria-controls="doc-code-panel"
          {...stylex.props(styles.tab, view === 'code' && styles.tabActive)}
          onClick={() => setView('code')}
        >
          Code
        </button>

        <div {...stylex.props(styles.tabSpacer)} aria-hidden />

        <div {...stylex.props(styles.tabActions)}>
          <button
            type="button"
            title="Copy code"
            aria-label={copied ? 'Copied!' : 'Copy code snippet'}
            {...stylex.props(styles.copyBtn, copied && styles.copyBtnCopied)}
            onClick={copy}
          >
            {copied ? <IconCheck /> : <IconCopy />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Panels */}
      {view === 'preview' ? (
        <div id="doc-preview-panel" role="tabpanel" {...stylex.props(styles.previewBody)}>
          {children}
        </div>
      ) : (
        <div id="doc-code-panel" role="tabpanel" {...stylex.props(styles.codeBody)}>
          <pre {...stylex.props(styles.pre)}>
            <code {...stylex.props(styles.code)}>{trimmed}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
