"use client"

import { useCountUp } from "@/hooks/useCountUp"

interface AnimatedStatProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  duration?: number
  className?: string
}

export function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
  className = "",
}: AnimatedStatProps) {
  const { count, ref } = useCountUp({
    end: value,
    duration,
    prefix,
    suffix,
  })

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{count}</div>
      <div className="text-lg text-gray-600 font-medium">{label}</div>
    </div>
  )
}
