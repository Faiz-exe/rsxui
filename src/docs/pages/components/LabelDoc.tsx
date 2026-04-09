import { Label } from '../../../lib'
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

const labelProps = [
  {
    name: 'requiredIndicator',
    type: 'boolean',
    description:
      'When true, appends a visible * after children (aria-hidden). Pair with htmlFor + required on the control.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX label styles.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged after StyleX; your values override on conflicts.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Label text (or mixed content).',
  },
  {
    name: '…',
    type: 'ComponentProps<"label">',
    description:
      'Native label props: htmlFor, id, onClick, etc. Ref is not forwarded in the current implementation.',
  },
] as const

export function LabelDoc() {
  useDocMeta('Label', 'Form labels with optional required marker.')
  return (
    <DocArticle>
      <DocH1>Label</DocH1>
      <DocLead>
        Styled <InlineCode>&lt;label&gt;</InlineCode> used by{' '}
        <InlineCode>Input</InlineCode> and available for custom form layouts.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Label" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Associate the label with a control using <InlineCode>htmlFor</InlineCode>{' '}
        matching the control&apos;s <InlineCode>id</InlineCode>.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Label htmlFor="email" requiredIndicator>
  Work email
</Label>
<input id="email" type="email" />`}
      >
        <div style={{ maxWidth: 420 }}>
          <Label htmlFor="email-doc" requiredIndicator>
            Work email
          </Label>
          <input
            id="email-doc"
            type="email"
            style={{
              display: 'block',
              width: '100%',
              marginTop: 8,
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--doc-border, #ccc)',
            }}
          />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...labelProps]} />
    </DocArticle>
  )
}
