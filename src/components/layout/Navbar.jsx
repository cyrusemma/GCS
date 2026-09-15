import { useState, useEffect } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { LogIn, Sun, Moon } from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"
import { useTheme } from "../../context/ThemeContext"
import { useI18n } from "../../context/I18nContext"
import MagneticButton from "../ui/MagneticButton"
import MobileMenuDrawer from "./MobileMenuDrawer"

const linkDefs = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/academics", key: "academics" },
  { to: "/admissions", key: "admissions" },
  { to: "/student-life", key: "studentLife" },
  { to: "/gallery", key: "gallery" },
  { to: "/news", key: "news" },
  { to: "/parents", key: "parents" },
  { to: "/staff", key: "staff" },
  { to: "/contact", key: "contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === "/"
  const solid = scrolled || !isHome || open

  const linkBase = "relative text-sm font-medium transition-colors py-1"
  const linkClass = ({ isActive }) =>
    `${linkBase} ${
      solid
        ? isActive
          ? "text-crown-blue dark:text-crown-gold font-semibold"
          : "text-gray-700 dark:text-slate-200 hover:text-crown-blue dark:hover:text-crown-gold"
        : isActive
        ? "text-white font-semibold"
        : "text-white/85 hover:text-white"
    }`

  const iconBtn = `inline-flex items-center justify-center h-10 w-10 rounded-full border transition-colors ${
    solid
      ? "border-crown-blue/30 dark:border-slate-600 text-crown-blue dark:text-slate-200 hover:bg-crown-blue hover:text-white"
      : "border-white/60 text-white hover:bg-white/15"
  }`

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          solid ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School badge"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
              />
              <span
                className={`hidden sm:block font-poppins font-bold leading-tight text-base lg:text-lg ${
                  solid ? "text-crown-blue dark:text-white" : "text-white"
                }`}
              >
                Golden Crown
                <span className="block text-[11px] font-medium tracking-wide opacity-80">
                  School, Lashibi
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden xl:flex items-center gap-5">
              {linkDefs.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
                  {({ isActive }) => (
                    <>
                      {t(`nav.${l.key}`)}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-crown-gold rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle */}
              <button onClick={toggleTheme} aria-label="Toggle dark mode" className={iconBtn}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <MagneticButton
                to="/admissions"
                className="hidden sm:inline-flex items-center bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold text-sm px-4 py-2 rounded-full transition-colors shadow"
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

              {/* Animated Hamburger Button */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                className={`xl:hidden relative inline-flex items-center justify-center h-10 w-10 rounded-xl transition-colors ${
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
