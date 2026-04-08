import { Img } from '@/ui/Img'
import { stegaClean } from 'next-sanity'

export default function Image({
  value,
}: {
  value: Sanity.Image &
    Partial<{
      caption: string
      source: string
      float: 'left' | 'right'
    }>
}) {
  return (
    <figure className="my-40 space-y-2 text-center md:[grid-column:bleed]!" style={{ float: stegaClean(value.float) }}>
      <Img className="mx-auto max-h-svh w-full object-cover text-[0px]" image={value} width={1500} />

      {value.caption && (
        <figcaption className="text-ink/50 px-4 text-sm text-balance italic">
          {value.caption}

          {value.source && (
            <>
              {' ('}
              <a href={value.source} className="image-source link">
                Source
              </a>
              {')'}
            </>
          )}
        </figcaption>
      )}
    </figure>
  )
}
