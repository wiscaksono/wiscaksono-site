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
  defaultSize?: number[]
  defaultCollapsed?: boolean
  sidebarTitle: string
  sidebarMenu: SidebarMenu[]
  children: React.ReactNode
}

export interface SidebarMenu {
  title: string
  href: string
  icon: JSX.Element
}

export const ResizableWrapper = ({ defaultSize = [16.63, 100 - 16.63], defaultCollapsed = false, sidebarTitle, sidebarMenu, children }: ResizableWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <TooltipProvider>
      <ResizablePanelGroup
        tagName='section'
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          console.log(sizes)
          document.cookie = `react-resizable-panels:size=${JSON.stringify(sizes)}; path=/`
          document.cookie = `kontol=${JSON.stringify(sizes)}; path=/`
        }}
      >
        <ResizablePanel
          defaultSize={defaultSize[0]}
          minSize={3}
          maxSize={50}
          tagName='aside'
          collapsible
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}; path=/`
          }}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}; path=/`
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
                          {!isCollapsed && title}
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
