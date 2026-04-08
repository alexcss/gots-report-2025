import { type FC, Fragment } from 'react'
import { PortableText } from '@portabletext/react'
import { Img } from '@/ui/Img'
import moduleProps from '@/lib/moduleProps'
import { Any } from 'next-sanity'

interface FounderType {
  image?: Sanity.Image
  name: string
  role?: string
  sign?: Sanity.Image
  _key: string
}

interface FoundersProps {
  content: Any[]
  founders: FounderType[]
}

const Founders: FC<FoundersProps> = ({ content, founders, ...props }) => {
  return (
    <section className="bg-white px-4 py-12" {...moduleProps(props)}>
      <div className="fp-container py-40 lg:py-80">
        {content && (
          <div className="fp-row">
            <div className="fp-row-container richtext text-balanc">
              <PortableText value={content} />
            </div>
          </div>
        )}

        <div className="border-bright-gray mt-16 grid grid-cols-2 gap-8 border-t pt-16 md:mt-40 md:pt-40 lg:mt-80 lg:grid-cols-11 lg:gap-0 lg:pt-80">
          {founders?.map((founder, index) => (
            <Fragment key={founder._key}>
              {index === 1 && (
                <div className="hidden items-center justify-center py-10 lg:col-span-[1] lg:flex">
                  <div className="bg-bright-gray h-full w-1"></div>
                </div>
              )}
              <div className="flex flex-col items-center text-center lg:col-span-5 lg:flex-row lg:gap-32 lg:text-left">
                {founder?.image && (
                  <div className="relative mb-16 shrink-0 lg:mb-0">
                    <Img
                      image={founder.image}
                      alt={founder.name}
                      className="block aspect-square h-120 w-120 rounded-full object-cover xl:h-220 xl:w-220"
                      height="220"
                      width="220"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex flex-col items-center justify-center gap-6 lg:items-start xl:gap-12">
                    <h3 className="h4 xl:h3">{founder.name}</h3>
                    <p className="text-14 xl:text-20 leading-[1.4] font-bold">{founder.role}</p>
                  </div>
                  {founder?.sign && (
                    <div className="relative h-70 w-70 xl:h-120 xl:w-120">
                      <Img image={founder.sign} alt={`${founder.name}'s signature`} width="120" height="120" className="object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Founders
