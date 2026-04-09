import { Badge, Stack } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import { DocArticle, DocH1, DocH2, DocLead, DocP, InlineCode } from '../../ui/Prose'

const badgeProps = [
  {
    name: 'variant',
    type: "'neutral' | 'accent' | 'danger' | 'success' | 'outline'",
    default: "'neutral'",
    description: 'Semantic color treatment using muted fills or outline.',
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
    description: 'Badge text.',
  },
  {
    name: '…',
    type: 'ComponentProps<"span">',
    description: 'Other span attributes. Ref is not forwarded.',
  },
] as const

export function BadgeDoc() {
  return (
    <DocArticle>
      <DocH1>Badge</DocH1>
      <DocLead>
        Compact status or metadata chip. Uses pill radius and token-based
        backgrounds.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Badge" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Choose a <InlineCode>variant</InlineCode> for semantic color; default is
        neutral.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Badge>Neutral</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Badge>Neutral</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="outline">Outline</Badge>
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...badgeProps]} />
    </DocArticle>
  )
}
