import Link from 'next/link'
import { BiGitBranch, BiRefresh, BiXCircle } from 'react-icons/bi'
import { IoWarningOutline, IoLogoGithub } from 'react-icons/io5'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/atoms/tooltip'

export const Footer = () => {
  return (
    <footer className='border-t text-off-white text-xs flex items-center justify-between select-none bg-layout relative z-10'>
      <div className='flex items-center border-r divide-x'>
        <Link
          target='_blank'
          href='https://github.com/wiscaksono/wiscaksono-site'
          className='flex items-center gap-x-2 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors'
        >
          <BiGitBranch className='text-lg' />
          <p>main</p>
        </Link>
        <button aria-label='refetch' className='items-center gap-x-2 px-2 py-1 md:flex hidden group hover:text-foreground text-muted-foreground transition-colors'>
          <BiRefresh className='text-xl group-active:rotate-180 transition-transform' />
        </button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='items-center gap-x-1 px-2 py-1 md:flex hidden text-muted-foreground'>
                <BiXCircle className='text-base' />
                <p>0</p>
                <IoWarningOutline className='text-base' />
                <p>0</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className='!border-none'>No problems</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className='items-center gap-x-1 px-2 py-1 md:flex hidden text-muted-foreground'>
          <p>--NORMAL--</p>
        </div>
      </div>

      <div className='flex items-center divide-x divide border-l'>
        <div className='items-center gap-x-2 px-2 py-1 md:flex hidden text-muted-foreground'>
          <p>Special thanks to:</p>
          <Link href='https://www.behance.net/darelova' target='_blank' className='hover:text-foreground transition-colors' data-umami-event='Yanka Darelova link'>
            Yanka Darelova
          </Link>
        </div>
        <a
          target='_blank'
          href='https://github.com/wiscaksono'
          className='flex items-center gap-x-1 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors'
          data-umami-event='GitHub link footer'
        >
          <p>Wiscaksono</p>
          <IoLogoGithub className='text-lg' />
        </a>
      </div>
    </footer>
  )
}
