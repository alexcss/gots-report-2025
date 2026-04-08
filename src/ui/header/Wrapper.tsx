'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function Wrapper({ className, children }: React.ComponentProps<'header'>) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // set --header-height
  useEffect(() => {
    if (typeof window === 'undefined') return

    function setHeight() {
      if (!ref.current) return
      document.documentElement.style.setProperty('--header-height', `${ref.current.offsetHeight ?? 0}px`)
    }

    setHeight()
    window.addEventListener('resize', setHeight)

    return () => window.removeEventListener('resize', setHeight)
  }, [])

  // close menus after navigation
  useEffect(() => {
    if (typeof document === 'undefined') return
    const toggle = document.querySelector('#header-toggle') as HTMLInputElement
    if (toggle) toggle.checked = false

    if (!ref.current) return
    ref.current.querySelectorAll('details').forEach((element) => {
      if (element.open) element.open = false
    })
  }, [pathname])

  useGSAP(
    () => {
      if (!ref.current) return

      ScrollTrigger.create({
        start: 'top -180',
        end: 99999,
        toggleClass: { className: 'fp-sticky', targets: ref.current },
      })

      ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
          if (!ref.current) return

          self.direction === -1 ? ref.current.classList.remove('fp-slide-up') : ref.current.classList.add('fp-slide-up')
        },
      })

      return () => {
        if (!ref.current) return

        ref.current.classList.remove('fp-slide-up')
        ref.current.classList.remove('fp-sticky')
      }
    },
    { scope: ref }
  )

  return (
    <header ref={ref} className={className} role="banner">
      {children}
    </header>
  )
}
