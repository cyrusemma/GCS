import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileDown, ClipboardCheck, PenLine, ScrollText, Wallet,
  Plus, Minus, CheckCircle2, X,
} from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"
import { ASSETS, onImgError } from "../data/images"
import { sendEmail } from "../lib/email"
import { celebrate } from "../lib/confetti"
import { useToast } from "../context/ToastContext"

const steps = [
  { Icon: FileDown, title: "Get the Form", text: "Download or collect an application form from the school office." },
  { Icon: PenLine, title: "Complete & Submit", text: "Fill the form and submit it with the required documents." },
  { Icon: ClipboardCheck, title: "Assessment", text: "Sit a short entrance assessment (required for JHS applicants)." },
  { Icon: ScrollText, title: "Review & Offer", text: "We review the application and issue an offer letter." },
  { Icon: Wallet, title: "Register", text: "Pay the acceptance fee and complete registration." },
]

const requirements = [
  { level: "Creche / Nursery / KG", docs: "Birth certificate, 2 passport photos, immunisation record" },
  { level: "Primary (Basic 1–6)", docs: "Birth certificate, 2 passport photos, previous school report" },
  { level: "Junior High (JHS 1–3)", docs: "Birth certificate, 4 passport photos, previous school report, transfer note" },
]

const fees = [
  { level: "Creche & Nursery", note: "Contact school for current fee schedule" },
  { level: "Kindergarten", note: "Contact school for current fee schedule" },
  { level: "Primary", note: "Contact school for current fee schedule" },
  { level: "Junior High School", note: "Contact school for current fee schedule" },
]

const faqs = [
  { q: "What age does my child need to be to start Creche?", a: "Children from about 1 year old are welcome in our Creche, provided they are comfortable being away from home for short periods." },
  { q: "Is there an entrance exam?", a: "A short, friendly placement assessment is used for Primary and JHS applicants to help us place each child appropriately. Younger children are assessed informally." },
  { q: "When is the application deadline?", a: "Applications are accepted year-round, but spaces are limited per class. We encourage families to apply early, especially for the new academic year." },
  { q: "What documents do I need?", a: "Generally a birth certificate, passport photographs, and (for transfers) a previous school report. See the Entry Requirements table above for details by level." },
  { q: "Do you offer scholarships?", a: "We occasionally offer need-based support. Please contact the school office to discuss your situation." },
  { q: "What are the school hours?", a: "School runs Monday to Friday, 7:00am to 5:00pm, including supervised after-school care." },
  { q: "Is there a school bus service?", a: "Yes, we operate bus routes covering Lashibi, Tema, and nearby communities. Contact the office for routes and fees." },
  { q: "How do I pay school fees?", a: "Fees can be paid via mobile money, bank transfer, or in person at the school office. Details are provided on the Parents page." },
]

const classOptions = [
  "Creche", "Nursery 1", "Nursery 2", "KG 1", "KG 2",
  "Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6",
  "JHS 1", "JHS 2", "JHS 3",
]

