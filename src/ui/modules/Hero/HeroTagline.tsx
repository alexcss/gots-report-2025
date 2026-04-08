import { stegaClean } from 'next-sanity'

export default function HeroTagline({ children }: React.ComponentProps<'p'>) {
  if (!children) return null

  return (
    <div className="bg-accent py-40 text-center">
      <h1 className={`h1 fp-container uppercase`}>{stegaClean(children)}</h1>
    </div>
  )
}
