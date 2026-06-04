import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import SectionTitle from "../ui/SectionTitle"
import TestimonialCard from "../ui/TestimonialCard"
import { IMAGES } from "../../data/images"

const testimonials = [
  { quote: "Golden Crown has been a blessing to our family. My daughter reads confidently and loves going to school every morning.", name: "Mrs. Adwoa Mensah", role: "Parent of Basic 3 Student", image: IMAGES.parent_1 },
  { quote: "The teachers genuinely care. My son's BECE results opened doors to a top senior high school. Forever grateful.", name: "Mr. Kojo Annan", role: "Parent of JHS 3 Graduate", image: IMAGES.parent_2 },
  { quote: "Discipline, academics, and warmth all in one school. I recommend Golden Crown to every parent in Lashibi.", name: "Mrs. Esi Bonsu", role: "Parent of KG 2 Student", image: IMAGES.parent_3 },
  { quote: "From Creche to Primary, the care has been consistent. The communication with parents is excellent.", name: "Mr. Yaw Owusu", role: "Parent of Basic 1 Student", image: IMAGES.parent_2 },
  { quote: "My twins are thriving. The safe environment and qualified teachers give me real peace of mind.", name: "Mrs. Akua Darko", role: "Parent of Nursery Students", image: IMAGES.parent_1 },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(3)

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 768 ? 1 : 3)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Build the visible window of cards, wrapping around the array.
  const visible = Array.from({ length: perView }, (_, k) => testimonials[(index + k) % testimonials.length])

  return (
    <section className="py-16 lg:py-24 bg-crown-blue-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="What Parents Say"
          subtitle="Hear from the families who make up the Golden Crown School community."
          light
        />
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 min-h-[230px]">
          <AnimatePresence mode="popLayout">
            {visible.map((t, k) => (
              <motion.div
                key={`${index}-${k}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard item={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-crown-gold" : "w-2.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
