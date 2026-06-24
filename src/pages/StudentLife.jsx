import { motion } from "framer-motion"
import { MessagesSquare, Monitor, Drama, Award } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"
import { IMAGES, onImgError } from "../data/images"

const clubs = [
  { Icon: MessagesSquare, name: "Debate Club", text: "Building confident speakers and sharp critical thinkers through structured debates and public speaking.", image: IMAGES.club_debate },
  { Icon: Monitor, name: "ICT Club", text: "Students gain hands-on digital skills, explore technology, and develop computing competencies.", image: IMAGES.club_ict },
  { Icon: Drama, name: "Cultural & Drama Club", text: "Acting, storytelling, Ghanaian cultural performances, and stage presentations that celebrate heritage.", image: IMAGES.club_drama },
]

const competitions = [
  { title: "BECE Excellence", text: "94% pass rate in 2024 with multiple distinctions, placing students in top senior high schools.", image: IMAGES.compete_bece },
  { title: "District Quiz Champions", text: "Winners of the Tema District inter-school general knowledge quiz.", image: IMAGES.compete_quiz },
  { title: "Academic Competitions", text: "Our students regularly participate in inter-school academic competitions, demonstrating their academic excellence.", image: IMAGES.compete_academic },
]

export default function StudentLife() {
  return (
    <>
      <SEO
        title="Student Life"
        path="/student-life"
        description="Clubs, cultural activities, and student life at Golden Crown School, Lashibi — guided by our core values of Hardwork, Integrity, Discipline, Excellence, and Respect."
      />
      <PageBanner
        title="Student Life"
        subtitle="Learning extends far beyond the classroom at Golden Crown School."
        breadcrumb="Student Life"
      />

      {/* Core values statement */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title="Life at Golden Crown School" />
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-lg">
            Student life at Golden Crown School is guided by our core values of{" "}
            <strong className="text-crown-blue dark:text-crown-gold">Hardwork, Integrity, Discipline, Excellence, and Respect</strong>.
            Our students participate in cultural events, academic competitions, and club activities that complement their classroom learning.
          </p>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Clubs & Activities" subtitle="Something for every interest and talent." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map(({ Icon, name, text, image }) => (
              <motion.div
                key={name}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,71,161,0.18)" }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col"
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image}
                    onError={onImgError}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/85 via-crown-blue/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 h-12 w-12 rounded-xl bg-crown-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon className="text-crown-blue-dark" size={24} />
                  </div>
                </div>
                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-poppins font-semibold text-lg text-crown-blue dark:text-white mb-2">{name}</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music & Arts */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            title="Music & Arts"
            subtitle="Nurturing creativity and cultural pride."
          />
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
            Our pupils explore traditional Ghanaian cultural dance, drawing, painting, and creative arts throughout
            the year. From vibrant Independence Day celebrations to Speech Day performances, the arts are woven
            into the life of the school — helping every child express themselves with confidence and pride in their heritage.
          </p>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Competitions & Awards" />
          <div className="grid sm:grid-cols-3 gap-6">
            {competitions.map(({ title, text, image }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(13,71,161,0.2)" }}
                className="relative rounded-2xl overflow-hidden shadow-md"
              >
                {/* Full-bleed image background */}
                <img
                  src={image}
                  onError={onImgError}
                  alt={title}
                  loading="lazy"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark via-crown-blue-dark/60 to-transparent" />
                {/* Content over image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-crown-gold shrink-0" size={20} />
                    <h4 className="font-poppins font-semibold text-white">{title}</h4>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
