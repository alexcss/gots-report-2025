//@refresh reset

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ResponsiveImg } from '@/ui/Img'
import moduleProps from '@/lib/moduleProps'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PortableText } from 'next-sanity'

gsap.registerPlugin(ScrollTrigger)

interface MainStatisticType {
  number: string
  label: string
  description?: string
  growthPercentage?: string
  currentYear?: string
  previousYear?: string
}

interface GlobalPresenceType {
  countries: MetricType
  certificationBodies: MetricType
}

interface MetricType {
  value: string
  label: string
  description?: string
}

interface ImpactMetricsType {
  title?: string
  description?: any
  stats?: StatsType[]
}

interface StatsType {
  period?: string
  value?: string
  unit?: string
  metric?: string
}

interface FeatureType {
  _key: string
  icon?: Sanity.Img
  title: string
  description: string
}

interface HighlightsProps {
  title?: string
  year?: string
  mainStatistic?: MainStatisticType
  globalPresence?: GlobalPresenceType
  impactMetrics?: ImpactMetricsType
  features?: FeatureType[]
}

const Highlights = ({ title, year, mainStatistic, globalPresence, impactMetrics, features = [], ...props }: HighlightsProps) => {
  if (!mainStatistic && features.length === 0) return null

  // Refs for the elements we want to animate
  const introSectionRef = useRef<HTMLDivElement>(null)
  const statNumberRef = useRef<HTMLDivElement>(null)
  const prevYearBarRef = useRef<HTMLDivElement>(null)

  // Set up animations when component mounts
  useGSAP(
    () => {
      if (!mainStatistic) return

      // Counter animation for the main statistic number
      if (statNumberRef.current) {
        const finalValue = parseInt(mainStatistic.number.replace(/[^0-9]/g, ''))
        const increment = 10
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-stat-main]',
            start: 'top 70%',
            // markers: true,
          },
        })
        tl.to('[data-stat-main]', {
          innerText: finalValue,
          duration: 1,
          ease: 'power3.inOut',
          snap: { innerText: 1 },
          modifiers: {
            innerText: function (innerText) {
              return (
                gsap.utils
                  .snap(increment, innerText)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              )
            },
          },
        })
        tl.from(['[data-stat-main]', '[data-stat-main-label]'], { opacity: 0, duration: 0.2, clearProps: 'all' }, '<+0.1')

      }

      // Years bars height animation
      if (prevYearBarRef.current) {
        const tlYears = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-years-wrap]',
            start: 'top 25%',
            // markers: true,
          },

        })
        tlYears
          .from('[data-year-prev-bar]', {
            height: 0,
            duration: 1,
            ease: 'power3.out',
          })
          .from('[data-year-prev-label]', { opacity: 0, duration: 0.2 }, '<+0.1')
          .from(
            '[data-year-next-bar]',
            {
              height: 0,
              duration: 1,
              ease: 'power3.out',
            },
            '<'
          )
          .from('[data-year-next-label]', { opacity: 0, duration: 0.2 }, '<+0.1')
      }

      //Countries number animation
      const tlCountries = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-countries-num]',
          start: 'top 65%',
          // markers: true,
        },
      })
      tlCountries
        .fromTo(
          '[data-countries-num]',
          {
            innerText: 0,
          },
          {
            innerText: globalPresence?.countries?.value || 0,
            duration: 1,
            ease: 'power3.inOut',
            snap: { innerText: 1 },
          }
        )
        .from(
          ['[data-countries-num], [data-countries-label]'],
          {
            opacity: 0,
            duration: 0.2,
            clearProps: 'all',
          },
          '<0.1'
        )

      //Bodies number animation
      const tlBodies = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-bodies-num]',
          start: 'top 65%',
          // markers: true,
        },
      })
      tlBodies
        .fromTo(
          '[data-bodies-num]',
          {
            innerText: 0,
          },
          {
            innerText: globalPresence?.certificationBodies?.value || 0,
            duration: 1,
            ease: 'power3.inOut',
            snap: { innerText: 1 },
          }
        )
        .from(
          ['[data-bodies-num], [data-bodies-label]'],
          {
            opacity: 0,
            duration: 0.2,
            clearProps: 'all',
          },
          '<0.1'
        )
    },
    { scope: introSectionRef }
  )

  const sectionRef = useRef<HTMLElement>(null)
  const [vH, setVH] = useState('100svh')

  const hasCountries =
    globalPresence?.countries?.value ||
    globalPresence?.countries?.label

  const hasCertificationBodies =
    globalPresence?.certificationBodies?.value ||
    globalPresence?.certificationBodies?.label

  const hasGlobalPresence =
    hasCountries || hasCertificationBodies

  const impactStats = impactMetrics?.stats ?? []
  const hasImpactMetricsContent = Boolean(
    impactMetrics?.title || impactMetrics?.description || impactStats.length > 0
  )

  useEffect(() => {
    if (!window) return
    if (sectionRef?.current) {
      setVH(sectionRef.current.offsetHeight + 'px')
    }
  })

  return (
    <div className="bg-white" {...moduleProps(props)} ref={introSectionRef} style={{ '--vh': vH } as React.CSSProperties}>
      {/* Header with title and year */}
      {title && (
        <div className="fp-container py-20 md:py-40">
          <h2 className="h2">{title}</h2>
        </div>
      )}

      {/* Main statistic section */}
      {mainStatistic && (
        <section className="border-accent relative flex min-h-(--vh) border-t-10 pt-80 md:h-lvh md:min-h-600 md:pt-80" ref={sectionRef}>
          <div className="fp-container flex w-full items-stretch justify-between gap-24">
            <div className="relative flex flex-1 flex-col justify-end md:justify-between">
              <div className="absolute top-0 left-0 flex w-[90vw] flex-col gap-16 md:static md:w-auto md:gap-20">
                <div ref={statNumberRef} data-stat-main className="text-accent fp-text-hero">
                  0
                </div>
                {mainStatistic.label && (
                  <div data-stat-main-label className="text-accent h3">
                    {mainStatistic.label}
                  </div>
                )}
              </div>

              {mainStatistic.description && (
                <div className="flex h-[50lvh] items-center py-40 pr-16 md:block md:h-auto md:py-80">
                  <p className="h4 whitespace-pre-wrap">{mainStatistic.description}</p>
                </div>
              )}
            </div>

            {/* Right side - Description and chart */}
            <div className="flex flex-col items-end justify-end" data-years-wrap>
              {(mainStatistic.growthPercentage) && (
                <div className="flex items-end gap-2 md:gap-12">
                  {/* Previous year bar */}
                  <div className="relative flex flex-col items-center">
                    <div data-year-prev-bar ref={prevYearBarRef} className="bg-lime h-[50lvh] w-30 rounded-t-[2px] md:h-[70lvh] md:w-90"></div>
                    {mainStatistic.previousYear && (
                      <div
                        data-year-prev-label
                        className="text-14 md:text-32 md:tracking-1 absolute right-0 bottom-0 left-0 z-10 flex items-center pb-16 leading-[1.3] font-bold tracking-normal text-white [writing-mode:sideways-lr] md:pb-40 md:font-normal"
                      >
                        {mainStatistic.previousYear}
                      </div>
                    )}
                  </div>

                  {/* Current year bar */}
                  <div className="relative flex flex-col items-center gap-8 md:gap-12">
                    {mainStatistic.growthPercentage && (
                      <div data-year-next-growth className="text-18 md:text-32 text-accent md:tracking-1 leading-[1.4] font-bold md:leading-[1.3]">
                        {mainStatistic.growthPercentage}
                      </div>
                    )}
                    <div data-year-next-bar className="bg-accent relative h-[52lvh] w-30 rounded-t-[2px] md:h-[74lvh] md:w-90">
                      <div className="h-[2lvh] w-full rotate-y-180 bg-[url(/assets/pattern-lines.png)] bg-size-[8px] md:h-[4lvh]" />
                    </div>
                    {mainStatistic.currentYear && (
                      <div
                        data-year-next-label
                        className="text-14 md:text-32 md:tracking-1 absolute right-0 bottom-0 left-0 z-10 flex items-center pb-16 leading-[1.3] font-bold tracking-normal text-white [writing-mode:sideways-lr] md:pb-40 md:font-normal"
                      >
                        {mainStatistic.currentYear}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="text-spanish-gray lg:hover:text-accent pointer-events-none absolute right-1/2 bottom-0 z-20 flex h-80 w-80 translate-x-1/2 items-center justify-center xl:h-80 xl:w-80"
            aria-label="Scroll down"
          >
            <svg className="animate-bounce [animation-duration:2s]" width="12" height="41" viewBox="0 0 12 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.47 40.53c.3.3.77.3 1.06 0l4.77-4.77a.75.75 0 0 0-1.06-1.06L6 38.94 1.76 34.7A.75.75 0 1 0 .7 35.76l4.77 4.77ZM5.25 0v40h1.5V0h-1.5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </section>
      )}

      {hasGlobalPresence && (
        <section className="border-accent relative flex min-h-(--vh) border-t-10 py-40 md:h-lvh md:min-h-600 md:py-80">
          <div className="fp-container flex w-full flex-col items-stretch gap-40 md:flex-row lg:gap-40">
            {/* col 1*/}
            {hasCountries && (
              <div className="relative flex flex-col gap-20 md:flex-1 md:gap-64 md:pr-20 xl:pr-80">
                <div className="flex flex-col gap-16 md:gap-20">
                  {globalPresence?.countries?.value && (
                    <div data-countries-num className="text-accent fp-text-hero">
                      {globalPresence?.countries?.value}
                    </div>
                  )}
                  {globalPresence?.countries?.label && (
                    <p data-countries-label className="text-accent h3">
                      {globalPresence?.countries?.label}
                    </p>
                  )}
                </div>
                {globalPresence?.countries?.description && (
                  <>
                    <div data-countries-label className="bg-bright-gray h-1 w-full"></div>
                    <p data-countries-label className="h4 whitespace-pre-wrap">
                      {globalPresence?.countries?.description}
                    </p>
                  </>
                )}
              </div>
            )}
            {/* col 2*/}
            {hasCertificationBodies && (
              <div className="relative flex flex-col gap-20 md:flex-1 md:gap-64 md:self-end md:pl-20 xl:pl-80">
                <div className="flex flex-col gap-16 md:gap-20">
                  {globalPresence?.certificationBodies?.value && (
                    <div data-bodies-num className="text-accent fp-text-hero">
                      {globalPresence.certificationBodies.value}
                    </div>
                  )}
                  {globalPresence?.certificationBodies?.label && (
                    <p data-bodies-label className="text-accent h3">
                      {globalPresence.certificationBodies.label}
                    </p>
                  )}
                </div>
                {globalPresence?.certificationBodies?.description && (
                  <>
                    <div data-bodies-label className="bg-bright-gray h-1 w-full"></div>
                    <p data-bodies-label className="h4 whitespace-pre-wrap">
                      {globalPresence.certificationBodies.description}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            className="text-spanish-gray lg:hover:text-accent pointer-events-none absolute right-1/2 bottom-0 z-20 flex h-80 w-80 translate-x-1/2 items-center justify-center xl:h-80 xl:w-80"
            aria-label="Scroll down"
          >
            <svg className="animate-bounce [animation-duration:2s]" width="12" height="41" viewBox="0 0 12 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.47 40.53c.3.3.77.3 1.06 0l4.77-4.77a.75.75 0 0 0-1.06-1.06L6 38.94 1.76 34.7A.75.75 0 1 0 .7 35.76l4.77 4.77ZM5.25 0v40h1.5V0h-1.5Z" fill="currentColor" />
            </svg>
          </button>
        </section>
      )}

      {hasImpactMetricsContent && (
        <section className="relative">
          <div className="fp-container flex w-full flex-col items-stretch gap-40 md:flex-row lg:gap-40">
            {/* col 1 */}
            {(impactMetrics?.title || impactMetrics?.description) && (
              <div className="sticky top-0 z-10 flex shrink-0 flex-col gap-20 bg-gradient-to-b from-white from-80% to-transparent to-100% pb-40 md:relative md:w-1/2 md:flex-1 md:gap-64 md:bg-transparent md:pr-20 md:pb-0 xl:pr-80">
                <div className="top-0 flex flex-col gap-16 py-40 md:sticky md:gap-20 md:py-80">

                  {impactMetrics.title && (
                    <h3 className="h1">{impactMetrics.title}</h3>
                  )}

                  {impactMetrics.description && (
                    <div className="h5 max-w-478 whitespace-pre-wrap normal-case">
                      <PortableText value={impactMetrics.description} />
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* col 2 */}
            {impactStats?.length > 0 && (
              <div className="flex min-h-[calc(3_*_var(--vh))] flex-1 shrink-0 flex-col max-md:gap-40 md:min-h-[400lvh] md:w-1/2">

                {impactStats.map((stat, index) => (
                  <div
                    key={index}
                    className="relative flex flex-1 flex-col gap-20 py-0 md:flex-1 md:justify-end md:gap-64 md:py-80 md:pl-20 xl:pl-80"
                  >
                    <div className="flex flex-col gap-16 md:gap-20">

                      {/* period */}
                      {stat?.period && (
                        <p className="h2 text-spanish-gray">
                          {stat.period}
                        </p>
                      )}

                      {/* value + unit */}
                      {stat?.value && (
                        <div className="text-accent fp-text-hero">
                          {stat.value}
                          {stat.unit && (
                            <small className="text-[0.6em] uppercase">
                              {stat.unit}
                            </small>
                          )}
                        </div>
                      )}
                      {/* metric */}
                      {stat?.metric && (
                        <p className="text-accent h3">
                          {stat.metric}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* divider + scroll button */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-between">
            <div className="border-accent sticky top-0 mb-200 w-full border-t-10 md:mb-350"></div>

            <button
              className="text-spanish-gray lg:hover:text-accent pointer-events-none sticky bottom-0 z-20 mt-[70vh] flex h-80 w-80 items-center justify-center xl:h-80 xl:w-80"
              aria-label="Scroll down"
            >
              <svg className="animate-bounce [animation-duration:2s]" width="12" height="41" viewBox="0 0 12 41" fill="none">
                <path
                  d="M5.47 40.53c.3.3.77.3 1.06 0l4.77-4.77a.75.75 0 0 0-1.06-1.06L6 38.94 1.76 34.7A.75.75 0 1 0 .7 35.76l4.77 4.77ZM5.25 0v40h1.5V0h-1.5Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* Feature boxes */}
      {features.length > 0 && (
        <div className="fp-container">
          <div className="grid grid-cols-1 gap-20 pt-40 pb-20 md:grid-cols-2 md:py-80">
            {features.map((feature) => (
              <div key={feature._key} className="border-accent flex flex-col gap-20 border border-dashed p-16 md:gap-40 md:p-20 xl:p-40">
                {feature.icon && <ResponsiveImg img={feature.icon} width={80} height={80} className="h-60 w-auto object-contain md:h-80" />}
                <div className="flex flex-col gap-16 md:gap-20">
                  <h3 className="fp-text-name">{feature.title}</h3>
                  <p className="h5 normal-case">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Highlights
