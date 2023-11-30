'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { type ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  startWith: string
  title?: string | null
  className?: ClassValue
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const AsideLink = ({ href, children, startWith, title, className, ...props }: Props) => {
  const segment = useSelectedLayoutSegment()
  const tag = useSearchParams().get('tag')
  const isActive = tag === title || segment === title

  return (
    <Link
      href={href}
      className={cn(
        isActive ? 'text-foreground bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-primary/10',
        'w-full transition-colors flex items-center gap-x-2.5 hover:bg-primary/10 px-5 py-1',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
