import { motion } from "framer-motion"

// Reusable section heading: gold top line + heading + optional subtitle.
export default function SectionTitle({ title, subtitle, light = false, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${center ? "text-center mx-auto" : "text-left"} max-w-2xl`}
    >
      <span
        className={`inline-block h-1 w-12 rounded-full bg-crown-gold mb-4 ${
          center ? "mx-auto" : ""
        }`}
      />
      <h2
        className={`font-poppins font-bold text-3xl sm:text-4xl ${
          light ? "text-white" : "text-crown-blue"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base ${light ? "text-white/80" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
