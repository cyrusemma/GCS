import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Maximize2 } from "lucide-react"
import { onImgError } from "../../data/images"

export default function GallerySpotlight({ items = [], onOpenLightbox }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const activeItem = items[currentIndex] || items[0]

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setProgress(0)
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setProgress(0)
  }, [items.length])

  // Autoplay timer with visual progress bar
  useEffect(() => {
    if (!isPlaying || items.length <= 1) return

    const stepMs = 50
    const totalDuration = 5500
    const increment = (stepMs / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          nextSlide()
          return 0
        }
        return old + increment
      })
    }, stepMs)

    return () => clearInterval(timer)
  }, [isPlaying, items.length, nextSlide])

  if (!items.length) return null

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-white/10 mb-16 group">
      {/* Background Image Container with Crossfade */}
      <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id || activeItem.src}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.src}
              alt={activeItem.title || activeItem.caption}
              onError={onImgError}
              className="w-full h-full object-cover"
            />
            {/* Multi-layer Gradient Vignette for cinematic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-crown-gold">
            <Sparkles size={15} className="animate-spin-slow text-crown-gold" />
            <span>Featured Spotlight</span>
            <span className="w-1.5 h-1.5 rounded-full bg-crown-gold" />
            <span className="text-white/90 font-normal">{activeItem.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 hover:text-crown-gold hover:bg-black/60 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(activeItem)}
              aria-label="Expand image in lightbox"
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 hover:text-crown-gold hover:bg-black/60 transition-colors"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10 z-20">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id || activeItem.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 text-crown-gold text-xs sm:text-sm font-medium tracking-wide uppercase mb-1.5">
                  <span>{activeItem.tagline || activeItem.category}</span>
                  {activeItem.year && (
                    <>
                      <span>•</span>
                      <span className="text-white/60">{activeItem.year}</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-md mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 max-w-2xl font-light leading-relaxed">
                  {activeItem.description || activeItem.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls & Thumbnail Dots */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
            {/* Thumbnails preview strip */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              {items.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setProgress(0)
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`group/thumb relative h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                    currentIndex === idx
                      ? "border-crown-gold ring-2 ring-crown-gold/40 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.src}
                    alt=""
                    onError={onImgError}
                    className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                  />
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-crown-gold/20" />
                  )}
                </button>
              ))}
            </div>

            {/* Next / Previous arrows + slide counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70 font-mono tracking-widest">
                <span className="text-crown-gold font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
                {" / "}
                {String(items.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div
            className="h-full bg-gradient-to-r from-crown-gold via-crown-gold-light to-amber-300 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
