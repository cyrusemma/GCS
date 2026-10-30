import { motion } from "framer-motion"

// Wraps each routed page for smooth fade/slide transitions via AnimatePresence in App.
export default function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.main>
  )
}
