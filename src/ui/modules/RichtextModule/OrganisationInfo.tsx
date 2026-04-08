import React from 'react'
import { ResponsiveImg } from '@/ui/Img'

interface OrganisationInfoItem {
  _key: string
  icon: Sanity.Img
  title: string
  subtitle?: string
  label?: string
}

interface OrganisationInfoProps {
  value: {
    items: OrganisationInfoItem[]
  }
}

const OrganisationInfo = ({ value }: OrganisationInfoProps) => {
  const { items } = value

  return (
    items &&
    items.length > 0 && (
      <div className="my-20 md:my-40">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._key} className="border-accent flex flex-col justify-between gap-20 border-1 border-dashed px-20 py-16 md:gap-40 md:px-40 md:py-30">
              {item.icon && <ResponsiveImg img={item.icon} width="60" height="60" className="h-60 w-60 object-contain" />}
              <div className="mt-auto flex flex-col gap-6 md:gap-12">
                <div className="flex flex-col">
                  {item.subtitle && <p className="fp-text-body">{item.subtitle}</p>}
                  {item.label && <p className="fp-text-number text-accent">{item.label}</p>}
                </div>
                {item.title && <p className="h5 normal-case">{item.title}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default OrganisationInfo
