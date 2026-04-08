import React from 'react'

export default function Blockquote({
  value,
}: {
  value: Partial<{
    text: string
    cite?: string
  }>
}) {
  if (!value) return null

  const { text, cite } = value

  return (
    text && (
      <figure className="my-20 md:my-40">
        <blockquote className="!m-0 block !border-0 !p-0">
          <svg className="mb-24" width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.9636 0.253906L0 23.3867V43.2665H22.4096V22.1822H13.8551L22.4096 0.253906H10.9635H10.9636ZM38.554 0.253906L27.5904 23.3867V43.2665H50V22.1822H41.4455L50 0.253906H38.5538H38.554Z"
              style={{ fill: 'var(--color-blockquote-icon)' }}
            />
          </svg>

          <p className="text-20/[1.3] md:text-24 text-accent font-bold uppercase">{text}</p>
        </blockquote>
        {cite && <figcaption className="text-16/[1.5] md:-tracking-1 mt-20 font-bold text-(--color-blockquote-secondary)">{cite}</figcaption>}
      </figure>
    )
  )
}
