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
import { IMAGES, ASSETS, onImgError } from "../data/images"
import { sendEmail } from "../lib/email"
import { celebrate } from "../lib/confetti"
import { useToast } from "../context/ToastContext"

const steps = [
  { Icon: FileDown, title: "Obtain Application Form", text: "Collect or download the admission form from the school office.", image: IMAGES.step_form },
  { Icon: PenLine, title: "Complete the Form", text: "Fill in all required details and attach documents for your child's level.", image: IMAGES.step_fill },
  { Icon: Wallet, title: "Submit Application", text: "Return the completed form with documents and pay the GHC 200.00 admission form fee.", image: IMAGES.step_submit },
  { Icon: ClipboardCheck, title: "Entrance Examination", text: "Primary and JHS applicants sit an entrance exam. Nursery/KG applicants are assessed informally.", image: IMAGES.step_exam },
  { Icon: ScrollText, title: "Admission Offer", text: "Successful applicants are notified and issued an offer letter.", image: IMAGES.step_offer },
  { Icon: CheckCircle2, title: "Register & Pay", text: "Pay the required tuition and fees to complete enrolment and bring all compulsory items.", image: IMAGES.step_register },
]

const nurseryKGRequirements = [
  "Completed admission/application form",
  "Copy of the child's birth certificate",
  "Two recent passport-sized photographs",
  "Copy of the child's health record",
  "Payment of the prescribed admission fee",
]

const primaryJHSRequirements = [
  "Completed admission form",
  "Birth certificate",
  "Two recent passport-sized photographs",
  "Transfer letter from former school (if applicable)",
  "Parent/Guardian's identification and contact information",
  "Payment of admission and registration fees",
  "Successful performance in an entrance examination",
]

const feeItems = [
  { item: "Admission Form & Admin Charges", amount: "GHC 200.00", note: "One-time on first admission" },
  { item: "Tuition — Nursery", amount: "GHC 670.00", note: "Per term" },
  { item: "Tuition — KG 1 & 2", amount: "GHC 580.00", note: "Per term" },
  { item: "Tuition — Primary 1–6", amount: "GHC 680.00", note: "Per term" },
  { item: "Tuition — JHS 1 & 2", amount: "GHC 770.00", note: "Per term" },
  { item: "Tuition — JHS 3", amount: "GHC 820.00", note: "Per term" },
  { item: "School Development Levy", amount: "GHC 30.00", note: "Per term" },
  { item: "Furniture & Maintenance", amount: "GHC 35.00", note: "Per term" },
  { item: "School Uniform (Nursery–Primary)", amount: "GHC 250.00", note: "Per uniform set" },
  { item: "School Uniform (JHS)", amount: "GHC 300.00", note: "Per uniform set" },
  { item: "Friday Wear / Lacoste", amount: "GHC 100.00", note: "Per item" },
  { item: "File, Report & Cumulative Record", amount: "GHC 35.00", note: "Per term" },
  { item: "Feeding Fee", amount: "GHC 10.00/day", note: "Payable daily, weekly, monthly, or termly" },
  { item: "Class Levy", amount: "GHC 4.00/day", note: "Payable daily, weekly, monthly, or termly" },
  { item: "Examination Fee", amount: "TBD", note: "Determined during examination period" },
  { item: "UC Mass", amount: "GHC 100.00", note: "Per term" },
]

const termTotals = [
  { level: "Nursery", total: "GHC 1,470.00" },
  { level: "KG 1 & 2", total: "GHC 1,330.00" },
  { level: "Primary 1–6", total: "GHC 1,530.00" },
  { level: "JHS 1 & 2", total: "GHC 1,670.00" },
  { level: "JHS 3", total: "GHC 1,720.00" },
]

const compulsoryItems = {
  "Nursery 1 & 2": [
    "1 key soap before admission; 4 laundry soaps at the beginning of every term",
    "1 pack of toilet rolls and a big-size antiseptic (Dettol/Camel) — same required every term",
    "A big-size mat (approx. GHC 150.00) and a bath-size baby towel",
    "A set of plastic bowls, spoon, and water bottle",
    "2 pampers/baby diapers per day",
    "Vaccination history/record",
  ],
  "KG 1 & 2": [
    "A set of plastic plates, spoon, and water bottle (replaceable when necessary)",
    "1 pack of toilet rolls and 1 key soap — same required at the beginning of every term",
  ],
  "Primary 1–6": [
    "A set of plastic plates, spoon, and water bottle (replaceable when necessary)",
    "1 pack of toilet rolls, 1 key soap, and 4 bathing soaps — same required at the beginning of every term",
  ],
}

