'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

import { Header } from './header'
import { debounceFunc } from '@/lib/utils'

export const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLElement>(null)

  const [dragging, setDragging] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isMobile) {
        setDragging(true)
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y })
      }
    },
    [isMobile, position]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        const newX = e.clientX - offset.x
        const newY = e.clientY - offset.y
        setPosition({ x: newX, y: newY })
      }
    },
    [dragging, offset]
  )

  const handleMouseUp = () => setDragging(false)

  const toggleFullscreen = useCallback(() => {
    if (!fullscreen) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen?.()
    }
    setFullscreen(prev => !prev)
  }, [fullscreen])

  const updateMobileState = useCallback(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches
    if (mobile && !isMobile) {
      setPosition({ x: 0, y: 0 })
    }
    setIsMobile(mobile)
  }, [isMobile])

  useEffect(() => {
    const handleResize = debounceFunc(updateMobileState, 200)
    window.addEventListener('resize', handleResize)
    updateMobileState() // Initial check

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateMobileState])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setFullscreen(false)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <main
      ref={containerRef}
      className={`z-30 flex flex-col overflow-hidden bg-gradient-to-tr from-[#080808] to-[#242424] text-[#898989]/90 lg:h-[80dvh] lg:w-[80dvw] ${fullscreen ? 'h-dvh w-dvh rounded-none' : 'lg:rounded-2xl'}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: dragging ? 'none' : 'transform 0.2s ease-out' }}
      onDoubleClick={toggleFullscreen}
    >
      <Header onMouseDown={handleMouseDown} fullscreen={fullscreen} />
      {children}
    </main>
  )
}
