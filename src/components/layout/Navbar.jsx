import { useState, useEffect, useRef } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  LogIn,
  Sun,
  Moon,
  ChevronDown,
  Info,
  Users,
  BookOpen,
  Award,
  Sparkles,
  Image,
  Newspaper,
  HeartHandshake,
  ArrowRight,
} from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"
import { useTheme } from "../../context/ThemeContext"
import { useI18n } from "../../context/I18nContext"
import MagneticButton from "../ui/MagneticButton"
import MobileMenuDrawer from "./MobileMenuDrawer"

// Categorized navigation structure with rich sub-items
const navStructure = [
  {
    type: "link",
    to: "/",
    labelKey: "home",
    defaultLabel: "Home",
  },
  {
    type: "dropdown",
    id: "about",
    labelKey: "about",
    defaultLabel: "About Us",
    matchPaths: ["/about", "/staff"],
    items: [
      {
        to: "/about",
        title: "About Our School",
        desc: "Our history, vision, mission & leadership",
        icon: Info,
      },
      {
        to: "/staff",
        title: "Staff & Faculty",
        desc: "Meet our dedicated teachers & management team",
        icon: Users,
      },
    ],
  },
  {
    type: "dropdown",
    id: "academics",
    labelKey: "academics",
    defaultLabel: "Academics",
    matchPaths: ["/academics", "/admissions"],
    items: [
      {
        to: "/academics",
        title: "Academic Programmes",
        desc: "Curriculum for Nursery, KG, Primary & JHS",
        icon: BookOpen,
      },
      {
        to: "/admissions",
        title: "Admissions & Entry",
        desc: "Application process, requirements & fees",
        icon: Award,
      },
    ],
  },
  {
    type: "dropdown",
    id: "school-life",
    labelKey: "studentLife",
    defaultLabel: "School Life",
    matchPaths: ["/student-life", "/gallery", "/news", "/parents"],
    items: [
      {
        to: "/student-life",
        title: "Student Life",
        desc: "Clubs, sports, character & daily campus life",
        icon: Sparkles,
      },
      {
        to: "/gallery",
        title: "Campus Gallery",
        desc: "Moments, campus events & student memories",
        icon: Image,
      },
      {
        to: "/news",
        title: "News & Events",
        desc: "Term announcements, updates & academic dates",
        icon: Newspaper,
      },
      {
        to: "/parents",
        title: "Parents Hub",
        desc: "Handbook, PTA, guidelines & portal info",
        icon: HeartHandshake,
      },
    ],
  },
  {
    type: "link",
    to: "/contact",
    labelKey: "contact",
    defaultLabel: "Contact",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const closeTimeoutRef = useRef(null)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menus on route navigation
  useEffect(() => {
    setOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const isHome = location.pathname === "/"
  const solid = scrolled || !isHome || open

  // Resilient dropdown hover handlers
  const handleDropdownEnter = (id) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveDropdown(id)
  }

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const iconBtn = `inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.45)] ${
    solid
      ? "border-crown-blue/20 dark:border-slate-700 text-crown-blue dark:text-slate-200 hover:bg-crown-gold hover:text-crown-blue-dark hover:border-crown-gold"
      : "border-white/50 text-white hover:bg-crown-gold hover:text-crown-blue-dark hover:border-crown-gold"
  }`

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          solid
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md hover:shadow-[0_12px_35px_rgba(212,175,55,0.15)]"
            : "bg-transparent hover:backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group transition-transform duration-300 hover:scale-105"
            >
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School badge"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain transition-transform duration-300 group-hover:rotate-6 drop-shadow"
              ></img>
              <span
                className={`hidden sm:block font-poppins font-bold leading-tight text-base lg:text-lg transition-colors ${
                  solid ? "text-crown-blue dark:text-white" : "text-white"
                } group-hover:text-crown-gold`}
              >
                Golden Crown
                <span className="block text-[11px] font-medium tracking-wide opacity-80 group-hover:text-crown-gold-light">
                  School, Lashibi
                </span>
              </span>
            </Link>

            {/* Desktop Categorized Navigation with Zoom & Hover Glow */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navStructure.map((item) => {
                if (item.type === "link") {
                  const isActive =
                    item.to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.to)

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center ${
                        isActive
                          ? "bg-crown-gold/20 text-crown-gold font-semibold shadow-[0_0_16px_rgba(212,175,55,0.35)] border border-crown-gold/40"
                          : solid
                          ? "text-gray-700 dark:text-slate-200 hover:text-crown-gold hover:bg-crown-gold/15 hover:shadow-[0_0_18px_rgba(212,175,55,0.4)] border border-transparent hover:border-crown-gold/30"
                          : "text-white/90 hover:text-white hover:bg-white/15 hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] border border-transparent hover:border-crown-gold/40"
                      }`}
                    >
                      <span>{t(`nav.${item.labelKey}`) || item.defaultLabel}</span>
                    </NavLink>
                  )
                }

                // Dropdown trigger & menu
                const isDropdownOpen = activeDropdown === item.id
                const isChildActive = item.matchPaths?.some((p) =>
                  location.pathname.startsWith(p)
                )

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown((curr) => (curr === item.id ? null : item.id))
                      }
                      aria-expanded={isDropdownOpen}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                        isChildActive || isDropdownOpen
                          ? "bg-crown-gold/20 text-crown-gold font-semibold shadow-[0_0_16px_rgba(212,175,55,0.35)] border border-crown-gold/40"
                          : solid
                          ? "text-gray-700 dark:text-slate-200 hover:text-crown-gold hover:bg-crown-gold/15 hover:shadow-[0_0_18px_rgba(212,175,55,0.4)] border border-transparent hover:border-crown-gold/30"
                          : "text-white/90 hover:text-white hover:bg-white/15 hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] border border-transparent hover:border-crown-gold/40"
                      }`}
                    >
                      <span>{item.defaultLabel}</span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180 text-crown-gold" : "opacity-70"
                        }`}
                      />
                    </button>

                    {/* Exquisite Floating Dropdown Panel */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full left-0 mt-2 z-50 rounded-2xl p-2.5 shadow-[0_20px_60px_rgba(13,71,161,0.22),0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl border border-crown-gold/30 dark:border-crown-gold/25 bg-white/95 dark:bg-slate-900/95 min-w-[280px] sm:min-w-[320px]`}
                        >
                          {/* Golden jewel top accent line */}
                          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-crown-gold to-transparent mb-2 rounded-full" />

                          <div className="space-y-1">
                            {item.items.map((sub) => {
                              const SubIcon = sub.icon
                              const isSubActive = location.pathname.startsWith(sub.to)

                              return (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                                    isSubActive
                                      ? "bg-crown-gold/15 text-crown-gold-dark dark:text-crown-gold shadow-sm"
                                      : "hover:bg-crown-gold/10 text-gray-800 dark:text-slate-100"
                                  }`}
                                >
                                  {/* Icon badge */}
                                  <div
                                    className={`p-2.5 rounded-xl shrink-0 transition-all duration-300 ${
                                      isSubActive
                                        ? "bg-crown-gold text-crown-blue-dark shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                                        : "bg-crown-blue/5 dark:bg-slate-800 text-crown-blue dark:text-crown-gold group-hover:bg-crown-gold group-hover:text-crown-blue-dark group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(212,175,55,0.45)]"
                                    }`}
                                  >
                                    <SubIcon size={18} />
                                  </div>

                                  {/* Content & Arrow */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="font-poppins font-semibold text-sm group-hover:text-crown-gold transition-colors">
                                        {sub.title}
                                      </p>
                                      <ArrowRight
                                        size={14}
                                        className="text-crown-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                      />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1 group-hover:text-gray-700 dark:group-hover:text-slate-300">
                                      {sub.desc}
                                    </p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={iconBtn}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <MagneticButton
                to="/admissions"
                className="hidden sm:inline-flex items-center bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transform hover:scale-105 active:scale-95"
              >
                {t("nav.apply")}
              </MagneticButton>

              <Link
                to="/portal"
                aria-label="Open the student and parent portal"
                className={iconBtn}
              >
                <LogIn size={18} />
              </Link>

              {/* Animated Hamburger Button for mobile & tablet */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                className={`lg:hidden relative inline-flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-300 ${
                  solid
                    ? "bg-gray-100 dark:bg-slate-800 text-crown-blue dark:text-white"
                    : "bg-white/15 text-white backdrop-blur-sm"
                }`}
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center">
                  <motion.span
                    animate={{
                      rotate: open ? 45 : 0,
                      y: open ? 6 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-5 h-0.5 bg-current rounded-full block origin-center"
                  />
                  <motion.span
                    animate={{
                      opacity: open ? 0 : 1,
                      x: open ? 8 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-0.5 bg-current rounded-full block"
                  />
                  <motion.span
                    animate={{
                      rotate: open ? -45 : 0,
                      y: open ? -6 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-5 h-0.5 bg-current rounded-full block origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Modern Off-Canvas Mobile Drawer */}
      <MobileMenuDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
