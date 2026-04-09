import { useState } from 'react'
import { Input } from '../../../lib'
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
import { useDocMeta } from '../../useDocMeta'

export function InputTextDoc() {
  useDocMeta('InputText', 'Text field with label, helper text, disabled, and validation states.')
  const [email, setEmail] = useState('')
  const emailError =
    email.length > 0 && !email.includes('@') ? 'Enter a valid email address.' : ''

  const [handle, setHandle] = useState('')
  const handleOk = handle.length >= 3
  const handleHelper = handleOk ? '' : 'At least 3 characters.'
  const handleSuccess = handleOk ? 'This username is available.' : ''

  const [password, setPassword] = useState('')
  const passwordInvalid = password.length > 0 && password.length < 8

  return (
    <DocArticle>
      <DocH1>InputText</DocH1>
      <DocLead>
        Use the <InlineCode>Input</InlineCode> component for a standard text field:{' '}
        <InlineCode>label</InlineCode>, <InlineCode>description</InlineCode>,{' '}
        <InlineCode>helperText</InlineCode>, <InlineCode>disabled</InlineCode>, validation (
        <InlineCode>errorMessage</InlineCode>, <InlineCode>invalid</InlineCode>,{' '}
        <InlineCode>successMessage</InlineCode>), and <InlineCode>required</InlineCode>. Ref forwards
        to the <InlineCode>&lt;input&gt;</InlineCode>. For numeric fields use{' '}
        <DocLink to="/docs/components/input-number">InputNumber</DocLink>; for leading or trailing
        icons, see <DocLink to="/docs/components/input-text-with-icon">Input text with icon</DocLink>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Input" />

      <DocH2 id="examples">Examples</DocH2>
      <DocP>
        Each example includes a live preview. Use the toolbar code icon to edit the snippet. Error
        and success copy replace helper text when present; <InlineCode>description</InlineCode> sits
        between the label and the control.
      </DocP>

      <DocH3 id="plain">Plain text</DocH3>
      <DocP>Default single-field appearance without prefix or suffix slots.</DocP>
      <DocPreview
        title="Plain text field"
        code={`<Input label="Name" name="name" placeholder="Jane Doe" />`}
      >
        <div style={previewWrap}>
          <Input label="Name" name="name" placeholder="Jane Doe" />
        </div>
      </DocPreview>

      <DocH3 id="helper">Helper text</DocH3>
      <DocP>
        Use <InlineCode>helperText</InlineCode> (or <InlineCode>hint</InlineCode>) for rules,
        formatting, or context below the field.
      </DocP>
      <DocPreview
        title="Helper text"
        code={`<Input
  label="Phone"
  type="tel"
  placeholder="+1 555 000 0000"
  helperText="Include country code. We send a one-time code."
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 555 000 0000"
            helperText="Include country code. We send a one-time code."
          />
        </div>
      </DocPreview>

      <DocH3 id="description">Description + helper text</DocH3>
      <DocP>
        <InlineCode>description</InlineCode> explains the field; <InlineCode>helperText</InlineCode>{' '}
        covers constraints. Both are wired through <InlineCode>aria-describedby</InlineCode>.
      </DocP>
      <DocPreview
        title="Description and helper"
        code={`<Input
  label="Display name"
  description="Shown on invoices and in the member directory."
  helperText="2–40 characters."
  placeholder="Acme Design Co."
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Display name"
            description="Shown on invoices and in the member directory."
            helperText="2–40 characters."
            placeholder="Acme Design Co."
          />
        </div>
      </DocPreview>

      <DocH3 id="disabled">Disabled</DocH3>
      <DocP>
        Native <InlineCode>disabled</InlineCode> grays out the control and prevents interaction.
        Helper text remains visible for context.
      </DocP>
      <DocPreview
        title="Disabled field"
        code={`<Input
  label="Account ID"
  defaultValue="acct_8f2k1q"
  helperText="Assigned at signup. Contact support to change."
  disabled
  readOnly
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Account ID"
            defaultValue="acct_8f2k1q"
            helperText="Assigned at signup. Contact support to change."
            disabled
            readOnly
          />
        </div>
      </DocPreview>

      <DocH3 id="error">Error state</DocH3>
      <DocP>
        A non-empty <InlineCode>errorMessage</InlineCode> (or <InlineCode>error</InlineCode>) adds a
        danger border, <InlineCode>aria-invalid</InlineCode>, and an alert message. It hides helper
        and success text below the input.
      </DocP>
      <DocPreview
        title="Static error"
        code={`<Input
  label="Coupon code"
  defaultValue="EXPIRED2024"
  errorMessage="This code has expired."
  readOnly
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Coupon code"
            defaultValue="EXPIRED2024"
            errorMessage="This code has expired."
            readOnly
          />
        </div>
      </DocPreview>
      <DocPreview
        title="Interactive validation"
        code={`const [email, setEmail] = useState('')
const error =
  email.length > 0 && !email.includes('@')
    ? 'Enter a valid email address.'
    : ''

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We never share your email."
  errorMessage={error}
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="We never share your email."
            errorMessage={emailError}
          />
        </div>
      </DocPreview>

      <DocH3 id="success">Success message</DocH3>
      <DocP>
        When there is no error, <InlineCode>successMessage</InlineCode> shows positive feedback and
        replaces helper text for that state.
      </DocP>
      <DocPreview
        title="Success message"
        code={`const ok = handle.length >= 3

<Input
  label="Username"
  value={handle}
  onChange={(e) => setHandle(e.target.value)}
  helperText={ok ? '' : 'At least 3 characters.'}
  successMessage={ok ? 'This username is available.' : ''}
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Username"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            helperText={handleHelper}
            successMessage={handleSuccess}
          />
        </div>
      </DocPreview>

      <DocH3 id="invalid">Invalid + helper text</DocH3>
      <DocP>
        Set <InlineCode>invalid</InlineCode> for the error border and{' '}
        <InlineCode>aria-invalid</InlineCode> while still showing <InlineCode>helperText</InlineCode>{' '}
        (for example password rules).
      </DocP>
      <DocPreview
        title="invalid with helper"
        code={`const tooShort = password.length > 0 && password.length < 8

<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  invalid={tooShort}
  helperText="Use at least 8 characters, including a number."
/>`}
      >
        <div style={previewWrap}>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={passwordInvalid}
            helperText="Use at least 8 characters, including a number."
          />
        </div>
      </DocPreview>

      <DocH3 id="required">Required</DocH3>
      <DocP>
        Native <InlineCode>required</InlineCode> with <InlineCode>requiredIndicator</InlineCode>{' '}
        (default <InlineCode>true</InlineCode>) shows an asterisk on the label.
      </DocP>
      <DocPreview
        title="Required field"
        code={`<Input
  label="Legal name"
  name="legalName"
  required
  helperText="As it appears on your ID."
/>`}
      >
        <div style={previewWrap}>
          <Input label="Legal name" name="legalName" required helperText="As it appears on your ID." />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...inputProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Error messages use <InlineCode>role=&quot;alert&quot;</InlineCode>.{' '}
        <InlineCode>aria-describedby</InlineCode> references the description (if any) and the
        visible bottom message (error, success, or helper).{' '}
        <InlineCode>aria-invalid</InlineCode> is set when <InlineCode>errorMessage</InlineCode> /{' '}
        <InlineCode>error</InlineCode> is non-empty or <InlineCode>invalid</InlineCode> is true.
      </DocP>
    </DocArticle>
  )
}
