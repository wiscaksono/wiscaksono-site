import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ClassValue } from 'clsx'

import { FadeIn } from '@/components/atoms/fade-in'
import { cn } from '@/lib/utils'

const components = {
  Image
}

export function MDXComponent({ code, className, transparentBg = true }: { code: string; className?: ClassValue; transparentBg?: boolean }) {
  const Component = useMDXComponent(code)

  return (
    <FadeIn className='my-auto'>
      <article
        className={cn(
          className,
          transparentBg ? 'prose-pre:!bg-transparent' : '',
          'prose min-w-full p-2.5 prose-pre:my-0  prose-pre:p-0 prose-pre:focus-visible:!ring-0 prose-pre:!outline-0 prose-img:aspect-video prose-img:object-cover prose-img:object-center'
        )}
      >
        <Component className='bg-red-500' components={components} />
      </article>
    </FadeIn>
  )
}
