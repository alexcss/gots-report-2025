import { type FC } from 'react'
import { cn } from '@/lib/utils'
import { Any } from 'next-sanity'
import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import Content from '@/ui/modules/RichtextModule/Content'

interface CertificationStep {
  _key: string
  title: string
  content?: Any[]
}

interface GetCertifiedProps {
  title?: string
  backgroundImage?: Sanity.Img
  items: CertificationStep[]
}

const GetCertified: FC<GetCertifiedProps> = ({ title, items, backgroundImage, ...props }) => {
  return (
    <section className="md:bg-cultured relative overflow-hidden bg-white py-40 md:py-80" {...moduleProps(props)}>
      <div className="fp-container relative z-10">
        <div className="fp-row">
          <div className="fp-row-container bg-white md:p-40 xl:p-80">
            {title && <h2 className="h3 mb-20 md:mb-40">{title}</h2>}

            <ol className="relative">
              {items.map((item, index) => (
                <li
                  key={item._key}
                  className={cn(
                    'relative pl-56 md:pl-64',
                    // Add bottom spacing to all except the last item
                    index !== items.length - 1 && 'pb-20 md:pb-40'
                  )}
                >
                  {/* Numbered circle marker */}
                  <div className="bg-accent fp-text-body-accent absolute top-0 left-0 z-10 flex h-40 w-40 items-center justify-center rounded-full text-white">{index + 1}</div>

                  {/* Connecting dashed line */}
                  {index !== items.length - 1 && <div className="border-accent absolute top-12 bottom-0 left-19 z-0 w-0 border-l-2 border-dashed"></div>}

                  {/* Content */}
                  <div>
                    {item.title && <h3 className="h3 md:h4 mb-12 flex min-h-40 items-center md:mb-20">{item.title}</h3>}
                    {item.content && <Content value={item.content} />}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      {/* Background Image */}
      {!!backgroundImage && (
        <ResponsiveImg
          img={backgroundImage}
          width="1920"
					height="2200"
          className="h-full w-full object-cover object-center"
          pictureProps={{ className: 'absolute inset-0 z-0 h-full w-full hidden md:block' }}
        />
      )}
    </section>
  )
}

export default GetCertified
