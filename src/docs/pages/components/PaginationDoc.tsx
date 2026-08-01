import { useState } from 'react'
import { Pagination } from '../../../lib'
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
import { useDocMeta } from '../../useDocMeta'

const paginationProps = [
  { name: 'count',           type: 'number',                                    description: 'Total number of pages. Required.' },
  { name: 'page',            type: 'number',                                    description: 'Controlled current page (1-based index).' },
  { name: 'defaultPage',     type: 'number',                 default: '1',      description: 'Uncontrolled default page (1-based).' },
  { name: 'onChange',        type: '(page: number) => void',                    description: 'Called when the user changes page. Receives 1-based page number.' },
  { name: 'siblingCount',    type: 'number',                 default: '1',      description: 'Number of page buttons shown on each side of the current page.' },
  { name: 'boundaryCount',   type: 'number',                 default: '1',      description: 'Number of pages always shown at the start and end boundaries.' },
  { name: 'showFirstButton', type: 'boolean',                default: 'false',  description: 'Show a jump-to-first-page («) button.' },
  { name: 'showLastButton',  type: 'boolean',                default: 'false',  description: 'Show a jump-to-last-page (») button.' },
  { name: 'variant',         type: "'text' | 'outlined'",   default: "'text'", description: 'text = borderless ghost (default); outlined = bordered buttons.' },
  { name: 'shape',           type: "'circular' | 'rounded'",default: "'circular'", description: 'circular = full pill (default); rounded = square-ish corners.' },
  { name: 'color',           type: "'primary' | 'secondary' | 'standard'", default: "'primary'", description: 'Accent colour applied to the active page button.' },
  { name: 'size',            type: "'sm' | 'md' | 'lg'",   default: "'md'",   description: 'Size of all page items.' },
  { name: 'disabled',        type: 'boolean',                default: 'false',  description: 'Disable all controls.' },
  { name: 'className',       type: 'string',                                    description: 'Extra class applied to the root <nav>.' },
  { name: 'style',           type: 'CSSProperties',                             description: 'Inline style applied to the root <nav>.' },
]

export function PaginationDoc() {
  useDocMeta('Pagination', 'Standalone pagination component with rich configuration options.')

  const [page, setPage] = useState(1)

  return (
    <DocArticle>
      <DocImport names="Pagination" />
      <DocH1>Pagination</DocH1>
      <DocLead>
        A standalone pagination component for easy page navigation. 
        It supports multiple variants, shapes, colours, sizes, first/last buttons, 
        customizable sibling and boundary counts, and a disabled state. Can be used anywhere, 
        not just inside a Table.
      </DocLead>

      {/* ── Basic ── */}
      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Default — 10 pages"
        code={`<Pagination count={10} />`}
      >
        <Pagination count={10} />
      </DocPreview>

      {/* ── Outlined ── */}
      <DocH2 id="outlined">Outlined</DocH2>
      <DocPreview
        title="Outlined variant"
        code={`<Pagination count={10} variant="outlined" />
<Pagination count={10} variant="outlined" shape="rounded" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Pagination count={10} variant="outlined" />
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
      </DocPreview>

      {/* ── Rounded ── */}
      <DocH2 id="shape">Shape</DocH2>
      <DocPreview
        title="circular vs rounded"
        code={`<Pagination count={10} shape="circular" />   {/* default */}
<Pagination count={10} shape="rounded" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Pagination count={10} shape="circular" />
          <Pagination count={10} shape="rounded" />
        </div>
      </DocPreview>

      {/* ── Buttons: first/last ── */}
      <DocH2 id="buttons">Navigation Buttons</DocH2>
      <DocPreview
        title="Show first &amp; last buttons"
        code={`<Pagination count={10} showFirstButton showLastButton />`}
      >
        <Pagination count={10} showFirstButton showLastButton defaultPage={5} />
      </DocPreview>

      {/* ── Ranges ── */}
      <DocH2 id="ranges">Sibling & Boundary Count</DocH2>
      <DocP>
        <InlineCode>siblingCount</InlineCode> controls how many page buttons
        appear on each side of the current page.{' '}
        <InlineCode>boundaryCount</InlineCode> controls how many pages are
        always visible at the start and end.
      </DocP>
      <DocPreview
        title="siblingCount=2 · boundaryCount=2"
        code={`<Pagination count={20} siblingCount={2} boundaryCount={2} defaultPage={10} />`}
      >
        <Pagination count={20} siblingCount={2} boundaryCount={2} defaultPage={10} />
      </DocPreview>
      <DocPreview
        title="siblingCount=0"
        code={`<Pagination count={10} siblingCount={0} />`}
      >
        <Pagination count={10} siblingCount={0} defaultPage={5} />
      </DocPreview>

      {/* ── Color ── */}
      <DocH2 id="color">Color</DocH2>
      <DocPreview
        title="primary · secondary · standard"
        code={`<Pagination count={10} color="primary" />   {/* default */}
<Pagination count={10} color="secondary" />
<Pagination count={10} color="standard" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Pagination count={10} color="primary" defaultPage={3} />
          <Pagination count={10} color="secondary" defaultPage={3} />
          <Pagination count={10} color="standard" defaultPage={3} />
        </div>
      </DocPreview>

      {/* ── Size ── */}
      <DocH2 id="size">Size</DocH2>
      <DocPreview
        title="sm · md · lg"
        code={`<Pagination count={10} size="sm" />
<Pagination count={10} size="md" />   {/* default */}
<Pagination count={10} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <Pagination count={10} size="sm" defaultPage={3} />
          <Pagination count={10} size="md" defaultPage={3} />
          <Pagination count={10} size="lg" defaultPage={3} />
        </div>
      </DocPreview>

      {/* ── Disabled ── */}
      <DocH2 id="disabled">Disabled</DocH2>
      <DocPreview
        title="Disabled"
        code={`<Pagination count={10} disabled />`}
      >
        <Pagination count={10} disabled defaultPage={3} />
      </DocPreview>

      {/* ── Controlled ── */}
      <DocH2 id="controlled">Controlled</DocH2>
      <DocP>
        Pass <InlineCode>page</InlineCode> and <InlineCode>onChange</InlineCode> for
        fully controlled usage.
      </DocP>
      <DocPreview
        title={`Controlled — current page: ${page}`}
        code={`const [page, setPage] = useState(1)
<Pagination count={10} page={page} onChange={setPage} />`}
      >
        <Pagination count={10} page={page} onChange={setPage} />
      </DocPreview>

      {/* ── Props ── */}
      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={paginationProps} />
    </DocArticle>
  )
}
