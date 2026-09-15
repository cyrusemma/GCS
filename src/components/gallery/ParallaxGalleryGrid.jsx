import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import GalleryCard from "../ui/GalleryCard"

export default function ParallaxGalleryGrid({ items = [], onSelectCard }) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smooth out parallax with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  })

  // Three contrasting parallax speeds and directions
  const yCol1 = useTransform(smoothProgress, [0, 1], [40, -140])
  const yCol2 = useTransform(smoothProgress, [0, 1], [-60, 100])
  const yCol3 = useTransform(smoothProgress, [0, 1], [60, -180])

  // Partition items into 3 columns
  const col1 = items.filter((_, i) => i % 3 === 0)
  const col2 = items.filter((_, i) => i % 3 === 1)
  const col3 = items.filter((_, i) => i % 3 === 2)

  return (
    <div ref={containerRef} className="relative w-full py-6" style={{ position: "relative" }}>
      {/* Desktop 3-column parallax grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-start">
        <motion.div style={{ y: yCol1 }} className="flex flex-col">
          {col1.map((item, idx) => (
            <GalleryCard
              key={item.id || idx}
              item={item}
              onClick={(cardItem, imgIdx) => onSelectCard(cardItem, imgIdx)}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: yCol2 }} className="flex flex-col pt-8">
          {col2.map((item, idx) => (
            <GalleryCard
              key={item.id || idx}
              item={item}
              onClick={(cardItem, imgIdx) => onSelectCard(cardItem, imgIdx)}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: yCol3 }} className="flex flex-col">
          {col3.map((item, idx) => (
            <GalleryCard
              key={item.id || idx}
              item={item}
              onClick={(cardItem, imgIdx) => onSelectCard(cardItem, imgIdx)}
            />
          ))}
        </motion.div>
      </div>

      {/* Tablet 2-column parallax grid */}
      <div className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-6 items-start">
        <motion.div style={{ y: yCol1 }} className="flex flex-col">
          {items
            .filter((_, i) => i % 2 === 0)
            .map((item, idx) => (
              <GalleryCard
                key={item.id || idx}
                item={item}
                onClick={(cardItem, imgIdx) => onSelectCard(cardItem, imgIdx)}
              />
            ))}
        </motion.div>

        <motion.div style={{ y: yCol2 }} className="flex flex-col pt-6">
          {items
            .filter((_, i) => i % 2 === 1)
            .map((item, idx) => (
              <GalleryCard
                key={item.id || idx}
                item={item}
                onClick={(cardItem, imgIdx) => onSelectCard(cardItem, imgIdx)}
              />
            ))}
        </motion.div>
      </div>

      {/* Mobile 1-column responsive grid */}
      <div className="grid grid-cols-1 gap-5 sm:hidden">
        {items.map((item, idx) => (
          <GalleryCard
            key={item.id || idx}
            item={item}
            onClick={(cardItem, imgIdx) => onSelectCard(cardItem, imgIdx)}
          />
        ))}
      </div>
    </div>
  )
}
