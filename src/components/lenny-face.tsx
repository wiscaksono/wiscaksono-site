'use client'
import React, { useState, useEffect, useRef, memo, useCallback } from 'react'

interface PupilPosition {
  x: number
  y: number
}

export const LennyFace = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <div className='lg:flex items-center absolute top-1/2 -translate-y-1/2 right-4 select-none not-sr-only hidden' onClick={() => setClicked(!clicked)}>
      {clicked && <p className='mb-1.5 mr-2'>╭∩╮</p>}
      <div className='flex items-center space-x-1.5'>
        <Eye />
        <span className='mt-1.5'>‿</span>
        <Eye />
      </div>
    </div>
  )
}

const Eye = memo(() => {
  const [pupilPosition, setPupilPosition] = useState<PupilPosition>({ x: 50, y: 50 })
  const eyeRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const targetPositionRef = useRef<PupilPosition>({ x: 50, y: 50 })

  useEffect(() => {
    const animate = () => {
      setPupilPosition(prev => {
        const dx = (targetPositionRef.current.x - prev.x) * 0.1
        const dy = (targetPositionRef.current.y - prev.y) * 0.1
        return {
          x: prev.x + dx,
          y: prev.y + dy
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      updatePupilPosition(event.clientX, event.clientY)
    }

    const handleMouseLeave = () => {
      targetPositionRef.current = { x: 50, y: 50 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const updatePupilPosition = useCallback((mouseX: number, mouseY: number) => {
    if (!eyeRef.current) return

    const eyeRect = eyeRef.current.getBoundingClientRect()
    const eyeCenterX = eyeRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top + eyeRect.height / 2

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX)
    const distance = Math.min(eyeRect.width / 4, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY))

    const x = 50 + ((Math.cos(angle) * distance) / (eyeRect.width / 2)) * 100
    const y = 50 + ((Math.sin(angle) * distance) / (eyeRect.height / 2)) * 100

    targetPositionRef.current = { x, y }
  }, [])

  return (
    <div ref={eyeRef} className='size-3.5 border rounded-full bg-transparent border-[#898989] grid place-items-center'>
      <div className='relative w-[50%] h-[50%] rounded-full'>
        <div
          className='size-1 absolute bg-white/50 rounded-full'
          style={{
            top: `${pupilPosition.y}%`,
            left: `${pupilPosition.x}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
    </div>
  )
})
Eye.displayName = 'Eye'
