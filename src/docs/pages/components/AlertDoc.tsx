import { useState } from 'react'
import { Alert, Stack } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import { DocArticle, DocH1, DocH2, DocP, InlineCode } from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

const componentProps = [
  {
    name: 'severity',
    type: "'info' | 'success' | 'warning' | 'danger'",
    default: "'info'",
    description: 'Color scheme and default icon.',
  },
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Optional bold line above the body.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Main message content.',
  },
  {
    name: 'onDismiss',
    type: '() => void',
    description: 'When set, renders a dismiss control that calls this handler.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    description: 'Replace the default severity icon; pass null-like to hide if needed.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the root.',
  },
] as const

export function AlertDoc() {
  useDocMeta('Alert', 'Static banners for info, success, warning, and danger messages.')
  const [dismissOpen, setDismissOpen] = useState(true)

  return (
    <DocArticle>
      <DocH1 description="Inline feedback with semantic colors, optional title, custom icon, and dismiss action.">
        Alert
      </DocH1>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Alert, Stack"  />

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Info"
        code={`<Alert severity="info">This is an informational message.</Alert>`}
      >
        <Alert severity="info">This is an informational message.</Alert>
      </DocPreview>

      <DocH2 id="severities">All severities</DocH2>
      <DocPreview
        title="info, success, warning, danger"
        code={`<Stack gap="md">
  <Alert severity="info">Info message.</Alert>
  <Alert severity="success">Success message.</Alert>
  <Alert severity="warning">Warning message.</Alert>
  <Alert severity="danger">Danger message.</Alert>
</Stack>`}
      >
        <Stack gap="md">
          <Alert severity="info">Info message.</Alert>
          <Alert severity="success">Success message.</Alert>
          <Alert severity="warning">Warning message.</Alert>
          <Alert severity="danger">Danger message.</Alert>
        </Stack>
      </DocPreview>

      <DocH2 id="title">With title</DocH2>
      <DocPreview
        title="Title + body"
        code={`<Alert severity="success" title="Saved">
  Your changes were stored successfully.
</Alert>`}
      >
        <Alert severity="success" title="Saved">
          Your changes were stored successfully.
        </Alert>
      </DocPreview>

      <DocH2 id="dismissable">Dismissable</DocH2>
      <DocP>
        Provide <InlineCode>onDismiss</InlineCode> to show a close button. Track visibility with{' '}
        <InlineCode>useState</InlineCode> if the alert should leave the tree when dismissed.
      </DocP>
      <DocPreview
        title="Show / hide"
        code={`const [open, setOpen] = useState(true)

return (
  <Stack gap="md">
    {open && (
      <Alert severity="warning" onDismiss={() => setOpen(false)}>
        You can dismiss this alert.
      </Alert>
    )}
    <button type="button" onClick={() => setOpen(true)}>
      Show alert again
    </button>
  </Stack>
)`}
      >
        <Stack gap="md">
          {dismissOpen && (
            <Alert severity="warning" onDismiss={() => setDismissOpen(false)}>
              You can dismiss this alert.
            </Alert>
          )}
          <button type="button" onClick={() => setDismissOpen(true)}>
            Show alert again
          </button>
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={componentProps} showRequiredLegend />
    </DocArticle>
  )
}
