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

export function UtilitiesPositionDoc() {
  return (
    <DocArticle>
      <DocH1>Position utilities</DocH1>
      <DocLead>
        <InlineCode>position</InlineCode> keywords plus <InlineCode>inset0</InlineCode> for
        full-bleed overlays. Pair with <DocLink to="/docs/utilities/overflow">Overflow</DocLink>{' '}
        when you clip or scroll positioned content.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="relative parent + absolute child"
        code={`<div {...stylex.props(u.relative, u.pLg, u.border, u.roundedMd, u.overflowHidden)}>
  <div {...stylex.props(u.absolute, u.inset0, u.bgSubtle)} style={{ opacity: 0.65 }} />
  <span style={{ position: 'relative' }}>
    <Text>Content above overlay</Text>
  </span>
</div>`}
      >
        <div
          {...stylex.props(u.relative, u.pLg, u.border, u.roundedMd, u.overflowHidden)}
          style={{ minHeight: 72 }}
        >
          <div {...stylex.props(u.absolute, u.inset0, u.bgSubtle)} style={{ opacity: 0.65 }} />
          <span style={{ position: 'relative' }}>
            <Text variant="body">Content above overlay</Text>
          </span>
        </div>
      </DocPreview>

      <DocH2 id="reference">Reference</DocH2>

      <DocH3 id="static">
        <InlineCode>u.static</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>position: static</InlineCode> (default). Element follows normal document flow;
        <InlineCode>top</InlineCode>/<InlineCode>left</InlineCode> offsets have no effect.
      </DocP>

      <DocH3 id="relative">
        <InlineCode>u.relative</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>position: relative</InlineCode>. Establishes a positioning context for
        absolutely positioned descendants without taking the element out of flow.
      </DocP>

      <DocH3 id="absolute">
        <InlineCode>u.absolute</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>position: absolute</InlineCode>. Positioned against the nearest non-static
        ancestor (or viewport). Use with <InlineCode>u.inset0</InlineCode> or explicit offsets.
      </DocP>

      <DocH3 id="fixed">
        <InlineCode>u.fixed</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>position: fixed</InlineCode>. Relative to the viewport; stays on screen during
        scroll—typical for sticky headers and modals (see also library{' '}
        <DocLink to="/docs/components/dialog">Dialog</DocLink> for full focus behavior).
      </DocP>

      <DocH3 id="inset0">
        <InlineCode>u.inset0</InlineCode>
      </DocH3>
      <DocP>
        Sets <InlineCode>top</InlineCode>, <InlineCode>right</InlineCode>,{' '}
        <InlineCode>bottom</InlineCode>, and <InlineCode>left</InlineCode> to{' '}
        <InlineCode>0</InlineCode>—stretches a positioned element to fill its containing block.
      </DocP>
    </DocArticle>
  )
}
