import React from 'react'
import { ResponsiveImg } from '@/ui/Img'

interface PeopleProps {
  value: {
    items: Array<{
      image: Sanity.Img
      name: string
      role?: string
      _key: string
    }>
  }
}

const People = ({ value }: PeopleProps) => {
  const { items } = value

  if (!items || items?.length === 0) return null

  return (
    <div className="my-20 md:my-40">
      <div className="grid grid-cols-2 gap-20 md:gap-40">
        {items.map((person) => (
          <div key={person._key} className="flex flex-col gap-20">
            <ResponsiveImg img={person.image} width={400} height={400} className="aspect-square h-full w-full object-cover" />
            <div className="flex flex-col gap-6">
              {person.name && <p className="fp-text-body-accent md:text-24">{person.name}</p>}
              {person.role && <p className="text-12 md:-tracking-1 md:text-14 leading-[1.4] uppercase md:leading-[1.5]">{person.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default People
