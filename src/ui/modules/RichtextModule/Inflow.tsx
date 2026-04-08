import React from 'react'

interface InflowItem {
  _key: string
  title: string
  text?: string
  value: string
}

interface InflowBlockProps {
  value: {
    title: string
    items: InflowItem[]
    total: {
      label: string
      value: string
    }
  }
}

const Inflow = ({ value }: InflowBlockProps) => {
  const { title, total, items } = value

  return (
    <div className="my-40 flex flex-col gap-24 md:my-80 md:gap-40">
      {title && <h3 className="h2 !m-0">{title}</h3>}
      {items && items.length > 0 && (
        <div className="[&>:first-child]:pt-0">
          {items.map((item) => (
            <div key={item._key} className="flex flex-col items-start justify-between gap-6 border-b border-gray-200 py-16 last:border-0 md:flex-row md:items-center md:py-24">
              <div className="flex flex-1 flex-col gap-8 md:gap-6">
                <p className="h5 normal-case">{item.title}</p>
                {item.text && <p className="text-spanish-gray fp-text-body2">{item.text}</p>}
              </div>
              <div className="fp-text-body-accent whitespace-nowrap">{item.value}</div>
            </div>
          ))}
          {total && (
            <div className="text-accent flex flex-col items-start justify-between gap-12 py-16 md:flex-row md:items-center md:gap-6 md:py-24">
              <div className="h4">{total.label}</div>
              <div className="h3">{total.value}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Inflow
