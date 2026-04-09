import { useRef, useState } from 'react'
import {
  Button,
  Stack,
  Toast,
  type ToastHandle,
  type ToastPosition,
} from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocP,
  InlineCode,
} from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

const toastProps = [
  {
    name: 'position',
    type: 'ToastPosition',
    default: "'bottom-center'",
    description:
      'Fixed region for the stack: corners, edges, or center. Toasts grow away from that anchor.',
  },
  {
    name: 'closeLabel',
    type: 'string',
    default: "'Close'",
    description: 'Accessible name for each toast dismiss button.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the portal root after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the portal root (e.g. z-index overrides).',
  },
] as const

const messageFields = [
  {
    name: 'severity',
    type: 'ToastSeverity',
    default: "'info'",
    description:
      'Like Snackbar + Alert: info = dark neutral bar (#323); secondary = light Paper; success/warning/danger/primary/help = filled semantic colors; contrast = darker neutral.',
  },
  {
    name: 'summary',
    type: 'ReactNode',
    description: 'Primary line (Snackbar message).',
  },
  {
    name: 'detail',
    type: 'ReactNode',
    description: 'Secondary line under the summary.',
  },
  {
    name: 'life',
    type: 'number',
    default: '3000',
    description:
      'Auto-dismiss delay in ms (like MUI autoHideDuration). Ignored when sticky is true.',
  },
  {
    name: 'sticky',
    type: 'boolean',
    default: 'false',
    description: 'Keeps the toast until the user closes it or clear() runs.',
  },
  {
    name: 'content',
    type: '(ctx) => ReactNode',
    description:
      'Custom body; when set, summary/detail are not rendered. Close control stays.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional stable id for remove(id). Generated if omitted.',
  },
] as const

