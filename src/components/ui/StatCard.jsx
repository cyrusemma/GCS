import { useEffect, useRef, useState } from "react"

// Animated count-up stat. Counts when scrolled into view via IntersectionObserver.
export default function StatCard({ value, prefix = "", suffix = "", label }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 1600
    const start = performance.now()
    let raf
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-poppins font-bold text-4xl sm:text-5xl text-crown-gold">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-white/85 text-sm sm:text-base font-medium">{label}</div>
    </div>
  )
}
