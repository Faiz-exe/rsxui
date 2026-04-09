import { useState } from 'react'
import { Checkbox, Stack, Text } from '../../../lib'
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

const checkboxProps = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Clickable label text; the whole row is a `<label>`.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Optional; wired with `aria-describedby` on the input.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Use when validation failed.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Mutes the control, label, and description; sets `cursor: not-allowed`.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles on the label.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional; a stable id is generated when omitted.',
  },
  {
    name: '…',
    type: 'Native input (checkbox)',
    description:
      'checked, defaultChecked, onChange, disabled, required, name, value, etc.',
  },
] as const

export function CheckboxDoc() {
  const [terms, setTerms] = useState(false)

  return (
    <DocArticle>
      <DocH1>Checkbox</DocH1>
      <DocLead>
        Accessible checkbox with optional <InlineCode>label</InlineCode>,{' '}
        <InlineCode>description</InlineCode>, and <InlineCode>invalid</InlineCode> styling.
        Ref forwards to the native <InlineCode>&lt;input type=&quot;checkbox&quot; /&gt;</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Checkbox" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Controlled: pass <InlineCode>checked</InlineCode> and <InlineCode>onChange</InlineCode>.
        Uncontrolled: use <InlineCode>defaultChecked</InlineCode>. Use{' '}
        <InlineCode>disabled</InlineCode> to prevent interaction and show muted styling (checked and
        unchecked).
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<Checkbox label="Remember me" name="remember" defaultChecked />
<Checkbox label="Legacy API" disabled description="Cannot be toggled." />`}
      >
        <div style={{ maxWidth: 420 }}>
          <Stack gap="md">
            <Checkbox label="Remember me" name="remember" defaultChecked />
            <Checkbox
              label="Legacy API"
              disabled
              description="Cannot be toggled."
            />
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="controlled">Controlled</DocH2>
      <DocPreview
        title="Controlled"
        code={`<Checkbox label="Remember me" name="remember" defaultChecked />

<Checkbox
  label="Accept terms"
  description="You can change this anytime in settings."
  required
/>

<Checkbox label="Legacy API" disabled description="Cannot be toggled." />`}
      >
        <div style={{ maxWidth: 420 }}>
          <Stack gap="md">
            <Checkbox
              label="Email me product updates"
              description="Roughly one message per month. Unsubscribe anytime."
              name="marketing"
            />
            <Checkbox
              label="I accept the terms"
              invalid={!terms}
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              name="terms-demo"
            />
            <Text variant="small" tone="muted">
              checked: {terms ? 'true' : 'false'}
            </Text>
            <Checkbox
              label="Unavailable add-on"
              description="This option is not available for your plan."
              disabled
              defaultChecked
              name="addon-disabled"
            />
            <Checkbox label="Locked setting" disabled name="locked" />
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...checkboxProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The native input stays in the tab order; focus is indicated with a focus ring on the control.
        Use <InlineCode>aria-label</InlineCode> via input props when there is no visible label.
      </DocP>
      <DocP>
        Keyboard follows native checkbox behavior: <InlineCode>Tab</InlineCode>{' '}
        moves focus and <InlineCode>Space</InlineCode> toggles checked state.
      </DocP>
    </DocArticle>
  )
}
