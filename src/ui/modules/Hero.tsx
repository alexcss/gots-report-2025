import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import { cn } from '@/lib/utils'
import HeroTagline from '@/ui/modules/Hero/HeroTagline'

export default function Hero({
  pretitle,
  assets,
  ...props
}: Partial<{
  pretitle: string
  assets: Sanity.Img[]
}> &
  Sanity.Module) {
  const hasImage = !!assets?.[0]
  const asset = assets?.[0]

  return (
    <section className={cn(hasImage && 'bg-ink text-canvas overflow-hidden md:grid md:*:col-span-full md:*:row-span-full')} {...moduleProps(props)}>
      {pretitle && (
        <div className="bg-cultured text-jet relative md:hidden">
          <div className="fp-container relative z-10 pt-54 pb-44">
            <h1 className="h2 flex flex-col items-center justify-center gap-6 font-normal uppercase">
              {pretitle.split(' ').slice(0, -1).join(' ')}
              <span className="text-accent text-50 leading-[1.3]">{pretitle.split(' ').slice(-1)}</span>
            </h1>
          </div>
          <svg className="absolute inset-0 z-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M90.48 147.06-57.62 20.58a35 35 0 0 1-3.88-49.34L93.2-209.9a35 35 0 0 1 49.34-3.88L346.12-39.89a35 35 0 0 1 3.89 49.34L310.59 55.6a35 35 0 0 0 3.88 49.35L537.4 295.34a35 35 0 0 1 3.88 49.34L383.68 529.2a35 35 0 0 1-49.34 3.88L55.94 295.3a35 35 0 0 1-3.9-49.34l42.32-49.54a35 35 0 0 0-3.88-49.35Z"
              stroke="#E2E2E2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      )}

      {hasImage && <ResponsiveImg img={asset} className="max-h-fold size-full object-cover" width={2400} draggable={false} />}

      {pretitle && (
        <div className="hidden w-full flex-col justify-end text-balance md:flex">
          <HeroTagline>{pretitle}</HeroTagline>
        </div>
      )}
    </section>
  )
}
