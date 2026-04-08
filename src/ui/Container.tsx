import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('fp-container', className)}>
      <div className="fp-row">
        <div className="fp-row-container">{children}</div>
      </div>
    </div>
  )
}

export default Container
