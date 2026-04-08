import React from 'react'
import { ResponsiveImg } from '@/ui/Img'
import Image from 'next/image'

interface PhoneProps {
  value: {
    image?: Sanity.Img
    video?: Sanity.Video
  }
}

const Phone: React.FC<PhoneProps> = ({ value }) => {
  const { image, video } = value
  const hasMedia = image || video

  if (!hasMedia) return null

  return (
    <div className="-mx-16 my-40 overflow-x-auto overflow-y-hidden px-16 md:mx-0 md:overflow-hidden md:px-0">
      <div className="grid min-w-540 grid-cols-2 gap-20 md:gap-40">
        {image && (
          <div>
            <div className="relative">
              <Image src="/assets/iphone.png" alt="iPhone frame" width={322} height={404} className="relative z-10 w-full" />
              <div className="absolute top-[2%] right-[5%] bottom-[2%] left-[4.5%] z-0 overflow-hidden rounded-[20px]">
                <ResponsiveImg img={image} width="322" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        )}
        {video && (
          <div className="pt-80">
            <div className="relative">
              <Image src="/assets/iphone.png" alt="iPhone frame" width={322} height={404} className="relative z-10 w-full" />
              <div className="absolute top-[2%] right-[5%] bottom-[2%] left-[4.5%] z-0 overflow-hidden rounded-[20px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute -top-1 -left-1 h-[101%] w-[101%] object-cover"
                  poster={video?.posterImage?.asset?.url || undefined}
                  src={video?.asset?.url || undefined}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Phone
