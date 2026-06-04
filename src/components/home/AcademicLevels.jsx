import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import SectionTitle from "../ui/SectionTitle"
import { IMAGES, onImgError } from "../../data/images"

const levels = [
  { name: "Creche & Nursery", badge: "Ages 1–3", image: IMAGES.academic_nursery, desc: "A safe, loving start where play and care build early skills." },
  { name: "Kindergarten", badge: "KG 1 & 2", image: IMAGES.academic_nursery, desc: "Foundations in literacy and numeracy through joyful discovery." },
  { name: "Primary", badge: "Basic 1–6", image: IMAGES.academic_primary, desc: "Solid academics and character formation for growing minds." },
  { name: "Junior High", badge: "JHS 1–3", image: IMAGES.academic_jhs, desc: "Focused BECE preparation and a launchpad to senior high." },
]

export default function AcademicLevels() {
  return (
    <section className="py-16 lg:py-24 bg-crown-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Academic Levels"
          subtitle="From first steps to BECE success — a clear pathway through every stage of basic education."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={lvl.image}
                  onError={onImgError}
                  alt={lvl.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-crown-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {lvl.badge}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-poppins font-semibold text-lg text-crown-blue mb-1">{lvl.name}</h3>
                <p className="text-sm text-gray-600 flex-1">{lvl.desc}</p>
                <Link
                  to="/academics"
                  className="mt-4 inline-flex items-center gap-1 text-crown-blue font-medium text-sm hover:text-crown-gold transition-colors"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
