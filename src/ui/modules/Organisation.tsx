'use client'
import React from 'react'
import { ResponsiveImg } from '@/ui/Img'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import moduleProps from '@/lib/moduleProps'

interface PersonProps {
  _key: string
  title?: string
  role?: string
  image: any
}

interface RowProps {
  _key: string
  items: PersonProps[]
}

interface OrganisationProps {
  rows: RowProps[]
}

const OrganisationModule = ({ rows, ...propos }: OrganisationProps) => {

  return (
    rows &&
    rows?.length > 0 && (
      <section className="relative z-10 -mb-70 overflow-hidden pt-2 pb-70" {...moduleProps(propos)}>
        <div className="flex flex-col gap-2">
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
                    speed: rowIndex % 2 === 0 ? 0.3 : -0.3,
                    pauseOnHover: true,
                    pauseOnDrag: true,
                  },
                  perPage: 1,
                }}
                extensions={{ AutoScroll }}
                className="splide-container !visible"
                hasTrack={false}
              >
                <SplideTrack className="!overflow-visible">
                  {row.items.map((person) => (
                    <SplideSlide key={person._key} className="shrink-0 cursor-grab active:cursor-grabbing">
                      <div className="group/person relative z-0 aspect-square w-200 shrink-0 hover:z-10 md:w-267">
                        <ResponsiveImg img={person.image} width="267" height="267" className="aspect-square w-full object-cover" />
                        <div className="absolute -bottom-50 left-50 flex w-180 flex-col gap-6 bg-white p-8 opacity-0 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] transition-opacity duration-100 group-hover/person:opacity-100 md:w-250 md:p-16">
                          <h3 className="text-18 md:text-20 leading-[1.2] font-bold">{person.title}</h3>
                          <p className="text-14 leading-[1.5] uppercase">{person.role}</p>
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </SplideTrack>
              </Splide>
            </div>
          ))}
        </div>
      </section>
    )
  )
}

export default OrganisationModule
