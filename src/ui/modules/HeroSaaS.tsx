import moduleProps from '@/lib/moduleProps'
import { PortableText } from 'next-sanity'
import { ResponsiveImg } from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroSaaS({
  pretitle,
  content,
  assets,
  textWidth = 'normal',
  textPosition = 'top-left',
  ...props
}: Partial<{
  pretitle: string
  content: any
  assets: Sanity.Img[]
  textWidth: 'normal' | 'wide' | undefined
  textPosition: 'top-left' | 'bottom-right' | undefined
}> &
  Sanity.Module) {
  const asset = assets?.[0]

  return (
    <section className="bg-cultured relative" {...moduleProps(props)}>
      <div className="flex h-500 lg:h-auto lg:max-h-960 lg:min-h-500 lg:overflow-hidden">
        {(() => {
          switch (asset?._type) {
            case 'img':
              return (
                <ResponsiveImg
                  img={asset}
                  pictureProps={{
                    className: cn('anim-fade-to-t w-full block [animation-duration:1s]'),
                  }}
                  className="h-full w-full object-cover"
                  width={1440}
                  height={960}
                  draggable={false}
                />
              )
            default:
              return null
          }
        })()}
      </div>
      <div className="lg:absolute lg:inset-0 lg:z-10">
        <div className={cn('fp-container lg:h-full flex flex-col relative z-10 pb-20 md:pb-32 lg:py-32 xl:py-80', textPosition === 'bottom-right' ? 'lg:justify-end lg:items-end' : 'lg:justify-start')}>
          <div className={cn('-mt-128 flex flex-col gap-20 bg-white p-20 md:p-32 lg:mt-0 xl:gap-40 xl:p-60', textWidth === 'wide' ? 'lg:w-620' : 'lg:w-350 xl:w-412')}>
            {pretitle && <h2 className="h2">{pretitle}</h2>}
            {content && (
              <div className="richtext fp-text-body text-balance">
                <PortableText value={content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
