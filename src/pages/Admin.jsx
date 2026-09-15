import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Image as ImageIcon,
  Users,
  Newspaper,
  Settings,
  Inbox,
  LogOut,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  BarChart3,
  Lock,
} from "lucide-react"
import { useData } from "../context/DataContext"
import { ASSETS, onImgError } from "../data/images"
import SEO from "../components/ui/SEO"
import AdminGalleryTab from "../components/admin/AdminGalleryTab"
import AdminStaffTab from "../components/admin/AdminStaffTab"
import AdminNewsTab from "../components/admin/AdminNewsTab"
import AdminSettingsTab from "../components/admin/AdminSettingsTab"
import AdminSubmissionsTab from "../components/admin/AdminSubmissionsTab"

const ADMIN_AUTH_KEY = "gcs_admin_auth_session"

export default function Admin() {
  const { gallery, teachers, leadership, news, submissions } = useData()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true"
  })

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  // Active dashboard tab
  const [currentTab, setCurrentTab] = useState("gallery") // "gallery" | "staff" | "news" | "submissions" | "settings"

  const handleLogin = (e) => {
    e.preventDefault()
    // Default demo credentials or simple staff access
    if (
      (email.toLowerCase() === "admin@goldencrown.edu.gh" || email.toLowerCase() === "admin" || email === "") &&
      (password === "crown2024" || password === "admin" || password === "2004")
    ) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true")
      setIsAuthenticated(true)
      setErrorMsg("")
    } else {
      setErrorMsg("Invalid credentials. Demo password: crown2024 or 2004")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY)
    setIsAuthenticated(false)
  }

  // If not logged in, render the secure Login Gate
  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Admin CMS Login" path="/admin" description="Administrative portal for Golden Crown School." />
        <div className="min-h-screen bg-crown-white dark:bg-[#070d1d] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-200/80 dark:border-slate-800"
          >
            <div className="text-center mb-8">
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School"
                className="h-16 w-16 mx-auto object-contain mb-3 drop-shadow"
              />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-crown-blue/10 text-crown-blue dark:bg-crown-gold/15 dark:text-crown-gold border border-crown-gold/30 mb-2">
                <ShieldCheck size={14} /> School Admin CMS
              </span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                Staff & Admin Portal
              </h1>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Log in to update school content, photos, and records.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-200 dark:border-red-900">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                  Admin Email / Username
                </label>
                <input
                  type="text"
                  placeholder="admin@goldencrown.edu.gh"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                  Admin Password / PIN
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="Enter password (e.g. crown2024)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-crown-blue hover:bg-crown-blue-light text-white font-bold text-sm shadow-lg transition-all active:scale-[0.98] mt-2"
              >
                Sign In to CMS Dashboard
              </button>

              <div className="pt-4 text-center border-t border-gray-100 dark:border-slate-800">
                <p className="text-[11px] text-gray-400">
                  Demo Credentials: Password <code className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-crown-blue dark:text-crown-gold">crown2024</code> or <code className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-crown-blue dark:text-crown-gold">2004</code>
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-xs text-crown-blue dark:text-crown-gold hover:underline mt-3"
                >
                  ← Return to Public Website
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </>
    )
  }

  // Admin Dashboard Interface
  return (
    <>
      <SEO title="School CMS & Admin Dashboard" path="/admin" description="Admin dashboard for Golden Crown School." />

      <div className="min-h-screen bg-gray-50 dark:bg-[#070d1d] text-gray-900 dark:text-white">
        
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.badge}
              onError={onImgError}
              alt="Golden Crown Badge"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight text-crown-blue dark:text-white">
                Golden Crown School
              </h1>
              <span className="text-[11px] font-semibold text-crown-gold uppercase tracking-wider block">
                CMS Management Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-crown-gold/20 hover:text-crown-blue transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink size={14} />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Metrics Quick Overview Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-crown-gold flex items-center justify-center">
                <ImageIcon size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {gallery.length}
                </span>
                <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">
                  Live Photos
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-crown-blue dark:text-blue-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {teachers.length + leadership.length}
                </span>
                <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">
                  Staff & Teachers
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Newspaper size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {news.length}
                </span>
                <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">
                  News & Events
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Inbox size={24} />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {submissions?.length || 0}
                </span>
                <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">
                  Parent Leads
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setCurrentTab("gallery")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                currentTab === "gallery"
                  ? "bg-crown-blue text-white shadow-md"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <ImageIcon size={16} />
              <span>Gallery & Photos</span>
            </button>

            <button
              onClick={() => setCurrentTab("staff")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                currentTab === "staff"
                  ? "bg-crown-blue text-white shadow-md"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Users size={16} />
              <span>Staff & Faculty</span>
            </button>

            <button
              onClick={() => setCurrentTab("news")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                currentTab === "news"
                  ? "bg-crown-blue text-white shadow-md"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Newspaper size={16} />
              <span>News & Events</span>
            </button>

            <button
              onClick={() => setCurrentTab("submissions")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                currentTab === "submissions"
                  ? "bg-crown-blue text-white shadow-md"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Inbox size={16} />
              <span>Admissions Inbox</span>
            </button>

            <button
              onClick={() => setCurrentTab("settings")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                currentTab === "settings"
                  ? "bg-crown-blue text-white shadow-md"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Settings size={16} />
              <span>School Info & Stats</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="relative">
            {currentTab === "gallery" && <AdminGalleryTab />}
            {currentTab === "staff" && <AdminStaffTab />}
            {currentTab === "news" && <AdminNewsTab />}
            {currentTab === "submissions" && <AdminSubmissionsTab />}
            {currentTab === "settings" && <AdminSettingsTab />}
          </div>

        </div>
      </div>
    </>
  )
}
