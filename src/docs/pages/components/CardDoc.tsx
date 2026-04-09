import { Card, Text } from '../../../lib'
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

const cardProps = [
  {
    name: 'padding',
    type: "'none' | 'md' | 'lg'",
    default: "'md'",
    description: 'Inner padding preset mapped to space tokens.',
  },
  {
    name: 'interactive',
    type: 'boolean',
    default: 'false',
    description:
      'Adds hover elevation and focus-visible ring for clickable cards (use with onClick or as a link wrapper).',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root div after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the root div.',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description:
      'Other div props (onClick, role, tabIndex, children, etc.). Ref forwarded.',
  },
] as const

export function CardDoc() {
  return (
    <DocArticle>
      <DocH1>Card</DocH1>
      <DocLead>
        Bordered surface with elevation tokens—use for grouped content, settings
        panels, or preview areas.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Card, Text" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Nest arbitrary children. Set <InlineCode>interactive</InlineCode> when the
        whole card is clickable for stronger hover/focus feedback.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Card padding="md">
  <Text variant="body">Card content</Text>
</Card>`}
      >
        <Card padding="md" style={{ maxWidth: 420 }}>
          <Text variant="body">Card content</Text>
        </Card>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...cardProps]} />
    </DocArticle>
  )
}
