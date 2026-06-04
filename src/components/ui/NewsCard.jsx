import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { onImgError } from "../../data/images"

export default function NewsCard({ item, onOpen }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(13,71,161,0.15)" }}
      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          onError={onImgError}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-crown-gold text-crown-blue-dark text-xs font-semibold px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 mb-2">
          <Calendar size={14} className="text-crown-blue dark:text-crown-gold" />
          {item.date}
        </div>
        <h3 className="font-poppins font-semibold text-lg text-crown-blue dark:text-white mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 line-clamp-3 flex-1">{item.excerpt}</p>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-1 text-crown-blue dark:text-crown-gold font-medium text-sm hover:text-crown-gold transition-colors self-start"
        >
          Read More <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  )
}
