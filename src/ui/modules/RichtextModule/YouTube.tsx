'use client'
import dynamic from 'next/dynamic'

import React from 'react'
import getYouTubeId from 'get-youtube-id'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

interface YouTubeProps {
  value: {
    url: string
  }
}

const YouTube = ({ value }: YouTubeProps) => {
  const { url } = value

  if (!url) return null

  const videoId = getYouTubeId(url)
  if (!videoId) return null

  return (
    <div className="relative my-40 aspect-video w-full overflow-hidden md:my-80">
      <ReactPlayer playing={true} className="absolute top-0 left-0" light={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} url={url} width="100%" height="100%" />
    </div>
  )
}

export default YouTube
