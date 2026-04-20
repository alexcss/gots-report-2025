'use client'

import React from 'react'
import { useRef } from 'react'
import { Any, PortableText } from 'next-sanity'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Img } from '@/ui/Img'
import HighlightedList from '@/ui/modules/RichtextModule/HighlightedList'
import Blockquote from '@/ui/modules/RichtextModule/Blockquote'
import Image from '@/ui/modules/RichtextModule/Image'
import HighlightedListTwoColumn from '@/ui/modules/RichtextModule/HighlightedListTwoColumn'
import { PortableTextBlock } from '@portabletext/types'

gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(ScrollTrigger)

interface JourneyProps {
  heading: string
  content?: string
  block1?: BlockContentProps
  block2?: BlockContentProps
  block3?: BlockContentProps
  block4?: BlockContentProps
  block5?: BlockContentProps
  block6?: BlockContentProps
  block7?: BlockContentProps
  endContent?: PortableTextBlock[]
}

interface BlockContentProps {
  content?: PortableTextBlock
  image?: Sanity.Image
  content2?: PortableTextBlock
}

const Journey: React.FC<JourneyProps> = ({ heading, content, block1, block2, block3, block4, block5, block6, block7, endContent }) => {

  const sectionRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const lines = sectionRef.current.querySelectorAll('[data-line]')

      lines.forEach((line) => {
        const offset = line.getAttribute('data-offset') || 50
        const end = line.getAttribute('data-end') || 'bottom'

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${offset}%`,
            end: `bottom ${end}`,
            // markers: true,
            scrub: 1,
          },
        })

        tl.fromTo(
          line,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            ease: 'none',
            duration: 1,
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <>
      <section className="bg-beige overflow-hidden py-40 md:py-80">
        <div className="fp-container">
          <div className="mx-auto w-full max-w-846">
            {(heading || content) && (
              <div className="mb-28 md:mb-64">
                {heading && <h2 className="h1 mb-16 md:mb-40">{heading}</h2>}
                {content && <p className="fp-text-body">{content}</p>}
              </div>
            )}

            <div className="relative z-1 [&>*:last-child]:mb-0" ref={sectionRef}>
              {/* Decor Line Desktop */}
              <svg className="absolute -z-1 hidden lg:top-82 lg:left-58 lg:block" width="739" height="5270" viewBox="0 0 739 5270" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  data-line
                  data-offset="50"
                  d="M495 4C975 28.5295 92.0001 416.913 94.0001 583.714C96.0001 750.514 572 979.455 572 1072.67C572 1165.88 280 1265.63 280 1435.7C280 1605.77 671.19 1971.8 557 2011.33C-421 2349.83 556.667 2292.86 677 2395.62C947 2626.2 4 2706.33 4 2817.53C4 2943.45 549.136 3019.68 549.136 3099.5C549.136 3194.5 29 3148.41 29 3282.5C29 3416.59 735 3568.5 735 3898.5C735 3990.08 85.5718 4217.42 59 4298.5C32.4282 4379.58 529 4459.38 529 4606.5C529 4754.3 138 4949.96 138 5049.71C138 5149.46 615.928 5071.54 642 5151.1C662.857 5214.75 650.691 5253.93 642 5265.57"
                  stroke="#F07059"
                  strokeWidth="8"
                  strokeLinecap="square"
                  strokeDasharray="36 36"
                />
                <path
                  d="M495 4C975 28.5295 92.0001 416.913 94.0001 583.714C96.0001 750.514 572 979.455 572 1072.67C572 1165.88 280 1265.63 280 1435.7C280 1605.77 671.19 1971.8 557 2011.33C-421 2349.83 556.667 2292.86 677 2395.62C947 2626.2 4 2706.33 4 2817.53C4 2943.45 549.136 3019.68 549.136 3099.5C549.136 3194.5 29 3148.41 29 3282.5C29 3416.59 735 3568.5 735 3898.5C735 3990.08 85.5718 4217.42 59 4298.5C32.4282 4379.58 529 4459.38 529 4606.5C529 4754.3 138 4949.96 138 5049.71C138 5149.46 615.928 5071.54 642 5151.1C662.857 5214.75 650.691 5253.93 642 5265.57"
                  stroke="#F3EBE3"
                  strokeWidth="8"
                  strokeLinecap="square"
                  strokeDasharray="24 36"
                />
              </svg>

              {/* Decor Line Mobile */}
              <svg
                className="absolute top-40 left-6/12 -z-1 -translate-x-6/12 lg:hidden"
                width="280"
                height="4056"
                viewBox="0 0 265 3839"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  data-line
                  data-offset="100"
                  data-end="1600px"
                  d="M178.704 1.62109C373.314 18.5642 15.3131 286.83 16.1239 402.043C16.9348 517.256 209.923 675.392 209.923 739.775C209.923 804.159 91.5353 873.061 91.5353 990.533C91.5353 1108.01 250.138 1360.83 203.841 1388.13C-192.676 1621.95 147.709 1690.93 196.497 1761.91C305.965 1921.18 81.4961 1915.91 81.4961 2032.91C81.4961 2347.2 246.496 2461.24 246.496 2662.91C246.496 2726.17 12.7068 2911.93 1.93361 2967.94C-8.83959 3023.94 262.497 3057.3 262.497 3158.91C262.497 3261 33.9632 3417.91 33.9632 3486.81C33.9632 3555.72 93.2448 3601.1 134.496 3638.91C230.496 3726.91 127.02 3828.88 123.496 3836.91"
                  stroke="#F07059"
                  strokeWidth="3.2435"
                  strokeLinecap="square"
                  strokeDasharray="14.6 14.6"
                />
                <path
                  d="M178.704 1.62109C373.314 18.5642 15.3131 286.83 16.1239 402.043C16.9348 517.256 209.923 675.392 209.923 739.775C209.923 804.159 91.5353 873.061 91.5353 990.533C91.5353 1108.01 250.138 1360.83 203.841 1388.13C-192.676 1621.95 147.709 1690.93 196.497 1761.91C305.965 1921.18 81.4961 1915.91 81.4961 2032.91C81.4961 2347.2 246.496 2461.24 246.496 2662.91C246.496 2726.17 12.7068 2911.93 1.93361 2967.94C-8.83959 3023.94 262.497 3057.3 262.497 3158.91C262.497 3261 33.9632 3417.91 33.9632 3486.81C33.9632 3555.72 93.2448 3601.1 134.496 3638.91C230.496 3726.91 127.02 3828.88 123.496 3836.91"
                  stroke="#F3EBE3"
                  strokeWidth="3.2435"
                  strokeLinecap="square"
                  strokeDasharray="10 14.6"
                />
              </svg>

              {/* Block 1 */}
              {block1?.content && (
                <div className="mb-24 lg:mb-58">
                  <div className="bg-white p-16 md:p-24 lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block1.content} />
                    </div>
                  </div>
                  {block1?.image && (
                    <div className="relative flex justify-center lg:justify-end">
                      <Img image={block1.image} alt={block1?.image?.alt} className="-mt-10 block max-w-11/12 lg:-mt-96 lg:-mr-30 lg:max-w-full lg:min-w-775" width="775" />
                    </div>
                  )}
                </div>
              )}

              {/* Block 2 */}
              {block2?.content && block2?.content2 && (
                <div className="mb-24 lg:mb-116">
                  <div className="bg-white p-16 md:p-24 lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block2.content} />
                    </div>
                  </div>
                  {block2?.image && (
                    <div className="relative">
                      <Img image={block2.image} alt={block2?.image?.alt} className="-mt-10 mb-10 block lg:-mt-92 lg:mb-0 lg:-ml-22 lg:min-w-912" width="912" />
                    </div>
                  )}
                  <div className="bg-white p-16 md:p-24 lg:-mt-290 lg:ml-auto lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block2.content2} />
                    </div>
                  </div>
                </div>
              )}

              {/* Block 3 */}
              {block3?.content && block3?.content2 && (
                <div className="mb-24 lg:mb-76">
                  <div className="bg-white p-16 md:p-24 lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block3.content} />
                    </div>
                  </div>
                  {block3?.image && (
                    <div>
                      <Img image={block3.image} alt={block3?.image?.alt} className="-mt-10 mb-20 block lg:-mt-304 lg:mb-0 lg:-ml-30 lg:min-w-947" width="947" />
                    </div>
                  )}
                  <div className="bg-white p-16 md:p-24 lg:-mt-252 lg:ml-auto lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block3.content2} />
                    </div>
                  </div>
                </div>
              )}

              {/* Block 4 */}
              {block4?.content && (
                <div className="mb-24 lg:mb-58">
                  <div className="bg-white p-16 md:p-24 lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block4.content} />
                    </div>
                  </div>
                  {block4?.image && (
                    <div className="relative flex justify-center lg:justify-end">
                      <Img
                        image={block4.image}
                        alt={block4?.image?.alt}
                        className="mt-20 ml-46 block max-w-6/12 lg:-mt-193 lg:-mr-60 lg:ml-0 lg:max-w-full lg:min-w-365 xl:-mr-125"
                        width="365"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Block 5 */}
              {block5?.content && block5?.content2 && (
                <div className="mb-24 lg:mb-166">
                  <div className="bg-white p-16 md:p-24 lg:ml-auto lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block5.content} />
                    </div>
                  </div>
                  {block5?.image && (
                    <div className="relative">
                      <Img image={block5.image} alt={block5.image?.alt} className="-mt-10 mb-20 block lg:-mt-18 lg:mb-0 lg:-ml-40 lg:min-w-900" width="900" />
                    </div>
                  )}
                  <div className="bg-white p-16 md:p-24 lg:-mt-340 lg:ml-auto lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block5.content2} />
                    </div>
                  </div>
                </div>
              )}

              {/* Block 6 */}
              {block6?.content && (
                <div className="mb-24 lg:mb-60">
                  <div className="bg-white p-16 md:p-24 lg:max-w-564 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block6.content} />
                    </div>
                  </div>
                  {block6?.image && (
                    <div className="relative -mt-10 lg:-mt-260 lg:-ml-18">
                      <Img image={block6.image} alt={block6.image?.alt} className="block max-w-full lg:min-w-933" width="912" />
                    </div>
                  )}
                </div>
              )}

              {/* Block 7 */}
              {block7?.content && (
                <div className="mb-24 lg:mb-68">
                  <div className="bg-white p-16 md:p-24 lg:max-w-806 lg:p-40">
                    <div className="richtext card fp-text-body2 lg:-tracking-1 leading-[1.4] text-balance lg:leading-[1.5]">
                      <PortableText value={block7.content} />
                    </div>
                  </div>
                </div>
              )}

              {/* ContentEnd 7 */}
              {endContent && (
                <PortableText
                  value={endContent}
                  components={{
                    types: {
                      highlightedListTwoColumn: HighlightedListTwoColumn,
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Journey
