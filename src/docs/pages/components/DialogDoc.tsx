import { useState } from 'react'
import { Button, Dialog, Stack, Text } from '../../../lib'
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

const dialogProps = [
  {
    name: 'open',
    type: 'boolean',
    description: 'When true, the dialog is portaled to document.body and shown.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Called when the dialog should close (backdrop, Escape, close button).',
  },
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Optional heading; sets aria-labelledby on the dialog panel.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Scrollable body content between header and footer.',
  },
  {
    name: 'footer',
    type: 'ReactNode',
    description: 'Optional footer row (e.g. action buttons), aligned to the end.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'full'",
    default: "'md'",
    description: 'Max width of the panel.',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    description: 'When true, shows the header dismiss control. Defaults to true when title is set.',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Close when clicking the dimmed backdrop.',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Close when pressing Escape.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the dialog panel after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the dialog panel.',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description: 'Other div props forwarded to the panel (except role, which is fixed).',
  },
] as const

export function DialogDoc() {
  useDocMeta('Dialog', 'Modal dialog with backdrop, focus trap, sizes, and footer actions.')
  const [basicOpen, setBasicOpen] = useState(false)
  const [sizeOpen, setSizeOpen] = useState(false)
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'full'>('md')
  const [stickyOpen, setStickyOpen] = useState(false)

  return (
    <DocArticle>
      <DocH1>Dialog</DocH1>
      <DocLead>
        Modal overlay with backdrop, centered panel, optional title and footer, focus trap, body
        scroll lock, and Escape / backdrop dismissal. Ref is forwarded to the panel{' '}
        <InlineCode>{'<div>'}</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Dialog, Button" />

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        Control visibility with <InlineCode>open</InlineCode> and{' '}
        <InlineCode>onOpenChange</InlineCode>.
      </DocP>
      <DocPreview
        title="Basic"
        code={`const [open, setOpen] = useState(false)

<Button type="button" onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Example"
  footer={
    <>
      <Button type="button" text onClick={() => setOpen(false)}>Cancel</Button>
      <Button type="button" onClick={() => setOpen(false)}>Save</Button>
    </>
  }
>
  <Text variant="body">Dialog content goes here.</Text>
</Dialog>`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button type="button" onClick={() => setBasicOpen(true)}>
            Open dialog
          </Button>
          <Dialog
            open={basicOpen}
            onOpenChange={setBasicOpen}
            title="Example"
            footer={
              <>
                <Button type="button" text onClick={() => setBasicOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={() => setBasicOpen(false)}>
                  Save
                </Button>
              </>
            }
          >
            <Text variant="body">Dialog content goes here.</Text>
          </Dialog>
        </Stack>
      </DocPreview>

      <DocH2 id="sizes">Sizes</DocH2>
      <DocP>
        Use <InlineCode>size</InlineCode> to set max width: <InlineCode>sm</InlineCode>,{' '}
        <InlineCode>md</InlineCode>, <InlineCode>lg</InlineCode>, or <InlineCode>full</InlineCode>.
      </DocP>
      <DocPreview
        title="Sizes"
        code={`<Dialog open={open} onOpenChange={setOpen} size="lg" title="Large" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          {(['sm', 'md', 'lg', 'full'] as const).map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              text={size !== s}
              severity={size === s ? 'primary' : 'secondary'}
              onClick={() => {
                setSize(s)
                setSizeOpen(true)
              }}
            >
              {s}
            </Button>
          ))}
          <Dialog
            open={sizeOpen}
            onOpenChange={setSizeOpen}
            size={size}
            title={`Size: ${size}`}
            footer={
              <Button type="button" onClick={() => setSizeOpen(false)}>
                Close
              </Button>
            }
          >
            <Text variant="body">This panel uses the selected max width.</Text>
          </Dialog>
        </Stack>
      </DocPreview>

      <DocH2 id="backdrop">Backdrop</DocH2>
      <DocP>
        Set <InlineCode>closeOnBackdrop=&#123;false&#125;</InlineCode> to require an explicit
        action (still dismissible with Escape unless <InlineCode>closeOnEscape</InlineCode> is
        false).
      </DocP>
      <DocPreview
        title="No backdrop close"
        code={`<Dialog open={open} onOpenChange={setOpen} closeOnBackdrop={false} title="Confirm" />`}
      >
        <Button type="button" onClick={() => setStickyOpen(true)}>
          Open (backdrop does not close)
        </Button>
        <Dialog
          open={stickyOpen}
          onOpenChange={setStickyOpen}
          closeOnBackdrop={false}
          title="Confirm"
          footer={
            <>
              <Button type="button" text onClick={() => setStickyOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={() => setStickyOpen(false)}>
                OK
              </Button>
            </>
          }
        >
          <Text variant="body">Click outside the panel does nothing; use a button or Escape.</Text>
        </Dialog>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...dialogProps]} />

      <DocH2 id="a11y">Accessibility</DocH2>
      <DocP>
        The panel uses <InlineCode>role=&quot;dialog&quot;</InlineCode>,{' '}
        <InlineCode>aria-modal=&quot;true&quot;</InlineCode>, and{' '}
        <InlineCode>aria-labelledby</InlineCode> when <InlineCode>title</InlineCode> is set. Focus
        moves to the first focusable control on open (or the panel itself) and restores the
        previously focused element on close. Tab cycles within the dialog; Escape closes when
        enabled.
      </DocP>
    </DocArticle>
  )
}
