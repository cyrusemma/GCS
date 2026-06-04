import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

// A gold (then blue) panel that sweeps across the screen on each route change.
export default function RouteCurtain() {
  const { pathname } = useLocation()
  const [sweeping, setSweeping] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    // Don't sweep on the very first load (the preloader handles that).
    if (first.current) {
      first.current = false
      return
    }
    setSweeping(true)
    const timer = setTimeout(() => setSweeping(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {sweeping && (
        <>
          <motion.div
            key={`gold-${pathname}`}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-crown-gold pointer-events-none"
          />
          <motion.div
            key={`blue-${pathname}`}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            className="fixed inset-0 z-[89] bg-crown-blue pointer-events-none"
          />
        </>
      )}
    </AnimatePresence>
  )
}
