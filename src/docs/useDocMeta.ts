import { useEffect } from 'react'

const SITE = 'RSX UI'

/**
 * Sets `<title>` and `<meta name="description">` for the current doc page.
 * Resets to defaults on unmount so navigation always reflects the active page.
 */
export function useDocMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title
    document.title = `${title} — ${SITE}`

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prevDesc = meta?.content ?? ''
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description

    return () => {
      document.title = prev
      if (meta) meta.content = prevDesc
    }
  }, [title, description])
}
