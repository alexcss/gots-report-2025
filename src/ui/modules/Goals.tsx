'use client'

import { useCallback, useState, useEffect, useRef } from 'react'
import { ResponsiveImg } from '@/ui/Img'
import Container from '@/ui/Container'

import Content from '@/ui/modules/RichtextModule/Content'
import { Any } from 'next-sanity'
import moduleProps from '@/lib/moduleProps'

interface GoalItem {
  _key: string
  text: string
  image: Sanity.Img
  bgColor: string
}

interface GoalsModuleProps {
  title?: string
  richText?: Any
  items: GoalItem[]
}

export default function Goals({ title, richText, items, ...props }: GoalsModuleProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const cardsRef = useRef<Map<string, HTMLDivElement>>(new Map())

  const handleCardClick = useCallback((key: string) => {
    setActiveCard((current) => (current === key ? null : key))
  }, [])

  useEffect(() => {
    // Only add event listener if there's an active card
    if (activeCard) {
      const handleClickOutside = (event: MouseEvent) => {
        // Check if the click was outside the active card
        const activeCardElement = cardsRef.current.get(activeCard)
        if (activeCardElement && !activeCardElement.contains(event.target as Node)) {
          setActiveCard(null)
        }
      }

      // Add event listener to detect clicks outside
      document.addEventListener('mousedown', handleClickOutside)

      // Cleanup function to remove the event listener
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [activeCard])

  const setCardRef = useCallback((element: HTMLDivElement | null, key: string) => {
    if (element) {
      cardsRef.current.set(key, element)
    } else {
      cardsRef.current.delete(key)
    }
  }, [])

  return (
    <section className="bg-cultured py-40 md:py-80" {...moduleProps(props)}>
      <Container>
        <div className="flex flex-col gap-20">
          {title && <h2 className="h3">{title}</h2>}
          {richText && <Content value={richText} />}
        </div>

        {items.length > 0 && (
          <div className="-mx-16 -mb-40 overflow-x-auto overflow-y-hidden px-16 py-40 md:m-0 md:overflow-visible md:px-0">
            <div className="flex w-fit grid-cols-1 gap-6 md:grid md:w-auto md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item._key}
                  className="relative aspect-[278/352] w-[278px] shrink-0 cursor-pointer [perspective:1000px] md:w-auto"
                  onClick={() => handleCardClick(item._key)}
                  ref={(el) => setCardRef(el, item._key)}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-600 [transform-style:preserve-3d] ${activeCard === item._key ? '[transform:rotateY(180deg)]' : ''}`}
                  >
                    {/* Front face */}
                    <div
                      className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden [backface-visibility:hidden]"
                      style={{ backgroundColor: `#${item.bgColor}` }}
                    >
                      <ResponsiveImg
                        pictureProps={{ className: 'flex h-full w-full items-center justify-center' }}
                        img={item.image}
                        width={300}
                        height={300}
                        className="aspect-square h-auto max-h-full w-full max-w-full object-contain"
                      />
                    </div>

                    {/* Back face */}
                    <div
                      className="absolute inset-0 z-10 flex [transform:rotateY(180deg)] overflow-hidden p-8 [backface-visibility:hidden]"
                      style={{ backgroundColor: `#${item.bgColor}` }}
                    >
                      <div className="text-jet fp-text-body2 flex min-h-0 items-center justify-center overflow-hidden bg-white p-12">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        )}
      </Container>
    </section>
  )
}
