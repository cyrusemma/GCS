import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ZoomIn, Sparkles, Layers } from "lucide-react"
import { onImgError } from "../../data/images"

export default function GalleryCard({ item, onClick, priority = false }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef(null)

  const allImages = [item.src, ...(item.alternateSrcs || [])]
  const hasMultipleImages = allImages.length > 1

  // Auto-cycle through alternate angles when hovered
  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % allImages.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [isHovered, hasMultipleImages, allImages.length])

  // Reset to original image when hover ends
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
    setActiveImgIndex(0)
  }

  // 3D Tilt calculation based on mouse coordinates
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Max tilt angle: 7 degrees
    const rX = ((y - centerY) / centerY) * -7
    const rY = ((x - centerX) / centerX) * 7
    setRotateX(rX)
    setRotateY(rY)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative mb-6 group select-none"
    >
      <button
        type="button"
        onClick={() => onClick && onClick(item, activeImgIndex)}
        aria-label={`View larger image: ${item.caption || item.title}`}
        className="w-full text-left relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200/80 dark:border-slate-700/60 block"
      >
        {/* Aspect ratio frame with parallax image */}
        <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
          {allImages.map((src, idx) => (
            <motion.img
              key={`${src}-${idx}`}
              src={src}
              onError={onImgError}
              alt={item.caption || item.title}
              loading={priority ? "eager" : "lazy"}
              initial={false}
              animate={{
                opacity: activeImgIndex === idx ? 1 : 0,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.7, ease: "easeOut" },
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}

          {/* Top category & multiple image pill badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md text-white border border-white/10 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-crown-gold" />
              {item.tag || item.category}
            </span>

            {hasMultipleImages && (
              <span className="px-2 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-crown-gold border border-crown-gold/20 flex items-center gap-1">
                <Layers size={12} />
                <span>{allImages.length} Views</span>
              </span>
            )}
          </div>

          {/* Hover overlay with zoom icon and title */}
          <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/90 via-crown-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-4 sm:p-5 z-20">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-crown-gold text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>{item.category}</span>
              </span>
              <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <ZoomIn size={16} />
              </div>
            </div>
            <h4 className="text-white font-bold text-base sm:text-lg drop-shadow line-clamp-1">
              {item.title || item.caption}
            </h4>
            <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 mt-0.5 opacity-90">
              {item.caption}
            </p>
          </div>
        </div>

        {/* Bottom card info footer (visible always for clean editorial aesthetic) */}
        <div className="p-4 bg-white dark:bg-slate-800/90 transition-colors">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-crown-blue dark:group-hover:text-crown-gold transition-colors">
              {item.title || item.caption}
            </h4>
            {item.year && (
              <span className="text-xs text-gray-400 dark:text-slate-400 font-mono">
                {item.year}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1 mt-1">
            {item.caption}
          </p>

          {/* Multi-image indicator dots */}
          {hasMultipleImages && (
            <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/50">
              {allImages.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeImgIndex === dotIdx
                      ? "w-5 bg-crown-gold"
                      : "w-1.5 bg-gray-300 dark:bg-slate-600"
                  }`}
                />
              ))}
              <span className="text-[10px] text-gray-400 dark:text-slate-500 ml-auto font-medium">
                Hover to cycle
              </span>
            </div>
          )}
        </div>
      </button>
    </motion.div>
  )
}
