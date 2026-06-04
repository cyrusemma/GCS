import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Calendar, Pin, AlertTriangle } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import NewsCard from "../components/ui/NewsCard"
import SEO from "../components/ui/SEO"
import { news } from "../data/news"
import { announcements } from "../data/events"
import { onImgError } from "../data/images"

// A compact static month view highlighting key events (June 2025).
const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1)
const eventDays = {
  2: { color: "gold", label: "Mid-Term Break" },
  14: { color: "blue", label: "PTA General Meeting" },
}

export default function News() {
  const [article, setArticle] = useState(null)

  return (
    <>
      <SEO
        title="News & Events"
        path="/news"
        description="Latest news, announcements, and upcoming events from Golden Crown School, Lashibi."
      />
      <PageBanner
        title="News & Events"
        subtitle="The latest stories, announcements, and dates from Golden Crown School."
        breadcrumb="News"
      />

      {/* News grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="School News" subtitle="Catch up on everything happening in our community." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} onOpen={() => setArticle(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* Event calendar */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Event Calendar" subtitle="June 2025 — key dates at a glance." />
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* June 1, 2025 is a Sunday — no leading blanks needed */}
              {calendarDays.map((day) => {
                const ev = eventDays[day]
                return (
                  <div
                    key={day}
                    title={ev ? ev.label : undefined}
                    className={`relative aspect-square rounded-lg flex items-center justify-center text-sm ${
                      ev ? "font-semibold text-crown-blue dark:text-crown-gold-light bg-crown-white dark:bg-slate-900" : "text-gray-700 dark:text-slate-300"
                    }`}
                  >
                    {day}
                    {ev && (
                      <span
                        className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                          ev.color === "gold" ? "bg-crown-gold" : "bg-crown-blue"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-600 dark:text-slate-300">
              {Object.entries(eventDays).map(([day, ev]) => (
                <span key={day} className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${ev.color === "gold" ? "bg-crown-gold" : "bg-crown-blue"}`} />
                  Jun {day} — {ev.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements / notice board */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Notice Board" subtitle="Important announcements for parents and pupils." />
          <div className="grid sm:grid-cols-2 gap-6">
            {announcements.map((a) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-xl p-6 shadow-sm border ${
                  a.urgent ? "bg-crown-gold/10 border-crown-gold/40" : "bg-crown-white dark:bg-slate-900 border-gray-100 dark:border-slate-700"
                }`}
              >
                <Pin className="absolute -top-2 left-5 text-crown-blue dark:text-crown-gold-light rotate-45" size={22} />
                <div className="flex items-center gap-2 mb-2">
                  {a.urgent && <AlertTriangle size={18} className="text-crown-gold" />}
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{a.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article modal */}
      <AnimatePresence>
        {article && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto"
            >
              <button
                onClick={() => setArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 text-gray-700 dark:text-slate-300 flex items-center justify-center shadow"
              >
                <X size={20} />
              </button>
              <img
                src={article.image}
                onError={onImgError}
                alt={article.title}
                className="w-full h-60 object-cover rounded-t-2xl"
              />
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400 mb-3">
                  <span className="bg-crown-gold text-crown-blue-dark font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-crown-blue dark:text-crown-gold-light" /> {article.date}
                  </span>
                </div>
                <h2 className="font-poppins font-bold text-2xl text-crown-blue dark:text-crown-gold-light mb-4">{article.title}</h2>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{article.body}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
