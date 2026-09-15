import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionValue, useSpring } from "framer-motion"

// A button/link that subtly follows the cursor (magnetic effect) on desktop.
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

  const motionProps = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    whileTap: { scale: 0.96 },
    className,
    ...rest,
  }

  if (to) {
    return (
      <motion.div {...motionProps} className={`inline-block ${className}`}>
        <Link to={to} onClick={onClick} className="w-full h-full flex items-center justify-center">
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        onClick={onClick}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...motionProps}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
