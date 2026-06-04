import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionValue, useSpring } from "framer-motion"

// A button/link that subtly follows the cursor (magnetic effect) on desktop.
// Renders as a router Link when `to` is given, an anchor when `href` is given,
// otherwise a button.
export default function MagneticButton({
  to,
  href,
  onClick,
  type,
  children,
  className = "",
  strength = 0.4,
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia("(pointer: coarse)").matches) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = to ? motion(Link) : href ? motion.a : motion.button

  const tagProps = to
    ? { to }
    : href
    ? { href }
    : { type: type || "button", onClick }

  return (
    <MotionTag
      ref={ref}
      {...tagProps}
      {...rest}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
