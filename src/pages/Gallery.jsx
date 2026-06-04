import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import GalleryCard from "../components/ui/GalleryCard"
import SEO from "../components/ui/SEO"
import { IMAGES, onImgError } from "../data/images"

const photos = [
  { src: IMAGES.gallery_1, caption: "Our school campus", category: "Campus" },
  { src: IMAGES.gallery_2, caption: "A lively classroom session", category: "Classrooms" },
  { src: IMAGES.gallery_3, caption: "Pupils working together", category: "Classrooms" },
  { src: IMAGES.gallery_4, caption: "Annual sports day", category: "Sports" },
  { src: IMAGES.gallery_5, caption: "Primary class in action", category: "Classrooms" },
  { src: IMAGES.gallery_6, caption: "Reading and discovery", category: "Events" },
  { src: IMAGES.gallery_7, caption: "On the football field", category: "Sports" },
  { src: IMAGES.gallery_8, caption: "Creative arts and drawing", category: "Events" },
  { src: IMAGES.gallery_9, caption: "Graduation celebration", category: "Graduation" },
  { src: IMAGES.gallery_10, caption: "An educational excursion", category: "Excursions" },
  { src: IMAGES.gallery_11, caption: "The school building", category: "Campus" },
  { src: IMAGES.gallery_12, caption: "Inside a bright classroom", category: "Classrooms" },
]

const filters = ["All", "Campus", "Classrooms", "Sports", "Events", "Graduation", "Excursions"]

export default function Gallery() {
  const [filter, setFilter] = useState("All")
  const [lightbox, setLightbox] = useState(-1)

  const visible = filter === "All" ? photos : photos.filter((p) => p.category === filter)

  const showPrev = () => setLightbox((i) => (i - 1 + visible.length) % visible.length)
  const showNext = () => setLightbox((i) => (i + 1) % visible.length)

  return (
    <>
      <SEO
        title="Gallery"
        path="/gallery"
        description="Photos of campus life, classrooms, sports, events, and graduation at Golden Crown School, Lashibi."
      />
      <PageBanner
        title="Gallery"
        subtitle="Moments of learning, play, and celebration at Golden Crown School."
        breadcrumb="Gallery"
      />

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-crown-blue text-white"
                    : "bg-crown-white dark:bg-slate-900 text-crown-blue dark:text-crown-gold-light hover:bg-crown-gold/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="masonry columns-1 sm:columns-2 lg:columns-3">
            {visible.map((p, i) => (
              <GalleryCard key={`${p.src}-${i}`} item={p} onClick={() => setLightbox(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox >= 0 && visible[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(-1)}
          >
            <button
              onClick={() => setLightbox(-1)}
              aria-label="Close gallery viewer"
              className="absolute top-5 right-5 text-white/80 hover:text-white"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showPrev() }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-8 text-white/80 hover:text-white h-12 w-12 flex items-center justify-center rounded-full bg-white/10"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext() }}
              aria-label="Next image"
              className="absolute right-3 sm:right-8 text-white/80 hover:text-white h-12 w-12 flex items-center justify-center rounded-full bg-white/10"
            >
              <ChevronRight size={28} />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full text-center"
            >
              <img
                src={visible[lightbox].src}
                onError={onImgError}
                alt={visible[lightbox].caption}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
              <figcaption className="text-white/90 mt-4">{visible[lightbox].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
