import { Any, PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'

import Image from './Image'
import Code from './Code'
import Admonition from './Admonition'
import CustomHTML from '@/ui/modules/CustomHTML'
import HighlightedList from '@/ui/modules/RichtextModule/HighlightedList'
import Blockquote from '@/ui/modules/RichtextModule/Blockquote'
import Statistics from '@/ui/modules/RichtextModule/Statistics'
import Phone from '@/ui/modules/RichtextModule/Phone'
import Link from '@/ui/modules/RichtextModule/Link'
import Inflow from '@/ui/modules/RichtextModule/Inflow'
import OrganisationInfo from '@/ui/modules/RichtextModule/OrganisationInfo'
import EmailCta from '@/ui/modules/RichtextModule/EmailCta'
import People from '@/ui/modules/RichtextModule/People'
import YouTube from '@/ui/modules/RichtextModule/YouTube'

export default function Content({ value, className, children }: { value: Any } & React.ComponentProps<'div'>) {
  return (
    <div className={cn('richtext fp-text-body mx-auto w-full space-y-16 md:space-y-24', className)}>
      <PortableText
        value={value}
        components={{
          marks: {
            link: Link,
          },
          types: {
            image: Image,
            admonition: Admonition,
            highlightedList: HighlightedList,
            blockquote: Blockquote,
            code: Code,
            statistics: Statistics,
            phone: Phone,
            inflow: Inflow,
            organisationInfo: OrganisationInfo,
            emailCta: EmailCta,
            people: People,
            youtube: YouTube,
            'custom-html': ({ value }) => <CustomHTML className="has-[table]:md:[grid-column:bleed] has-[table]:md:mx-auto" {...value} />,
          },
        }}
      />

      {children}
    </div>
  )
}
