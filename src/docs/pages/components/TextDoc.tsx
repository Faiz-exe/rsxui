import { Text } from '../../../lib'
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

const textProps = [
  {
    name: 'as',
    type: 'TextElement',
    default: "'p'",
    description:
      'Host element: p, span, div, h1–h6, label, a. Typing follows HTML semantics for that tag.',
  },
  {
    name: 'variant',
    type: "'title' | 'subtitle' | 'body' | 'small' | 'caption'",
    default: "'body'",
    description: 'Preset font size, weight, and line-height.',
  },
  {
    name: 'tone',
    type: "'default' | 'muted' | 'subtle' | 'accent' | 'danger' | 'success'",
    default: "'default'",
    description: 'Semantic color on top of the variant.',
  },
  {
    name: 'mono',
    type: 'boolean',
    default: 'false',
    description: 'Use monospace font stack for code-like inline text.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged after StyleX.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Text content.',
  },
  {
    name: '…',
    type: 'Omit<HTMLAttributes<HTMLElement>, "as" | "className" | "style">',
    description:
      'Attributes for the chosen element (e.g. id, href when as="a", htmlFor when as="label"). Ref is not forwarded.',
  },
] as const

export function TextDoc() {
  return (
    <DocArticle>
      <DocH1>Text</DocH1>
      <DocLead>
        Polymorphic typography: pick an element with <InlineCode>as</InlineCode>,
        then tune visuals with <InlineCode>variant</InlineCode> and{' '}
        <InlineCode>tone</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Text" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Match heading levels to document structure; use tones for de-emphasis or
        semantic color.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Text variant="subtitle" as="h2">Section</Text>
<Text variant="body" tone="muted">Supporting copy.</Text>`}
      >
        <div>
          <Text variant="subtitle" as="h3">
            Example subtitle
          </Text>
          <Text variant="body" tone="muted">
            Muted body text.
          </Text>
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...textProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Choose <InlineCode>as</InlineCode> so heading order and landmarks stay
        meaningful; use <InlineCode>as=&quot;a&quot;</InlineCode> with{' '}
        <InlineCode>href</InlineCode> for real links.
      </DocP>
    </DocArticle>
  )
}
