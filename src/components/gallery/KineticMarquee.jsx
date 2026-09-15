import { useState } from "react"
import { motion } from "framer-motion"
import { ZoomIn, Sparkles, Pause, Play } from "lucide-react"
import { onImgError } from "../../data/images"

export default function KineticMarquee({ items = [], onSelectCard }) {
  const [hoveredRow, setHoveredRow] = useState(null)
  const [isGlobalPaused, setIsGlobalPaused] = useState(false)

  // Partition items into 4 distinct thematic strips
  const chunkCount = 4
  const rows = Array.from({ length: chunkCount }, (_, i) => {
    // Select items for this row, fallback to cyclic distribution
    const rowItems = items.filter((_, idx) => idx % chunkCount === i)
    // If fewer items, double them so the loop is always seamless and long
    return [...rowItems, ...rowItems, ...rowItems, ...rowItems]
  })

  // Row configurations: alternating directions and slightly varying speeds for natural parallax flow
  const rowConfigs = [
    { label: "Campus & Academics", dir: "left", duration: 42, icon: "🏛️" },
    { label: "Sports & Athletics", dir: "right", duration: 48, icon: "⚽" },
    { label: "Culture & Creative Arts", dir: "left", duration: 38, icon: "🎨" },
    { label: "STEM, Innovation & Milestones", dir: "right", duration: 45, icon: "🎓" },
  ]

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Top Strip Control Header */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-crown-gold animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-slate-300">
            4-Band Kinetic Ribbon Flow • Hover any photo to pause
          </span>
        </div>

        <button
          onClick={() => setIsGlobalPaused(!isGlobalPaused)}
          aria-label={isGlobalPaused ? "Resume ribbon movement" : "Pause ribbon movement"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-crown-blue dark:text-crown-gold border border-gray-200 dark:border-slate-700 hover:bg-crown-gold/10 transition-colors shadow-sm"
        >
          {isGlobalPaused ? <Play size={14} /> : <Pause size={14} />}
          <span>{isGlobalPaused ? "Resume Movement" : "Pause All"}</span>
        </button>
      </div>

      {/* Side Vignette Fades for seamless infinite edges */}
      <div className="absolute top-12 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-crown-white dark:from-[#0a1124] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-12 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-crown-white dark:from-[#0a1124] to-transparent z-20 pointer-events-none" />

      {/* 4 Alternating Marquee Strips */}
      <div className="space-y-6 sm:space-y-8">
        {rows.map((rowItems, rowIndex) => {
          const config = rowConfigs[rowIndex]
          const isRowPaused = isGlobalPaused || hoveredRow === rowIndex
          const isLeft = config.dir === "left"

          return (
            <div
              key={`ribbon-row-${rowIndex}`}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
              className="relative"
            >
              {/* Optional Row Label Pill */}
              <div className="mb-2 pl-4 sm:pl-6 flex items-center gap-1.5">
                <span className="text-xs">{config.icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                  {config.label}
                </span>
              </div>

              {/* Scrolling Ribbon Track */}
              <motion.div
                animate={{
                  x: isRowPaused
                    ? undefined
                    : isLeft
                    ? ["0%", "-50%"]
                    : ["-50%", "0%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: config.duration,
                    ease: "linear",
                  },
                }}
                className="flex gap-4 sm:gap-6 w-max"
              >
                {rowItems.map((item, itemIdx) => (
                  <button
                    key={`strip-${rowIndex}-${item.id || itemIdx}-${itemIdx}`}
                    onClick={() => onSelectCard && onSelectCard(item, 0)}
                    aria-label={`View photo ${item.title || item.caption}`}
                    className="group relative w-64 sm:w-80 md:w-96 h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex-shrink-0 text-left border border-slate-200/80 dark:border-slate-700/60 bg-slate-900"
                  >
                    <img
                      src={item.src}
                      alt={item.title || item.caption}
                      onError={onImgError}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />

                    {/* Gradient Overlay & Metadata */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-100 transition-opacity p-4 sm:p-5 flex flex-col justify-between">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-crown-gold border border-crown-gold/30">
                          {item.category}
                        </span>
                        <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                          <ZoomIn size={16} />
                        </div>
                      </div>

                      {/* Bottom Title & Caption */}
                      <div>
                        <h4 className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-crown-gold transition-colors">
                          {item.title || item.caption}
                        </h4>
                        <p className="text-slate-300 text-xs line-clamp-1 mt-0.5 opacity-90 font-light">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
