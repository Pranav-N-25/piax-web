import { useEffect } from 'react'

// Sets the document title and meta description while a page is mounted, restoring the previous ones after.
export function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title
    let meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    document.title = title
    meta.setAttribute('content', description)
    return () => {
      document.title = previousTitle
      if (previousDescription) meta.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
