'use client'
import React, { useState, useEffect, useRef } from 'react'

export const LennyFace = () => {
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 0)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`lg:flex items-center absolute top-1/2 -translate-y-1/2 right-4 select-none not-sr-only hidden transition-transform duration-300 ${
        visible ? '-translate-y-1/2 opacity-100' : 'translate-y-full opacity-0'
      }`}
      onClick={() => setClicked(!clicked)}
      onDoubleClick={e => e.stopPropagation()}
    >
      {clicked && <p className='mb-1.5 mr-1'>╭∩╮</p>}
      <div className='flex items-center space-x-1.5'>
        <Eye />
        <span className={`${clicked ? 'rotate-180 mt-5' : 'mt-2.5'} transition-all`}>‿</span>
        <Eye />
      </div>
    </div>
  )
}

const Eye = () => {
  const rafRef = useRef<number | null>(null)
  const pupilRef = useRef({ x: 50, y: 50 })
  const targetRef = useRef({ x: 50, y: 50 })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const width = 40
    const height = 40
    if (!canvas || !ctx) return

    // Set canvas size
    canvas.width = 40
    canvas.height = 40

    // Calculate offsets and limits
    const borderWidth = 2
    const pupilRadius = Math.min(width, height) * 0.15
    const eyeRadius = Math.min(width, height) / 2 - borderWidth

    // Render eye
    const drawEye = () => {
      ctx.clearRect(0, 0, width, height)

      // Eye border
      ctx.strokeStyle = '#898989'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.ellipse(width / 2, height / 2, eyeRadius, eyeRadius, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Pupil
      ctx.fillStyle = '#898989'

      // Calculate constrained pupil position
      const pupilX = (pupilRef.current.x / 100) * width
      const pupilY = (pupilRef.current.y / 100) * height

      ctx.beginPath()
      ctx.ellipse(pupilX, pupilY, pupilRadius, pupilRadius, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // Animation
    const animate = () => {
      const current = pupilRef.current
      const target = targetRef.current

      current.x += (target.x - current.x) * 0.1
      current.y += (target.y - current.y) * 0.1

      drawEye()
      rafRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const { signal, abort } = new AbortController()

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const eyeCenterX = rect.left + rect.width / 2
      const eyeCenterY = rect.top + rect.height / 2

      const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX)

      const maxMovementRadius = rect.width / 4
      const distanceFromCenter = Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY)

      const clampedDistance = Math.min(distanceFromCenter, maxMovementRadius)

      const x = 50 + ((Math.cos(angle) * clampedDistance) / (rect.width / 2)) * 45
      const y = 50 + ((Math.sin(angle) * clampedDistance) / (rect.height / 2)) * 45

      targetRef.current = { x: Math.max(25, Math.min(75, x)), y: Math.max(25, Math.min(75, y)) }
    }

    const handleMouseLeave = () => (targetRef.current = { x: 50, y: 50 })

    window.addEventListener('mousemove', handleMouseMove, { signal })
    document.addEventListener('mouseleave', handleMouseLeave, { signal })

    return () => abort()
  }, [])

  return <canvas ref={canvasRef} className='size-3.5' />
}

Eye.displayName = 'Eye'
