import React from 'react'
import { PortableText, PortableTextTypeComponentProps } from 'next-sanity'
import { PortableTextBlock } from '@portabletext/types'
import { Img } from '@/ui/Img'

type InLovingMemoryValue = {
  subtitle?: string
  image?: Sanity.Image
  name?: string
  date?: string
  memories?: PortableTextBlock[]
}

const InLovingMemory = (props: PortableTextTypeComponentProps<InLovingMemoryValue>) => {
  const { value } = props
  const { subtitle, image, name, date, memories } = value || {}

  return (
    <div className="my-20 md:my-40">
      <div className="bg-white p-16 md:p-24 lg:p-40">
        <div className="mb-16 flex flex-col gap-20 md:mb-24 md:flex-row md:items-start md:justify-between">
          {subtitle && (
            <div className="text-accent text-16 lg:-tracking-1 text-end leading-[1.5] md:hidden">
              <p>{subtitle}</p>
            </div>
          )}
          <div className="flex flex-col gap-16 md:flex-row md:gap-20 lg:gap-24">
            {image && <Img className="block h-auto w-120 shrink-0 md:w-90" image={image} width={90} alt={name} />}
            <div className="flex flex-col justify-between gap-12">
              {name && <p className="!fp-text-name !m-0 whitespace-pre-line">{name}</p>}
              {date && <p className="text-14 lg:-tracking-1 text-accent leading-[1.5]">{date}</p>}
            </div>
          </div>
          {subtitle && (
            <div className="hidden md:block">
              <p className="text-accent text-20 lg:-tracking-1 leading-[1.5]">{subtitle}</p>
            </div>
          )}
        </div>

        {memories && (
          <div className="richtext fp-text-body">
            <PortableText value={memories} />
          </div>
        )}
      </div>
    </div>
  )
}

export default InLovingMemory
