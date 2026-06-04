import { motion } from "framer-motion"
import { ZoomIn } from "lucide-react"
import { onImgError } from "../../data/images"

export default function GalleryCard({ item, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      aria-label={`View larger image: ${item.caption}`}
      className="group relative w-full overflow-hidden rounded-xl block"
    >
      <img
        src={item.src}
        onError={onImgError}
        alt={item.caption}
        loading="lazy"
        className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-crown-blue/0 group-hover:bg-crown-blue/60 transition-colors flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
        <ZoomIn className="text-white mb-2" size={28} />
        <span className="text-white text-sm font-medium px-3 text-center">{item.caption}</span>
      </div>
    </motion.button>
  )
}
