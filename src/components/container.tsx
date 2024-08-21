'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Header } from './header'

export const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLElement>(null)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [fullscreen, setFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isMobile) {
      setDragging(true)
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const newX = e.clientX - offset.x
      const newY = e.clientY - offset.y
      requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY })
        if (containerRef.current) {
          containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`
        }
      })
    }
  }

  const handleMouseUpGlobal = () => {
    setDragging(false)
  }

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen?.()
      }
      setFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setFullscreen(false)
    }
  }

  const checkIfMobile = () => {
    const mobile = window.matchMedia('(max-width: 768px)').matches
    if (mobile && !isMobile) {
      // Reset position when switching to mobile view
      setPosition({ x: 0, y: 0 })
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(0px, 0px)`
      }
    }
    setIsMobile(mobile)
  }

  useEffect(() => {
    // Check if the device is mobile on mount and resize
    window.addEventListener('resize', checkIfMobile)
    checkIfMobile() // Initial check

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [isMobile])

  useEffect(() => {
    if (dragging && !isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUpGlobal)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUpGlobal)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUpGlobal)
    }
  }, [dragging, isMobile])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setFullscreen(false)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <main
      ref={containerRef}
      className={`z-30 flex h-dvh w-dvw flex-col overflow-hidden bg-gradient-to-tr from-[#080808] to-[#242424] text-[#898989]/90 lg:h-[80dvh] lg:w-[80dvw] ${fullscreen ? 'rounded-none' : 'lg:rounded-2xl'}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onDoubleClick={toggleFullscreen}
    >
      <Header onMouseDown={handleMouseDown} />
      {children}
    </main>
  )
}
