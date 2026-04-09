import { useEffect } from 'react'

const SITE = 'RSX UI'
const BASE = 'https://rsxui.netlify.app'

function setMeta(attr: string, key: string, value: string): string {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  const prev = el?.content ?? ''
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
  return prev
}

/**
 * Sets `<title>`, description, OG, Twitter, and canonical for the current page.
 * Restores previous values on unmount.
 */
export function useDocMeta(title: string, description: string) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE}`
    const prevTitle = document.title
    document.title = fullTitle

    const url = `${BASE}${window.location.pathname}`

    const prevs = [
      ['name', 'description', setMeta('name', 'description', description)],
      ['property', 'og:title', setMeta('property', 'og:title', fullTitle)],
      ['property', 'og:description', setMeta('property', 'og:description', description)],
      ['property', 'og:url', setMeta('property', 'og:url', url)],
      ['name', 'twitter:title', setMeta('name', 'twitter:title', fullTitle)],
      ['name', 'twitter:description', setMeta('name', 'twitter:description', description)],
    ] as const

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    const prevCanonical = canonical?.href ?? ''
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    return () => {
      document.title = prevTitle
      for (const [attr, key, prev] of prevs) setMeta(attr, key, prev)
      if (canonical) canonical.href = prevCanonical
    }
  }, [title, description])
}
