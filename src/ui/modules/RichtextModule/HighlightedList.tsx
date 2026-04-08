import React from 'react'
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

export default function HighlightedList({
  value,
}: {
  value: Partial<{
    title: string
    block?: PortableTextBlock[]
  }>
}) {
  if (!value) return null

  const { title, block } = value

  return (
    block && (

      <div className="border-accent my-40 flex flex-col gap-20 border border-dashed p-20 md:gap-40 md:p-40">
        {title && <h3 className="!text-20 md:!text-24 !my-0 !leading-[1.4] !font-bold !normal-case md:!leading-[1.2]">{title}</h3>}
        {block && (
          <div className="richtext">
            <PortableText value={block} />
          </div>
        )}
      </div>
    )
  )
}
