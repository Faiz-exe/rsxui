import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { prose } from '../prose.stylex'

export function DocArticle({ children }: { children: ReactNode }) {
  return <article {...stylex.props(prose.article)}>{children}</article>
}

export function DocH1({ children }: { children: ReactNode }) {
  return <h1 {...stylex.props(prose.h1)}>{children}</h1>
}

export function DocH2({
  id,
  children,
  first,
}: {
  id?: string
  children: ReactNode
  /** Use on the first section (usually Import) after the title block */
  first?: boolean
}) {
  return (
    <h2 id={id} {...stylex.props(prose.h2, first && prose.h2First)}>
      {children}
    </h2>
  )
}

export function DocH3({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  return (
    <h3 id={id} {...stylex.props(prose.h3)}>
      {children}
    </h3>
  )
}

export function DocP({ children }: { children: ReactNode }) {
  return <p {...stylex.props(prose.p)}>{children}</p>
}

export function DocLead({ children }: { children: ReactNode }) {
  return <p {...stylex.props(prose.lead)}>{children}</p>
}

export function DocUl({ children }: { children: ReactNode }) {
  return <ul {...stylex.props(prose.ul)}>{children}</ul>
}

export function DocLi({ children }: { children: ReactNode }) {
  return <li {...stylex.props(prose.li)}>{children}</li>
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code {...stylex.props(prose.inlineCode)}>{children}</code>
}

export function DocLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} {...stylex.props(prose.link)}>
      {children}
    </Link>
  )
}

export function DocExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...stylex.props(prose.link)}>
      {children}
    </a>
  )
}
