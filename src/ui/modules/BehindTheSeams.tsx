// @refresh reset

'use client'

import React from 'react'
import { useRef } from 'react'
import Container from '@/ui/Container'
import moduleProps from '@/lib/moduleProps'
import Content from '@/ui/modules/RichtextModule/Content'
import { Any } from 'next-sanity'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(ScrollTrigger)

interface BehindTheSeamsProps {
  heading: string
  content?: Any
  btsButton: {
    text?: string
    url?: string
  }
  campaignDates: {
    title: string
    date: string
  }
  contactEmail: string
  ctaButton: {
    text?: string
    url?: string
  }
}

const BehindTheSeams: React.FC<BehindTheSeamsProps> = ({ heading, content, btsButton, campaignDates, contactEmail, ctaButton, ...props }) => {
	const sectionRef = useRef<HTMLElement>(null)
	const sectionDateRef = useRef<HTMLElement>(null)
	const introRef = useRef<HTMLElement>(null)

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: introRef.current,
				start: 'top 70%',
				// markers: true,
			},
		})
		tl
			.from('[data-bts-logo]', { y: '60vh', duration: 0.8, ease: 'back.out(1.4)' })
			.to('[data-bts-logo]', { rotate: 0, duration: 0.4, ease: 'power2.out' })

	}, { scope: introRef })

	useGSAP(() => {
		if (!sectionRef.current) return

		const lines = sectionRef.current.querySelectorAll('path')
		lines.forEach((line) => {
			const offset = line?.dataset?.offset || 100
			const duration = line?.dataset?.duration || 150
			const isReverse = line?.dataset?.direction === 'rev'

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: line,
					start: `top ${offset}%`,
					scrub: 1,
					end: `${duration}%`,
					// markers: true,
				},

			})
			tl.fromTo(line, { drawSVG: isReverse ? '100% 100%' : '0%' }, { drawSVG: isReverse ? '0% 100%' : `100%`, duration: 1, ease: 'none' })
		})

	}, { scope: sectionRef })

	useGSAP(() => {
		if (!sectionDateRef.current) return

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionDateRef.current,
				start: `top 50%`,
				// markers: true,
			},

		})
		tl.from('[data-line]', { drawSVG: '0%', duration: 1.6, ease: 'power1.inOut' })
		tl.from('[data-icon]', { scale: 0, duration: 0.4, ease: 'back.out(1.4)' }, '<+0.2')

	}, { scope: sectionDateRef })

  return (
    <>
			<section className="bg-forest-green overflow-hidden flex h-200 items-center justify-center bg-[url(/assets/pattern-1.svg)] bg-center md:h-400 lg:h-svh lg:max-h-810" ref={introRef}>
				<svg className="w-300 md:w-600 lg:w-758 -rotate-1" width="758" height="184" viewBox="0 0 758 184" fill="none" xmlns="http://www.w3.org/2000/svg" data-bts-logo>
          <path d="M2.82459 0.31786L0 170.914L754.89 183.451L757.715 12.8545L2.82459 0.31786Z" fill="#3F9C35" />
          <path
            d="M84.4752 84.887H73.3039L71.6415 92.8785H82.7464L81.2169 100.87H69.9791L66.5547 116.853H58.6416L61.8999 100.87H53.9869L50.5624 116.853H42.6494L45.9076 100.87H34.8027L36.3322 92.8785H47.6699L49.3323 84.887H38.2274L39.7568 76.8954H50.9947L54.4191 60.9123H62.3987L59.0406 76.8954H66.9536L70.3781 60.9123H78.2911L75.0329 76.8954H86.1375L84.4752 84.887ZM63.6288 92.8785L65.2912 84.887H57.3116L55.6493 92.8785H63.6288ZM88.3653 60.9123H107.516C122.511 60.9123 128.263 66.9726 128.263 80.092C128.263 82.8225 127.465 88.0836 124.206 91.6798C127.465 93.2115 129.859 97.2073 129.859 102.135C129.859 112.058 125.47 116.853 110.475 116.853H88.3653V60.9123ZM102.063 85.5529H108.779C112.603 85.5529 114.531 85.0868 114.531 80.1253C114.531 75.1639 112.603 74.6977 108.779 74.6977H102.063V85.5529ZM101.997 105.532H109.411C113.235 105.532 115.163 105.132 115.163 101.37C115.163 97.6068 113.401 97.0408 109.577 97.0408H101.997V105.499V105.532ZM173.413 60.9123V74.6644H149.309V82.0233H166.465V95.7754H149.309V103.134H173.413V116.886H135.112V60.9456H173.413V60.9123ZM193.229 60.9123V85.6861H205.664V60.9123H219.395V116.853H205.664V99.4382H193.229V116.853H179.498V60.9123H193.229ZM240.94 60.9123V116.853H227.375V60.9123H240.94ZM264.978 60.9123L277.579 91.5133V60.9123H291.311V116.853H275.185L262.584 86.0191V116.853H248.853V60.9123H264.978ZM299.29 60.9123H319.472C334.467 60.9123 339.42 66.9726 339.42 80.092V97.6069C339.42 110.726 334.467 116.853 319.472 116.853H299.29V60.9123ZM313.022 103.134H319.738C323.561 103.134 325.49 102.502 325.49 97.7067V80.1253C325.49 75.1639 323.561 74.6977 319.738 74.6977H313.022V103.134ZM358.571 74.6644H342.612V60.9123H388.262V74.6644H372.303V116.853H358.571V74.6644ZM406.748 60.9123V85.6861H419.182V60.9123H432.914V116.853H419.182V99.4382H406.748V116.853H393.016V60.9123H406.748ZM479.195 60.9123V74.6644H455.09V82.0233H472.246V95.7754H455.09V103.134H479.195V116.886H440.893V60.9456H479.195V60.9123ZM522.45 76.6623L508.952 79.6259C508.32 74.7643 505.527 73.3991 501.604 73.3991C498.478 73.3991 496.583 75.2305 496.883 77.0619C498.013 83.2887 523.614 83.1222 523.614 101.503C523.614 103.9 520.888 118.052 502.003 118.052C484.913 118.052 481.189 107.263 481.189 100.237L494.755 97.2739C495.154 103.034 498.113 104.3 502.003 104.3C505.893 104.3 508.785 101.969 508.32 99.8378C506.79 93.045 482.387 94.5767 482.387 76.1961C482.32 73.7987 483.75 59.647 501.604 59.647C518.361 59.647 522.417 69.6364 522.417 76.6623H522.45ZM567.701 60.9123V74.6644H543.596V82.0233H560.752V95.7754H543.596V103.134H567.701V116.886H529.399V60.9456H567.701V60.9123ZM612.519 116.853H598.787V105.099H587.151V116.853H573.419V80.2585C573.419 70.2025 575.015 59.4805 592.969 59.4805C610.923 59.4805 612.519 70.2025 612.519 80.2585V116.853ZM598.787 80.2585C598.787 76.4292 598.222 74.4979 592.969 74.4979C587.716 74.4979 587.151 76.4292 587.151 80.2585V91.2802H598.787V80.2585ZM641.079 60.9123L647.695 88.2501L654.311 60.9123H675.291V116.853H661.56V79.4594L652.45 116.853H642.874L633.764 79.4594V116.853H620.033V60.9123H641.012H641.079ZM722.004 76.6623L708.506 79.6259C707.874 74.7643 705.081 73.3991 701.158 73.3991C698.033 73.3991 696.137 75.2305 696.437 77.0619C697.567 83.2887 723.168 83.1222 723.168 101.503C723.168 103.9 720.442 118.052 701.557 118.052C684.467 118.052 680.744 107.263 680.744 100.237L694.309 97.2739C694.708 103.034 697.667 104.3 701.557 104.3C705.447 104.3 708.339 101.969 707.874 99.8378C706.344 93.045 681.94 94.5767 681.94 76.1961C681.874 73.7987 683.304 59.647 701.158 59.647C717.915 59.647 721.971 69.6364 721.971 76.6623H722.004Z"
            fill="white"
          />
        </svg>
      </section>
      {(content || btsButton?.url) && (
				<section className="fp-section bg-beige text-jet overflow-hidden" ref={sectionRef}>
          <Container className="relative">
            <Content value={content} className="relative z-10" />
            {btsButton?.url && (
              <a
                href={btsButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent h5 mt-40 flex items-center justify-center px-10 py-13 text-center text-white normal-case transition-colors hover:bg-green-700 md:mt-80"
              >
                {btsButton?.text || 'Visit Behindtheseams.eco'}
              </a>
            )}
            {/* mobile lines */}
            <svg className="absolute -top-40 right-0 z-0 xl:hidden" width="93" height="280" viewBox="0 0 93 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M148.247 3.17657C147.805 11.5797 147.292 20.0256 145.076 28.1345C139.09 51.6559 117.591 69.9379 93.3129 68.7348C78.8315 68.6429 64.1259 64.0493 49.6798 66.9675C36.987 69.1082 25.2998 79.3071 24.2618 92.1997C20.3577 126.042 87.6179 134.426 74.5801 164.783C65.3571 184.912 41.3131 191.206 23.8269 201.39C16.9752 205.508 10.7502 210.913 6.86518 218.013C-0.220784 230.196 1.05457 248.335 10.2852 260C19.2544 271.785 34.1192 279.341 48.5835 276.77C75.7387 270.98 59.5598 228.699 84.2984 219.743C105.653 214.291 110.304 240.605 121.525 254.539C124.544 258.519 128.202 262.149 132.481 264.655C151.332 275.659 170.229 260.69 171.963 240.536C175.723 200.855 133.831 175.462 130.868 137.225C128.004 100.25 159.483 72.0949 194.549 87.3815C214.574 96.0182 223.328 120.75 219.243 140.921C216.853 155.261 209.666 168.637 208.289 183.21C205.293 207.081 227.767 227.52 249.776 213.953C264.903 203.617 266.88 181.427 277.138 166.241C282.462 157.806 289.954 151.021 297.501 144.636"
                stroke="#FBD9B8"
                strokeWidth="4.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
								data-offset="80"
								data-duration="250"
              />
            </svg>
            <svg className="absolute top-1/2 right-0 z-0 xl:hidden" width="67" height="264" viewBox="0 0 67 264" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M131.65 261.4a149.5 149.5 0 0 1-80.25-30.18c-15-11.47-46.91-41.08-20.57-58.47 12.29-8.11 56.98-8.15 67.36-11 19.37-5.3 17.94-27.7 8.6-42.98C94.18 98.1 72.34 93.1 50.5 87.3c-9.9-2.63-20.6-4.07-30.32-.75-9.71 3.32-18 12.53-17.39 22.77.78 13.1 16.46 21.78 29.09 18.22 12.62-3.56 21.15-16.11 23.45-29.03 1.93-10.81.33-22.34 4.52-32.5 8-19.41 31.28-24.92 48.17-33.7 12.54-6.53 24.75-16.21 28.24-29.9"
                stroke="#C0EF92"
                strokeWidth="4.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
								data-offset="80"
								data-direction="rev"
								data-duration="250"
              />
            </svg>
            <svg className="absolute top-2/3 left-0 z-0 xl:hidden" width="68" height="312" viewBox="0 0 68 312" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M-197.399 130.623C-189.146 132.265 -180.861 133.985 -173.154 137.341C-150.735 146.639 -135.726 170.539 -140.4 194.393C-142.568 208.711 -149.224 222.606 -148.408 237.321C-148.111 250.19 -139.694 263.219 -127.083 266.096C-94.1509 274.815 -76.2053 209.453 -48.0327 226.711C-29.4349 238.726 -26.6546 263.425 -19.0852 282.191C-15.9923 289.563 -11.5363 296.499 -5.06691 301.362C5.97296 310.122 24.1075 311.462 36.9757 304.001C49.9257 296.815 59.5361 283.188 59.0664 268.504C57.2325 240.799 13.068 250.745 7.75351 224.978C5.42098 203.062 32.1308 202.234 47.5298 193.128C51.9019 190.711 56.0191 187.612 59.1133 183.736C72.7071 166.659 60.6046 145.81 40.9073 141.203C2.17626 131.789 -28.9638 169.605 -67.2304 167.052C-104.234 164.582 -127.582 129.39 -107.423 96.879C-96.0023 78.2999 -70.2704 73.1845 -50.8946 80.1208C-37.0452 84.5438 -24.8387 93.5757 -10.614 97.0289C12.5798 103.418 36.0319 84.1094 25.7629 60.3814C17.7041 43.9278 -3.97347 38.7875 -17.5302 26.4574C-25.1144 19.9783 -30.7544 11.5909 -35.9907 3.20626"
                stroke="#FBD9B8"
                strokeWidth="4.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
								data-offset="80"
								data-direction="rev"
								data-duration="250"
              />
            </svg>
            {/* desktop lines */}
            <svg
              className="absolute -top-80 right-0 z-0 hidden overflow-visible xl:block"
              width="372"
              height="1116"
              viewBox="0 0 372 1116"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
								data-offset="70"
								data-duration="300"
                d="M592.98 9.91c-1.76 33.62-3.82 67.4-12.68 99.84-23.94 94.08-109.94 167.2-207.05 162.4-57.93-.37-116.75-18.75-174.53-7.07-50.78 8.56-97.53 49.36-101.68 100.93-15.61 135.37 253.43 168.9 201.28 290.33-36.9 80.51-133.07 105.7-203.02 146.43-27.4 16.47-52.3 38.09-67.84 66.49C-.9 917.99 4.2 990.55 41.14 1037.21c35.87 47.14 95.33 77.36 153.19 67.08 108.62-23.16 43.9-192.29 142.86-228.11 85.42-21.81 104.02 83.45 148.9 139.18 12.08 15.92 26.71 30.44 43.83 40.47 75.4 44.01 151-15.86 157.93-96.48 15.04-158.72-152.53-260.3-164.38-413.24C512 398.2 637.93 285.59 778.19 346.73c80.1 34.55 115.12 133.48 98.78 214.16-9.56 57.36-38.31 110.87-43.82 169.16-11.98 95.48 77.91 177.24 165.95 122.97 60.51-41.34 68.42-130.1 109.45-190.85 21.3-33.74 51.26-60.88 81.45-86.42"
                stroke="#FBD9B8"
                strokeWidth="18"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="absolute top-400 left-0 z-0 hidden overflow-visible xl:block"
              width="358"
              height="1656"
              viewBox="0 0 358 1656"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-265.73 307.58c-23-547.21 870.45-230.13 541.75 64.76-455.07 408.26 2.76 435.4-72.88 662.86-64.18 193.01-512.01 158.23-420.6 618.14"
                stroke="#C0EF92"
                strokeWidth="18"
								data-offset="100"

              />
            </svg>
            <svg
              className="absolute -bottom-480 left-0 z-0 hidden overflow-visible xl:block"
              width="229"
              height="1242"
              viewBox="0 0 229 1242"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
								data-offset="100"
								data-direction="rev"
								data-duration="250"
                d="M-829.6 519.52c33.01 6.57 66.15 13.45 96.98 26.88 89.68 37.19 149.71 132.79 131.02 228.2-8.68 57.28-35.3 112.86-32.04 171.72 1.2 51.47 34.86 103.59 85.3 115.1 131.73 34.87 203.52-226.58 316.2-157.55 74.4 48.07 85.52 146.86 115.8 221.93 12.37 29.48 30.2 57.23 56.07 76.68 44.16 35.04 116.7 40.4 168.17 10.55 51.8-28.74 90.24-83.25 88.36-141.98-7.33-110.82-184-71.04-205.25-174.1-9.33-87.67 97.5-90.98 159.1-127.4 17.5-9.67 33.96-22.07 46.34-37.57 54.37-68.31 5.97-151.7-72.82-170.13-154.93-37.66-279.49 113.6-432.56 103.39-148-9.88-241.4-150.65-160.76-280.7 45.68-74.3 148.6-94.77 226.1-67.03 55.4 17.7 104.23 53.82 161.13 67.64 92.78 25.55 186.58-51.68 145.5-146.6-32.23-65.8-118.94-86.37-173.16-135.69-30.34-25.92-52.9-59.47-73.85-93"
                stroke="#FBD9B8"
                strokeWidth="18"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="absolute right-0 bottom-350 z-0 hidden overflow-visible xl:block"
              width="266"
              height="1055"
              viewBox="0 0 266 1055"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
								data-offset="100"
								data-direction="rev"
								data-duration="200"
                d="M524.58 1045.79c-115.69-7.74-228.84-50.3-320.99-120.71-60-45.87-187.64-164.3-82.28-233.87 49.17-32.46 227.93-32.6 269.46-43.97 77.47-21.22 71.75-110.82 34.41-171.94-50.5-82.7-137.86-102.74-225.19-125.94-39.66-10.53-82.46-16.29-121.33-3-38.84 13.27-72 50.14-69.53 91.1 3.13 52.39 65.85 87.1 116.34 72.87 50.5-14.23 84.62-64.46 93.83-116.1 7.7-43.27 1.3-89.4 18.06-130.04 32.02-77.62 125.1-99.67 192.7-134.82C480.18 103.28 529.03 64.57 543 9.8"
                stroke="#C0EF92"
                strokeWidth="18"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
          </Container>
        </section>
      )}
			<section className={`bg-forest-green fp-section overflow-hidden text-white`} {...moduleProps(props)} ref={sectionDateRef}>
        <Container className="relative">
          <div className="relative z-10 flex flex-col gap-20 text-white md:gap-40">
            {heading && <h2 className="h1">{heading}</h2>}

            {campaignDates?.title && campaignDates?.date && (
              <div className="border-lime-green bg-forest-green flex flex-col gap-16 border-2 border-dashed p-16 md:gap-24 md:p-36">
                {campaignDates.title && <h3 className="h5 text-white normal-case">{campaignDates.title}</h3>}
                {campaignDates.date && <p className="text-lime-green fp-text-number">{campaignDates.date}</p>}
              </div>
            )}

            {contactEmail && (
              <div className="flex flex-col gap-16 bg-white/4 p-16 md:mt-20 md:flex-row md:flex-wrap md:gap-28 md:p-24">
                <span className="h5 text-beige flex items-center gap-12 normal-case">
                  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 4.02946L14.4486 13.5803L15 13.9448L15.5514 13.5803L30 4.02946V23.2461H0V4.02946ZM0 1.632V0.246094H30V1.632L15 11.5474L0 1.632Z"
                      fill="#C0EF92"
                    />
                  </svg>
                  Email:
                </span>

                <a href={`mailto:${contactEmail}`} className="link text-lime-green h5 normal-case" target="_blank" rel="noopener noreferrer">
                  {contactEmail}
                </a>
              </div>
            )}

            {ctaButton?.url && (
              <a
                href={ctaButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-lime-green text-22 md:text-26 flex items-center justify-center px-10 py-16 text-center leading-[1.3] font-bold uppercase transition-colors hover:bg-green-700 md:py-24"
              >
                {ctaButton.text || 'Find out more'}
              </a>
            )}
          </div>

          {/*Mobile lines*/}
          <svg className="absolute -top-40 left-0 z-0 overflow-visible lg:hidden" width="154" height="102" viewBox="0 0 154 102" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path data-line d="M153.185 -148.337C51.054 -143.931 145.716 218.116 -41.6726 60.0429" stroke="#3F9C35" strokeWidth="2.85333" />
          </svg>
          <svg className="absolute -top-40 right-0 z-0 overflow-visible lg:hidden" width="100" height="205" viewBox="0 0 100 205" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path data-line d="M99.022 1.82811C41.2209 45.9694 112.562 69.9661 79.0357 106.917C55.8719 132.447 -23.7097 121.513 9.54108 204.216" stroke="#C0EF92" strokeWidth="2.16427" />
          </svg>
          <svg className="absolute -bottom-40 left-0 z-0 overflow-visible lg:hidden" width="360" height="312" viewBox="0 0 360 312" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M152.954 230.625C264.644 228.859 321.347 324.851 316.405 348.569C308.401 386.984 263.963 330.044 330.848 318.189C388.193 308.026 565.146 372.321 544.364 456.577"
              stroke="#3F9C35"
              strokeWidth="3"
							data-line
            />
            <path
              d="M277.355 418.889C134.192 384.357 79.1 248.513 107.544 214.489C133.526 183.41 168.388 255.411 79.1005 248.515C2.54753 242.602 -202.17 102.241 -147.889 1.5273"
              stroke="#C0EF92"
              strokeWidth="3"
							data-line
            />
          </svg>

          {/*Desktop lines*/}
          <svg
            className="absolute -top-80 left-0 z-0 hidden overflow-visible lg:block"
            width="324"
            height="125"
            viewBox="0 0 324 125"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
						<path d="M323.36-400.74c-214.76 9.27-15.7 770.58-409.74 438.19" stroke="#3F9C35" strokeWidth="6" data-line />
          </svg>
          <svg
            className="absolute -top-80 right-0 z-0 hidden overflow-visible lg:block"
            width="550"
            height="826"
            viewBox="0 0 550 826"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
						<path data-line d="M682.23-63.26C483.3-30.33 626.79 121.18 496.66 168.07 406.75 200.47 226.1 70.23 200 315.96" stroke="#C0EF92" strokeWidth="6" />
						<path data-line
              d="M.4 290.22c309.65-4.9 466.84 261.23 453.14 326.98-22.19 106.5-145.38-51.36 40.04-84.22 158.98-28.18 649.55 150.07 591.93 383.65"
              stroke="#3F9C35"
              strokeWidth="6"
            />
          </svg>
          <svg
            className="absolute -bottom-40 left-0 z-0 hidden overflow-visible md:-bottom-80 lg:block"
            width="459"
            height="802"
            viewBox="0 0 459 802"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
							data-line
              d="M458.3 879.47C157.25 806.85 41.4 521.2 101.22 449.65c54.63-65.35 127.94 86.06-59.81 71.55-160.98-12.43-591.46-307.58-477.32-519.36"
              stroke="#C0EF92"
              strokeWidth="6"
            />
          </svg>

					{/* icons */}
					<svg data-icon className="absolute top-176 -right-10 z-0 hidden xl:block" width="86" height="87" viewBox="0 0 86 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.98 86.64a42.93 42.93 0 0 0 42.98-42.89A42.93 42.93 0 0 0 42.98.87 42.93 42.93 0 0 0 0 43.75a42.93 42.93 0 0 0 42.98 42.89Z" fill="#3F9C35" />
            <mask id="mask0_4442_24476" maskUnits="userSpaceOnUse" x="0" y="0" width="86" height="87">
              <path d="M42.98 86.64a42.93 42.93 0 0 0 42.98-42.89A42.93 42.93 0 0 0 42.98.87 42.93 42.93 0 0 0 0 43.75a42.93 42.93 0 0 0 42.98 42.89Z" fill="#fff" />
            </mask>
            <g mask="url(#mask0_4442_24476)" fillRule="evenodd" clipRule="evenodd" fill="#C0EF92">
              <path d="m-4.68 46.17 24.04.08 2.94 5.87-3.07 12.5 8.4 12.58 8.86 2.8 2.34-9.32 9.33-3.26 2.8-9.78-7-.93-2.8-6.05-16.8 1.4-7.61-14.94 5.74-4.15 7-7.92 7-2.33 2.8-5.59-7.93-2.8-5.6-11.17L6.21 15.33-4.68 46.17ZM60.3 2.68l-4.52 8.27-7.46-1.86-2.34 4.65 7 4.66 8.4-1.87 12.8-5.35-13.88-8.5ZM77.74 73.06l-4.22-5.77 1.86-8.38-4.66-4.19-2.66-6.84-6.21.32-6.53-5.58 3.26-7.46h7l1.87-9.3 6.53-.94 3.56-9.6 9.71 13.85 2.97 24.91-12.48 18.98Z" />
            </g>
          </svg>
					<svg data-icon className="absolute top-160 -left-15 z-0 hidden xl:block" width="107" height="79" viewBox="0 0 107 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2 33.05 0 34.73 2.78 54.8l12.2-1.68-2.78-20.07Z" fill="#C0EF92" />
            <path d="M70.22 66.3 61.94 6.44 12.19 33.06l2.78 20.07L70.22 66.3Z" fill="#C0EF92" />
            <path d="M28.8 78.87 10.37 44.55l15.96 1.84 10.44 28.8-7.97 3.68Z" fill="#C0EF92" />
            <path d="M76.78 18.96 89 2.87M97.1 61.43l-16.14-12.2M83.81 33.42l22.42-3.08" stroke="#C0EF92" strokeWidth="8" strokeMiterlimit="10" />
            <path d="m8.98 33.27 2.86 20.58" stroke="#0F624A" strokeWidth="8" strokeMiterlimit="10" />
          </svg>
        </Container>
      </section>
    </>
  )
}

export default BehindTheSeams
