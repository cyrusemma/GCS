import { motion } from "framer-motion"
import { onImgError } from "../../data/images"

export default function StaffCard({ person, large = false }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(13,71,161,0.15)" }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 text-center"
    >
      <div className={`overflow-hidden ${large ? "h-60" : "h-44"}`}>
        <img
          src={person.image}
          onError={onImgError}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-poppins font-semibold text-crown-blue">{person.name}</h3>
        <p className="text-sm text-crown-gold font-medium">
          {person.title || person.subject}
        </p>
        {person.level && <p className="text-xs text-gray-500 mt-0.5">{person.level}</p>}
        {person.bio && <p className="text-sm text-gray-600 mt-2">{person.bio}</p>}
      </div>
    </motion.div>
  )
}
