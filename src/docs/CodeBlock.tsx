import * as stylex from '@stylexjs/stylex'
import { useCallback, useState } from 'react'
import { styles } from './CodeBlock.stylex'

type CodeBlockProps = {
  children: string
  title?: string
  /** When true, allows switching between read-only display and a plain textarea. */
  editable?: boolean
  /** Controlled snippet — textarea is always shown; pair with `onChange`. */
  value?: string
  onChange?: (next: string) => void
}

function CodeBlockImpl({
  children,
  title,
  editable = false,
  value: valueProp,
  onChange,
}: CodeBlockProps) {
  const initial = children.trimEnd()
  const controlled = valueProp !== undefined && onChange !== undefined
  const [internal, setInternal] = useState(initial)
  const value = controlled ? valueProp : internal
  const [editing, setEditing] = useState(false)
  const [copied, setCopied] = useState(false)

  const setValue = useCallback(
    (next: string) => {
      if (controlled) {
        onChange(next)
      } else {
        setInternal(next)
      }
    },
    [controlled, onChange],
  )

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [value])

  const showTextarea = controlled || (editable && editing)

  return (
    <div {...stylex.props(styles.wrap)}>
      <div {...stylex.props(styles.toolbar)}>
        <div {...stylex.props(styles.toolbarLeft)}>
          <span {...stylex.props(styles.title)}>
            {title != null && title !== '' ? title : 'Snippet'}
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
          {!controlled && editable ? (
            <button
              type="button"
              {...stylex.props(styles.toolBtn, editing && styles.toolBtnOn)}
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? 'Done' : 'Change'}
            </button>
          ) : null}
        </div>
      </div>
      <div {...stylex.props(styles.body)}>
        {showTextarea ? (
          <textarea
            {...stylex.props(styles.textarea)}
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Code snippet"
          />
        ) : (
          <pre {...stylex.props(styles.pre)}>
            <code {...stylex.props(styles.code)}>{value}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export function CodeBlock(props: CodeBlockProps) {
  const controlled =
    props.value !== undefined && props.onChange !== undefined
  if (controlled) {
    return <CodeBlockImpl {...props} />
  }
  const remountKey = `${props.title ?? 'snippet'}:${props.children.slice(0, 160)}`
  return <CodeBlockImpl key={remountKey} {...props} />
}
