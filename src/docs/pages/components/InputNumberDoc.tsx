import { useState } from 'react'
import { InputNumber } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocH3,
  DocLead,
  DocLink,
  DocP,
  InlineCode,
} from '../../ui/Prose'
import { inputProps, previewWrap } from './inputDocShared'

export function InputNumberDoc() {
  const [qty, setQty] = useState('1')
  const n = Number.parseInt(qty, 10)
  const qtyInvalid = qty !== '' && (Number.isNaN(n) || n < 1 || n > 10)

  return (
    <DocArticle>
      <DocH1>InputNumber</DocH1>
      <DocLead>
        <InlineCode>InputNumber</InlineCode> is the <InlineCode>Input</InlineCode> field with{' '}
        <InlineCode>type=&quot;number&quot;</InlineCode> fixed: same label, helper and error text,
        prefix/suffix, and validation UX as{' '}
        <DocLink to="/docs/components/input-text">InputText</DocLink>. Ref forwards to the{' '}
        <InlineCode>&lt;input&gt;</InlineCode>. Native attributes such as{' '}
        <InlineCode>min</InlineCode>, <InlineCode>max</InlineCode>, <InlineCode>step</InlineCode>, and{' '}
        <InlineCode>placeholder</InlineCode> are passed through.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="InputNumber" />

      <DocH2 id="examples">Examples</DocH2>

      <DocH3 id="basic">Min, max, and step</DocH3>
      <DocP>
        Browsers enforce the range and increment; pair with <InlineCode>helperText</InlineCode> so
        expectations are clear.
      </DocP>
      <DocPreview
        title="Quantity"
        code={`<InputNumber
  label="Quantity"
  name="qty"
  min={0}
  max={99}
  step={1}
  defaultValue={1}
  helperText="Whole units only."
/>`}
      >
        <div style={previewWrap}>
          <InputNumber
            label="Quantity"
            name="qty"
            min={0}
            max={99}
            step={1}
            defaultValue={1}
            helperText="Whole units only."
          />
        </div>
      </DocPreview>

      <DocH3 id="controlled">Controlled value</DocH3>
      <DocP>
        Like any controlled <InlineCode>&lt;input&gt;</InlineCode>, <InlineCode>value</InlineCode> and{' '}
        <InlineCode>onChange</InlineCode> use string state from the DOM; parse with{' '}
        <InlineCode>Number</InlineCode>, <InlineCode>parseInt</InlineCode>, or{' '}
        <InlineCode>parseFloat</InlineCode> before validating or sending to an API.
      </DocP>
      <DocPreview
        title="Range validation"
        code={`const [qty, setQty] = useState('1')
const n = Number.parseInt(qty, 10)
const invalid =
  qty !== '' && (Number.isNaN(n) || n < 1 || n > 10)

<InputNumber
  label="Guests"
  min={1}
  max={10}
  step={1}
  value={qty}
  onChange={(e) => setQty(e.target.value)}
  helperText="Between 1 and 10."
  invalid={invalid}
/>`}
      >
        <div style={previewWrap}>
          <InputNumber
            label="Guests"
            min={1}
            max={10}
            step={1}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            helperText="Between 1 and 10."
            invalid={qtyInvalid}
          />
        </div>
      </DocPreview>

      <DocH3 id="disabled">Disabled</DocH3>
      <DocPreview
        title="Disabled"
        code={`<InputNumber
  label="Credits"
  defaultValue={0}
  helperText="Managed by your plan."
  disabled
  readOnly
/>`}
      >
        <div style={previewWrap}>
          <InputNumber
            label="Credits"
            defaultValue={0}
            helperText="Managed by your plan."
            disabled
            readOnly
          />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <DocP>
        Same as <DocLink to="/docs/components/input-text">Input</DocLink> except{' '}
        <InlineCode>type</InlineCode> is omitted from the public API; the control is always numeric.
      </DocP>
      <PropsTable rows={[...inputProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Inherits the same patterns as <DocLink to="/docs/components/input-text">InputText</DocLink>{' '}
        (<InlineCode>aria-invalid</InlineCode>, <InlineCode>aria-describedby</InlineCode>, error{' '}
        <InlineCode>role=&quot;alert&quot;</InlineCode>). Prefer explicit labels; use{' '}
        <InlineCode>helperText</InlineCode> for constraints (min/max/step) when they are not obvious
        from the label alone.
      </DocP>
    </DocArticle>
  )
}