function Field({ label, error, children, required }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {error && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
    </label>
  )
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crown-blue/40 focus:border-crown-blue"

export default function Admissions() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const { toast } = useToast()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await sendEmail("admission", {
        form_type: "Admission Application",
        student_name: data.studentName,
        class_applying: data.classApplying,
        date_of_birth: data.dob,
        gender: data.gender,
        father_name: data.fatherName,
        father_phone: data.fatherPhone,
        mother_name: data.motherName,
        mother_phone: data.motherPhone,
        email: data.email,
        residential_area: data.area,
        previous_school: data.previousSchool,
        message: data.additional || data.medical || "—",
      })
      setSubmitted(true)
      celebrate()
      reset()
    } catch (err) {
      toast({
        type: "error",
        title: "Submission failed",
        message: "Something went wrong. Please try again or call the school office.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Admissions"
        path="/admissions"
        description="Apply to Golden Crown School, Lashibi. Admissions open for 2025/2026 — KG to JHS. Simple 5-step process and an online application form."
      />
      <PageBanner
        title="Admissions"
        subtitle="Join the Golden Crown School family. Applications open for 2025/2026."
        breadcrumb="Admissions"
      />

      {/* Process steps */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="How to Apply" subtitle="Five simple steps to enrolment." />
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {steps.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                className="relative bg-crown-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-100 dark:border-slate-700"
              >
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-crown-blue text-white flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <span className="absolute top-3 right-4 font-poppins font-bold text-3xl text-crown-gold/40">
                  {i + 1}
                </span>
                <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-1">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Requirements + Fees */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle title="Entry Requirements" center={false} />
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-crown-blue text-white">
                    <th className="px-4 py-3 font-poppins">Level</th>
                    <th className="px-4 py-3 font-poppins">Documents Needed</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((r, i) => (
                    <tr key={r.level} className={i % 2 ? "bg-crown-white dark:bg-slate-900" : "bg-white dark:bg-slate-800"}>
                      <td className="px-4 py-3 font-medium text-crown-blue dark:text-crown-gold-light align-top">{r.level}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-slate-300">{r.docs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <SectionTitle title="School Fees" center={false} />
            <div className="grid sm:grid-cols-2 gap-4">
              {fees.map((f) => (
                <div key={f.level} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">{f.level}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">{f.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">
              Fees subject to change. Contact the school office for the latest fee structure.
            </p>
          </div>
        </div>
      </section>

      {/* Uniform */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="School Uniform" subtitle="Smart, simple, and easy to maintain." />
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="bg-crown-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-2">Boys</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Golden/yellow checked patterned shirt with brown shorts. Brown sandals or black shoes
                with white socks.
              </p>
            </div>
            <div className="bg-crown-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-2">Girls</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Golden/yellow checked patterned dress or skirt. Black shoes with white socks. Hair
                neatly kept.
              </p>
            </div>
            <div className="bg-crown-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-2">PE Uniform</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                House-colour sports T-shirt with navy track bottoms and white canvas shoes. Worn on
                Wednesdays only.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div
              className="h-20 w-20 rounded-lg bg-checkered border border-gray-200 dark:border-slate-700 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm text-gray-600 dark:text-slate-300">
              The signature Golden Crown checked fabric — gold tones that reflect our school identity.
            </p>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Online Application Form"
            subtitle="Complete the form below to begin your child's enrolment."
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8 space-y-8"
          >
            {/* Section 1 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full">
                1. Student Information
              </legend>
              <Field label="Student's Full Name" required error={errors.studentName}>
                <input className={inputClass} {...register("studentName", { required: "Full name is required" })} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Date of Birth" required error={errors.dob}>
                  <input type="date" className={inputClass} {...register("dob", { required: "Date of birth is required" })} />
                </Field>
                <Field label="Gender" required error={errors.gender}>
                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" value="Male" {...register("gender", { required: "Select a gender" })} /> Male
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" value="Female" {...register("gender", { required: "Select a gender" })} /> Female
                    </label>
                  </div>
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nationality">
                  <input className={inputClass} defaultValue="Ghanaian" {...register("nationality")} />
                </Field>
                <Field label="Place of Birth">
                  <input className={inputClass} {...register("placeOfBirth")} />
                </Field>
              </div>
              <Field label="Class Applying For" required error={errors.classApplying}>
                <select className={inputClass} defaultValue="" {...register("classApplying", { required: "Select a class" })}>
                  <option value="" disabled>Select a class</option>
                  {classOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Previous School">
                  <input className={inputClass} {...register("previousSchool")} />
                </Field>
                <Field label="Last Class Completed">
                  <input className={inputClass} {...register("lastClass")} />
                </Field>
              </div>
            </fieldset>

            {/* Section 2 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full">
                2. Parent / Guardian Information
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Father's Full Name">
                  <input className={inputClass} {...register("fatherName")} />
                </Field>
                <Field label="Father's Phone Number">
                  <input className={inputClass} {...register("fatherPhone")} />
                </Field>
                <Field label="Mother's Full Name">
                  <input className={inputClass} {...register("motherName")} />
                </Field>
                <Field label="Mother's Phone Number">
                  <input className={inputClass} {...register("motherPhone")} />
                </Field>
                <Field label="Guardian Name (if different)">
                  <input className={inputClass} {...register("guardianName")} />
                </Field>
                <Field label="Guardian Phone">
                  <input className={inputClass} {...register("guardianPhone")} />
                </Field>
              </div>
              <Field label="Home Address">
                <input className={inputClass} {...register("address")} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Residential Area">
                  <input className={inputClass} placeholder="e.g. Lashibi, Tema, Accra" {...register("area")} />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    className={inputClass}
                    {...register("email", {
                      pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                    })}
                  />
                </Field>
              </div>
            </fieldset>

            {/* Section 3 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full">
                3. Additional Information
              </legend>
              <Field label="How did you hear about us?">
                <select className={inputClass} defaultValue="" {...register("source")}>
                  <option value="" disabled>Select an option</option>
                  {["Word of Mouth", "Social Media", "Roadside Banner", "Referral", "Other"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Any medical conditions or special needs?">
                <textarea rows={3} className={inputClass} {...register("medical")} />
              </Field>
              <Field label="Any additional information">
                <textarea rows={3} className={inputClass} {...register("additional")} />
              </Field>
            </fieldset>

            {/* Section 4 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full">
                4. Declaration
              </legend>
              <label className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  className="mt-1"
                  {...register("declaration", { required: "You must confirm the declaration" })}
                />
                I confirm that all information provided is accurate and true.
              </label>
              {errors.declaration && (
                <span className="text-xs text-red-500 block">{errors.declaration.message}</span>
              )}
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-crown-blue dark:text-crown-gold-light">{f.q}</span>
                    <span className="shrink-0 text-crown-gold">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-gray-600 dark:text-slate-300">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <button
                onClick={() => setSubmitted(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X size={22} />
              </button>
              <img
                src={ASSETS.badge}
                onError={onImgError}
                alt="Golden Crown School badge"
                className="h-20 w-20 mx-auto mb-4 object-contain"
              />
              <CheckCircle2 className="text-emerald-500 mx-auto mb-3" size={40} />
              <h3 className="font-poppins font-bold text-2xl text-crown-blue dark:text-crown-gold-light">Application Received!</h3>
              <p className="text-gray-600 dark:text-slate-300 mt-2">
                Thank you for applying to Golden Crown School. We will contact you within 3–5
                business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-crown-blue hover:bg-crown-blue-light text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
