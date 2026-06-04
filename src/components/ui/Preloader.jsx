import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ASSETS, onImgError } from "../../data/images"

// First-load preloader: a gold ring draws itself around the real school badge
// while the badge is revealed with an upward wipe, then the name fades in.
export default function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ""
    }, 2400)
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
          <div className="relative h-40 w-40 flex items-center justify-center">
            {/* Gold ring that draws itself around the badge */}
            <svg className="absolute inset-0" viewBox="0 0 160 160" aria-hidden="true">
              <motion.circle
                cx="80"
                cy="80"
                r="76"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{ transformOrigin: "center" }}
              />
            </svg>

            {/* The real badge, revealed with an upward wipe + scale */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 0.85, opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-28 w-28 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg"
            >
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School badge"
                className="h-24 w-24 object-contain"
              />
            </motion.div>

            {/* Shimmer sweep across the badge */}
            <motion.div
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "120%", opacity: [0, 0.7, 0] }}
              transition={{ duration: 1, delay: 1.3, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
            />
          </div>

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