const faqs = [
  { q: "What age does my child need to be to start Nursery?", a: "Children from about 3 years old are welcome in our Nursery. Please contact the school office to discuss your child's readiness." },
  { q: "Is there an entrance exam?", a: "A placement entrance examination is required for Primary and JHS applicants. Nursery and KG applicants are assessed informally." },
  { q: "When is the application deadline?", a: "Applications are accepted year-round, but spaces are limited per class. We encourage families to apply early, especially for the new academic year." },
  { q: "What documents do I need?", a: "Nursery/KG: birth certificate, 2 passport photos, and health/immunisation record. Primary/JHS: birth certificate, 2 passport photos, transfer letter (if applicable), and parent/guardian ID." },
  { q: "Can feeding fees be paid in installments?", a: "Yes. The daily feeding fee of GHC 10.00 can be paid daily, weekly, monthly, or termly — whichever is most convenient for the parent/guardian." },
  { q: "What items must I bring on my child's first day?", a: "All items listed under 'Compulsory Items' for your child's level are required. Please review the full list on this page and ensure everything is ready before the first day of school." },
  { q: "What are the school hours?", a: "School runs Monday to Friday, 7:00am to 5:00pm." },
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
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="How to Apply" subtitle="Six simple steps to enrolment." />
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {steps.map(({ Icon, title, text, image }, i) => (
              <motion.div
                key={title}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(13,71,161,0.15)" }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col"
              >
                {/* Image header */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={image}
                    onError={onImgError}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/80 via-crown-blue/40 to-transparent" />
                  {/* Step number */}
                  <span className="absolute top-3 right-3 font-poppins font-bold text-2xl text-white/60">{i + 1}</span>
                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-4 h-11 w-11 rounded-xl bg-crown-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon size={20} className="text-crown-blue-dark" />
                  </div>
                </div>
                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Entry Requirements" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg mb-4 border-b border-crown-gold/30 pb-2">Nursery / Kindergarten</h3>
              <ul className="space-y-2">
                {nurseryKGRequirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                    <span className="text-crown-gold mt-1 shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg mb-4 border-b border-crown-gold/30 pb-2">Primary / JHS</h3>
              <ul className="space-y-2">
                {primaryJHSRequirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                    <span className="text-crown-gold mt-1 shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="School Fees" subtitle="All amounts are in Ghana Cedis (GHC)." />
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-x-auto mb-8">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-crown-blue text-white">
                  <th className="px-4 py-3 font-poppins">Fee Item</th>
                  <th className="px-4 py-3 font-poppins">Amount</th>
                  <th className="px-4 py-3 font-poppins">Notes</th>
                </tr>
              </thead>
              <tbody>
                {feeItems.map((f, i) => (
                  <tr key={f.item} className={i % 2 ? "bg-crown-white dark:bg-slate-900" : "bg-white dark:bg-slate-800"}>
                    <td className="px-4 py-3 font-medium text-crown-blue dark:text-crown-gold-light">{f.item}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-slate-300 font-semibold">{f.amount}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-slate-400 text-xs">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SectionTitle title="Total Per Term" subtitle="Approximate total payable per level per term." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {termTotals.map((t) => (
              <div key={t.level} className="bg-crown-blue text-white rounded-xl p-5 text-center shadow-md">
                <p className="font-poppins font-semibold text-crown-gold text-sm mb-1">{t.level}</p>
                <p className="font-poppins font-bold text-xl">{t.total}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 italic border-l-4 border-crown-gold pl-4">
            Examination fees are determined separately during the examination period. Feeding fee and class levy can be paid daily, weekly, monthly, or termly. All fees are subject to review. Contact the school office for the most current fee schedule.
          </p>
        </div>
      </section>

      {/* Compulsory Items */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Compulsory Items to Bring" subtitle="Please ensure all items for your child's level are ready on the first day." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(compulsoryItems).map(([level, items]) => (
              <div key={level} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
                <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-4 border-b border-crown-gold/30 pb-2">{level}</h3>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                      <span className="text-crown-gold mt-1 shrink-0">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uniform */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="School Uniform" subtitle="The signature Golden Crown checked fabric — gold tones that reflect our school identity." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-8">
            {[
              { title: "Boys (Nursery–Primary)", desc: "Golden/yellow checked patterned shirt with brown shorts.", image: IMAGES.uniform_boys_primary },
              { title: "Girls (Nursery–Primary)", desc: "Golden/yellow checked patterned dress or skirt.", image: IMAGES.uniform_girls_primary },
              { title: "Boys (JHS)", desc: "Same checked pattern with brown trousers.", image: IMAGES.uniform_boys_jhs },
              { title: "Girls (JHS)", desc: "Same checked pattern with brown skirt.", image: IMAGES.uniform_girls_jhs },
            ].map(({ title, desc, image }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(13,71,161,0.15)" }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={image}
                    onError={onImgError}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/70 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-crown-blue/5 dark:bg-slate-800 rounded-xl p-6 border border-crown-gold/30">
            <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-3">Uniform Costs</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
              <li>Nursery to Primary: <strong className="text-crown-blue dark:text-crown-gold">GHC 250.00</strong> per set</li>
              <li>JHS: <strong className="text-crown-blue dark:text-crown-gold">GHC 300.00</strong> per set</li>
              <li>Friday Wear / Lacoste: <strong className="text-crown-blue dark:text-crown-gold">GHC 100.00</strong> each</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold">
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
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
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
