import { Img } from '@/ui/Img'
import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'

export default function TwoColImage({
  value,
}: {
  value: {
    imageLeft: Sanity.Image &
      Partial<{
        caption: string
        source: string
      }>
    imageRight: Sanity.Image &
      Partial<{
        caption: string
        source: string
      }>
    columnLayout: '50-50' | '33-67' | '67-33'
  }
}) {
  const layoutClasses = {
    '50-50': 'md:grid-cols-2',
    '33-67': 'md:grid-cols-[1fr_2fr]',
    '67-33': 'md:grid-cols-[2fr_1fr]',
  }

  const renderImage = (
    image: Sanity.Image &
      Partial<{
        caption: string
        source: string
      }>
  ) => (
    <figure className="relative">
      <Img className="w-full object-cover md:h-full" image={image} width={1000} />

      {image.caption && (
        <figcaption className="text-ink/50 absolute inset-x-0 bottom-0 z-10 bg-white/80 px-4 px-12 py-8 text-sm text-balance italic">
          {image.caption}

          {image.source && (
            <>
              {' ('}
              <a href={image.source} className="link" target="_blank" rel="noopener noreferrer">
                Source
              </a>
              {')'}
            </>
          )}
        </figcaption>
      )}
    </figure>
  )

  return (
    <div className={cn('my-40 grid grid-cols-1 gap-40 md:[grid-column:bleed]!', layoutClasses[stegaClean(value.columnLayout) as keyof typeof layoutClasses])}>
      {renderImage(value.imageLeft)}
      {renderImage(value.imageRight)}
    </div>
  )
}
