import { Stack, Text } from '../../../lib'
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

const stackProps = [
  {
    name: 'direction',
    type: "'row' | 'column'",
    default: "'column'",
    description: 'Flex direction. Row aligns items center vertically by default.',
  },
  {
    name: 'gap',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Gap token mapped to theme space scale.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root flex container.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description:
      'Use for one-off layout (e.g. flexWrap, alignItems, justifyContent).',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description:
      'Other div props. Children are laid out in the flex container. Ref forwarded.',
  },
] as const

export function StackDoc() {
  return (
    <DocArticle>
      <DocH1>Stack</DocH1>
      <DocLead>
        Thin flex wrapper for consistent vertical or horizontal spacing without
        writing raw flex CSS each time.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Stack, Text" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Default is a column with <InlineCode>gap=&quot;md&quot;</InlineCode>. Use{' '}
        <InlineCode>style</InlineCode> when you need{' '}
        <InlineCode>flexWrap</InlineCode> or alignment overrides.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Stack direction="column" gap="md">
  <Text>First</Text>
  <Text>Second</Text>
</Stack>

<Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
  …
</Stack>`}
      >
        <div>
          <Stack direction="column" gap="md" style={{ marginBottom: 24 }}>
            <Text>First</Text>
            <Text>Second</Text>
          </Stack>
          <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
            <Text>A</Text>
            <Text>B</Text>
            <Text>C</Text>
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...stackProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Stack is a layout primitive only—it does not set roles. Use appropriate
        semantics on children (lists, navigation, etc.).
      </DocP>
    </DocArticle>
  )
}
