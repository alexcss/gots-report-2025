'use client'

import React, { useState, useRef } from 'react'
import { ResponsiveImg } from '@/ui/Img'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import moduleProps from '@/lib/moduleProps'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Video from 'yet-another-react-lightbox/plugins/video'

import { Slide } from 'yet-another-react-lightbox'

import { urlFor } from '@/sanity/lib/image'

interface MediaItemProps {
  _key: string
  mediaType: 'image' | 'video'
  image?: Sanity.Img
  video?: {
    asset: {
      url: string
    }
  }
  width?: number
  height?: number
  description?: string
}

interface RowProps {
  _key: string
  items: MediaItemProps[]
}

interface MediaGridProps {
  rows: RowProps[]
  displayType?: 'brand' | 'photospread'
  title?: string
}

const PrevIcon = () => (
  <svg className="h-60 w-60 md:h-100 md:w-100" width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 70.1875L40.6223 50.8098C40.2786 50.4661 40.2786 49.9089 40.6223 49.5652L60 30.1875" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
const NextIcon = () => (
  <svg className="h-60 w-60 md:h-100 md:w-100" width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 30.1875L59.3777 49.5652C59.7214 49.9089 59.7214 50.4661 59.3777 50.8098L40 70.1875" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
const CloseIcon = () => (
  <svg className="h-60 w-60 md:h-100 md:w-100" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M66 34L34 66M34 34L66 66" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MediaGrid = ({ rows, displayType = 'brand', title, ...props }: MediaGridProps) => {
  const [open, setOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const splideRefs = useRef<Record<number, any>>({})

  // Flatten all items into a single array for lightbox
  const allItems = rows?.flatMap((row) => row.items) || []

  // Create slides for the lightbox
  const slides: Slide[] = allItems
    .map((item, index) => {
      if (item.mediaType === 'image' && item.image) {
        return {
          type: 'image',
          src: item?.image?.image ? urlFor(item.image.image).width(1200).url() : undefined,
          description: (
            <>
              {item.description}{' '}
              <span className="fp-text-body2 mt-12 block text-center md:mt-20">
                {index + 1} / {allItems.length}
              </span>
            </>
          ),
        }
      } else if (item.mediaType === 'video' && item.video) {
        return {
          type: 'video',
          sources: [
            {
              src: item?.video?.asset?.url || undefined,
              type: 'video/mp4',
            },
          ],
          description: item.description || undefined,
        }
      }
      return null
    })
    .filter(Boolean) as Slide[]

  // Handle click on slide in photospread mode
  const handleSplideClick = (rowIndex: number, splide: typeof Splide, slide: typeof SplideSlide) => {
    if (displayType !== 'photospread' || !splideRefs.current[rowIndex] || !splide) return

    // Get the active slide index from the splide instance
    const activeSlideIndex = slide.isClone ? slide.slideIndex : slide.index

    // Calculate the actual index in the allItems array
    let globalIndex = 0
    for (let i = 0; i < rowIndex; i++) {
      globalIndex += rows[i].items.length
    }
    globalIndex += activeSlideIndex % rows[rowIndex].items.length

    // Pause all splide instances
    Object.values(splideRefs.current).forEach((splide) => {
      if (splide && splide.Components && splide.Components.AutoScroll) {
        splide.Components.AutoScroll.pause()
      }
    })

    setSlideIndex(globalIndex)
    setOpen(true)
  }

  // Handle lightbox close
  const handleLightboxClose = () => {
    setOpen(false)

    // Resume all splide instances
    Object.values(splideRefs.current).forEach((splide) => {
      if (splide && splide.Components && splide.Components.AutoScroll) {
        splide.Components.AutoScroll.play()
      }
    })
  }

  // Function to calculate aspect ratio styles based on width and height
  const getAspectRatioStyle = (width?: number, height?: number) => {
    if (!width || !height) return { aspectRatio: `16/9` }
    return {
      aspectRatio: `${width} / ${height}`,
    }
  }

  return (
    rows &&
    rows?.length > 0 && (
      <section className="relative z-10 overflow-hidden py-2" {...moduleProps(props)}>
        {title && (
          <div className="bg-cultured py-20 md:py-40">
            <div className="fp-container">
              <h2 className="h2">{title}</h2>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 bg-white">
          {rows.map((row, rowIndex) => (
            <div key={row._key} className="group relative z-0 -mx-2 px-2 hover:z-10">
              <Splide
                options={{
                  type: 'loop',
                  drag: true,
                  arrows: false,
                  pagination: false,
                  autoWidth: true,
                  gap: '2px',
                  autoScroll: {
                    speed: rowIndex % 2 === 0 ? 0.5 : -0.5,
                    pauseOnHover: true,
                    pauseOnDrag: true,
                  },
                  perPage: 1,
                }}
                extensions={{ AutoScroll }}
                className="splide-container !visible"
                hasTrack={false}
                ref={(splide: any) => {
                  if (splide && splide.splide) {
                    splideRefs.current[rowIndex] = splide.splide
                  }
                }}
                onClick={(splide, slide) => {
                  handleSplideClick(rowIndex, splide, slide)
                }}
              >
                <SplideTrack className="!overflow-visible">
                  {row.items.map((item) => (
                    <SplideSlide key={item._key} className={`shrink-0 cursor-${displayType === 'photospread' ? 'pointer' : 'grab'} active:cursor-grabbing`}>
                      <div className="group/item h-184 shrink-0 md:h-268">
                        {item.mediaType === 'image' && item.image ? (
                          <ResponsiveImg img={item.image} height="268" className="h-184 w-auto object-cover md:h-268" />
                        ) : item.mediaType === 'video' && item?.video?.asset?.url ? (
                          <div className="relative h-full" style={getAspectRatioStyle(item.width, item.height)}>
                            <video className="h-full w-full object-cover" style={getAspectRatioStyle(item.width, item.height)} muted loop playsInline autoPlay>
                              <source src={item.video.asset.url} type="video/mp4" />
                            </video>
                          </div>
                        ) : null}

                        {displayType === 'brand' && item.description && (
                          <div className="absolute right-0 bottom-0 left-0 flex p-2 opacity-0 transition-opacity duration-100 group-hover/item:opacity-100">
                            <p className="fp-text-body2 truncate bg-white p-8">{item.description}</p>
                          </div>
                        )}
                      </div>
                    </SplideSlide>
                  ))}
                </SplideTrack>
              </Splide>
            </div>
          ))}
        </div>

        {displayType === 'photospread' && (
          <Lightbox
            open={open}
            close={handleLightboxClose}
            slides={slides}
            plugins={[Captions, Video]}
            index={slideIndex}
            carousel={{
              finite: false,
            }}
            captions={{
              showToggle: false,
              descriptionTextAlign: 'center',
            }}
            render={{
              buttonPrev: slides.length <= 1 ? () => null : undefined,
              buttonNext: slides.length <= 1 ? () => null : undefined,
              iconPrev: () => <PrevIcon />,
              iconNext: () => <NextIcon />,
              iconClose: () => <CloseIcon />,
            }}
          />
        )}
      </section>
    )
  )
}

export default MediaGrid
