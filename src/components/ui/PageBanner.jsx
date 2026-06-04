import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"

// Blue hero banner with page title + breadcrumb, reused on all inner pages.
export default function PageBanner({ title, subtitle, breadcrumb }) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-crown-blue overflow-hidden">
      {/* Building backdrop with deep blue overlay */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.building}
          onError={onImgError}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-crown-blue/85" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block h-1 w-12 rounded-full bg-crown-gold mb-4" />
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            {title}
          </h1>
          {subtitle && <p className="mt-3 text-white/80 max-w-2xl mx-auto">{subtitle}</p>}

          <nav
            aria-label="Breadcrumb"
            className="mt-5 flex items-center justify-center gap-1 text-sm text-white/70"
          >
            <Link to="/" className="hover:text-crown-gold">Home</Link>
            <ChevronRight size={14} />
            <span className="text-crown-gold">{breadcrumb || title}</span>
          </nav>
        </motion.div>
      </div>
    </section>
  )
}
