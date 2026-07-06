import { useEffect } from 'react'
import { profile } from '@/data/profile'

interface SEOProps {
  title: string
  description: string
  path?: string
}

const SITE_URL = 'https://ooantwi.dev'

export default function SEO({ title, description, path = '' }: SEOProps) {
  const fullTitle = title.includes(profile.name) ? title : `${title} | ${profile.name}`
  const url = `${SITE_URL}${path}`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', url, true)
    setMeta('og:type', 'website', true)
    setMeta('og:image', `${SITE_URL}/og-image.svg`, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [fullTitle, description, url])

  return null
}
