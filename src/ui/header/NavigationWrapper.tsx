'use client'

import { useEffect, useRef } from 'react'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const navElement = navRef.current
    if (!navElement) return

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if the clicked element is a link or inside a link
      const linkElement = target.closest('a')
      
      if (linkElement) {
        // Find the header-toggle checkbox and set it to false
        const headerToggle = document.getElementById('header-toggle') as HTMLInputElement
        if (headerToggle) {
          headerToggle.checked = false
        }
      }
    }

    // Add click event listener to the navigation element
    navElement.addEventListener('click', handleLinkClick)

    // Cleanup
    return () => {
      navElement.removeEventListener('click', handleLinkClick)
    }
  }, [])

  return <div ref={navRef}>{children}</div>
}
