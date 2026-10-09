import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Premium Royal Gold Custom Cursor:
// Features a luminous core with a trailing golden aura ring,
// smooth expansion on hover, and tactile click compression.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Silky smooth spring physics with high responsiveness
  const smoothX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.5 })
  const smoothY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    setEnabled(true)
    document.body.classList.add("has-custom-cursor")

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const el = e.target
      const interactive = el?.closest(
        "a, button, input, textarea, select, [role='button'], label, [tabindex]:not([tabindex='-1'])"
      )
      setHovering(Boolean(interactive))
    }

    const handleMouseDown = () => setClicking(true)
    const handleMouseUp = () => setClicking(false)
    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.classList.remove("has-custom-cursor")
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <>
      {/* 1. Luminous Golden Core (instant tracking) */}
      <motion.div
        aria-hidden="true"
        style={{ translateX: mouseX, translateY: mouseY }}
        className="pointer-events-none fixed top-0 left-0 z-[100] -ml-1.5 -mt-1.5"
      >
        <motion.div
          animate={{
            scale: hidden ? 0 : clicking ? 0.6 : hovering ? 1.4 : 1,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="h-3 w-3 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F4E07B] to-[#FFE894] shadow-[0_0_12px_rgba(212,175,55,0.9),0_0_24px_rgba(212,175,55,0.4)]"
        />
      </motion.div>

      {/* 2. Trailing Glassmorphic Golden Aura Ring */}
      <motion.div
        aria-hidden="true"
        style={{ translateX: smoothX, translateY: smoothY }}
        className="pointer-events-none fixed top-0 left-0 z-[99] -ml-5 -mt-5"
      >
        <motion.div
          animate={{
            scale: hidden ? 0 : clicking ? 0.75 : hovering ? 1.6 : 1,
            opacity: hidden ? 0 : hovering ? 1 : 0.75,
            borderColor: hovering ? "rgba(212, 175, 55, 0.95)" : "rgba(212, 175, 55, 0.55)",
            backgroundColor: hovering ? "rgba(212, 175, 55, 0.12)" : "rgba(212, 175, 55, 0.03)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="h-10 w-10 rounded-full border border-crown-gold/60 backdrop-blur-[0.5px] shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center justify-center"
        >
          {/* Subtle inner pulse ring on hover */}
          {hovering && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-crown-gold/60"
            />
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
