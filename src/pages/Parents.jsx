import { Link } from "react-router-dom"
import {
  LogIn, Download, Smartphone, Building2, Users, ExternalLink, FileText,
} from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"

const downloads = [
  "Prospectus 2024/2025",
  "Admission Form",
  "Fee Structure",
  "Academic Calendar",
  "School Handbook",
  "School Rules & Code of Conduct",
]

const resources = [
  { label: "Ghana Education Service (GES)", url: "https://ges.gov.gh" },
  { label: "GES Standards-Based Curriculum", url: "https://nacca.gov.gh" },
  { label: "BECE Past Questions & Resources", url: "https://waecgh.org" },
]

export default function Parents() {
  return (
    <>
      <SEO
        title="For Parents"
        path="/parents"
        description="Parent portal, fee payment information, PTA, downloads, and resources for Golden Crown School families."
      />
      <PageBanner
        title="For Parents"
        subtitle="Everything you need to support your child's journey with us."
        breadcrumb="Parents"
      />

      {/* Portal CTA + handbook */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-crown-blue text-white rounded-2xl p-8 flex flex-col">
            <LogIn className="text-crown-gold mb-4" size={36} />
            <h3 className="font-poppins font-bold text-2xl mb-2">Parent Portal</h3>
            <p className="text-white/85 text-sm mb-6 flex-1">
              Check your child's results, view fee statements, and receive school notifications — all
              in one secure place.
            </p>
            <Link
              to="/portal"
              className="inline-flex items-center gap-2 bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold px-6 py-3 rounded-full transition-colors self-start"
            >
              Go to Portal <LogIn size={18} />
            </Link>
          </div>
          <div className="bg-crown-gold/10 border border-crown-gold/40 rounded-2xl p-8 flex flex-col">
            <FileText className="text-crown-blue dark:text-crown-gold-light mb-4" size={36} />
            <h3 className="font-poppins font-bold text-2xl text-crown-blue dark:text-crown-gold-light mb-2">Student Handbook</h3>
            <p className="text-gray-600 dark:text-slate-300 text-sm mb-6 flex-1">
              Our handbook covers school rules, the code of conduct, uniform policy, and everything
              parents and pupils need to know.
            </p>
            <a
              href="#"
              download
              className="inline-flex items-center gap-2 bg-crown-blue hover:bg-crown-blue-light text-white font-semibold px-6 py-3 rounded-full transition-colors self-start"
            >
              <Download size={18} /> Download Student Handbook (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Fee payment + PTA */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionTitle title="Fee Payment" center={false} />
            <div className="space-y-4">
              {[
                { Icon: Smartphone, title: "Mobile Money", text: "Pay conveniently via MTN, Telecel, or AirtelTigo mobile money. Use your child's name as reference." },
                { Icon: Building2, title: "Bank Transfer", text: "Direct bank transfer or deposit. Contact the school office for current account details." },
                { Icon: Users, title: "In Person", text: "Pay at the school accounts office during office hours and collect an official receipt." },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-crown-gold/20 flex items-center justify-center">
                    <Icon className="text-crown-blue dark:text-crown-gold-light" size={22} />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{title}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{text}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-500 dark:text-slate-400">Contact the school office for account details and the latest fee schedule.</p>
            </div>
          </div>

          <div>
            <SectionTitle title="Parent-Teacher Association" center={false} />
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                Our active PTA works hand-in-hand with the school to improve facilities, support
                school events, and strengthen the bond between home and school. Every parent is
                automatically a member.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                <li><strong className="text-crown-blue dark:text-crown-gold-light">When we meet:</strong> Once each term, plus an AGM at year-end.</li>
                <li><strong className="text-crown-blue dark:text-crown-gold-light">Next meeting:</strong> Saturday, June 14, 2025, 9:00am, Main Hall.</li>
                <li><strong className="text-crown-blue dark:text-crown-gold-light">How to join:</strong> Simply attend the next meeting — all parents are welcome.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Downloads" subtitle="Key documents, ready when you need them." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {downloads.map((d) => (
              <a
                key={d}
                href="#"
                download
                className="flex items-center gap-4 bg-crown-white dark:bg-slate-900 rounded-xl p-5 border border-gray-100 dark:border-slate-700 hover:border-crown-gold transition-colors"
              >
                <div className="h-11 w-11 shrink-0 rounded-full bg-crown-blue text-white flex items-center justify-center">
                  <Download size={20} />
                </div>
                <span className="font-medium text-crown-blue dark:text-crown-gold-light">{d}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Parent resources */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Parent Resources" subtitle="Helpful external links for parents." />
          <div className="space-y-3">
            {resources.map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl px-5 py-4 border border-gray-100 dark:border-slate-700 hover:border-crown-gold transition-colors"
              >
                <span className="font-medium text-crown-blue dark:text-crown-gold-light">{r.label}</span>
                <ExternalLink size={18} className="text-crown-gold" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
