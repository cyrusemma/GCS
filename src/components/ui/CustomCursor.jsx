import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Sparkles } from "lucide-react"

/**
 * Royal Crown Radiant Cursor:
 * - Fluid, zero-latency motion
 * - Shows a sleek golden precision core
 * - Dynamic trailing halo with subtle shimmer
 * - Interactive magnetic expansion on buttons & links
 * - "Explore" sparkle badge on cards & gallery photos
 * - Tactile ripple wave on click
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hoverType, setHoverType] = useState(null) // 'link' | 'card' | 'input' | null
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [ripples, setRipples] = useState([])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Fast, natural spring response
  const trailX = useSpring(mouseX, { stiffness: 400, damping: 25, mass: 0.3 })
  const trailY = useSpring(mouseY, { stiffness: 400, damping: 25, mass: 0.3 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    setEnabled(true)
    document.body.classList.add("has-custom-cursor")

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const target = e.target
      if (!target) return

      // Detect hover type for context-aware cursor
      if (target.closest("input, textarea, select")) {
        setHoverType("input")
      } else if (target.closest("[data-cursor='card'], .gallery-card, .group")) {
        setHoverType("card")
      } else if (target.closest("a, button, [role='button'], label, [tabindex]:not([tabindex='-1'])")) {
        setHoverType("link")
      } else {
        setHoverType(null)
      }
    }

    const handleMouseDown = (e) => {
      setClicking(true)
      const id = Date.now()
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    }

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

  const isCard = hoverType === "card"
  const isLink = hoverType === "link"
  const isInput = hoverType === "input"
  const isHovered = isLink || isCard

  return (
    <>
      {/* 1. Precision Core Pointer (Immediate response) */}
      <motion.div
        aria-hidden="true"
        style={{ translateX: mouseX, translateY: mouseY }}
        className="pointer-events-none fixed top-0 left-0 z-[120] -ml-1.5 -mt-1.5"
      >
        <motion.div
          animate={{
            scale: hidden ? 0 : isInput ? 0.3 : isCard ? 0 : clicking ? 0.6 : isLink ? 1.4 : 1,
            opacity: hidden ? 0 : isInput ? 0.4 : isCard ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="h-3 w-3 rounded-full bg-crown-gold shadow-[0_0_12px_#D4AF37,0_0_20px_rgba(212,175,55,0.6)]"
        />
      </motion.div>

      {/* 2. Trailing Glassmorphic Halo with Contextual Morphing */}
      <motion.div
        aria-hidden="true"
        style={{ translateX: trailX, translateY: trailY }}
        className="pointer-events-none fixed top-0 left-0 z-[119] -ml-6 -mt-6"
      >
        <motion.div
          animate={{
            scale: hidden
              ? 0
              : isInput
              ? 0.4
              : isCard
              ? 1.8
              : isLink
              ? 1.5
              : clicking
              ? 0.75
              : 1,
            opacity: hidden ? 0 : isInput ? 0.3 : 1,
            borderColor: isHovered ? "rgba(212, 175, 55, 0.95)" : "rgba(212, 175, 55, 0.45)",
            backgroundColor: isCard
              ? "rgba(13, 71, 161, 0.85)"
              : isLink
              ? "rgba(212, 175, 55, 0.18)"
              : "rgba(212, 175, 55, 0.04)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className={`h-12 w-12 rounded-full border border-crown-gold/50 backdrop-blur-[2px] shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center transition-colors`}
        >
          {/* Card view: Sparkle icon inside */}
          {isCard && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-crown-gold flex items-center justify-center"
            >
              <Sparkles size={16} className="animate-spin-slow" />
            </motion.div>
          )}

          {/* Link view: Subtle crosshair or inner diamond */}
          {isLink && !isCard && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-1.5 w-1.5 rounded-sm bg-crown-gold rotate-45 shadow-[0_0_6px_#D4AF37]"
            />
          )}
        </motion.div>
      </motion.div>

      {/* 3. Ripple waves radiating from click position */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ left: ripple.x, top: ripple.y }}
          className="pointer-events-none fixed -ml-6 -mt-6 h-12 w-12 rounded-full border-2 border-crown-gold z-[118]"
        />
      ))}
    </>
  )
}
