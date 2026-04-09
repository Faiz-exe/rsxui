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

export function UtilitiesOverflowDoc() {
  useDocMeta('Overflow Utilities', 'Overflow and scroll behavior helpers.')
  return (
    <DocArticle>
      <DocH1>Overflow utilities</DocH1>
      <DocLead>
        Control clipping and scrolling when content exceeds its box. Often combined with{' '}
        <DocLink to="/docs/utilities/sizing">Sizing</DocLink> (<InlineCode>maxWFull</InlineCode>,{' '}
        <InlineCode>minW0</InlineCode>) and <DocLink to="/docs/utilities/position">Position</DocLink>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Hidden vs auto"
        code={`<div {...stylex.props(u.flex, u.gapMd)}>
  <div {...stylex.props(u.overflowHidden, u.border, u.pSm)} style={{ width: 120, height: 56 }}>
    Long text clipped with overflowHidden…
  </div>
  <div {...stylex.props(u.overflowAuto, u.border, u.pSm)} style={{ width: 120, height: 56 }}>
    Scrollable when content overflows…
  </div>
</div>`}
      >
        <div {...stylex.props(u.flex, u.gapMd, u.flexWrap)}>
          <div
            {...stylex.props(u.overflowHidden, u.border, u.roundedSm, u.pSm)}
            style={{ width: 120, height: 56 }}
          >
            <Text variant="small">
              Clipped: overflowHidden hides anything past the box.
            </Text>
          </div>
          <div
            {...stylex.props(u.overflowAuto, u.border, u.roundedSm, u.pSm)}
            style={{ width: 120, height: 56 }}
          >
            <Text variant="small">
              Scroll: overflowAuto shows scrollbars when needed on this long line of text.
            </Text>
          </div>
        </div>
      </DocPreview>

      <DocH2 id="reference">Reference</DocH2>

      <DocH3 id="overflowHidden">
        <InlineCode>u.overflowHidden</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>overflow: hidden</InlineCode>. Content outside the padding edge is clipped—use
        with <InlineCode>u.rounded*</InlineCode> for clean corners on images and cards.
      </DocP>

      <DocH3 id="overflowAuto">
        <InlineCode>u.overflowAuto</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>overflow: auto</InlineCode>. Browser shows scrollbars only when content
        overflows (on either axis depending on content).
      </DocP>

      <DocH3 id="overflowXAuto">
        <InlineCode>u.overflowXAuto</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>overflow-x: auto</InlineCode>. Horizontal scroll when needed; vertical overflow
        unchanged—common for wide tables on small screens.
      </DocP>

      <DocH3 id="overflowYAuto">
        <InlineCode>u.overflowYAuto</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>overflow-y: auto</InlineCode>. Vertical scroll areas inside a fixed-height
        panel.
      </DocP>
    </DocArticle>
  )
}
