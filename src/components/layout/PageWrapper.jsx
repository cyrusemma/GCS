import { motion } from "framer-motion"

// Wraps each routed page — fades in with a slight delay so it pairs naturally
// with the UniformParticleTransition burst that fires on route change.
export default function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
