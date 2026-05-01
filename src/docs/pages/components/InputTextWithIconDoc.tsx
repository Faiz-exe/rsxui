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

const iconSearch = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
const iconCalendar = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const codeAffixDisabled = `<Input
  label="Workspace"
  defaultValue="design-system"
  prefix={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  }
  helperText="Slug cannot be changed after creation."
  disabled
  readOnly
/>`

const codeAffixError = `<Input
  label="End date"
  defaultValue="2023-02-30"
  suffix={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  }
  errorMessage="That date is not valid in this month."
  readOnly
/>`

const codeAffixIcons = `<Input
  label="Search"
  type="search"
  placeholder="Articles, people…"
  prefix={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  }
/>
<Input
  label="Due date"
  type="text"
  placeholder="YYYY-MM-DD"
  suffix={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  }
/>`

const codeBothSlots = `<Input
  label="Amount"
  type="text"
  placeholder="0.00"
  prefix={<span aria-hidden>$</span>}
  suffix={<span aria-hidden>USD</span>}
/>`

export function InputTextWithIconDoc() {
  useDocMeta('Input with Icon', 'Prefix and suffix slots for icons, units, and action buttons.')
  return (
    <DocArticle>
      <DocH1>Input text with icon</DocH1>
      <DocLead>
        The same <InlineCode>Input</InlineCode> component with <InlineCode>prefix</InlineCode> and/or{' '}
        <InlineCode>suffix</InlineCode> for icons, units, or short labels. The outer shell gets one
        border and focus ring; the inner field is borderless. Open ends still get horizontal padding that
        matches the field size (e.g. suffix-only keeps left inset like a plain input). Labels, helper text,
        errors, and <InlineCode>disabled</InlineCode> work the same as on{' '}
        <DocLink to="/docs/components/input-text">InputText</DocLink>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Input" />

      <DocH2 id="examples">Examples</DocH2>

      <DocH3 id="icons">Leading and trailing icons</DocH3>
      <DocP>
        Pass any <InlineCode>ReactNode</InlineCode> into the slots. Use{' '}
        <InlineCode>prefixAriaLabel</InlineCode> / <InlineCode>suffixAriaLabel</InlineCode> when the
        slot is interactive or needs a name; decorative icons can omit them (slots are then{' '}
        <InlineCode>aria-hidden</InlineCode>).
      </DocP>
      <DocPreview title="Search with leading icon; date with trailing icon" code={codeAffixIcons}>
        <div style={previewWrap}>
          <Input
            label="Search"
            type="search"
            placeholder="Articles, people…"
            prefix={iconSearch}
          />
          <div style={{ marginTop: 16 }}>
            <Input
              label="Due date"
              type="text"
              placeholder="YYYY-MM-DD"
              suffix={iconCalendar}
            />
          </div>
        </div>
      </DocPreview>

      <DocH3 id="both-icons">Prefix and suffix together</DocH3>
      <DocPreview title="Both slots" code={codeBothSlots}>
        <div style={previewWrap}>
          <Input
            label="Amount"
            type="text"
            placeholder="0.00"
            prefix={<span aria-hidden>$</span>}
            suffix={<span aria-hidden>USD</span>}
          />
        </div>
      </DocPreview>

      <DocH3 id="affix-states">Helper text, error, and disabled</DocH3>
      <DocP>
        Field messaging and <InlineCode>disabled</InlineCode> behave like the plain input; the
        affix shell picks up error and disabled styles.
      </DocP>
      <DocPreview title="Disabled with prefix" code={codeAffixDisabled}>
        <div style={previewWrap}>
          <Input
            label="Workspace"
            defaultValue="design-system"
            prefix={iconSearch}
            helperText="Slug cannot be changed after creation."
            disabled
            readOnly
          />
        </div>
      </DocPreview>
      <DocPreview title="Error with suffix" code={codeAffixError}>
        <div style={previewWrap}>
          <Input
            label="End date"
            defaultValue="2023-02-30"
            suffix={iconCalendar}
            errorMessage="That date is not valid in this month."
            readOnly
          />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <DocP>
        Full API matches <DocLink to="/docs/components/input-text">InputText</DocLink>; affix-related
        props are <InlineCode>prefix</InlineCode>, <InlineCode>suffix</InlineCode>,{' '}
        <InlineCode>prefixAriaLabel</InlineCode>, and <InlineCode>suffixAriaLabel</InlineCode>.
      </DocP>
      <PropsTable rows={[...inputProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Decorative icon slots are <InlineCode>aria-hidden</InlineCode> unless you pass{' '}
        <InlineCode>prefixAriaLabel</InlineCode> or <InlineCode>suffixAriaLabel</InlineCode>. For
        buttons or toggles in a slot, use an explicit label and avoid hiding the control from
        assistive tech. The input keeps <InlineCode>aria-describedby</InlineCode> for description,
        helper, error, and success text as on the standard field.
      </DocP>
    </DocArticle>
  )
}
