import { useState } from "react"
import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Send } from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"
import { useI18n } from "../../context/I18nContext"

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/student-life", label: "Student Life" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News & Events" },
  { to: "/staff", label: "Our Staff" },
  { to: "/contact", label: "Contact" },
]

const downloads = ["Prospectus", "Admission Form", "Fee Structure", "Academic Calendar"]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const { t } = useI18n()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="relative bg-crown-blue-dark text-white">
      {/* Gold wave divider */}
      <div className="absolute -top-px inset-x-0 overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-[40px]"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,20 C300,40 600,0 900,20 C1050,30 1150,15 1200,20 L1200,40 L0,40 Z"
            fill="#D4AF37"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 — identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School badge"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h3 className="font-poppins font-bold text-lg">Golden Crown School</h3>
                <p className="text-crown-gold text-sm font-medium">{t("footer.tagline")}</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-crown-gold shrink-0 mt-0.5" />
                <span>MXM6+VVC, Lashibi, Greater Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-crown-gold shrink-0" />
                <a href="tel:+233555553729" className="hover:text-white">+233 55 555 3729</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-crown-gold shrink-0" />
                <a href="mailto:info@goldencrownschool.edu.gh" className="hover:text-white break-all">
                  info@goldencrownschool.edu.gh
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 — links + downloads */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-poppins font-semibold text-crown-gold mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {quickLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-crown-gold mb-4">{t("footer.downloads")}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {downloads.map((d) => (
                  <li key={d}>
                    <a href="#" download className="hover:text-white transition-colors">
                      {d}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 — term + social + newsletter */}
          <div>
            <h4 className="font-poppins font-semibold text-crown-gold mb-4">{t("footer.term")}</h4>
            <p className="text-sm text-white/80 mb-1">Third Term — 2024/2025</p>
            <p className="text-sm text-white/80 mb-5">School Hours: Mon–Fri, 7:00am – 5:00pm</p>

            <div className="flex items-center gap-3 mb-6">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Golden Crown School on ${label}`}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-crown-gold hover:text-crown-blue-dark transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <h4 className="font-poppins font-semibold text-crown-gold mb-3">{t("footer.newsletter")}</h4>
            {subscribed ? (
              <p className="text-sm text-crown-gold-light">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address for newsletter"
                  className="flex-1 min-w-0 rounded-l-md px-3 py-2 text-sm text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark px-3 rounded-r-md flex items-center"
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
          <p>© 2025 Golden Crown School, Lashibi. {t("footer.rights")}</p>
          <p className="text-crown-gold">www.goldencrownschool.edu.gh</p>
        </div>
      </div>
    </footer>
  )
}
