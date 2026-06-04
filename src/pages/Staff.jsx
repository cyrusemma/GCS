import { Mail } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import StaffCard from "../components/ui/StaffCard"
import SEO from "../components/ui/SEO"
import { leadership, teachers } from "../data/staff"

export default function Staff() {
  return (
    <>
      <SEO
        title="Our Staff"
        path="/staff"
        description="Meet the leadership and teaching staff of Golden Crown School, Lashibi — experienced, qualified educators."
      />
      <PageBanner
        title="Our Staff"
        subtitle="Meet the dedicated team behind Golden Crown School."
        breadcrumb="Staff"
      />

      {/* Leadership */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="School Leadership" subtitle="Experienced educators guiding our school." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((p) => (
              <StaffCard key={p.name} person={p} large />
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Teaching Staff" subtitle="Subject specialists committed to every learner." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((p) => (
              <StaffCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="py-16 lg:py-20 bg-crown-blue">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block h-1 w-12 rounded-full bg-crown-gold mb-4" />
          <h2 className="font-poppins font-bold text-3xl text-white mb-3">Join Our Team</h2>
          <p className="text-white/85 mb-7">
            Are you a passionate, qualified teacher who shares our values of Hardwork and Integrity?
            We'd love to hear from you. Send your CV and we'll be in touch.
          </p>
          <a
            href="mailto:info@goldencrownschool.edu.gh?subject=Teaching%20Application"
            className="inline-flex items-center gap-2 bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold px-7 py-3 rounded-full transition-colors"
          >
            <Mail size={18} /> Send CV to info@goldencrownschool.edu.gh
          </a>
        </div>
      </section>
    </>
  )
}
