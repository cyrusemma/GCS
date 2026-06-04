import { motion } from "framer-motion"
import {
  FlaskConical, MessagesSquare, Music, Trophy, Drama, Tent,
  Users, Award, MapPin, Calendar,
} from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"
import { IMAGES, onImgError } from "../data/images"

const clubs = [
  { Icon: FlaskConical, name: "Science Club", text: "Experiments, discovery, and STEM challenges that spark curiosity." },
  { Icon: MessagesSquare, name: "Debate Club", text: "Building confident speakers and sharp critical thinkers." },
  { Icon: Music, name: "Music Club", text: "Choir, recorder, and instrumental training for all ages." },
  { Icon: Trophy, name: "Sports Club", text: "Football, athletics, and team games after school." },
  { Icon: Drama, name: "Drama Club", text: "Acting, storytelling, and stage performances." },
  { Icon: Tent, name: "Scouts & Girls' Guild", text: "Leadership, service, and outdoor skills." },
]

const sports = [
  { name: "Football", image: IMAGES.gallery_7 },
  { name: "Athletics", image: IMAGES.gallery_4 },
  { name: "Table Tennis", image: IMAGES.gallery_5 },
  { name: "Netball", image: IMAGES.gallery_2 },
  { name: "Basketball", image: IMAGES.gallery_3 },
]

const excursions = [
  { dest: "Kakum National Park", date: "Mar 2025", level: "Basic 4–6", image: IMAGES.gallery_10 },
  { dest: "Accra Science Museum", date: "Feb 2025", level: "JHS 1–3", image: IMAGES.academic_ict },
  { dest: "Tema Harbour Tour", date: "Nov 2024", level: "Basic 5–6", image: IMAGES.gallery_11 },
]

export default function StudentLife() {
  return (
    <>
      <SEO
        title="Student Life"
        path="/student-life"
        description="Clubs, sports, music and arts, excursions, and student leadership at Golden Crown School, Lashibi."
      />
      <PageBanner
        title="Student Life"
        subtitle="Learning extends far beyond the classroom at Golden Crown School."
        breadcrumb="Student Life"
      />

      {/* Clubs */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Clubs & Societies" subtitle="Something for every interest and talent." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map(({ Icon, name, text }) => (
              <motion.div
                key={name}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(13,71,161,0.15)" }}
                className="bg-crown-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-700"
              >
                <div className="h-12 w-12 rounded-full bg-crown-gold/20 flex items-center justify-center mb-4">
                  <Icon className="text-crown-blue dark:text-crown-gold-light" size={24} />
                </div>
                <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-1">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Sports" subtitle="Healthy bodies, strong teamwork, and a competitive spirit." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {sports.map((s) => (
              <div key={s.name} className="relative rounded-xl overflow-hidden group">
                <img
                  src={s.image}
                  onError={onImgError}
                  alt={s.name}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-crown-blue/40 flex items-end p-3">
                  <span className="text-white font-poppins font-semibold">{s.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music & Arts */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            title="Music & Arts"
            subtitle="Nurturing creativity and cultural pride."
          />
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
            Our pupils explore music, traditional Ghanaian cultural dance, drawing, painting, and
            creative arts throughout the year. From the school choir to vibrant Independence Day and
            Speech Day performances, the arts are woven into the life of the school — helping every
            child express themselves with confidence and pride in their heritage.
          </p>
        </div>
      </section>

      {/* Excursions */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Excursions" subtitle="Real-world learning beyond the school gates." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {excursions.map((e) => (
              <div key={e.dest} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                <img
                  src={e.image}
                  onError={onImgError}
                  alt={e.dest}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{e.dest}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={13} className="text-crown-gold" /> {e.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} className="text-crown-gold" /> {e.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership + Competitions */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div className="bg-crown-blue text-white rounded-2xl p-8">
            <Users className="text-crown-gold mb-4" size={34} />
            <h3 className="font-poppins font-semibold text-xl mb-3">Student Leadership</h3>
            <p className="text-white/85 text-sm leading-relaxed">
              Our prefect system gives senior pupils real responsibility — from the School Prefects
              to class monitors and club captains. The Student Representative Council gives every
              pupil a voice, teaching accountability, service, and leadership from an early age.
            </p>
          </div>
          <div>
            <SectionTitle title="Competitions & Awards" center={false} />
            <div className="space-y-4">
              {[
                { title: "BECE Excellence", text: "94% pass rate in 2024 with multiple distinctions." },
                { title: "District Quiz Champions", text: "Winners of the Tema District inter-school quiz." },
                { title: "Sports Medals", text: "Consistent podium finishes at zonal athletics." },
              ].map((a) => (
                <div key={a.title} className="flex gap-4 bg-crown-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-700">
                  <Award className="text-crown-gold shrink-0" size={28} />
                  <div>
                    <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{a.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
