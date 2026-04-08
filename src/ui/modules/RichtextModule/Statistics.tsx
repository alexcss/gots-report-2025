import React from 'react'
import { cn } from '@/lib/utils'

interface Statistic {
  _key: string
  value: string
  label: string
  isFullWidth?: boolean
}

interface StatisticsBlockProps {
  value: {
    statistics: Statistic[]
  }
}

const parseLinks = (text: string): React.ReactNode[] => {
  if (!text) return []

  // Enhanced regex that also captures .eco domains
  const urlRegex = /\b(https?:\/\/)?([a-z0-9][-a-z0-9]*\.)+([a-z]{2,})(\/[-a-z0-9_.~%:/?#[\]@!$&'()*+,;=]*)?/gi

  let lastIndex = 0
  const result: React.ReactNode[] = []
  let match

  // Create a new regex object to use with exec
  const regex = new RegExp(urlRegex)

  // Find all matches and process them one by one
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index))
    }

    // Get the full match
    const url = match[0]

    // Create proper href with https:// if missing
    const href = url.startsWith('http') ? url : `https://${url}`

    // Add the link
    result.push(
      <a key={match.index} href={href} className="link" target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    )

    // Update lastIndex to end of current match
    lastIndex = match.index + url.length
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex))
  }

  return result
}

const Statistics: React.FC<StatisticsBlockProps> = ({ value }) => {
  const { statistics } = value

  if (!statistics || statistics.length === 0) {
    return null
  }

  return (
    <div className="my-40 grid grid-cols-1 gap-6 md:my-80 md:grid-cols-2 md:gap-20">
      {statistics.map((stat) => (
        <div key={stat._key} className={cn('flex flex-col items-start gap-4 bg-white p-20 md:gap-20 md:p-40', stat.isFullWidth && 'md:col-span-2')}>
          <div className="text-accent fp-text-number">{stat.value}</div>
          <div className="text-jet h5 normal-case">{parseLinks(stat.label)}</div>
        </div>
      ))}
    </div>
  )
}

export default Statistics
