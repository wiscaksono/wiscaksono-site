'use client'

import React, { useEffect, useRef } from 'react'

interface ParticlesProps {
  quantity?: number
  size?: number
  vx?: number
  vy?: number
}

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
}

export const Particles = ({ quantity = 500, size = 0.4, vx = 0, vy = 0 }: ParticlesProps) => {
  const circles = useRef<Circle[]>([])
  const rafID = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  const createCircleParams = (): Circle => {
    const { w, h } = canvasSize.current
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.max(1, Math.floor(Math.random() * 2) + size),
      alpha: 0,
      targetAlpha: Number((Math.random() * 0.5 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2
    }
  }

  const drawCircle = (circle: Circle, update = false) => {
    const ctx = context.current
    if (!ctx) return

    ctx.save()
    ctx.translate(circle.translateX, circle.translateY)
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`
    ctx.fill()
    ctx.restore()

    if (!update) circles.current.push(circle)
  }

  const initCanvas = () => {
    const container = canvasContainerRef.current
    const canvas = canvasRef.current

    if (!canvas || !container) return

    // Reset circles
    circles.current = []

    // Set canvas dimensions
    canvasSize.current = {
      w: container.offsetWidth,
      h: container.offsetHeight
    }

    canvas.width = canvasSize.current.w * dpr
    canvas.height = canvasSize.current.h * dpr
    canvas.style.width = `${canvasSize.current.w}px`
    canvas.style.height = `${canvasSize.current.h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)
    context.current = ctx

    // Initial particle generation
    for (let i = 0; i < quantity; i++) {
      const circle = createCircleParams()
      drawCircle(circle)
    }
  }

  const animate = () => {
    const ctx = context.current
    if (!ctx) return

    ctx.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)

    for (let i = circles.current.length - 1; i >= 0; i--) {
      const circle = circles.current[i]

      // Calculate edge distances
      const edgeDistances = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size
      ]

      const closestEdge = Math.min(...edgeDistances)
      const alphaModifier = Math.max(Math.min(closestEdge / 20, 1), 0)

      // Smooth alpha transition
      circle.alpha += alphaModifier > 0.5 ? (circle.alpha < circle.targetAlpha ? 0.02 : 0) : circle.targetAlpha * alphaModifier

      // Update position
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy

      drawCircle(circle, true)

      // Replace out-of-bounds particles
      if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
        circles.current.splice(i, 1)
        const newCircle = createCircleParams()
        drawCircle(newCircle)
      }
    }

    rafID.current = window.requestAnimationFrame(animate)
  }

  // Effect for canvas initialization and cleanup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { signal, abort } = new AbortController()

    context.current = canvas.getContext('2d')
    initCanvas()
    animate()

    const handleResize = () => initCanvas()
    window.addEventListener('resize', handleResize, { signal })

    return () => {
      if (rafID.current != null) window.cancelAnimationFrame(rafID.current)
      abort()
    }
  }, [])

  return (
    <div className='pointer-events-none w-dvw h-dvh absolute left-0 top-0' ref={canvasContainerRef} aria-hidden='true'>
      <canvas ref={canvasRef} className='size-full' />
    </div>
  )
}
