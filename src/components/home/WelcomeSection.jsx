import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"

export default function WelcomeSection() {
  return (
    <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block h-1 w-12 rounded-full bg-crown-gold mb-4" />
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-crown-blue dark:text-white mb-5">
            A Legacy of Excellence Since 2004
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-slate-300 leading-relaxed">
            <p>
              Golden Crown School is a private basic school in Lashibi, within the Tema
              Metropolitan area of Greater Accra, Ghana. Since opening our doors in 2004, we have
              nurtured thousands of young learners from Creche through Junior High School, guided
              always by our enduring motto: <strong className="text-crown-blue">Hardwork and Integrity</strong>.
            </p>
            <p>
              We combine a rigorous, GES-aligned academic programme with strong moral and character
              education. Our experienced teachers, safe campus, and warm community help every child
              grow in confidence, discipline, and a genuine love for learning.
            </p>
            <p>
              From early literacy and numeracy to outstanding BECE results, we are committed to
              helping each pupil discover their potential and take proud steps toward a bright
              future.
            </p>
          </div>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-crown-blue dark:text-crown-gold font-semibold hover:text-crown-gold transition-colors"
          >
            Discover Our Story <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden border-4 border-crown-gold shadow-xl">
            <img
              src={ASSETS.building}
              onError={onImgError}
              alt="The Golden Crown School campus in Lashibi"
              loading="lazy"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 bg-crown-blue text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="font-poppins font-bold text-xl">21+ Years</p>
            <p className="text-xs text-crown-gold">of Educational Excellence</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
