import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  SlidersHorizontal,
  Compass,
  LayoutGrid,
  Film,
  Layers,
  Calendar,
} from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import GalleryCard from "../components/ui/GalleryCard"
import GallerySpotlight from "../components/gallery/GallerySpotlight"
import ParallaxGalleryGrid from "../components/gallery/ParallaxGalleryGrid"
import KineticMarquee from "../components/gallery/KineticMarquee"
import SEO from "../components/ui/SEO"
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  SPOTLIGHT_STORIES,
} from "../data/galleryData"
import { onImgError } from "../data/images"

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState("parallax") // "parallax" | "grid" | "marquee"
  const [activeLightbox, setActiveLightbox] = useState(null) // { item, imgIndex }

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory)

  // Lightbox handlers
  const openLightbox = (item, imgIndex = 0) => {
    setActiveLightbox({ item, imgIndex })
  }

  const closeLightbox = () => {
    setActiveLightbox(null)
  }

  const getCurrentImageSrc = () => {
    if (!activeLightbox) return ""
    const { item, imgIndex } = activeLightbox
    const all = [item.src, ...(item.alternateSrcs || [])]
    return all[imgIndex] || item.src
  }

  const showNextImage = useCallback(() => {
    if (!activeLightbox) return
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === activeLightbox.item.id
    )
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setActiveLightbox({
      item: filteredItems[nextIndex],
      imgIndex: 0,
    })
  }, [activeLightbox, filteredItems])

  const showPrevImage = useCallback(() => {
    if (!activeLightbox) return
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === activeLightbox.item.id
    )
    const prevIndex =
      (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setActiveLightbox({
      item: filteredItems[prevIndex],
      imgIndex: 0,
    })
  }, [activeLightbox, filteredItems])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightbox) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") showNextImage()
      if (e.key === "ArrowLeft") showPrevImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeLightbox, showNextImage, showPrevImage])

  return (
    <>
      <SEO
        title="School Gallery & Moments"
        path="/gallery"
        description="Experience the vibrant moments of learning, sports, culture, and achievements at Golden Crown School, Lashibi."
      />

      <PageBanner
        title="Campus Gallery"
        subtitle="Moments of scholarship, sportsmanship, and celebration at Golden Crown School."
        breadcrumb="Gallery"
      />

      <section className="py-12 lg:py-20 bg-crown-white dark:bg-[#0a1124] transition-colors relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-crown-gold/15 text-crown-blue dark:text-crown-gold border border-crown-gold/30 mb-3">
              <Sparkles size={14} className="text-crown-gold" />
              Dynamic Visual Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-crown-blue dark:text-white tracking-tight">
              Life at Golden Crown
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-slate-300">
              Immerse yourself in our classroom discoveries, athletic victories, and vibrant campus milestones.
            </p>
          </div>

          {/* 1. Cinematic Auto-Changing Spotlight Showcase */}
          <GallerySpotlight
            items={SPOTLIGHT_STORIES}
            onOpenLightbox={(spotlightItem) =>
              openLightbox({
                ...spotlightItem,
                caption: spotlightItem.description || spotlightItem.tagline,
              })
            }
          />

          {/* 2. Interactive Navigation Controls: View Mode + Categories */}
          <div className="sticky top-20 z-30 mb-10 p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
                {GALLERY_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                        isActive
                          ? "text-white dark:text-slate-900 shadow-md"
                          : "text-gray-600 dark:text-slate-300 hover:text-crown-blue dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-gradient-to-r from-crown-blue to-crown-blue-light dark:from-crown-gold dark:to-crown-gold-light rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {cat}
                    </button>
                  )
                })}
              </div>

              {/* View Switcher: Parallax Flow vs Standard Grid vs Kinetic Ribbon */}
              <div className="flex items-center self-end lg:self-auto gap-1 bg-gray-100 dark:bg-slate-800/90 p-1 rounded-xl border border-gray-200 dark:border-slate-700/60 flex-shrink-0">
                <button
                  onClick={() => setViewMode("parallax")}
                  aria-label="Parallax Flow Mode"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    viewMode === "parallax"
                      ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Compass size={14} />
                  <span>Parallax Motion</span>
                </button>

                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Curated Grid Mode"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <LayoutGrid size={14} />
                  <span>Masonry Grid</span>
                </button>

                <button
                  onClick={() => setViewMode("marquee")}
                  aria-label="Kinetic Ribbon Mode"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    viewMode === "marquee"
                      ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Film size={14} />
                  <span>Kinetic Ribbon</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Main Gallery Render Area */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              {viewMode === "parallax" && (
                <motion.div
                  key={`parallax-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full"
                >
                  <ParallaxGalleryGrid
                    items={filteredItems}
                    onSelectCard={(item, imgIndex) => openLightbox(item, imgIndex)}
                  />
                </motion.div>
              )}

              {viewMode === "grid" && (
                <motion.div
                  key={`grid-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredItems.map((item, idx) => (
                    <GalleryCard
                      key={item.id || idx}
                      item={item}
                      onClick={(cardItem, imgIndex) => openLightbox(cardItem, imgIndex)}
                    />
                  ))}
                </motion.div>
              )}

              {viewMode === "marquee" && (
                <motion.div
                  key={`marquee-${selectedCategory}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full"
                >
                  <div className="mb-6 text-center">
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                      Continuous smooth flowing film strip • Hover over any photo to pause and explore
                    </p>
                  </div>
                  <KineticMarquee
                    items={filteredItems}
                    onSelectCard={(item, imgIndex) => openLightbox(item, imgIndex)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. Full-Featured Cinematic Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Lightbox Bar */}
            <div
              className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-crown-gold text-slate-950">
                  {activeLightbox.item.category || "Golden Crown School"}
                </span>
                {activeLightbox.item.year && (
                  <span className="text-xs text-white/70 font-mono flex items-center gap-1">
                    <Calendar size={13} className="text-crown-gold" />
                    {activeLightbox.item.year}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeLightbox}
                  aria-label="Close fullscreen modal"
                  className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                showPrevImage()
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 z-40 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                showNextImage()
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 z-40 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              key={`${activeLightbox.item.id}-${activeLightbox.imgIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center z-30"
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black/50 border border-white/10 max-h-[70vh] flex items-center justify-center">
                <img
                  src={getCurrentImageSrc()}
                  onError={onImgError}
                  alt={activeLightbox.item.title || activeLightbox.item.caption}
                  className="max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption details below image */}
              <div className="w-full text-center mt-4 px-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {activeLightbox.item.title || activeLightbox.item.caption}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">
                  {activeLightbox.item.caption}
                </p>

                {/* Sub-image selection dots if card has alternates */}
                {activeLightbox.item.alternateSrcs && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="text-xs text-white/50 flex items-center gap-1 mr-1">
                      <Layers size={13} /> Angle:
                    </span>
                    {[activeLightbox.item.src, ...activeLightbox.item.alternateSrcs].map(
                      (_, subIdx) => (
                        <button
                          key={subIdx}
                          onClick={() =>
                            setActiveLightbox((prev) => ({
                              ...prev,
                              imgIndex: subIdx,
                            }))
                          }
                          className={`h-2 rounded-full transition-all ${
                            activeLightbox.imgIndex === subIdx
                              ? "w-6 bg-crown-gold"
                              : "w-2 bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
