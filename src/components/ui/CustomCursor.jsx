import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// A custom two-part cursor (dot + trailing ring) shown only on fine-pointer
// (desktop) devices. Grows when hovering interactive elements.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return
    setEnabled(true)
    document.body.classList.add("has-custom-cursor")

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target
      const interactive = el.closest("a, button, input, textarea, select, [role='button'], label")
      setHovering(Boolean(interactive))
    }
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", enter)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", enter)
      document.body.classList.remove("has-custom-cursor")
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed top-0 left-0 z-[80] -ml-1 -mt-1"
      >
        <motion.div
          animate={{ scale: hovering ? 0.5 : 1, opacity: hidden ? 0 : 1 }}
          className="h-2 w-2 rounded-full bg-crown-gold"
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ translateX: ringX, translateY: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[80] -ml-4 -mt-4"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.8 : 1,
            opacity: hidden ? 0 : hovering ? 1 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-8 w-8 rounded-full border-2 border-crown-gold"
        />
      </motion.div>
    </>
  )
}
