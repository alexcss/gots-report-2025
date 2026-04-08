import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import { cn } from '@/lib/utils'
import NavigationWrapper from './NavigationWrapper'

function getRomanNumeral (key: number): string {
  const romeMap = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX']
  return romeMap[key] || `Chapter ${key + 1}`
}

export default async function Menu () {
  const { headerMenu } = await getSite()

  const parentClassName = cn('md:px-3 md:text-center md:leading-tight')

  return (
    <NavigationWrapper>
      <nav
        className="pointer-events-auto max-md:anim-fade-to-l md:anim-fade-to-b header-closed:hidden absolute top-0 right-0 z-30 h-dvh w-320 overflow-x-hidden overflow-y-auto bg-white pt-60 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] md:top-68 md:left-0 md:h-auto md:w-auto md:overflow-hidden md:py-20 xl:top-80"
        role="navigation"
      >
        <div className="fp-container max-md:p-8">
          <div className="relative flex gap-y-4 px-0 [grid-area:nav] max-md:flex-col md:-mb-8 md:block md:columns-2 md:gap-8 md:px-20 lg:columns-3 xl:px-0">
            {headerMenu?.items?.map((item, key) => {
              switch (item._type) {
                case 'link':
                  return (
                    <CTA
                      className={cn(
                        'bg-cultured text-jet group/link hover:bg-accent flex flex-col items-start gap-4 p-16 py-8 text-left hover:text-white md:mb-8 md:break-inside-avoid md:gap-6 md:p-16',
                      )}
                      link={item}
                      key={key}
                    >
                      <span className="text-12 -tracking-1 text-spanish-gray group-hover/link:text-bright-gray leading-[1.5] transition">Chapter {getRomanNumeral(key)}</span>
                      <span className="text-14 -tracking-1 w-full min-w-0 truncate overflow-hidden leading-[1.5] text-current uppercase">{item.label}</span>
                    </CTA>
                  )

                case 'link.list':
                  return <LinkList summaryClassName={parentClassName} {...item} key={key} />

                default:
                  return null
              }
            })}
            <label
              htmlFor="header-toggle"
              className="text-jet hover:text-accent absolute top-0 left-full z-20 hidden transition md:-ml-16 md:flex md:h-44 md:w-44 xl:ml-16"
              aria-label="Close Navigation"
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14L30 30M14 30L30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </NavigationWrapper>
  )
}
