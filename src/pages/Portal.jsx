import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, ClipboardList, CreditCard, Bell, ArrowRight } from "lucide-react"
import SEO from "../components/ui/SEO"
import { ASSETS, onImgError } from "../data/images"

const roles = ["Student", "Parent", "Staff"]

export default function Portal() {
  const [role, setRole] = useState("Student")
  const [showPw, setShowPw] = useState(false)
  const [notice, setNotice] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setNotice("The online portal is coming soon. This is a demo login — thank you for your patience!")
  }

  return (
    <>
      <SEO
        title="Portal"
        path="/portal"
        description="Student & Parent Portal for Golden Crown School — check results, pay fees, and view school notifications."
      />
      <section className="pt-16 bg-crown-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-slate-800">
          {/* Left panel */}
          <div className="bg-crown-blue text-white p-8 lg:p-12 flex flex-col justify-center">
            <img
              src={ASSETS.badge}
              onError={onImgError}
              alt="Golden Crown School badge"
              className="h-20 w-20 object-contain mb-6"
            />
            <span className="inline-block h-1 w-12 rounded-full bg-crown-gold mb-4" />
            <h1 className="font-poppins font-bold text-3xl mb-3">Student & Parent Portal</h1>
            <p className="text-white/85 leading-relaxed">
              Welcome back to Golden Crown School. Log in to check examination results, view and pay
              fees, and stay up to date with the latest school notifications — all in one secure
              place.
            </p>
          </div>

          {/* Right — login form */}
          <div className="p-8 lg:p-12">
            <div className="flex gap-2 mb-6">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    role === r ? "bg-crown-blue text-white" : "bg-crown-white dark:bg-slate-900 text-crown-blue dark:text-crown-gold-light hover:bg-crown-gold/20"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {notice && (
              <div className="mb-5 bg-crown-gold/15 border border-crown-gold/40 text-crown-blue-dark rounded-lg px-4 py-3 text-sm">
                {notice}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  {role === "Parent" ? "Email / Parent ID" : role === "Staff" ? "Staff Email" : "Student ID / Email"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your ID or email"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crown-blue/40 focus:border-crown-blue"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Password</label>
                <div className="mt-1 relative">
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-crown-blue/40 focus:border-crown-blue"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="text-crown-blue dark:text-crown-gold-light hover:text-crown-gold">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold py-3 rounded-full transition-colors"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-slate-300">
                New student?{" "}
                <Link to="/admissions" className="text-crown-blue dark:text-crown-gold-light font-medium hover:text-crown-gold inline-flex items-center gap-1">
                  Apply here <ArrowRight size={14} />
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {[
            { Icon: ClipboardList, title: "Check Results", text: "View termly and BECE results as soon as they're released." },
            { Icon: CreditCard, title: "Pay Fees", text: "View statements and pay school fees securely online." },
            { Icon: Bell, title: "School Notifications", text: "Get announcements, reminders, and event alerts." },
          ].map(({ Icon, title, text }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm text-center"
            >
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-crown-gold/20 flex items-center justify-center">
                <Icon className="text-crown-blue dark:text-crown-gold-light" size={26} />
              </div>
              <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-1">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </>
  )
}
