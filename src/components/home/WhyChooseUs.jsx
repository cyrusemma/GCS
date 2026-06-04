import { motion } from "framer-motion"
import { GraduationCap, Users, BookOpen, Shield, Trophy, Heart } from "lucide-react"
import SectionTitle from "../ui/SectionTitle"

const reasons = [
  { Icon: GraduationCap, title: "Quality Education", text: "A rigorous, GES-aligned curriculum that builds strong academic foundations from Creche to JHS." },
  { Icon: Users, title: "Experienced Teachers", text: "Dedicated, well-trained teachers who know each child by name and nurture their growth." },
  { Icon: BookOpen, title: "Rich Curriculum", text: "A balanced programme of academics, ICT, languages, creative arts, and character formation." },
  { Icon: Shield, title: "Safe Environment", text: "A secure, well-supervised campus where pupils feel protected, respected, and cared for." },
  { Icon: Trophy, title: "Award-Winning School", text: "Consistently strong BECE results and proud winners of inter-school competitions." },
  { Icon: Heart, title: "Nurturing Community", text: "A warm school family where parents, teachers, and pupils work together for every child." },
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
          {reasons.map(({ Icon, title, text }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(13,71,161,0.15)" }}
              className="bg-white dark:bg-slate-800 rounded-xl p-7 border border-gray-100 dark:border-slate-700 shadow-sm text-center"
            >
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-crown-gold/20 flex items-center justify-center">
                <Icon className="text-crown-blue dark:text-crown-gold" size={30} />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-crown-blue dark:text-white mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
