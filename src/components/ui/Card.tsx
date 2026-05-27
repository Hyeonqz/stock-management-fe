import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg'
}

const paddingMap = { sm: 'p-3', md: 'p-4', lg: 'p-5' }

export default function Card({ children, padding = 'md', className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl ${paddingMap[padding]} ${className}`}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      {...props}
    >
      {children}
    </div>
  )
}
