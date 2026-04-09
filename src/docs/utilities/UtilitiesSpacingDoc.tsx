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

export function UtilitiesSpacingDoc() {
  return (
    <DocArticle>
      <DocH1>Spacing utilities</DocH1>
      <DocLead>
        Padding and margin use the shared <InlineCode>space</InlineCode> tokens (
        <InlineCode>xs</InlineCode> through <InlineCode>2xl</InlineCode>). Values follow{' '}
        <DocLink to="/docs/theme">Theme &amp; tokens</DocLink> when you override the scale.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Padding + margin"
        code={`<div {...stylex.props(u.pLg, u.mMd, u.border, u.roundedMd)}>
  <Text>Inner content</Text>
</div>`}
      >
        <div {...stylex.props(u.pLg, u.mMd, u.border, u.roundedMd, u.bgSubtle)}>
          <Text variant="body">Inner content (pLg, mMd)</Text>
        </div>
      </DocPreview>

      <DocH2 id="padding-all">Padding (all sides)</DocH2>
      <DocP>
        <InlineCode>u.p0</InlineCode> sets <InlineCode>padding: 0</InlineCode>.{' '}
        <InlineCode>u.pXs</InlineCode> … <InlineCode>u.p2Xl</InlineCode> set uniform padding to the
        matching token (<InlineCode>p2Xl</InlineCode> = <InlineCode>space['2xl']</InlineCode>).
      </DocP>

      <DocH2 id="padding-axis">Padding (horizontal / vertical)</DocH2>
      <DocP>
        <InlineCode>u.px*</InlineCode> — <InlineCode>padding-left</InlineCode> and{' '}
        <InlineCode>padding-right</InlineCode>. <InlineCode>u.py*</InlineCode> — top and bottom.
        Available steps: <InlineCode>Xs</InlineCode>, <InlineCode>Sm</InlineCode>,{' '}
        <InlineCode>Md</InlineCode>, <InlineCode>Lg</InlineCode>, <InlineCode>Xl</InlineCode>.
      </DocP>

      <DocH2 id="padding-side">Padding (single side, md)</DocH2>
      <DocP>
        <InlineCode>u.ptMd</InlineCode>, <InlineCode>u.prMd</InlineCode>,{' '}
        <InlineCode>u.pbMd</InlineCode>, <InlineCode>u.plMd</InlineCode> — one edge at the{' '}
        <InlineCode>md</InlineCode> token. Extend the library if you need other sides × steps.
      </DocP>

      <DocH2 id="margin">Margin</DocH2>
      <DocP>
        <InlineCode>u.m0</InlineCode> through <InlineCode>u.m2Xl</InlineCode> mirror the padding
        scale on all sides. <InlineCode>u.mxAuto</InlineCode> sets left/right{' '}
        <InlineCode>auto</InlineCode> (center a block horizontally).{' '}
        <InlineCode>u.myAuto</InlineCode> sets top/bottom <InlineCode>auto</InlineCode> (useful in
        flex layouts for vertical centering).
      </DocP>

      <DocH3 id="naming">
        Naming
      </DocH3>
      <DocP>
        <InlineCode>p</InlineCode> = padding, <InlineCode>m</InlineCode> = margin,{' '}
        <InlineCode>x</InlineCode> / <InlineCode>y</InlineCode> = axes, <InlineCode>t|r|b|l</InlineCode>{' '}
        = single side. Suffix matches token: <InlineCode>Sm</InlineCode>, <InlineCode>2Xl</InlineCode>{' '}
        for <InlineCode>2xl</InlineCode> (StyleX keys cannot start with a number).
      </DocP>
    </DocArticle>
  )
}
