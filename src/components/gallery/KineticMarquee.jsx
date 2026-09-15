import { useState } from "react"
import { motion } from "framer-motion"
import { ZoomIn } from "lucide-react"
import { onImgError } from "../../data/images"

export default function KineticMarquee({ items = [], onSelectCard }) {
  const [isPaused, setIsPaused] = useState(false)

  const half = Math.ceil(items.length / 2)
  const row1 = [...items.slice(0, half), ...items.slice(0, half), ...items.slice(0, half)]
  const row2 = [...items.slice(half), ...items.slice(half), ...items.slice(half)]

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden py-8 space-y-6 select-none"
    >
      {/* Side Vignette Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-[#0a1124] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-[#0a1124] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Sliding Left */}
      <motion.div
        animate={{
          x: isPaused ? undefined : ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
        className="flex gap-5 w-max"
      >
        {row1.map((item, idx) => (
          <button
            key={`row1-${item.id || idx}-${idx}`}
            onClick={() => onSelectCard(item, 0)}
            aria-label={`View photo ${item.title || item.caption}`}
            className="group relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 text-left border border-black/5 dark:border-white/10"
          >
            <img
              src={item.src}
              alt={item.title || item.caption}
              onError={onImgError}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <span className="text-xs text-crown-gold font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <ZoomIn size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h5 className="text-white font-semibold text-sm line-clamp-1 mt-0.5">
                {item.title || item.caption}
              </h5>
            </div>
          </button>
        ))}
      </motion.div>

      {/* Row 2: Sliding Right */}
      <motion.div
        animate={{
          x: isPaused ? undefined : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
        className="flex gap-5 w-max"
      >
        {row2.map((item, idx) => (
          <button
            key={`row2-${item.id || idx}-${idx}`}
            onClick={() => onSelectCard(item, 0)}
            aria-label={`View photo ${item.title || item.caption}`}
            className="group relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 text-left border border-black/5 dark:border-white/10"
          >
            <img
              src={item.src}
              alt={item.title || item.caption}
              onError={onImgError}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <span className="text-xs text-crown-gold font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <ZoomIn size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h5 className="text-white font-semibold text-sm line-clamp-1 mt-0.5">
                {item.title || item.caption}
              </h5>
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  )
}
