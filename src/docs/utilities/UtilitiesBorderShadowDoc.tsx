import * as stylex from '@stylexjs/stylex'
import { Text, u } from '../../lib'
import { DocImport } from '../ui/DocImport'
import { DocPreview } from '../ui/DocPreview'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocLink,
  DocP,
  InlineCode,
} from '../ui/Prose'

export function UtilitiesBorderShadowDoc() {
  return (
    <DocArticle>
      <DocH1>Border, radius &amp; shadow</DocH1>
      <DocLead>
        Corners use <InlineCode>radii.*</InlineCode>; borders use semantic border colors; shadows
        reuse the same <InlineCode>elevation.*</InlineCode> tokens as inputs and cards.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Rounded + border + card shadow"
        code={`<div {...stylex.props(u.pMd, u.roundedMd, u.border, u.shadowCard, u.bgElevated)}>
  <Text>Elevated surface</Text>
</div>`}
      >
        <div {...stylex.props(u.pMd, u.roundedMd, u.border, u.shadowCard, u.bgElevated)}>
          <Text variant="body">Elevated surface</Text>
        </div>
      </DocPreview>

      <DocH2 id="radius">Border radius</DocH2>
      <DocP>
        <InlineCode>u.roundedNone</InlineCode> (0), <InlineCode>u.roundedSm</InlineCode>,{' '}
        <InlineCode>u.roundedMd</InlineCode>, <InlineCode>u.roundedLg</InlineCode>,{' '}
        <InlineCode>u.roundedFull</InlineCode> (pill / circle)—values from{' '}
        <InlineCode>radii</InlineCode> tokens.
      </DocP>

      <DocH2 id="border">Border</DocH2>
      <DocP>
        <InlineCode>u.border0</InlineCode> — <InlineCode>border-width: 0</InlineCode>.{' '}
        <InlineCode>u.border</InlineCode> — <InlineCode>1px solid</InlineCode> using{' '}
        <InlineCode>colors.border</InlineCode>. <InlineCode>u.borderStrong</InlineCode> — same with{' '}
        <InlineCode>colors.borderStrong</InlineCode>.
      </DocP>

      <DocH2 id="shadow">Box shadow</DocH2>
      <DocP>
        <InlineCode>u.shadowNone</InlineCode> removes shadow. <InlineCode>u.shadowCard</InlineCode>,{' '}
        <InlineCode>u.shadowInput</InlineCode>, <InlineCode>u.shadowCardHover</InlineCode> map to{' '}
        <InlineCode>elevation.card</InlineCode>, <InlineCode>elevation.input</InlineCode>,{' '}
        <InlineCode>elevation.cardHover</InlineCode>. Dark mode uses the elevation theme layer (
        <DocLink to="/docs/theme">Theme &amp; tokens</DocLink>).
      </DocP>
    </DocArticle>
  )
}
