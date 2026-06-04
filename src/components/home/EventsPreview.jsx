import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, MapPin } from "lucide-react"
import SectionTitle from "../ui/SectionTitle"
import { upcomingEvents } from "../../data/events"

export default function EventsPreview() {
  return (
    <section className="py-16 lg:py-24 bg-crown-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Upcoming Events"
          subtitle="Mark your calendar — here's what's coming up this term."
        />
        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-crown-gold/30 hidden sm:block" />
          <ul className="space-y-6">
            {upcomingEvents.map((ev, i) => (
              <motion.li
                key={ev.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-4 items-start"
              >
                <div className="shrink-0 h-14 w-14 rounded-full bg-crown-gold text-crown-blue-dark flex flex-col items-center justify-center font-poppins font-bold leading-none shadow z-10">
                  <span className="text-base">{ev.date.split(" ")[1]}</span>
                  <span className="text-[10px] uppercase">{ev.date.split(" ")[0]}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1">
                  <h3 className="font-poppins font-semibold text-crown-blue">{ev.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{ev.description}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin size={13} className="text-crown-gold" /> {ev.location}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/academics"
            className="inline-flex items-center gap-2 text-crown-blue font-semibold hover:text-crown-gold transition-colors"
          >
            View Calendar <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
