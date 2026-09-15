import { useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Home,
  Info,
  BookOpen,
  Award,
  Image,
  Newspaper,
  Users,
  HeartHandshake,
  UserCheck,
  PhoneCall,
  LogIn,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"
import { useTheme } from "../../context/ThemeContext"
import { useI18n } from "../../context/I18nContext"

const mobileNavLinks = [
  { to: "/", key: "home", label: "Home", num: "01", icon: Home },
  { to: "/about", key: "about", label: "About Us", num: "02", icon: Info },
  { to: "/academics", key: "academics", label: "Academics", num: "03", icon: BookOpen },
  { to: "/admissions", key: "admissions", label: "Admissions", num: "04", icon: Award },
  { to: "/student-life", key: "studentLife", label: "Student Life", num: "05", icon: Users },
  { to: "/gallery", key: "gallery", label: "Gallery", num: "06", icon: Image },
  { to: "/news", key: "news", label: "News & Events", num: "07", icon: Newspaper },
  { to: "/parents", key: "parents", label: "Parents Hub", num: "08", icon: HeartHandshake },
  { to: "/staff", key: "staff", label: "Staff & Faculty", num: "09", icon: UserCheck },
  { to: "/contact", key: "contact", label: "Contact Us", num: "10", icon: PhoneCall },
]

export default function MobileMenuDrawer({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  }

  const drawerVariants = {
    hidden: { x: "100%", opacity: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 32,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Off-canvas Slide Panel */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white dark:bg-[#0c1427] text-gray-900 dark:text-white shadow-2xl flex flex-col h-full border-l border-gray-200/80 dark:border-slate-800/80 overflow-hidden"
          >
            {/* Background Watermark Accent */}
            <img
              src={ASSETS.badge}
              alt=""
              aria-hidden="true"
              className="absolute -right-16 -bottom-16 w-80 h-80 object-contain opacity-[0.035] dark:opacity-[0.045] pointer-events-none select-none"
            />

            {/* Top Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <Link to="/" onClick={onClose} className="flex items-center gap-3">
                <img
                  src={ASSETS.badge}
                  onError={onImgError}
                  alt="Golden Crown School"
                  className="h-11 w-11 object-contain drop-shadow-sm"
                />
                <div>
                  <h3 className="font-poppins font-bold text-base leading-tight text-crown-blue dark:text-white">
                    Golden Crown
                  </h3>
                  <span className="text-[11px] font-medium text-crown-gold tracking-wide block">
                    Hardwork & Integrity
                  </span>
                </div>
              </Link>

              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-crown-gold/20 hover:text-crown-blue dark:hover:text-crown-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 relative z-10 scrollbar-hide">
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                {mobileNavLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <motion.div key={link.to} variants={itemVariants}>
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-crown-blue/10 dark:bg-crown-gold/15 text-crown-blue dark:text-crown-gold font-bold shadow-sm"
                              : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800/80 hover:text-crown-blue dark:hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-[11px] font-mono font-semibold tracking-wider ${
                                  isActive
                                    ? "text-crown-gold"
                                    : "text-gray-400 dark:text-slate-500 group-hover:text-crown-gold transition-colors"
                                }`}
                              >
                                {link.num}
                              </span>

                              <div
                                className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                                  isActive
                                    ? "bg-crown-blue dark:bg-crown-gold text-white dark:text-slate-900"
                                    : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 group-hover:bg-crown-blue/10 group-hover:text-crown-blue dark:group-hover:text-crown-gold"
                                }`}
                              >
                                <Icon size={16} />
                              </div>

                              <span className="text-sm font-medium">
                                {t(`nav.${link.key}`) || link.label}
                              </span>
                            </div>

                            <ArrowRight
                              size={15}
                              className={`transition-transform duration-300 ${
                                isActive
                                  ? "text-crown-gold translate-x-0 opacity-100"
                                  : "text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Bottom Quick Actions & CTA Bar */}
            <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50/90 dark:bg-[#080e1c] relative z-10 space-y-3">
              {/* Primary Apply Button */}
              <Link
                to="/admissions"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-crown-gold via-crown-gold-light to-amber-400 text-crown-blue-dark font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
              >
                <Sparkles size={16} />
                <span>{t("nav.apply") || "Apply for Admission"}</span>
                <ArrowRight size={16} />
              </Link>

              {/* Portal & Theme Switch Row */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/portal"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-800 dark:text-slate-200 hover:border-crown-blue transition-colors shadow-sm"
                >
                  <LogIn size={15} className="text-crown-blue dark:text-crown-gold" />
                  <span>Portal Login</span>
                </Link>

                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-800 dark:text-slate-200 hover:border-crown-gold transition-colors shadow-sm"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={15} className="text-crown-gold" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={15} className="text-crown-blue" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Contact Info */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                <span>Lashibi, Greater Accra</span>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:0243169383"
                    className="hover:text-crown-blue dark:hover:text-crown-gold flex items-center gap-1"
                  >
                    <Phone size={12} /> Call
                  </a>
                  <span>•</span>
                  <a
                    href="https://wa.me/233243169383"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 flex items-center gap-1"
                  >
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
