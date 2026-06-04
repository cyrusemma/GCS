import { motion } from "framer-motion"
import {
  Target, Eye, Heart, Award, Shield, Star,
  School, MonitorSmartphone, Library, Trees, Trophy, FlaskConical,
} from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import StaffCard from "../components/ui/StaffCard"
import SEO from "../components/ui/SEO"
import { IMAGES, onImgError } from "../data/images"
import { leadership } from "../data/staff"

const milestones = [
  { year: "2004", text: "Golden Crown School is founded in Lashibi with a handful of pupils and a bold vision." },
  { year: "2008", text: "Expansion to a full primary school as enrolment steadily grows." },
  { year: "2012", text: "Junior High School division opens, completing the KG-to-JHS pathway." },
  { year: "2016", text: "First cohort records outstanding BECE results, placing students in top senior highs." },
  { year: "2020", text: "Campus modernisation and adoption of the GES standards-based curriculum." },
  { year: "2024", text: "New state-of-the-art ICT laboratory commissioned for all levels." },
  { year: "2025", text: "The school proudly celebrates 21 years of Hardwork and Integrity." },
]

const values = [
  { Icon: Award, label: "Hardwork" },
  { Icon: Shield, label: "Integrity" },
  { Icon: Star, label: "Discipline" },
  { Icon: Trophy, label: "Excellence" },
  { Icon: Heart, label: "Respect" },
]

const facilities = [
  { Icon: School, label: "Modern Classrooms", text: "Spacious, well-ventilated classrooms designed for active learning." },
  { Icon: MonitorSmartphone, label: "ICT Laboratory", text: "30 computer stations with internet for digital skills from KG to JHS." },
  { Icon: Library, label: "Library", text: "A growing collection of books to nurture a lifelong love of reading." },
  { Icon: Trees, label: "Playground", text: "Safe, supervised play areas for our youngest learners." },
  { Icon: Trophy, label: "Sports Field", text: "Open grounds for football, athletics, and physical education." },
  { Icon: FlaskConical, label: "Science Corner", text: "Hands-on resources that bring integrated science to life." },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        path="/about"
        description="Learn about Golden Crown School, Lashibi — established 2004. Our history, mission, vision, values, facilities, and leadership team."
      />
      <PageBanner
        title="About Our School"
        subtitle="A legacy of Hardwork and Integrity since 2004."
        breadcrumb="About"
      />

      {/* History timeline */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Journey"
            subtitle="Two decades of growth, guided by an unchanging commitment to excellence."
          />
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-crown-gold/40" />
            <ul className="space-y-8">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8 ${
                    i % 2 === 0 ? "" : "sm:[&>div:first-child]:col-start-2"
                  }`}
                >
                  <div className={`${i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:pl-8 sm:col-start-2"}`}>
                    <div className="bg-crown-white dark:bg-slate-900 rounded-xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
                      <span className="font-poppins font-bold text-crown-gold text-xl">{m.year}</span>
                      <p className="text-gray-600 dark:text-slate-300 text-sm mt-1">{m.text}</p>
                    </div>
                  </div>
                  <span className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-5 h-4 w-4 rounded-full bg-crown-blue border-4 border-white shadow" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Mission, Vision & Values" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-crown-blue text-white rounded-xl p-7">
              <Target className="text-crown-gold mb-4" size={34} />
              <h3 className="font-poppins font-semibold text-xl mb-3">Our Mission</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                To provide quality, affordable basic education that develops disciplined,
                hardworking, and confident learners ready to excel academically and contribute
                positively to society.
              </p>
            </div>
            <div className="bg-crown-gold text-crown-blue-dark rounded-xl p-7">
              <Eye className="mb-4" size={34} />
              <h3 className="font-poppins font-semibold text-xl mb-3">Our Vision</h3>
              <p className="text-crown-blue-dark/80 text-sm leading-relaxed">
                To be a leading basic school in the Tema Metropolis, recognised for academic
                excellence, strong character formation, and a nurturing learning community.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border-2 border-crown-blue rounded-xl p-7">
              <Heart className="text-crown-blue dark:text-crown-gold-light mb-4" size={34} />
              <h3 className="font-poppins font-semibold text-xl text-crown-blue dark:text-crown-gold-light mb-3">Our Values</h3>
              <ul className="space-y-2">
                {values.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-gray-700 dark:text-slate-300 text-sm">
                    <Icon size={18} className="text-crown-gold" /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Headteacher's message */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <img
              src={IMAGES.staff_1}
              onError={onImgError}
              alt="Headteacher of Golden Crown School"
              loading="lazy"
              className="rounded-2xl w-full h-80 object-cover shadow-lg border-4 border-crown-gold"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <span className="inline-block h-1 w-12 rounded-full bg-crown-gold mb-4" />
            <h2 className="font-poppins font-bold text-3xl text-crown-blue dark:text-crown-gold-light mb-4">
              Headteacher's Message
            </h2>
            <div className="border-l-4 border-crown-gold pl-5 space-y-3 text-gray-600 dark:text-slate-300 leading-relaxed">
              <p>
                "Welcome to Golden Crown School. For over twenty years, we have been privileged to
                walk alongside families in Lashibi and beyond, helping their children grow into
                disciplined, capable, and compassionate young people."
              </p>
              <p>
                "Our motto, Hardwork and Integrity, is more than words — it is the standard we hold
                for every pupil and every member of staff. We invite you to join our school family
                and see the difference that genuine care and committed teaching can make."
              </p>
            </div>
            <p className="mt-5 font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">Mr. Emmanuel Asante</p>
            <p className="text-sm text-crown-gold">Headteacher</p>
          </motion.div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Facilities"
            subtitle="Purpose-built spaces that support learning, play, and discovery."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map(({ Icon, label, text }) => (
              <div key={label} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm flex gap-4">
                <div className="h-12 w-12 shrink-0 rounded-full bg-crown-gold/20 flex items-center justify-center">
                  <Icon className="text-crown-blue dark:text-crown-gold-light" size={24} />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{label}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership team */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Leadership Team"
            subtitle="Experienced educators dedicated to every child's success."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((p) => (
              <StaffCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-20 bg-crown-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Achievements" light />
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { year: "2024", title: "94% BECE Pass Rate", text: "Outstanding performance placing students in top senior high schools." },
              { year: "2024", title: "District Quiz Champions", text: "Winners of the Tema District inter-school general knowledge quiz." },
              { year: "2023", title: "Best Kept School Award", text: "Recognised for our clean, green, and well-maintained campus." },
              { year: "2022", title: "Sports Excellence", text: "Multiple medals at the zonal athletics championships." },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="shrink-0 w-72 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
              >
                <Trophy className="text-crown-gold mb-3" size={30} />
                <span className="text-xs font-semibold text-crown-gold">{a.year}</span>
                <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mt-1">{a.title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">{a.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
