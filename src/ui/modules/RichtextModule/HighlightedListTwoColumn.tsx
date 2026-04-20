import React from 'react'
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

export default function HighlightedListTwoColumn({
  value,
}: {
  value: Partial<{
    title: string
    leftCol?: PortableTextBlock[]
    rightCol?: PortableTextBlock[]
  }>
}) {
  if (!value) return null

  const { title, leftCol, rightCol } = value

  return (
    (leftCol || rightCol) ? (

      <div className="border-coral bg-light-yellow my-40 flex flex-col gap-20 border border-dashed p-20 md:gap-40 md:p-40">
        {title && <h3 className="!text-20 md:!text-24 !my-0 !leading-[1.4] !font-bold !normal-case md:!leading-[1]">{title}</h3>}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-20">
          {leftCol && (
            <div className="richtext richtext-coral">
              <PortableText value={leftCol} />
            </div>
          )}
          {rightCol && (
            <div className="richtext richtext-coral">
              <PortableText value={rightCol} />
            </div>
          )}
        </div>
      </div>
    ) : null
  )
}
