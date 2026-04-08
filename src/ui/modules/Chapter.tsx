'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ResponsiveImg } from '@/ui/Img'
import moduleProps from '@/lib/moduleProps'

interface ChapterProps {
  title: string
  subtitle?: string
  assets: Sanity.Img[]
  imageWidth?: 'normal' | 'wide' // new prop with default "normal",
  bgColor: 'bg-white' | 'bg-cultured' | undefined
}

export const Chapter: React.FC<ChapterProps> = ({ title, subtitle, assets, imageWidth, bgColor, ...props }) => {
  const hasImage = !!assets?.[0]
  const asset = assets?.[0]
  const imageIsWide = imageWidth === 'wide'
  const sectionRef = useRef<HTMLElement>(null)
  const [chapterH, setChapterH] = useState('100svh')

  const scrollToNextSection = () => {
    if (sectionRef.current) {
      const currentSection = sectionRef.current
      const nextSection = currentSection.nextElementSibling as HTMLElement

      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }

  useEffect(() => {
    if (!window) return
    if (sectionRef?.current) {
      setChapterH(sectionRef.current.offsetHeight + 'px')
    }
  })

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${bgColor || `bg-cultured`}`} {...moduleProps(props)}>
      <div
        className="fp-container relative z-10 flex min-h-(--chapter-h) flex-col items-center justify-center gap-40 pt-40 pb-80 md:h-auto md:min-h-svh xl:gap-60"
        style={{ '--chapter-h': chapterH } as React.CSSProperties}
      >
        <div className="fp-row">
          <div className="col-span-12 xl:col-span-10 xl:col-start-2">
            <div className="flex flex-col items-center justify-center gap-20 py-16 text-center xl:py-40">
              {subtitle && <p className="h4 xl:text-24 text-spanish-gray">{subtitle}</p>}
              <h2 className="h0 md:text-60">{title}</h2>
            </div>
          </div>
        </div>
        {hasImage && (
          <div className="fp-row">
            <ResponsiveImg
              img={asset}
              className="max-h-fold size-full object-cover"
              pictureProps={{ className: `fp-row-container ${imageIsWide ? 'xl:col-span-10 xl:col-start-2' : ''}` }}
              width={imageIsWide ? 1080 : 850}
              draggable={false}
            />
          </div>
        )}
      </div>
      <svg className="absolute inset-0 z-0 hidden h-full w-full lg:block" preserveAspectRatio="none" viewBox="0 0 1440 810" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m-257.41 745.37-573.43-153.65a70 70 0 0 1-49.5-85.73l130.86-488.37a70 70 0 0 1 85.73-49.5L105.01 174.1a70 70 0 0 1 49.5 85.73L119.9 389.06a70 70 0 0 0 49.5 85.74l836.81 224.22a70 70 0 0 1 49.49 85.73l-133.27 497.38a70 70 0 0 1-85.73 49.5l-1032.15-276.56a70 70 0 0 1-49.5-85.73l37.04-138.24a70 70 0 0 0-49.5-85.73ZM1542.84-124.36 1208.8 400.33a70 70 0 0 0 21.45 96.64l92.79 59.07a70 70 0 0 1 21.46 96.65l-193.34 303.67"
          stroke="#E2E2E2"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <path d="m866.88 1073.21-527.75-329.2a70 70 0 0 0-96.44 22.36l-58.22 93.33a70 70 0 0 1-96.44 22.34l-305.45-190.52" stroke="#E2E2E2" strokeWidth="2" strokeDasharray="8 8" />
      </svg>

      <svg className="absolute inset-0 z-0 h-full w-full lg:hidden" preserveAspectRatio="none" viewBox="0 0 360 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M292.64 65 201.68-52.27a17.5 17.5 0 0 1 3.1-24.56l99.89-77.46a17.5 17.5 0 0 1 24.55 3.1L451.16 6.04a17.5 17.5 0 0 1-3.1 24.55l-26.43 20.5a17.5 17.5 0 0 0-3.1 24.55l132.73 171.14a17.5 17.5 0 0 1-3.1 24.56l-101.73 78.9a17.5 17.5 0 0 1-24.55-3.11l-163.72-211.1a17.5 17.5 0 0 1 3.1-24.55l28.28-21.92a17.5 17.5 0 0 0 3.1-24.56Z"
          stroke="#E2E2E2"
          strokeDasharray="2 2"
        />
        <path
          d="m485.12-205.2-394 150.65a17.5 17.5 0 0 0-10.1 22.6L125.22 83.6a17.5 17.5 0 0 1-10.1 22.6l-238.63 91.24M397.77 465.04 161.42 317.6a17.5 17.5 0 0 0-24.1 5.59l-38.09 61.05a17.5 17.5 0 0 1-24.1 5.59l-141.25-88.1M-64.35 704.43l-143.36-38.41a17.5 17.5 0 0 1-12.38-21.43l32.72-122.1a17.5 17.5 0 0 1 21.43-12.37l192.2 51.5a17.5 17.5 0 0 1 12.37 21.43l-8.66 32.3a17.5 17.5 0 0 0 12.38 21.44l209.2 56.06a17.5 17.5 0 0 1 12.37 21.43L230.6 838.62A17.5 17.5 0 0 1 209.17 851l-258.04-69.14a17.5 17.5 0 0 1-12.37-21.44l9.26-34.55a17.5 17.5 0 0 0-12.37-21.44Z"
          stroke="#E2E2E2"
          strokeDasharray="2 2"
        />
      </svg>
      <button
        className="text-jet lg:hover:text-accent absolute right-1/2 bottom-0 z-20 flex h-80 w-80 translate-x-1/2 items-center justify-center lg:right-0 lg:translate-x-0 xl:h-160 xl:w-120"
        onClick={scrollToNextSection}
        aria-label="Scroll down"
      >
        <svg className="animate-bounce [animation-duration:2s]" width="12" height="41" viewBox="0 0 12 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.47 40.53c.3.3.77.3 1.06 0l4.77-4.77a.75.75 0 0 0-1.06-1.06L6 38.94 1.76 34.7A.75.75 0 1 0 .7 35.76l4.77 4.77ZM5.25 0v40h1.5V0h-1.5Z" fill="currentColor" />
        </svg>
      </button>
    </section>
  )
}

export default Chapter
