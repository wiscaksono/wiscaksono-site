import { FadeIn } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'
import { AnimatedName } from '@/components/molecules/animated-name'

export default function Home() {
  return (
    <section className='flex items-center justify-center gap-20 p-5'>
      <FadeIn>
        <div className='md:space-y-10 space-y-8 relative z-10'>
          <header>
            <p className='text-muted-foreground text-lg font-extralight'>Hi all. I am</p>
            <AnimatedName />
            <h2 className='text-muted-foreground md:text-2xl sm:text-xl text-base'>
              <span className='animate-pulse'>&gt; </span>
              Front-end developer
            </h2>

            <div className='absolute w-full h-1/2 bg-muted-foreground/10 blur-2xl top-0 left-0 -z-10 rounded-full animate-pulse' />
          </header>

          <div className='space-y-2 sm:text-sm text-xs'>
            <p className='text-muted-foreground'>{`// you can also see it on my Github page`}</p>
            <p className='text-muted-foreground'>
              <span className='text-purple'>const</span> <span className='text-green'>githubLink</span> ={' '}
              <a
                target='_blank'
                href='https://github.com/wiscaksono/wiscaksono-site'
                className='text-light-brown hover:underline hover:text-foreground transition-colors'
                data-umami-event='GitHub link'
              >
                &apos;https://github.com/wiscaksono/wiscaksono-site&apos;
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-secondary/20 fill-neutral-100 dark:stroke-secondary/30 stroke-neutral-700/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
    </section>
  )
}
