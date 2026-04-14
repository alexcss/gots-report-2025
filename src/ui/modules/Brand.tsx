import { type FC } from 'react'
import { PortableText } from '@portabletext/react'
import { ResponsiveImg } from '@/ui/Img'
import { cn } from '@/lib/utils'
import moduleProps from '@/lib/moduleProps'
import { Any } from 'next-sanity'
import HighlightedList from '@/ui/modules/RichtextModule/HighlightedList'
import Blockquote from '@/ui/modules/RichtextModule/Blockquote'
import Image from '@/ui/modules/RichtextModule/Image'

interface BrandProps {
  title?: string
  content: Any[]
  assets: Sanity.Img[]
  imagePosition?: 'left' | 'right'
  imageFill?: boolean
}

const Brand: FC<BrandProps> = ({ title, content, assets, imagePosition = 'right', imageFill = false, ...props }) => {
  const hasImage = !!assets?.[0]
  const asset = assets?.[0]

  return (
    <section
      className={cn(
        'to-cultured from-50% to-50%',
        imageFill ? 'from-cultured bg-cultured overflow-hidden' : 'bg-white from-white',
        imagePosition === 'left' ? 'lg:bg-gradient-to-l' : 'lg:bg-gradient-to-r'
      )}
      {...moduleProps(props)}
    >
      <div className="fp-container">
        <div className={cn('grid grid-cols-1 lg:grid-cols-2', imagePosition === 'left' && 'lg:flex-row-reverse')}>
          {/* Text Content */}
          <div
            className={cn(
              'order-1 py-40 lg:py-80',
              imageFill ? 'bg-cultured' : 'bg-white',
              imagePosition === 'left' ? 'lg:order-2 lg:pl-40 xl:pl-80' : 'lg:order-1 lg:pr-40 xl:pr-80'
            )}
          >
            {title && <h2 className="h2 mb-20 md:mb-40">{title}</h2>}
            {content && (
              <div className="richtext">
                <PortableText
                  value={content}
                  components={{
                    types: {
                      highlightedList: HighlightedList,
                      blockquote: Blockquote,
                      image: Image,
                    },
                  }}
                />
              </div>
            )}
          </div>
          {/* Image Column */}
          {hasImage && (
            <div
              className={cn(
                'bg-cultured relative order-2 -mx-16 px-16 md:-mx-32 md:px-32 lg:mx-0',
                imagePosition === 'left' ? 'lg:order-1 lg:pr-40 lg:pl-0 xl:pr-80' : 'lg:order-2 lg:pr-0 lg:pl-40 xl:pl-80',
                imageFill && 'relative lg:!p-0'
              )}
            >
              <div
                className={cn(
                  'flex',
                  imageFill && imagePosition === 'left' ? 'lg:right-0' : 'lg:left-0',
                  imageFill
                    ? '-mx-16 items-stretch py-0 md:-mx-32 lg:absolute lg:top-0 lg:mx-0 lg:h-full lg:w-[50vw]'
                    : 'w-full items-center py-16 md:py-40 lg:sticky lg:top-0 lg:h-auto lg:min-h-screen lg:py-80'
                )}
              >
                <ResponsiveImg
                  img={asset}
                  className={cn('h-full', imageFill ? 'object-cover lg:w-full lg:max-w-none' : 'w-full object-contain')}
                  pictureProps={{ className: 'w-full block' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Brand
