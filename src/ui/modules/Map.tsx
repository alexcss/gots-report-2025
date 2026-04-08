'use client'

import React, { useState, useRef, useEffect } from 'react'
import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import Content from '@/ui/modules/RichtextModule/Content'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Define the types for the component
interface PersonCard {
  image?: Sanity.Img
  name?: string
  role?: string
}

interface RegionProps {
  _key: string
  id: string
  title: string
  content?: any[]
  personCard?: PersonCard
}

interface MapProps {
  regions?: RegionProps[]
}

const REGION_IDS = ['north-america', 'apac', 'japan', 'dach', 'united-kingdom', 'africa', 'south-asia', 'turkiye']

const REGION_TITLE = {
  'north-america': 'North America',
  apac: 'APAC',
  japan: 'Japan',
  dach: 'DACH',
  'united-kingdom': 'United Kingdom',
  africa: 'Africa',
  'south-asia': 'South Asia',
  turkiye: 'Türkiye',
}

const Map = ({ regions = [], ...props }: MapProps) => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Get the active region data
  const activeRegionData = regions.find((region) => region.id === activeRegion)

  // Block body scroll when overlay is open
  useEffect(() => {
    if (showOverlay) {
      // Block scrolling on body
      document.body.classList.add('max-md:overflow-hidden')
    } else {
      // Re-enable scrolling when overlay is closed
      document.body.classList.remove('max-md:overflow-hidden')
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.classList.remove('max-md:overflow-hidden')
    }
  }, [showOverlay])

  // Handle region click
  const handleRegionClick = (regionId: string) => {
    if (activeRegion === regionId) {
      // Toggle overlay if clicking on already active region
      setShowOverlay(!showOverlay)
      setActiveRegion(null)
      centerMapOnRegion(null)
    } else {
      // Set new active region and show overlay
      setActiveRegion(regionId)
      setShowOverlay(true)
      // Center the map on the clicked region
      centerMapOnRegion(regionId)
    }
  }

  // Center the map on a specific region
  const centerMapOnRegion = (regionId: string | null) => {
    if (!mapRef.current) return

    // Find the dot element for the region
    if (!regionId) mapRef.current.style.transform = 'translateX(0)'

    const dot = mapRef.current.querySelector(`#${regionId}-dot`)
    if (dot) {
      // Get the dot's position
      const dotRect = dot.getBoundingClientRect()
      const mapRect = mapRef.current.getBoundingClientRect()

      // Calculate the translation needed to center the dot on the left side
      const translateX = mapRect.width / 4 - (dotRect.left - mapRect.left)

      // Apply the translation to the SVG
      // const currentTransform = mapRef.current.style.transform || ''
      mapRef.current.style.transform = `translateX(${translateX}px) scale(1.5)`
      // const currentTransform = mapRef.current.style.transform || ''
      // mapRef.current.style.transform = `${currentTransform.replace(/translateX\([^)]+\)/, '')} translateX(${translateX}px)`
    }
  }

  // Close the overlay
  const closeOverlay = () => {
    setShowOverlay(false)
    setActiveRegion(null)
    centerMapOnRegion(null)
  }

  return (
    <section className="relative overflow-hidden bg-white" {...moduleProps(props)}>
      {/* Navigation Bar */}
      <div className="bg-cultured border-light-gray relative z-10 border-y py-16 md:py-40">
        <div className="fp-container grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-12">
          {REGION_IDS.map((regionId) => {
            return (
              <button
                key={regionId}
                className={`h5 border-accent border px-19 py-7 whitespace-nowrap normal-case transition-colors ${activeRegion === regionId ? 'bg-accent text-white' : 'text-accent hover:bg-cultured bg-white'}`}
                onClick={() => handleRegionClick(regionId)}
              >
                {REGION_TITLE[regionId]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Map Container with SVG */}
      <div className="overflow-hidden md:relative md:z-20">
        <div className="fp-container flex justify-center px-0 md:relative">
          <div ref={mapRef} className="relative z-0 aspect-[1441/829] h-400 shrink-0 transition-transform duration-500 md:h-828">
            {/*<Image className="absolute top-0 left-0 z-0 h-full w-full object-cover" src="/assets/map.svg" alt="map" width="1441" height="829" loading="lazy" />*/}
            <Image className="absolute top-0 left-0 z-0 h-full w-full object-cover" src="/assets/map-faded.png" alt="map" width="2882" height="1658" loading="lazy" />

            {REGION_IDS.map((regionId) => (
                <Image key={'map-' + regionId} className={cn(`absolute top-0 left-0 z-0 h-full w-full object-cover transition-opacity duration-200`,
                  (activeRegion === regionId || activeRegion === null) ? 'opacity-100' : 'opacity-0',
                )} src={`/assets/map-${regionId}.png`} alt="map" width="2882" height="1658" loading="lazy" />
              ),
            )}


            <svg viewBox="0 0 1441 829" className="relative z-10 block w-full">
              {/* World Map SVG Paths */}
              {/*<g>*/}
              {/*  /!* World map SVG content here - replace with actual SVG *!/*/}
              {/*  <path fill="#F3F3F3" stroke="#CCCCCC" d="M218.57,167.5c0.96-0.52,1.96-0.95,2.98-1.29c1.77-0.59,3.6-0.83,5.45-0.83c3.35..." />*/}
              {/*  /!* More map paths would go here *!/*/}
              {/*</g>*/}

              {/* Pulsing Dots for Each Region */}
              {REGION_IDS.map((regionId) => {
                // Hard-coded positions for each region
                const positions = {
                  'north-america': { x: 260, y: 282 },
                  apac: { x: 1093, y: 381 },
                  japan: { x: 1234, y: 368 },
                  dach: { x: 722, y: 291 },
                  'united-kingdom': { x: 676, y: 282 },
                  africa: { x: 753, y: 475 },
                  'south-asia': { x: 991, y: 436 },
                  turkiye: { x: 820, y: 355 },
                }

                const pos = positions[regionId as keyof typeof positions]

                return (
                  <g
                    key={regionId}
                    onClick={() => handleRegionClick(regionId)}
                    className="cursor-pointer transition-colors duration-300"
                    opacity={activeRegion === regionId || activeRegion === null ? 1 : 0.3}
                  >
                    {/* Outer pulsing circle */}
                    <circle id={`${regionId}-pulse`} cx={pos.x} cy={pos.y} r="15" fill="rgba(255, 255, 255, 0.3)">
                      <animate attributeName="r" values="4;20;20" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.1;0.6;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Inner dot */}
                    {/*<circle*/}
                    {/*  id={`${regionId}-dot`}*/}
                    {/*  cx={pos.x}*/}
                    {/*  cy={pos.y}*/}
                    {/*  r="6"*/}
                    {/*  fill={activeRegion === regionId ? '#0078FF' : '#666666'}*/}
                    {/*  className="cursor-pointer transition-colors duration-300"*/}
                    {/*/>*/}
                    <circle id={`${regionId}-dot`} cx={pos.x} cy={pos.y} r="6" fill="#fff" />
                    <circle id={`${regionId}-dot2`} cx={pos.x} cy={pos.y} r="6" fill="#fff" />
                    <circle id={`${regionId}-dot3`} cx={pos.x} cy={pos.y} r="5.5" fill="#fff" stroke="#81C200" />
                    <circle id={`${regionId}-dot4`} cx={pos.x} cy={pos.y} r="2" fill="#81C200" />
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Overlay with Region Details */}
          {showOverlay && activeRegionData && (
						<div className="border-light-gray anim-fade-to-b md:anim-fade-to-l fixed top-0 right-0 z-40 md:z-10 flex h-dvh w-full max-w-720 flex-col border-l bg-black/25 p-16 md:absolute md:h-full md:gap-40 md:bg-white md:p-40 md:pb-30">
              <div className="flex items-center justify-between gap-12 bg-white p-6 pl-16 md:p-0 md:gap-24">
                <h3 className="h3">{activeRegionData.title}</h3>

                <button className="text-jet hover:text-accent flex h-44 w-44 self-start shrink-0" onClick={closeOverlay} aria-label="Close">
                  <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 14.3438L30 30.3438M14 30.3438L30 14.3438" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto overflow-x-hidden md:overflow-visible flex min-h-0 flex-1 flex-col justify-start gap-20 bg-white md:grid md:grid-cols-12 p-16 pb-0 md:p-0">
                {activeRegionData.content && (
                  <div className="md:overflow-x-hidden md:overflow-y-auto md:col-span-8 xl:pr-20 max-md:order-1 max-md:pb-16">
                    <Content className="fp-text-body2 text-14 md:text-16" value={activeRegionData.content} />
                  </div>
                )}

                {activeRegionData.personCard && (
                  <div className="flex md:flex-col gap-20 md:col-span-4 items-center md:items-start">
                    {activeRegionData.personCard?.image && (
                      <ResponsiveImg img={activeRegionData.personCard.image} width={200} height={200} className="w-138 shrink-0 md:w-full aspect-square object-cover" />
                    )}
                    <div className="flex flex-col gap-6 md:gap-12">
                      {activeRegionData.personCard?.name && <p className="fp-text-name">{activeRegionData.personCard.name}</p>}
                      {activeRegionData.personCard?.role && <p className="fp-text-role">{activeRegionData.personCard.role}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default Map