export function ToastDoc() {
  useDocMeta('Toast', 'Snackbar with anchor positions, severities, and ref API.')
  const toastRef = useRef<ToastHandle>(null)
  const [position, setPosition] = useState<ToastPosition>('bottom-center')

  return (
    <DocArticle>
      <Toast ref={toastRef} position={position} />
      <DocH1>Toast</DocH1>
      <DocLead>
        Snackbar-style brief notifications inspired by{' '}
        <a href="https://mui.com/material-ui/react-snackbar/">Material UI Snackbar</a>: elevated
        Paper surface, default dark neutral bar for <InlineCode>info</InlineCode>, optional filled
        severities, Grow or Slide entrance, and imperative <InlineCode>show</InlineCode> /{' '}
        <InlineCode>clear</InlineCode> on a ref.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Toast, type ToastHandle" />

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        Mount <InlineCode>{'<Toast ref={toastRef} />'}</InlineCode> once (it portals to{' '}
        <InlineCode>document.body</InlineCode>), then call{' '}
        <InlineCode>toastRef.current?.show(&#123; summary, detail &#125;)</InlineCode>.
      </DocP>
      <DocPreview
        title="Basic"
        code={`const toastRef = useRef<ToastHandle>(null)

return (
  <>
    <Toast ref={toastRef} />
    <Button
      onClick={() =>
        toastRef.current?.show({
          summary: 'Saved',
          detail: 'Your changes were stored.',
          severity: 'success',
        })
      }
    >
      Show toast
    </Button>
  </>
)`}
      >
        <Stack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
          <Button
            type="button"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Saved',
                detail: 'Your changes were stored.',
                severity: 'success',
              })
            }
          >
            Show toast
          </Button>
        </Stack>
      </DocPreview>

      <DocH2 id="severity">Severity</DocH2>
      <DocPreview
        title="Severities"
        code={`<Button onClick={() => toastRef.current?.show({ summary: 'Success', severity: 'success' })} />
<Button onClick={() => toastRef.current?.show({ summary: 'Info', severity: 'info' })} />
<!-- warning, danger, secondary, primary, help, contrast -->`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button
            type="button"
            severity="success"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Success',
                detail: 'Operation completed.',
                severity: 'success',
              })
            }
          >
            Success
          </Button>
          <Button
            type="button"
            severity="info"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Info',
                detail: 'Something you should know.',
                severity: 'info',
              })
            }
          >
            Info
          </Button>
          <Button
            type="button"
            severity="warning"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Warning',
                detail: 'Check this before continuing.',
                severity: 'warning',
              })
            }
          >
            Warning
          </Button>
          <Button
            type="button"
            severity="danger"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Error',
                detail: 'Something went wrong.',
                severity: 'danger',
              })
            }
          >
            Danger
          </Button>
          <Button
            type="button"
            severity="secondary"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Secondary',
                detail: 'Neutral emphasis.',
                severity: 'secondary',
              })
            }
          >
            Secondary
          </Button>
          <Button
            type="button"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Primary',
                detail: 'Accent emphasis.',
                severity: 'primary',
              })
            }
          >
            Primary
          </Button>
          <Button
            type="button"
            severity="help"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Help',
                detail: 'Tip or guidance.',
                severity: 'help',
              })
            }
          >
            Help
          </Button>
          <Button
            type="button"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Contrast',
                detail: 'High-contrast block.',
                severity: 'contrast',
              })
            }
          >
            Contrast
          </Button>
        </Stack>
      </DocPreview>

      <DocH2 id="position">Position</DocH2>
      <DocP>
        Set <InlineCode>position</InlineCode> on <InlineCode>Toast</InlineCode> so the stack
        anchors to a viewport corner or the center.
      </DocP>
      <DocPreview
        title="Positions"
        code={`<Toast ref={toastRef} position="bottom-center" />`}
      >
        <Stack direction="column" gap="md">
          <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
            {(
              [
                'top-left',
                'top-center',
                'top-right',
                'center',
                'bottom-left',
                'bottom-center',
                'bottom-right',
              ] as const
            ).map((p) => (
              <Button
                key={p}
                type="button"
                size="sm"
                text={position !== p}
                severity={position === p ? 'primary' : 'secondary'}
                onClick={() => {
                  setPosition(p)
                  queueMicrotask(() => {
                    toastRef.current?.clear()
                    toastRef.current?.show({
                      summary: 'Position',
                      detail: p,
                      severity: 'info',
                    })
                  })
                }}
              >
                {p}
              </Button>
            ))}
          </Stack>
        </Stack>
      </DocPreview>

      <DocH2 id="multiple">Multiple &amp; sticky</DocH2>
      <DocP>
        Pass an array to <InlineCode>show</InlineCode> to enqueue several messages. Use{' '}
        <InlineCode>sticky: true</InlineCode> to keep a toast until dismissed or{' '}
        <InlineCode>clear()</InlineCode>.
      </DocP>
      <DocPreview
        title="Batch & sticky"
        code={`toastRef.current?.show([
  { summary: 'One', severity: 'info' },
  { summary: 'Two', severity: 'success' },
])
toastRef.current?.show({ summary: 'Needs action', sticky: true, severity: 'warning' })
toastRef.current?.clear()`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button
            type="button"
            onClick={() =>
              toastRef.current?.show([
                { summary: 'Queued', detail: 'First message.', severity: 'info' },
                { summary: 'Queued', detail: 'Second message.', severity: 'success' },
              ])
            }
          >
            Show multiple
          </Button>
          <Button
            type="button"
            severity="warning"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Sticky',
                detail: 'Stays until you close it or clear.',
                sticky: true,
                severity: 'warning',
              })
            }
          >
            Sticky
          </Button>
          <Button type="button" text onClick={() => toastRef.current?.clear()}>
            Clear all
          </Button>
        </Stack>
      </DocPreview>

      <DocH2 id="template">Custom content</DocH2>
      <DocP>
        Use <InlineCode>content</InlineCode> for a fully custom body (summary/detail are
        skipped). The dismiss control is still rendered.
      </DocP>
      <DocPreview
        title="content"
        code={`toastRef.current?.show({
  severity: 'success',
  sticky: true,
  content: ({ message }) => (
    <div>
      <strong>{message.summary}</strong>
      <p style={{ margin: '8px 0 0' }}>Custom layout</p>
    </div>
  ),
})`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button
            type="button"
            onClick={() =>
              toastRef.current?.show({
                summary: 'Custom',
                severity: 'success',
                sticky: true,
                content: ({ message }) => (
                  <div>
                    <strong style={{ fontSize: '0.9375rem' }}>{String(message.summary)}</strong>
                    <p style={{ margin: '8px 0 0', fontSize: '0.875rem', opacity: 0.9 }}>
                      Custom JSX inside the toast shell.
                    </p>
                  </div>
                ),
              })
            }
          >
            Custom content
          </Button>
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...toastProps]} />

      <DocH2 id="message">Message API</DocH2>
      <DocP>
        Objects passed to <InlineCode>show()</InlineCode> use the following fields:
      </DocP>
      <PropsTable rows={[...messageFields]} />

      <DocH2 id="ref">Ref methods</DocH2>
      <DocP>
        <InlineCode>ToastHandle</InlineCode> is the imperative API on the ref:
      </DocP>
      <ul style={{ marginTop: 8, paddingLeft: 20 }}>
        <li>
          <InlineCode>show(message | messages[])</InlineCode> — enqueue one or more toasts.
        </li>
        <li>
          <InlineCode>clear()</InlineCode> — remove every toast.
        </li>
        <li>
          <InlineCode>remove(id)</InlineCode> — remove a single toast by id.
        </li>
      </ul>

      <DocH2 id="a11y">Accessibility</DocH2>
      <DocP>
        Each surface follows Snackbar content semantics: <InlineCode>role=&quot;alert&quot;</InlineCode>,{' '}
        <InlineCode>aria-live=&quot;assertive&quot;</InlineCode>, and <InlineCode>aria-atomic</InlineCode>. The dismiss control is a
        native <InlineCode>button</InlineCode> with a configurable label (
        <InlineCode>closeLabel</InlineCode>). <strong>Escape</strong> dismisses the oldest visible
        toast, matching Material Snackbar guidance.
      </DocP>
    </DocArticle>
  )
}
