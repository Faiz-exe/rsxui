import * as stylex from '@stylexjs/stylex'
import { Text, u } from '../../lib'
import { DocImport } from '../ui/DocImport'
import { DocPreview } from '../ui/DocPreview'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocH3,
  DocLead,
  DocLink,
  DocP,
  InlineCode,
} from '../ui/Prose'
import { useDocMeta } from '../useDocMeta'

export function UtilitiesBackgroundDoc() {
  useDocMeta('Background Utilities', 'Background color and gradient helpers.')
  return (
    <DocArticle>
      <DocH1>Background utilities</DocH1>
      <DocLead>
        Semantic surface fills from <InlineCode>colors.bg</InlineCode>,{' '}
        <InlineCode>colors.bgElevated</InlineCode>, and <InlineCode>colors.bgSubtle</InlineCode>.
        They track <DocLink to="/docs/theme">light and dark themes</DocLink> automatically.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Three surfaces"
        code={`<div {...stylex.props(u.flex, u.flexCol, u.gapSm)}>
  <div {...stylex.props(u.pMd, u.roundedSm, u.bgDefault, u.border)}>bgDefault</div>
  <div {...stylex.props(u.pMd, u.roundedSm, u.bgElevated, u.border)}>bgElevated</div>
  <div {...stylex.props(u.pMd, u.roundedSm, u.bgSubtle, u.border)}>bgSubtle</div>
</div>`}
      >
        <div {...stylex.props(u.flex, u.flexCol, u.gapSm)}>
          <div {...stylex.props(u.pMd, u.roundedSm, u.bgDefault, u.border)}>
            <Text variant="body">bgDefault — page / base surface</Text>
          </div>
          <div {...stylex.props(u.pMd, u.roundedSm, u.bgElevated, u.border)}>
            <Text variant="body">bgElevated — cards, inputs, raised chips</Text>
          </div>
          <div {...stylex.props(u.pMd, u.roundedSm, u.bgSubtle, u.border)}>
            <Text variant="body">bgSubtle — stripes, well regions, sidebars</Text>
          </div>
        </div>
      </DocPreview>

      <DocH2 id="reference">Reference</DocH2>

      <DocH3 id="bgDefault">
        <InlineCode>u.bgDefault</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>background-color: colors.bg</InlineCode>. Primary canvas—use where you want an
        explicit reset from a parent subtle background.
      </DocP>

      <DocH3 id="bgElevated">
        <InlineCode>u.bgElevated</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>background-color: colors.bgElevated</InlineCode>. Slightly lifted surface; same
        family as default inputs and selected tabs.
      </DocP>

      <DocH3 id="bgSubtle">
        <InlineCode>u.bgSubtle</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>background-color: colors.bgSubtle</InlineCode>. Low-contrast banding—table
        stripes, doc shells, tab list chrome.
      </DocP>
    </DocArticle>
  )
}
