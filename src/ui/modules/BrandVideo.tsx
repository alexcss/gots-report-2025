'use client'

import { type FC, useState, useRef } from 'react'
import { FaPlay } from 'react-icons/fa'

import moduleProps from '@/lib/moduleProps'

interface BrandVideoProps {
  title?: string
  video: {
    url: string
    posterImage?: {
      url?: string
    }
  }
}

const BrandVideo: FC<BrandVideoProps> = ({ title, video, ...props }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const posterUrl = video?.posterImage?.url ?? undefined

  return (
    video?.url && (
      <section className="border-bright-gray w-full border-t" {...moduleProps(props)}>
        {title && (
          <div className="fp-container py-16 md:py-40">
            <h2 className="h2">{title}</h2>
          </div>
        )}

        <div className="relative w-full">
          <video ref={videoRef} className="h-auto w-full" src={video.url} poster={posterUrl} controls={isPlaying} playsInline onPlay={handlePlay} onPause={handlePause} onEnded={handleEnd} />

          {!isPlaying && (
            <button onClick={togglePlay} className="group absolute inset-0 z-10 flex items-center justify-center focus:outline-none" aria-label="Play video">
              <span className="bg-accent flex h-18 w-18 items-center justify-center rounded-full text-white transition-all group-hover:bg-green-600 md:h-60 md:w-60">
                <FaPlay className="ml-1 h-5 w-5 md:ml-6 md:h-20 md:w-20" />
              </span>
            </button>
          )}
        </div>
      </section>
    )
  )
}

export default BrandVideo
