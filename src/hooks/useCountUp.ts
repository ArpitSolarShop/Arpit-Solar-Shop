"use client"

import { useState, useEffect, useRef } from "react"

interface UseCountUpProps {
  end: number
  duration?: number
  startOnMount?: boolean
  prefix?: string
  suffix?: string
}

export function useCountUp({ end, duration = 2000, startOnMount = true, prefix = "", suffix = "" }: UseCountUpProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || !startOnMount) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for speed-up effect (cubic-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, startOnMount, isVisible])

  return { count: `${prefix}${count.toLocaleString()}${suffix}`, ref: elementRef }
}
