'use client'

import { type FC, useRef, useEffect } from 'react'
import { Any } from 'next-sanity'
import moduleProps from '@/lib/moduleProps'
import Content from '@/ui/modules/RichtextModule/Content'

interface SatelliteProps {
  title?: string
  content?: Any[]
  video: {
    asset: {
      url: string
    }
    posterImage?: {
      asset: {
        url: string
      }
    }
  }
}

const Satellite: FC<SatelliteProps> = ({ title, content, video, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!videoRef.current || !sectionRef.current) return

    // Create an intersection observer to detect when the section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return

          if (entry.isIntersecting) {
            // Play video when in view
            videoRef.current.play().catch((error) => {
              // Handle autoplay restrictions
              console.log('Autoplay prevented:', error)
            })
          } else {
            // Pause video when out of view
            videoRef.current.pause()
          }
        })
      },
      {
        // Adjust threshold to determine when the video should play/pause
        threshold: 0.3,
      },
    )

    // Start observing the section
    observer.observe(sectionRef.current)

    // Clean up observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const getPosterUrl = () => {
    if (video.posterImage?.asset?.url) {
      return video.posterImage.asset.url
    }
    return undefined
  }

  return (
		<section className="bg-blue-dark relative overflow-hidden text-white" {...moduleProps(props)}>
			{video?.asset?.url && (
				<div className="relative z-10 aspect-video max-h-[810px] w-full overflow-hidden" ref={sectionRef}>
					<video ref={videoRef} className="-mt-1 h-[101%] w-full object-cover" src={video.asset.url} poster={getPosterUrl()} muted playsInline loop />
				</div>
			)}
      <div className="fp-container relative z-10">
        <div className="fp-row">
          <div className="fp-row-container relative z-10 py-40 md:py-80">
            {title && <h2 className="h1 mb-20 md:mb-40">{title}</h2>}

            {content && <Content value={content} className={`richtext-dark`} />}
          </div>
        </div>
      </div>
			<img className="absolute -top-16 left-1/2 w-auto max-w-none -translate-x-1/2 border-x border-white/5" src="/assets/satellite-bg-xl.svg" alt="grid" width="2560" height="7000" loading="lazy" />
    </section>
  )
}

export default Satellite
