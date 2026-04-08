import React from 'react'
import { Any, PortableTextMarkComponentProps } from 'next-sanity'

export function isExternalUrl(url: string): boolean {
  if (!url) return false

  // If the URL is just a path (starts with / or ./ or #)
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('#')) {
    return false
  }

  // Try to parse the URL
  try {
    // Check if URL has a different domain than the current site
    const urlObj = new URL(url, window.location.origin)
    return urlObj.hostname !== window.location.hostname
  } catch (e) {
    // If URL parsing fails, check if it has a protocol
    return url.includes('://') || url.startsWith('mailto:') || url.startsWith('tel:')
  }
}

export default function Link({ value, children }: PortableTextMarkComponentProps<Any>) {
  if (!value) return null

  const { href } = value
  const isExternal = isExternalUrl(href)

  // Always open external links in new tab, and respect blank setting for internal links
  const target = isExternal ? '_blank' : undefined
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined

  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  )

}
