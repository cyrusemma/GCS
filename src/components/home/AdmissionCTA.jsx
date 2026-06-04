import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FileText, Download } from "lucide-react"

export default function AdmissionCTA() {
  return (
    <section className="py-16 lg:py-20 bg-crown-gold">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-crown-blue-dark">
            Ready to Join Our School Family?
          </h2>
          <p className="mt-3 text-crown-blue-dark/80 text-lg">
            Applications are open for the 2025/2026 academic year.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-crown-blue hover:bg-crown-blue-light text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors"
            >
              <FileText size={18} /> Apply Online
            </Link>
            <a
              href="#"
              download
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-crown-white text-crown-blue font-semibold px-8 py-3 rounded-full shadow-lg transition-colors"
            >
              <Download size={18} /> Download Prospectus
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
