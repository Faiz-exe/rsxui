import { useState } from 'react'
import { Radio, RadioGroup, Text } from '../../../lib'
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

const groupProps = [
  {
    name: 'label',
    type: 'string',
    description: 'Sets `aria-labelledby` on the radiogroup container.',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Optional; a stable name is generated when omitted.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'Must match a child <Radio value="…" />.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Empty string means none selected.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: 'Receives the selected option `value`.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Sets `aria-disabled` on the radiogroup and disables every radio; merges with per-`Radio` `disabled`.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'className on the group root.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles on the group root.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Rendered inside the radiogroup.',
  },
] as const

const radioProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Compared with RadioGroup `value` when inside a group.',
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Clickable label for this option.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Optional; `aria-describedby` on the input.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Sets `aria-invalid` on the input.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Disables only this option; combine with `RadioGroup` `disabled` to disable the whole set.',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Inside RadioGroup, `name` comes from context.',
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
    name: '…',
    type: 'Native input (radio)',
    description: 'disabled, required, onChange, checked (standalone), etc.',
  },
] as const

export function RadioDoc() {
  const [plan, setPlan] = useState('monthly')

  return (
    <DocArticle>
      <DocH1>Radio</DocH1>
      <DocLead>
        <InlineCode>RadioGroup</InlineCode> manages a set of{' '}
        <InlineCode>Radio</InlineCode> options with shared <InlineCode>name</InlineCode> and
        selection state. Ref on each Radio targets the native input.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="RadioGroup, Radio" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Wrap options in <InlineCode>RadioGroup</InlineCode>. Use{' '}
        <InlineCode>value</InlineCode> / <InlineCode>onValueChange</InlineCode> for controlled
        mode, or <InlineCode>defaultValue</InlineCode> for uncontrolled.
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<RadioGroup label="Plan" defaultValue="pro" name="plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>`}
      >
        <div style={{ maxWidth: 420 }}>
          <RadioGroup label="Plan" defaultValue="pro" name="plan">
            <Radio value="free" label="Free" />
            <Radio value="pro" label="Pro" />
          </RadioGroup>
        </div>
      </DocPreview>

      <DocH2 id="controlled">Controlled / States</DocH2>
      <DocPreview
        title="RadioGroup"
        code={`<RadioGroup
  label="Plan"
  defaultValue="pro"
  name="plan"
  onValueChange={(v) => console.log(v)}
>
  <Radio value="free" label="Free" description="Core features only." />
  <Radio value="pro" label="Pro" description="For small teams." />
  <Radio value="biz" label="Business" description="SSO and audit logs." />
</RadioGroup>`}
      >
        <div style={{ maxWidth: 420 }}>
          <RadioGroup label="Billing" value={plan} onValueChange={setPlan} name="billing-doc">
            <Radio value="monthly" label="Monthly" description="Cancel anytime." />
            <Radio value="yearly" label="Yearly" description="Two months free." />
          </RadioGroup>
          <Text variant="small" tone="muted" style={{ marginTop: 8 }}>
            value: {plan}
          </Text>
          <div style={{ marginTop: 24 }}>
            <RadioGroup
              label="Region (disabled group)"
              defaultValue="us"
              name="region-doc"
              disabled
            >
              <Radio value="us" label="United States" />
              <Radio value="eu" label="European Union" />
            </RadioGroup>
          </div>
          <div style={{ marginTop: 24 }}>
            <RadioGroup label="Shipping" defaultValue="std" name="ship-doc">
              <Radio value="std" label="Standard" description="5–7 business days." />
              <Radio
                value="express"
                label="Express"
                description="Not available for your address."
                disabled
              />
            </RadioGroup>
          </div>
        </div>
      </DocPreview>

      <DocH2 id="props-group">RadioGroup props</DocH2>
      <PropsTable rows={[...groupProps]} />

      <DocH2 id="props-radio">Radio props</DocH2>
      <PropsTable rows={[...radioProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The group uses <InlineCode>role=&quot;radiogroup&quot;</InlineCode> with{' '}
        <InlineCode>aria-labelledby</InlineCode>. Each option is a native radio with an associated
        label.
      </DocP>
      <DocP>
        Keyboard follows native radio behavior: <InlineCode>Tab</InlineCode>{' '}
        moves into/out of the group and arrow keys move selection between options
        that share the same <InlineCode>name</InlineCode>.
      </DocP>
    </DocArticle>
  )
}
