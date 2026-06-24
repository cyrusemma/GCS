import { motion } from "framer-motion"
import { MessagesSquare, Monitor, Drama, Award } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"

const clubs = [
  { Icon: MessagesSquare, name: "Debate Club", text: "Building confident speakers and sharp critical thinkers through structured debates and public speaking." },
  { Icon: Monitor, name: "ICT Club", text: "Students gain hands-on digital skills, explore technology, and develop computing competencies." },
  { Icon: Drama, name: "Cultural & Drama Club", text: "Acting, storytelling, Ghanaian cultural performances, and stage presentations that celebrate heritage." },
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
            {clubs.map(({ Icon, name, text }) => (
              <motion.div
                key={name}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(13,71,161,0.15)" }}
                className="bg-white dark:bg-slate-800 rounded-xl p-7 border border-gray-100 dark:border-slate-700 shadow-sm text-center"
              >
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-crown-gold/20 flex items-center justify-center">
                  <Icon className="text-crown-blue dark:text-crown-gold" size={30} />
                </div>
                <h3 className="font-poppins font-semibold text-lg text-crown-blue dark:text-white mb-2">{name}</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{text}</p>
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
          <div className="space-y-4">
            {[
              { title: "BECE Excellence", text: "94% pass rate in 2024 with multiple distinctions, placing students in top senior high schools." },
              { title: "District Quiz Champions", text: "Winners of the Tema District inter-school general knowledge quiz." },
              { title: "Academic Competitions", text: "Our students regularly participate in inter-school academic competitions, demonstrating their academic excellence." },
            ].map((a) => (
              <div key={a.title} className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
                <Award className="text-crown-gold shrink-0" size={28} />
                <div>
                  <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{a.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
