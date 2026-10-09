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

// Categorized navigation structure
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

  // Close menus on route change
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

  const iconBtn = `inline-flex items-center justify-center h-9 w-9 rounded-full border transition-colors duration-200 ${
    solid
      ? "border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:text-crown-gold hover:border-crown-gold"
      : "border-white/40 text-white hover:text-crown-gold hover:border-crown-gold"
  }`

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          solid
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group transition-opacity duration-200 hover:opacity-95"
            >
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School badge"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain drop-shadow"
              />
              <span
                className={`hidden sm:block font-poppins font-bold leading-tight text-base lg:text-lg transition-colors duration-200 ${
                  solid ? "text-crown-blue dark:text-white" : "text-white"
                } group-hover:text-crown-gold`}
              >
                Golden Crown
                <span className="block text-[11px] font-medium tracking-wide opacity-80">
                  School, Lashibi
                </span>
              </span>
            </Link>

            {/* Desktop Categorized Navigation (Simple, Classy & Subtle Animations) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navStructure.map((item) => {
                if (item.type === "link") {
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `group relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 flex items-center ${
                          isActive
                            ? "text-crown-gold font-semibold"
                            : solid
                            ? "text-gray-700 dark:text-slate-200 hover:text-crown-gold"
                            : "text-white/90 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{t(`nav.${item.labelKey}`) || item.defaultLabel}</span>
                          {/* Subtle gold underline animation */}
                          <span
                            className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-crown-gold rounded-full transition-transform duration-250 ease-out origin-center ${
                              isActive
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  )
                }

                // Dropdown item
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
                      className={`group relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
                        isChildActive || isDropdownOpen
                          ? "text-crown-gold font-semibold"
                          : solid
                          ? "text-gray-700 dark:text-slate-200 hover:text-crown-gold"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      <span>{item.defaultLabel}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ease-out ${
                          isDropdownOpen
                            ? "rotate-180 text-crown-gold"
                            : "opacity-70 group-hover:text-crown-gold group-hover:opacity-100"
                        }`}
                      />
                      {/* Subtle gold underline animation */}
                      <span
                        className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-crown-gold rounded-full transition-transform duration-250 ease-out origin-center ${
                          isChildActive || isDropdownOpen
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </button>

                    {/* Classy Floating Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 z-50 rounded-2xl p-2 shadow-xl backdrop-blur-xl border border-gray-100 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 min-w-[280px] sm:min-w-[310px]"
                        >
                          {/* Delicate gold accent top hairline */}
                          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-crown-gold/70 to-transparent mb-1.5 rounded-full" />

                          <div className="space-y-0.5">
                            {item.items.map((sub) => {
                              const SubIcon = sub.icon
                              const isSubActive = location.pathname.startsWith(sub.to)

                              return (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`group flex items-start gap-3 p-2.5 rounded-xl transition-colors duration-150 ${
                                    isSubActive
                                      ? "bg-crown-gold/10 text-crown-gold"
                                      : "hover:bg-gray-50 dark:hover:bg-slate-800/70 text-gray-800 dark:text-slate-100"
                                  }`}
                                >
                                  {/* Icon */}
                                  <div
                                    className={`p-2 rounded-lg shrink-0 transition-colors duration-150 ${
                                      isSubActive
                                        ? "bg-crown-gold text-crown-blue-dark"
                                        : "bg-crown-blue/5 dark:bg-slate-800 text-crown-blue dark:text-crown-gold group-hover:bg-crown-gold/15 group-hover:text-crown-gold"
                                    }`}
                                  >
                                    <SubIcon size={16} />
                                  </div>

                                  {/* Text & indicator */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="font-poppins font-medium text-sm group-hover:text-crown-gold transition-colors duration-150">
                                        {sub.title}
                                      </p>
                                      <ArrowRight
                                        size={13}
                                        className="text-crown-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                      />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1">
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
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <MagneticButton
                to="/admissions"
                className="hidden sm:inline-flex items-center bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow"
              >
                {t("nav.apply")}
              </MagneticButton>

              <Link
                to="/portal"
                aria-label="Open the student and parent portal"
                className={iconBtn}
              >
                <LogIn size={17} />
              </Link>

              {/* Animated Hamburger Button for mobile & tablet */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                className={`lg:hidden relative inline-flex items-center justify-center h-9 w-9 rounded-xl transition-colors duration-200 ${
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
