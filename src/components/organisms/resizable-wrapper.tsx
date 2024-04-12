'use client'
import { Suspense, useState } from 'react'

import { AsideLink } from '../atoms/aside-link'
import { ScrollArea } from '../atoms/scroll-area'
import { FadeIn, FadeInStagger } from '../atoms/fade-in'
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/atoms/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'

import { cn } from '@/lib/utils'

interface ResizableWrapperProps {
  sidebarTitle: string
  sidebarMenu: SidebarMenu[]
  children: React.ReactNode
}

export interface SidebarMenu {
  title: string
  href: string
  icon: JSX.Element
}

export const ResizableWrapper = ({ sidebarTitle, sidebarMenu, children }: ResizableWrapperProps) => {
  const defaultCollapsed = JSON.parse(localStorage.getItem('react-resizable-panels:collapsed') || 'false')
  const defaultSize = JSON.parse(localStorage.getItem('react-resizable-panels:size') ?? '[16.6,83.4]')
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  // return children

  return (
    <TooltipProvider>
      <ResizablePanelGroup
        tagName='section'
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          localStorage.setItem('react-resizable-panels:size', JSON.stringify(sizes))
        }}
      >
        <ResizablePanel
          defaultSize={defaultSize[0]}
          minSize={4}
          maxSize={50}
          tagName='aside'
          collapsible
          onCollapse={() => {
            setIsCollapsed(true)
            localStorage.setItem('react-resizable-panels:collapsed', JSON.stringify(true))
          }}
          onExpand={() => {
            setIsCollapsed(false)
            localStorage.setItem('react-resizable-panels:collapsed', JSON.stringify(false))
          }}
          className='min-w-9'
        >
          <Accordion type='single' collapsible defaultValue='about'>
            <AccordionItem value={'about'} defaultChecked>
              <AccordionTrigger
                className={cn(isCollapsed ? 'p-0 items-center justify-center [&>span]:hidden' : 'px-5', 'border-b border-lines text-left py-2.5')}
                data-umami-event={`accordion-${sidebarTitle.toLowerCase().replace(' ', '-')}`}
              >
                {!isCollapsed && sidebarTitle}
              </AccordionTrigger>
              <AccordionContent className={cn(isCollapsed ? 'mt-2' : 'mt-2.5', 'space-y-1 transition-all')}>
                <FadeInStagger faster>
                  {sidebarMenu.map(({ title, icon }) => (
                    <FadeIn key={title}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink
                          href={title}
                          title={title}
                          startWith='/about'
                          className={isCollapsed ? 'aspect-square px-2 [&>svg]:w-5 [&>svg]:h-5 transition-all' : 'aspect-auto'}
                        >
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild disabled={!isCollapsed}>
                              {icon}
                            </TooltipTrigger>
                            {isCollapsed && <TooltipContent align='start'>{title}</TooltipContent>}
                          </Tooltip>
                          {!isCollapsed && <span className='whitespace-nowrap'>{title}</span>}
                        </AsideLink>
                      </Suspense>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultSize[1]} tagName='section' className='overflow-auto'>
          <ScrollArea className='h-[81.5dvh]'>{children}</ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
