import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import { DocArticle, DocH1, DocH2, DocLead, DocP, InlineCode } from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

function OnClickExample() {
  const [last, setLast] = useState<string | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Breadcrumb>
        <BreadcrumbItem onClick={() => setLast('Home')}>Home</BreadcrumbItem>
        <BreadcrumbItem onClick={() => setLast('Docs')}>Docs</BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
      {last && (
        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          Clicked: <strong>{last}</strong>
        </span>
      )}
    </div>
  )
}

const breadcrumbProps = [
  {
    name: 'separator',
    type: 'ReactNode',
    default: '<ChevronRight />',
    description: 'Custom separator node rendered between items. Defaults to a chevron icon.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root <nav> after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the root <nav>.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Compose with <BreadcrumbItem> children.',
  },
  {
    name: '…',
    type: 'ComponentProps<"nav">',
    description: 'All other nav attributes are forwarded.',
  },
] as const

const breadcrumbItemProps = [
  {
    name: 'href',
    type: 'string',
    description: 'Renders the item as an <a> tag. Ignored when onClick is supplied.',
  },
  {
    name: 'onClick',
    type: 'MouseEventHandler<HTMLButtonElement>',
    description: 'When provided, renders the item as a <button> and href is discarded.',
  },
  {
    name: 'current',
    type: 'boolean',
    default: 'false',
    description: 'Marks this as the current page — adds aria-current="page" and disables pointer events.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    description: 'Optional icon rendered before the label text.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Item label content.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the item element.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the item element.',
  },
] as const

// ── Inline icons used in examples ────────────────────────────────────────────
function HomeIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function SlashSeparator() {
  return <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>/</span>
}

export function BreadcrumbDoc() {
  useDocMeta('Breadcrumb', 'Accessible navigation trail for hierarchical page paths.')
  return (
    <DocArticle>
      <DocH1 description="Accessible, composable breadcrumb trail built on nav > ol > li.">
        Breadcrumb
      </DocH1>
      <DocLead>
        Show users where they are in a hierarchy. Renders a semantic{' '}
        <InlineCode>{'<nav aria-label="Breadcrumb">'}</InlineCode> wrapping an ordered list of
        items. The last item is automatically treated as the current page.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Breadcrumb, BreadcrumbItem" />

      <DocH2 id="usage">Basic usage</DocH2>
      <DocP>
        Compose <InlineCode>BreadcrumbItem</InlineCode> children inside{' '}
        <InlineCode>Breadcrumb</InlineCode>. Pass <InlineCode>href</InlineCode> to ancestor items
        and <InlineCode>current</InlineCode> to the active page.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/components">Components</BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Components</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </DocPreview>

      <DocH2 id="with-icon">With icon</DocH2>
      <DocP>
        Pass any node to the <InlineCode>icon</InlineCode> prop to prepend an icon before the
        label text.
      </DocP>
      <DocPreview
        title="With icon"
        code={`<Breadcrumb>
  <BreadcrumbItem href="/" icon={<HomeIcon />}>Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbItem href="#" icon={<HomeIcon />}>Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Docs</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </DocPreview>

      <DocH2 id="custom-separator">Custom separator</DocH2>
      <DocP>
        Replace the default chevron by passing any node to the{' '}
        <InlineCode>separator</InlineCode> prop on the root{' '}
        <InlineCode>Breadcrumb</InlineCode>.
      </DocP>
      <DocPreview
        title="Slash separator"
        code={`<Breadcrumb separator={<SlashSeparator />}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/components">Components</BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
      >
        <Breadcrumb separator={<SlashSeparator />}>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Components</BreadcrumbItem>
          <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </DocPreview>

      <DocH2 id="onclick">onClick handler</DocH2>
      <DocP>
        Pass <InlineCode>onClick</InlineCode> instead of (or alongside){' '}
        <InlineCode>href</InlineCode> to render the item as a{' '}
        <InlineCode>{'<button>'}</InlineCode>. The <InlineCode>href</InlineCode> is silently
        discarded when <InlineCode>onClick</InlineCode> is present.
      </DocP>
      <DocPreview
        title="onClick as button"
        code={`<Breadcrumb>
  <BreadcrumbItem onClick={() => console.log('Home clicked')}>Home</BreadcrumbItem>
  <BreadcrumbItem onClick={() => console.log('Docs clicked')}>Docs</BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`}
      >
        <OnClickExample />
      </DocPreview>

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The root renders a <InlineCode>{'<nav aria-label="Breadcrumb">'}</InlineCode> element
        containing an <InlineCode>{'<ol>'}</InlineCode>. Items with{' '}
        <InlineCode>current</InlineCode> receive{' '}
        <InlineCode>{'aria-current="page"'}</InlineCode> and separator elements are hidden from
        assistive technology via <InlineCode>aria-hidden</InlineCode>.
      </DocP>

      <DocH2 id="breadcrumb-props">Breadcrumb props</DocH2>
      <PropsTable rows={[...breadcrumbProps]} />

      <DocH2 id="item-props">BreadcrumbItem props</DocH2>
      <PropsTable rows={[...breadcrumbItemProps]} />
    </DocArticle>
  )
}
