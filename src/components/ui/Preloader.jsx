import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// First-load preloader: a crown that draws itself in (SVG path animation),
// then fills with gold, with the school name fading in beneath it.
export default function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Lock scroll while the preloader is visible.
    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ""
    }, 2300)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-crown-blue-dark"
        >
          <svg width="120" height="120" viewBox="0 0 64 64" aria-hidden="true">
            {/* Crown outline draws first */}
            <motion.path
              d="M12 44 L12 25 L23 34 L32 18 L41 34 L52 25 L52 44 Z"
              fill="transparent"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
            <motion.rect
              x="12" y="44" width="40" height="8" rx="2"
              fill="transparent" stroke="#D4AF37" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Gold fill fades in once the outline is drawn */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <path
                d="M12 44 L12 25 L23 34 L32 18 L41 34 L52 25 L52 44 Z"
                fill="#D4AF37"
              />
              <rect x="12" y="44" width="40" height="8" rx="2" fill="#E8C84A" />
              <circle cx="12" cy="23" r="3" fill="#E8C84A" />
              <circle cx="32" cy="16" r="3.4" fill="#F5F7FA" />
              <circle cx="52" cy="23" r="3" fill="#E8C84A" />
            </motion.g>
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-6 font-poppins font-bold text-white text-xl tracking-wide"
          >
            Golden Crown School
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mt-1 text-crown-gold text-sm"
          >
            Hardwork and Integrity
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
