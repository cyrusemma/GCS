import { motion } from "framer-motion"
import { GraduationCap, Users, BookOpen, Shield, Trophy, Heart } from "lucide-react"
import SectionTitle from "../ui/SectionTitle"
import { IMAGES, onImgError } from "../../data/images"

const reasons = [
  { Icon: GraduationCap, title: "Quality Education", text: "A rigorous, GES-aligned curriculum that builds strong academic foundations from Creche to JHS.", image: IMAGES.why_education },
  { Icon: Users, title: "Experienced Teachers", text: "Dedicated, well-trained teachers who know each child by name and nurture their growth.", image: IMAGES.why_teachers },
  { Icon: BookOpen, title: "Rich Curriculum", text: "A balanced programme of academics, ICT, languages, creative arts, and character formation.", image: IMAGES.why_curriculum },
  { Icon: Shield, title: "Safe Environment", text: "A secure, well-supervised campus where pupils feel protected, respected, and cared for.", image: IMAGES.why_safe },
  { Icon: Trophy, title: "Award-Winning School", text: "Consistently strong BECE results and proud winners of inter-school competitions.", image: IMAGES.why_awards },
  { Icon: Heart, title: "Nurturing Community", text: "A warm school family where parents, teachers, and pupils work together for every child.", image: IMAGES.why_community },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Why Choose Golden Crown?"
          subtitle="Six reasons families across Lashibi and Tema trust us with their children's education."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map(({ Icon, title, text, image }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,71,161,0.18)" }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col"
            >
              {/* Image header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={image}
                  onError={onImgError}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/80 via-crown-blue/40 to-transparent" />
                {/* Icon pill */}
                <div className="absolute bottom-4 left-4 h-12 w-12 rounded-xl bg-crown-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Icon className="text-crown-blue-dark" size={24} />
                </div>
              </div>
              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-poppins font-semibold text-lg text-crown-blue dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

