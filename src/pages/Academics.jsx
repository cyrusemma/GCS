import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Users, Clock, BookOpen } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"
import { onImgError } from "../data/images"
import { divisions, coreSubjects, gradingScale } from "../data/academics"
import { academicCalendar, currentTermName } from "../data/events"

const termColors = {
  blue: { bar: "bg-crown-blue", text: "text-crown-blue dark:text-crown-gold-light", ring: "border-crown-blue" },
  gold: { bar: "bg-crown-gold", text: "text-crown-gold", ring: "border-crown-gold" },
  green: { bar: "bg-emerald-600", text: "text-emerald-600", ring: "border-emerald-600" },
}

export default function Academics() {
  const [active, setActive] = useState(divisions[0].id)
  const division = divisions.find((d) => d.id === active)

  return (
    <>
      <SEO
        title="Academics"
        path="/academics"
        description="Golden Crown School academics — Creche, Kindergarten, Primary (Basic 1–6) and JHS. GES curriculum, academic calendar, and assessment system."
      />
      <PageBanner
        title="Academics"
        subtitle="A complete pathway from Creche to Junior High School."
        breadcrumb="Academics"
      />

      {/* Division tabs */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Divisions"
            subtitle="Explore the focus and curriculum of each stage of learning."
          />

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {divisions.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  active === d.id
                    ? "text-white"
                    : "text-crown-blue dark:text-crown-gold-light bg-crown-white dark:bg-slate-900 hover:bg-crown-gold/20"
                }`}
              >
                {active === d.id && (
                  <motion.span
                    layoutId="academics-tab"
                    className="absolute inset-0 bg-crown-blue rounded-full"
                  />
                )}
                <span className="relative">{d.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={division.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-10 items-start"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-crown-gold">
                <img
                  src={division.image}
                  onError={onImgError}
                  alt={division.name}
                  loading="lazy"
                  className="w-full h-72 object-cover"
                />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-2xl text-crown-blue dark:text-crown-gold-light mb-4">
                  {division.name}
                </h3>
                <div className="flex flex-wrap gap-4 mb-5 text-sm">
                  <span className="inline-flex items-center gap-2 text-gray-700 dark:text-slate-300">
                    <Clock size={18} className="text-crown-gold" /> {division.ageRange}
                  </span>
                  <span className="inline-flex items-center gap-2 text-gray-700 dark:text-slate-300">
                    <Users size={18} className="text-crown-gold" /> {division.classes}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-5">{division.approach}</p>

                <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-crown-gold" /> Key Subjects
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 mb-5">
                  {division.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-crown-blue dark:text-crown-gold-light shrink-0" /> {s}
                    </li>
                  ))}
                </ul>

                <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-2">Class Teachers</h4>
                <p className="text-sm text-gray-600 dark:text-slate-300">{division.teachers.join(" • ")}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Curriculum"
            subtitle="We follow the Ghana Education Service standards-based curriculum, taught by subject specialists."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
            {coreSubjects.map((s) => (
              <div
                key={s}
                className="bg-white dark:bg-slate-800 rounded-lg px-4 py-3 text-center text-sm font-medium text-crown-blue dark:text-crown-gold-light border border-gray-100 dark:border-slate-700 shadow-sm"
              >
                {s}
              </div>
            ))}
          </div>
          <div className="bg-crown-blue text-white rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <h3 className="font-poppins font-semibold text-xl mb-3">Our Teaching Methodology</h3>
            <p className="text-white/85 leading-relaxed text-sm">
              We blend direct instruction with inquiry, group work, and hands-on activities.
              Continuous assessment, regular feedback, and small attentive classes ensure that no
              child is left behind — and that every learner is challenged to reach their full
              potential.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={`Academic Calendar ${academicCalendar.year}`}
            subtitle="Key dates and events across all three terms."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {academicCalendar.terms.map((term) => {
              const c = termColors[term.color]
              const isCurrent = term.name === currentTermName
              return (
                <div
                  key={term.name}
                  className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 overflow-hidden ${
                    isCurrent ? c.ring : "border-gray-100 dark:border-slate-700"
                  }`}
                >
                  <div className={`${c.bar} text-white px-5 py-4`}>
                    <h3 className="font-poppins font-bold text-lg">{term.name}</h3>
                    <p className="text-white/85 text-xs mt-0.5">
                      {term.start} – {term.end}
                    </p>
                  </div>
                  {isCurrent && (
                    <span className="absolute top-3 right-3 bg-white dark:bg-slate-800 text-crown-blue dark:text-crown-gold-light text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow">
                      Current Term
                    </span>
                  )}
                  <ul className="p-5 space-y-3">
                    {term.events.map((ev) => (
                      <li key={ev.label} className="flex items-start gap-3 text-sm">
                        <span className={`shrink-0 font-semibold ${c.text} w-14`}>{ev.date}</span>
                        <span className="text-gray-700 dark:text-slate-300">{ev.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Assessment System"
            subtitle="We follow the GES grading structure: Class Score (50%) + Examinations (50%)."
          />
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-crown-blue text-white text-left">
                  <th className="px-5 py-3 font-poppins">Grade</th>
                  <th className="px-5 py-3 font-poppins">Mark Range</th>
                  <th className="px-5 py-3 font-poppins">Remark</th>
                </tr>
              </thead>
              <tbody>
                {gradingScale.map((g, i) => (
                  <tr key={g.grade} className={i % 2 ? "bg-crown-white dark:bg-slate-900" : "bg-white dark:bg-slate-800"}>
                    <td className="px-5 py-3 font-semibold text-crown-blue dark:text-crown-gold-light">{g.grade}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-slate-300">{g.range}</td>
                    <td className="px-5 py-3 text-gray-700 dark:text-slate-300">{g.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
