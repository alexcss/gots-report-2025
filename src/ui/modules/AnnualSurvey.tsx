// @refresh reset

'use client'

import { type FC, useRef } from 'react'
import moduleProps from '@/lib/moduleProps'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(ScrollTrigger)

interface SurveyItem {
  text: string
  value: number
}

interface AnnualSurveyProps {
  title?: string
  items: SurveyItem[]
}

const RadialProgress: FC<{ value: number }> = ({ value }) => {
	const ref = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ref.current,
				start: 'top 70%',
				// markers: true,
			},
		})
		tl
			.fromTo('[data-progress]', { drawSVG: '0%' }, { drawSVG: `${value}%`, duration: 1, ease: 'power3.inOut' })
			.fromTo(
				'[data-value]',
				{
					innerText: 0,
				},
				{
					innerText: value,
					duration: 1,
					ease: 'power3.inOut',
					snap: { innerText: 1 },
				},
				'<',
			)
			.from(
				'[data-value-wrap]', { opacity: 0, duration: 0.2 }, '<+0.05',
			)

	}, { scope: ref })
  return (
		<div className="relative h-220 w-220" ref={ref}>
      <svg className="h-220 w-220 -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle className="stroke-bright-gray" strokeWidth="7" fill="transparent" r="46" cx="50" cy="50" />
        {/* Progress circle */}
        <circle
					data-progress
          stroke="#3F9C35"
          strokeWidth="7"
          strokeLinecap="square"
          fill="transparent"
          r="46"
          cx="50"
          cy="50"
        />
      </svg>
      {/* Percentage text */}
			<div className="absolute inset-0 flex items-center justify-center pt-12" data-value-wrap>
        <span className="text-accent text-38 tracking-1 leading-[1.3]">
          <span className="text-64 leading-[1.1]" data-value>{value}</span>%
        </span>
      </div>
    </div>
  )
}

const AnnualSurvey: FC<AnnualSurveyProps> = ({ title, items, ...props }) => {
  return (
    <section className="bg-cultured py-40 md:py-80" {...moduleProps(props)}>
      <div className="fp-container">
        {title && <h2 className="h2 mb-20 md:mb-40">{title}</h2>}
				<div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:grid-cols-3">
          {items?.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-20 bg-white p-20 md:gap-40 md:p-40 md:pb-60">
              <RadialProgress value={item.value} />
              {item.text && <p className="fp-text-body">{item.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnnualSurvey
