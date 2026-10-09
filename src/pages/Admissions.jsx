import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileDown,
  ClipboardCheck,
  PenLine,
  ScrollText,
  Wallet,
  Plus,
  Minus,
  CheckCircle2,
  X,
  Printer,
  Eye,
  Check,
  ChevronRight,
  ArrowDown,
  Calendar,
  Sparkles,
  Info,
} from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"
import { IMAGES, ASSETS, onImgError } from "../data/images"
import { sendEmail } from "../lib/email"
import { celebrate } from "../lib/confetti"
import { useToast } from "../context/ToastContext"
import { useData } from "../context/DataContext"

const steps = [
  {
    Icon: FileDown,
    title: "Obtain Application Form",
    text: "Collect or download the admission form from the school office or fill it directly online.",
    image: IMAGES.step_form,
    actionLabel: "Fill Online Form",
    actionTarget: "#application-form",
    secondaryAction: "print-form",
  },
  {
    Icon: PenLine,
    title: "Complete the Form",
    text: "Fill in all student, parent, and medical details with required identification.",
    image: IMAGES.step_fill,
    actionLabel: "Start Form Now",
    actionTarget: "#application-form",
  },
  {
    Icon: Wallet,
    title: "Submit & Pay Fee",
    text: "Submit the completed application along with the GHC 200.00 admission processing fee.",
    image: IMAGES.step_submit,
    actionLabel: "View Fee Details",
    actionTarget: "#fees-section",
  },
  {
    Icon: ClipboardCheck,
    title: "Entrance Assessment",
    text: "Primary & JHS applicants sit a placement assessment; Nursery & KG learners are informally evaluated.",
    image: IMAGES.step_exam,
    actionLabel: "Assessment Guide",
    modalType: "exam-guide",
  },
  {
    Icon: ScrollText,
    title: "Admission Offer",
    text: "Successful applicants are notified within 3–5 business days and issued an official offer letter.",
    image: IMAGES.step_offer,
    actionLabel: "Admission Timelines",
    modalType: "timelines",
  },
  {
    Icon: CheckCircle2,
    title: "Register & Pay Fees",
    text: "Pay termly tuition, procure school uniform, and bring all compulsory classroom supplies.",
    image: IMAGES.step_register,
    actionLabel: "Calculate Fees",
    actionTarget: "#fees-section",
  },
]

const nurseryKGRequirements = [
  "Completed admission / application form",
  "Copy of the child's birth certificate",
  "Two recent passport-sized photographs",
  "Copy of the child's health and immunisation record",
  "Payment of the prescribed admission fee (GHC 200.00)",
]

const primaryJHSRequirements = [
  "Completed admission form",
  "Copy of child's birth certificate",
  "Two recent passport-sized photographs",
  "Transfer letter & terminal report from former school (if applicable)",
  "Parent / Guardian's identification & valid contact numbers",
  "Payment of admission and registration fees",
  "Satisfactory performance in entrance placement assessment",
]

const feeItems = [
  { item: "Admission Form & Admin Charges", amount: "GHC 200.00", note: "One-time on first admission", level: "All" },
  { item: "Tuition — Nursery", amount: "GHC 670.00", note: "Per term", level: "Nursery" },
  { item: "Tuition — KG 1 & 2", amount: "GHC 580.00", note: "Per term", level: "KG 1 & 2" },
  { item: "Tuition — Primary 1–6", amount: "GHC 680.00", note: "Per term", level: "Primary 1–6" },
  { item: "Tuition — JHS 1 & 2", amount: "GHC 770.00", note: "Per term", level: "JHS 1 & 2" },
  { item: "Tuition — JHS 3", amount: "GHC 820.00", note: "Per term", level: "JHS 3" },
  { item: "School Development Levy", amount: "GHC 30.00", note: "Per term", level: "All" },
  { item: "Furniture & Maintenance", amount: "GHC 35.00", note: "Per term", level: "All" },
  { item: "School Uniform (Nursery–Primary)", amount: "GHC 250.00", note: "Per uniform set", level: "Primary" },
  { item: "School Uniform (JHS)", amount: "GHC 300.00", note: "Per uniform set", level: "JHS" },
  { item: "Friday Wear / Lacoste", amount: "GHC 100.00", note: "Per item", level: "All" },
  { item: "File, Report & Cumulative Record", amount: "GHC 35.00", note: "Per term", level: "All" },
  { item: "Feeding Fee", amount: "GHC 10.00 / day", note: "Payable daily, weekly, or termly (~GHC 600/term)", level: "All" },
  { item: "Class Levy", amount: "GHC 4.00 / day", note: "Payable daily, weekly, or termly (~GHC 240/term)", level: "All" },
  { item: "UC Mass", amount: "GHC 100.00", note: "Per term", level: "All" },
]

const termTotals = [
  { level: "Nursery", total: "GHC 1,470.00", tuition: 670, base: 1470, desc: "Creche & Nursery 1 & 2" },
  { level: "KG 1 & 2", total: "GHC 1,330.00", tuition: 580, base: 1330, desc: "Kindergarten 1 & 2" },
  { level: "Primary 1–6", total: "GHC 1,530.00", tuition: 680, base: 1530, desc: "Basic 1 through Basic 6" },
  { level: "JHS 1 & 2", total: "GHC 1,670.00", tuition: 770, base: 1670, desc: "Junior High School 1 & 2" },
  { level: "JHS 3", total: "GHC 1,720.00", tuition: 820, base: 1720, desc: "Final Year BECE Candidate Class" },
]

const compulsoryItems = {
  "Nursery 1 & 2": [
    "1 key soap before admission; 4 laundry soaps at the beginning of every term",
    "1 pack of toilet rolls and a big-size antiseptic (Dettol/Camel) — required every term",
    "A big-size mat (approx. GHC 150.00) and a bath-size baby towel",
    "A set of plastic bowls, spoon, and water bottle",
    "2 pampers / baby diapers per day (if not fully potty trained)",
    "Child vaccination history & medical health record",
  ],
  "KG 1 & 2": [
    "A set of plastic plates, spoon, and water bottle (replaceable when necessary)",
    "1 pack of toilet rolls and 1 key soap — required at the beginning of every term",
    "Handkerchief and light hand towel",
    "Crayons, coloring booklet, and pencil set",
  ],
  "Primary 1–6": [
    "A set of plastic plates, spoon, and water bottle (replaceable when necessary)",
    "1 pack of toilet rolls, 1 key soap, and 4 bathing soaps — required every term",
    "Mathematical set, pencils, eraser, and standard 30cm ruler",
    "Prescribed GES exercise books and school bag",
  ],
}

const faqs = [
  { q: "What age does my child need to be to start Nursery?", a: "Children from about 3 years old are welcome in our Nursery. For younger children, our Creche admits from 18 months." },
  { q: "Is there an entrance assessment?", a: "Yes. Primary and JHS applicants sit a brief diagnostic assessment in English and Mathematics to gauge proper class placement. Nursery and KG children are assessed informally in a play setting." },
  { q: "When is the application deadline?", a: "We accept applications year-round, subject to vacancy in each classroom. We recommend submitting by July/August for the September academic year." },
  { q: "What documents do I need?", a: "Child's birth certificate, 2 recent passport-size photos, health/vaccination record, and previous terminal report or transfer certificate (for Primary/JHS)." },
  { q: "Can feeding fees be paid in installments?", a: "Yes. The GHC 10.00/day feeding fee can be settled daily, weekly, monthly, or as a lump sum per term." },
  { q: "What are the official school hours?", a: "School operates Monday to Friday, 7:00am to 5:00pm. Early morning supervision begins at 6:45am." },
  { q: "How do I pay school fees?", a: "Fees are payable via Mobile Money (MoMo), direct bank transfer, or in person at the accounts office. Official receipts are issued immediately." },
]

const classOptions = [
  "Creche", "Nursery 1", "Nursery 2", "KG 1", "KG 2",
  "Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6",
  "JHS 1", "JHS 2", "JHS 3",
]

const uniforms = [
  {
    id: "boys-primary",
    title: "Boys (Nursery–Primary)",
    desc: "Golden Crown checked patterned shirt with classic brown shorts.",
    price: "GHC 250.00 per set",
    image: IMAGES.uniform_boys_primary,
    schedule: "Mondays to Thursdays",
  },
  {
    id: "girls-primary",
    title: "Girls (Nursery–Primary)",
    desc: "Golden/yellow checked patterned dress or pinafore.",
    price: "GHC 250.00 per set",
    image: IMAGES.uniform_girls_primary,
    schedule: "Mondays to Thursdays",
  },
  {
    id: "boys-jhs",
    title: "Boys (JHS 1–3)",
    desc: "Golden checked formal shirt paired with tailored brown trousers.",
    price: "GHC 300.00 per set",
    image: IMAGES.uniform_boys_jhs,
    schedule: "Mondays to Thursdays",
  },
  {
    id: "girls-jhs",
    title: "Girls (JHS 1–3)",
    desc: "Golden checked formal blouse with pleated brown skirt.",
    price: "GHC 300.00 per set",
    image: IMAGES.uniform_girls_jhs,
    schedule: "Mondays to Thursdays",
  },
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
  "w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-crown-gold/50 focus:border-crown-gold transition-colors"

export default function Admissions() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
  const [submittedData, setSubmittedData] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [selectedFeeLevel, setSelectedFeeLevel] = useState("Primary 1–6")
  const [checkedSupplies, setCheckedSupplies] = useState({})
  const [activeModal, setActiveModal] = useState(null) // 'print-form' | 'exam-guide' | 'timelines' | 'uniform'
  const [selectedUniform, setSelectedUniform] = useState(null)
  const { toast } = useToast()
  const { addSubmission } = useData()

  const watchClass = watch("classApplying")

  const handleSmoothScroll = (selector) => {
    const el = document.querySelector(selector)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const toggleSupplyCheck = (key) => {
    setCheckedSupplies((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const printDocument = () => {
    window.print()
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    const refNumber = `GCS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    try {
      addSubmission({
        type: "admission",
        refNumber,
        studentName: data.studentName,
        parentName: data.fatherName || data.motherName || "Parent",
        email: data.email,
        phone: data.fatherPhone || data.motherPhone || "—",
        grade: data.classApplying,
        message: `DOB: ${data.dob} • Area: ${data.area || "—"} • Prev School: ${data.previousSchool || "None"}`,
      })

      await sendEmail("admission", {
        ref_number: refNumber,
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

      setSubmittedData({ ...data, refNumber })
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
        title="Admissions & Enrolment"
        path="/admissions"
        description="Apply to Golden Crown School, Lashibi. Admissions open for 2025/2026 academic year. View step-by-step process, fee schedule, uniform guidelines, and apply online."
      />
      <PageBanner
        title="Admissions & Enrolment"
        subtitle="Join our close-knit academic family. Admissions are currently open for 2025/2026."
        breadcrumb="Admissions"
      />

      {/* Quick Action Navigation Bar */}
      <section className="bg-crown-gold/10 dark:bg-slate-900 border-b border-crown-gold/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-crown-blue dark:text-crown-gold font-medium">
            <Sparkles size={18} className="text-crown-gold shrink-0" />
            <span>Enrolment for 2025/2026 in progress • Creche to JHS 3</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleSmoothScroll("#application-form")}
              className="inline-flex items-center gap-1.5 bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold text-xs sm:text-sm px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              <PenLine size={15} />
              <span>Apply Online</span>
            </button>
            <button
              onClick={() => setActiveModal("print-form")}
              className="inline-flex items-center gap-1.5 border border-crown-blue/30 dark:border-crown-gold/40 text-crown-blue dark:text-crown-gold hover:bg-crown-blue hover:text-white dark:hover:bg-crown-gold dark:hover:text-crown-blue-dark font-medium text-xs sm:text-sm px-4 py-2 rounded-full transition-colors"
            >
              <Printer size={15} />
              <span>Printable Form</span>
            </button>
            <button
              onClick={() => handleSmoothScroll("#fees-section")}
              className="inline-flex items-center gap-1.5 text-gray-700 dark:text-slate-300 hover:text-crown-gold text-xs sm:text-sm font-medium px-2 py-2 transition-colors"
            >
              <Wallet size={15} />
              <span>Fees</span>
            </button>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How to Apply"
            subtitle="Six clear steps to secure admission for your child. Click any card to take action."
          />
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {steps.map((step, i) => {
              const StepIcon = step.Icon
              return (
                <motion.div
                  key={step.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  {/* Card Banner */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={step.image}
                      onError={onImgError}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/85 via-crown-blue/40 to-transparent" />
                    <span className="absolute top-3 right-3 font-poppins font-bold text-2xl text-white/50">
                      0{i + 1}
                    </span>
                    <div className="absolute bottom-3 left-4 h-11 w-11 rounded-xl bg-crown-gold text-crown-blue-dark flex items-center justify-center shadow-lg">
                      <StepIcon size={20} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-base mb-2 group-hover:text-crown-gold transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                        {step.text}
                      </p>
                    </div>

                    {/* Functional Action Buttons on Card */}
                    <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                      {step.actionTarget ? (
                        <button
                          type="button"
                          onClick={() => handleSmoothScroll(step.actionTarget)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-crown-blue dark:text-crown-gold hover:underline"
                        >
                          <span>{step.actionLabel}</span>
                          <ChevronRight size={14} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveModal(step.modalType)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-crown-blue dark:text-crown-gold hover:underline"
                        >
                          <span>{step.actionLabel}</span>
                          <Info size={13} />
                        </button>
                      )}

                      {step.secondaryAction === "print-form" && (
                        <button
                          type="button"
                          onClick={() => setActiveModal("print-form")}
                          className="text-xs text-gray-500 dark:text-slate-400 hover:text-crown-gold flex items-center gap-1"
                        >
                          <Printer size={13} />
                          <span>PDF Form</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Entry Requirements Cards */}
      <section className="py-16 lg:py-20 bg-crown-white dark:bg-[#0a1124] border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Entry Requirements"
            subtitle="Documents and prerequisites needed before admission can be confirmed."
          />
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Nursery / KG */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-crown-gold/30">
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg">
                    Nursery / Kindergarten
                  </h3>
                  <span className="text-xs bg-crown-gold/20 text-crown-gold-dark dark:text-crown-gold font-medium px-2.5 py-1 rounded-full">
                    Ages 2 to 5
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
                  For toddlers and early learners transitioning to structured learning.
                </p>
                <ul className="space-y-3">
                  {nurseryKGRequirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-200">
                      <span className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button
                  onClick={() => handleSmoothScroll("#application-form")}
                  className="w-full bg-crown-gold/15 hover:bg-crown-gold text-crown-blue-dark font-semibold text-xs py-2.5 rounded-xl transition-colors text-center"
                >
                  Apply for Nursery / KG Enrolment
                </button>
              </div>
            </div>

            {/* Primary / JHS */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-crown-gold/30">
                  <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg">
                    Primary / JHS
                  </h3>
                  <span className="text-xs bg-crown-blue/10 dark:bg-crown-gold/20 text-crown-blue dark:text-crown-gold font-medium px-2.5 py-1 rounded-full">
                    Basic 1 to JHS 3
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
                  Requires previous academic record and diagnostic assessment.
                </p>
                <ul className="space-y-3">
                  {primaryJHSRequirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-200">
                      <span className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button
                  onClick={() => handleSmoothScroll("#application-form")}
                  className="w-full bg-crown-blue hover:bg-crown-blue-light text-white font-semibold text-xs py-2.5 rounded-xl transition-colors text-center"
                >
                  Apply for Primary / JHS Enrolment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive School Fees & Calculator */}
      <section id="fees-section" className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="School Fees & Calculator"
            subtitle="Select a level below to inspect exact tuition, levies, and termly totals."
          />

          {/* Interactive Level Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
            {termTotals.map((t) => {
              const isSelected = selectedFeeLevel === t.level
              return (
                <button
                  key={t.level}
                  type="button"
                  onClick={() => setSelectedFeeLevel(t.level)}
                  className={`p-4 rounded-2xl text-left border transition-all text-sm flex flex-col justify-between ${
                    isSelected
                      ? "bg-crown-blue text-white border-crown-gold shadow-md ring-2 ring-crown-gold"
                      : "bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-200 border-gray-200 dark:border-slate-700 hover:border-crown-gold/60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-poppins font-semibold text-sm">{t.level}</span>
                      {isSelected && <Check size={16} className="text-crown-gold" />}
                    </div>
                    <span className={`text-[11px] block leading-tight ${isSelected ? "text-white/80" : "text-gray-500 dark:text-slate-400"}`}>
                      {t.desc}
                    </span>
                  </div>
                  <div className="mt-4 pt-2 border-t border-current/15">
                    <span className="text-xs uppercase tracking-wider block opacity-75">Per Term</span>
                    <span className="font-poppins font-bold text-base sm:text-lg text-crown-gold">
                      {t.total}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detailed Fee Breakdown Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-slate-900/60 px-5 py-3 border-b border-gray-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-crown-blue dark:text-crown-gold">
                Viewing Fee Schedule: {selectedFeeLevel}
              </span>
              <button
                type="button"
                onClick={printDocument}
                className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-300 hover:text-crown-gold"
              >
                <Printer size={14} />
                <span>Print Schedule</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-crown-blue text-white text-xs uppercase tracking-wider">
                    <th className="px-5 py-3.5 font-poppins font-semibold">Fee Item</th>
                    <th className="px-5 py-3.5 font-poppins font-semibold">Amount</th>
                    <th className="px-5 py-3.5 font-poppins font-semibold">Frequency / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {feeItems.map((f, i) => {
                    const isHighlighted = f.item.includes(selectedFeeLevel)
                    return (
                      <tr
                        key={f.item}
                        className={
                          isHighlighted
                            ? "bg-crown-gold/10 font-semibold"
                            : i % 2 === 0
                            ? "bg-white dark:bg-slate-800"
                            : "bg-gray-50/60 dark:bg-slate-800/60"
                        }
                      >
                        <td className="px-5 py-3 text-crown-blue dark:text-slate-100">
                          {f.item}
                          {isHighlighted && (
                            <span className="ml-2 text-[10px] bg-crown-gold text-crown-blue-dark px-1.5 py-0.5 rounded font-bold">
                              Selected
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3 font-semibold text-gray-800 dark:text-slate-200">
                          {f.amount}
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-500 dark:text-slate-400">
                          {f.note}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
            <p className="font-semibold">Notice on Additional Levies:</p>
            <p>
              Daily feeding fee (GHC 10.00) and daily class levy (GHC 4.00) can be paid on a daily, weekly, or termly basis. Examination fees are determined during examination periods.
            </p>
          </div>
        </div>
      </section>

      {/* Compulsory Items Checklist */}
      <section className="py-16 lg:py-20 bg-crown-white dark:bg-[#0a1124] border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Compulsory Items to Bring"
            subtitle="Interactive checklist of required stationery, hygiene, and learning materials."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(compulsoryItems).map(([level, items]) => (
              <div
                key={level}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-crown-gold/30">
                    <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light">
                      {level}
                    </h3>
                    <span className="text-[11px] text-gray-500 dark:text-slate-400">
                      Check items as you pack
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {items.map((item, i) => {
                      const itemKey = `${level}-${i}`
                      const isChecked = Boolean(checkedSupplies[itemKey])
                      return (
                        <li
                          key={i}
                          onClick={() => toggleSupplyCheck(itemKey)}
                          className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300 cursor-pointer select-none group"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-1 h-4 w-4 rounded text-crown-gold focus:ring-crown-gold cursor-pointer"
                          />
                          <span className={`transition-opacity ${isChecked ? "line-through opacity-60" : "group-hover:text-crown-gold"}`}>
                            {item}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-100 dark:border-slate-700/80 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-slate-400">
                    {items.filter((_, i) => checkedSupplies[`${level}-${i}`]).length} / {items.length} packed
                  </span>
                  <button
                    onClick={printDocument}
                    className="text-xs font-semibold text-crown-blue dark:text-crown-gold hover:underline flex items-center gap-1"
                  >
                    <Printer size={13} />
                    <span>Print Checklist</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive School Uniform Cards with Modal View */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#0a1124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="School Uniform"
            subtitle="The official Golden Crown gold-checked pattern. Click any card to preview full details."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-8">
            {uniforms.map((uniform) => (
              <motion.div
                key={uniform.id}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedUniform(uniform)}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={uniform.image}
                    onError={onImgError}
                    alt={uniform.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-crown-blue-dark/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 text-xs bg-crown-gold text-crown-blue-dark px-2.5 py-1 rounded-full font-bold shadow">
                    {uniform.price.split(" ")[1]} GHC
                  </span>
                  <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={15} />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-sm mb-1 group-hover:text-crown-gold transition-colors">
                      {uniform.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-2">
                      {uniform.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs text-crown-blue dark:text-crown-gold font-medium">
                    <span>View Specifications</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-crown-blue/5 dark:bg-slate-800/80 rounded-2xl p-6 border border-crown-gold/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold text-base mb-1">
                Uniform Pricing & Friday Wear
              </h4>
              <p className="text-xs text-gray-600 dark:text-slate-300">
                Nursery to Primary: GHC 250.00 • JHS: GHC 300.00 • Friday Wear Polo: GHC 100.00
              </p>
            </div>
            <button
              onClick={() => handleSmoothScroll("#application-form")}
              className="bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold text-xs px-5 py-2.5 rounded-full transition-colors"
            >
              Order Uniform via Form
            </button>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section id="application-form" className="py-16 lg:py-24 bg-crown-white dark:bg-[#0a1124] border-t-2 border-crown-gold scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Online Application Form"
            subtitle="Complete the official enrolment form below. Once submitted, our admissions office will review and confirm within 3–5 business days."
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 sm:p-10 space-y-8"
          >
            {/* Section 1 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full flex items-center justify-between">
                <span>1. Student Information</span>
                <span className="text-xs font-normal text-gray-500 dark:text-slate-400">Step 1 of 4</span>
              </legend>
              <Field label="Student's Full Name" required error={errors.studentName}>
                <input
                  placeholder="e.g. Samuel Kofi Mensah"
                  className={inputClass}
                  {...register("studentName", { required: "Full name is required" })}
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Date of Birth" required error={errors.dob}>
                  <input
                    type="date"
                    className={inputClass}
                    {...register("dob", { required: "Date of birth is required" })}
                  />
                </Field>
                <Field label="Gender" required error={errors.gender}>
                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 cursor-pointer">
                      <input type="radio" value="Male" {...register("gender", { required: "Select a gender" })} /> Male
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 cursor-pointer">
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
                  <input className={inputClass} placeholder="e.g. Accra" {...register("placeOfBirth")} />
                </Field>
              </div>
              <Field label="Class Applying For" required error={errors.classApplying}>
                <select className={inputClass} defaultValue="" {...register("classApplying", { required: "Select a class" })}>
                  <option value="" disabled>Select class or level</option>
                  {classOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Previous School (if applicable)">
                  <input className={inputClass} placeholder="Previous school name" {...register("previousSchool")} />
                </Field>
                <Field label="Last Class Completed">
                  <input className={inputClass} placeholder="e.g. Class 2" {...register("lastClass")} />
                </Field>
              </div>
            </fieldset>

            {/* Section 2 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full flex items-center justify-between">
                <span>2. Parent / Guardian Information</span>
                <span className="text-xs font-normal text-gray-500 dark:text-slate-400">Step 2 of 4</span>
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Father's Full Name">
                  <input className={inputClass} placeholder="Mr. ..." {...register("fatherName")} />
                </Field>
                <Field label="Father's Phone Number">
                  <input className={inputClass} placeholder="024 XXX XXXX" {...register("fatherPhone")} />
                </Field>
                <Field label="Mother's Full Name">
                  <input className={inputClass} placeholder="Mrs./Ms. ..." {...register("motherName")} />
                </Field>
                <Field label="Mother's Phone Number">
                  <input className={inputClass} placeholder="020 XXX XXXX" {...register("motherPhone")} />
                </Field>
              </div>
              <Field label="Home Address">
                <input className={inputClass} placeholder="House number / Street / Landmark" {...register("address")} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Residential Community / Area" required error={errors.area}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Lashibi Community 20, Sakumono, Spintex"
                    {...register("area", { required: "Residential area is required" })}
                  />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="parent@example.com"
                    {...register("email", {
                      pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                    })}
                  />
                </Field>
              </div>
            </fieldset>

            {/* Section 3 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full flex items-center justify-between">
                <span>3. Health & School Bus</span>
                <span className="text-xs font-normal text-gray-500 dark:text-slate-400">Step 3 of 4</span>
              </legend>
              <Field label="How did you hear about Golden Crown School?">
                <select className={inputClass} defaultValue="" {...register("source")}>
                  <option value="" disabled>Select referral source</option>
                  {["Word of Mouth / Referral", "Social Media / TikTok", "Roadside Signboard", "Alumni / Current Parent", "Other"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Medical conditions, allergies, or special learning requirements">
                <textarea
                  rows={2}
                  className={inputClass}
                  placeholder="State any food allergies, asthma, dietary restrictions, or write 'None'"
                  {...register("medical")}
                />
              </Field>
              <Field label="Additional notes or transport bus inquiry">
                <textarea
                  rows={2}
                  className={inputClass}
                  placeholder="e.g. Interested in school bus pickup route for Lashibi Comm 19"
                  {...register("additional")}
                />
              </Field>
            </fieldset>

            {/* Section 4 */}
            <fieldset className="space-y-4">
              <legend className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light text-lg border-b-2 border-crown-gold pb-2 w-full flex items-center justify-between">
                <span>4. Parent Declaration</span>
                <span className="text-xs font-normal text-gray-500 dark:text-slate-400">Step 4 of 4</span>
              </legend>
              <label className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-300 cursor-pointer p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded text-crown-gold focus:ring-crown-gold"
                  {...register("declaration", { required: "Please confirm the declaration before submitting" })}
                />
                <span className="leading-relaxed">
                  I hereby confirm that all information provided in this admission form is accurate and true to the best of my knowledge.
                </span>
              </label>
              {errors.declaration && (
                <span className="text-xs text-red-500 block">{errors.declaration.message}</span>
              )}
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold text-base py-4 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-crown-blue-dark border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Application…</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Submit Admission Application</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0a1124]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Frequently Asked Questions" subtitle="Answers to common questions about enrolment and life at Golden Crown." />
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="font-medium text-crown-blue dark:text-crown-gold-light text-sm sm:text-base">
                      {f.q}
                    </span>
                    <span className="shrink-0 text-crown-gold">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* MODAL 1: Application Received Confirmation Voucher */}
      <AnimatePresence>
        {submittedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSubmittedData(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center border border-crown-gold/30"
            >
              <button
                onClick={() => setSubmittedData(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X size={22} />
              </button>

              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>

              <h3 className="font-poppins font-bold text-2xl text-crown-blue dark:text-crown-gold-light">
                Application Successfully Received!
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Your admission reference number has been generated:
              </p>

              <div className="my-4 py-3 px-4 bg-crown-gold/10 dark:bg-slate-900 border border-crown-gold/40 rounded-xl">
                <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-slate-400 block font-medium">
                  Reference Slip Number
                </span>
                <span className="font-mono font-bold text-xl text-crown-blue dark:text-crown-gold">
                  {submittedData.refNumber}
                </span>
              </div>

              <div className="text-left text-xs bg-gray-50 dark:bg-slate-900 p-4 rounded-xl space-y-1.5 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800">
                <p><strong>Applicant:</strong> {submittedData.studentName}</p>
                <p><strong>Level Applying:</strong> {submittedData.classApplying}</p>
                <p><strong>Primary Contact:</strong> {submittedData.fatherPhone || submittedData.motherPhone || submittedData.email}</p>
                <p><strong>Next Step:</strong> School office will contact you within 3–5 business days to confirm entrance assessment or informal interview.</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={printDocument}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 border border-crown-blue text-crown-blue dark:border-crown-gold dark:text-crown-gold font-medium py-2.5 rounded-full hover:bg-crown-blue hover:text-white dark:hover:bg-crown-gold dark:hover:text-crown-blue-dark transition-colors text-sm"
                >
                  <Printer size={16} />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedData(null)}
                  className="flex-1 bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold py-2.5 rounded-full transition-colors text-sm"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Printable Official Admission Form Modal */}
      <AnimatePresence>
        {activeModal === "print-form" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-crown-gold/30"
            >
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X size={22} />
              </button>

              <div className="text-center pb-4 border-b border-gray-200 dark:border-slate-700">
                <img
                  src={ASSETS.badge}
                  onError={onImgError}
                  alt="Badge"
                  className="h-16 w-16 mx-auto object-contain mb-2"
                />
                <h3 className="font-poppins font-bold text-xl text-crown-blue dark:text-crown-gold">
                  Golden Crown School, Lashibi
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Motto: Hardwork and Integrity • Lashibi, Greater Accra, Ghana
                </p>
                <h4 className="mt-2 font-poppins font-semibold text-sm uppercase tracking-wider text-crown-gold-dark dark:text-crown-gold">
                  Official Admission Application Form
                </h4>
              </div>

              <div className="my-6 space-y-4 text-xs text-gray-700 dark:text-slate-300">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                  <p className="font-semibold text-crown-blue dark:text-crown-gold mb-1">
                    Instructions for Physical Submission:
                  </p>
                  <p>
                    1. Print this form and fill out all sections clearly in blue or black pen.
                  </p>
                  <p>
                    2. Attach two (2) passport photos, a copy of the child’s birth certificate, and vaccination record.
                  </p>
                  <p>
                    3. Submit the completed packet to the administration office at the Lashibi campus, Monday–Friday (7:00am–5:00pm).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 border border-dashed border-gray-300 dark:border-slate-700 rounded-xl">
                  <div>
                    <span className="block font-semibold">Student Name:</span>
                    <span className="block border-b border-gray-300 dark:border-slate-700 pt-3"></span>
                  </div>
                  <div>
                    <span className="block font-semibold">Class Applying:</span>
                    <span className="block border-b border-gray-300 dark:border-slate-700 pt-3"></span>
                  </div>
                  <div>
                    <span className="block font-semibold">Date of Birth:</span>
                    <span className="block border-b border-gray-300 dark:border-slate-700 pt-3"></span>
                  </div>
                  <div>
                    <span className="block font-semibold">Gender:</span>
                    <span className="block border-b border-gray-300 dark:border-slate-700 pt-3"></span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-semibold">Parent / Guardian Phone:</span>
                    <span className="block border-b border-gray-300 dark:border-slate-700 pt-3"></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={printDocument}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold py-3 rounded-full text-sm transition-colors shadow"
                >
                  <Printer size={16} />
                  <span>Print Official Form (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null)
                    handleSmoothScroll("#application-form")
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-crown-blue dark:border-crown-gold text-crown-blue dark:text-crown-gold py-3 rounded-full text-sm font-semibold hover:bg-crown-blue hover:text-white dark:hover:bg-crown-gold dark:hover:text-crown-blue-dark transition-colors"
                >
                  <PenLine size={16} />
                  <span>Fill Out Online Instead</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Assessment Guide Modal */}
      <AnimatePresence>
        {activeModal === "exam-guide" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-crown-gold/30"
            >
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X size={22} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-crown-gold/20 text-crown-gold flex items-center justify-center shrink-0">
                  <ClipboardCheck size={22} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-crown-blue dark:text-crown-gold-light">
                    Entrance Placement Assessment Guide
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Diagnostic evaluation format</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-gray-700 dark:text-slate-300">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                  <h4 className="font-semibold text-crown-blue dark:text-crown-gold mb-1">
                    Nursery & Kindergarten:
                  </h4>
                  <p>
                    Informal evaluation in a relaxed play setting assessing motor skills, spoken English, and social interaction. No written examination.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                  <h4 className="font-semibold text-crown-blue dark:text-crown-gold mb-1">
                    Primary (Basic 1–6):
                  </h4>
                  <p>
                    Diagnostic paper covering English Language (comprehension, spelling) and Mathematics (numeracy, word problems). Duration: 1 hour.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                  <h4 className="font-semibold text-crown-blue dark:text-crown-gold mb-1">
                    Junior High School (JHS 1–3):
                  </h4>
                  <p>
                    Papers in English Language, Mathematics, and Integrated Science based on GES Basic 6 / preceding grade syllabus.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="mt-6 w-full bg-crown-blue hover:bg-crown-blue-light text-white font-semibold py-2.5 rounded-full text-xs transition-colors"
              >
                Understood
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 4: Admission Timelines Modal */}
      <AnimatePresence>
        {activeModal === "timelines" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-crown-gold/30"
            >
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X size={22} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-crown-gold/20 text-crown-gold flex items-center justify-center shrink-0">
                  <ScrollText size={22} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-crown-blue dark:text-crown-gold-light">
                    Admission Timelines & Notification
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">What to expect after submission</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-gray-700 dark:text-slate-300">
                <div className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <span className="font-bold text-crown-gold text-sm shrink-0">Day 1–2:</span>
                  <p>Application received and entered into student registry. Verification of submitted details.</p>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <span className="font-bold text-crown-gold text-sm shrink-0">Day 3–4:</span>
                  <p>Parent contacted via phone/SMS to schedule the entrance assessment date or nursery interaction.</p>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <span className="font-bold text-crown-gold text-sm shrink-0">Day 5:</span>
                  <p>Formal Offer Letter issued with class allocation and school fee invoice.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="mt-6 w-full bg-crown-blue hover:bg-crown-blue-light text-white font-semibold py-2.5 rounded-full text-xs transition-colors"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 5: Uniform Specification Preview Modal */}
      <AnimatePresence>
        {selectedUniform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedUniform(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-crown-gold/30"
            >
              <button
                onClick={() => setSelectedUniform(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80"
              >
                <X size={18} />
              </button>

              <div className="h-56 relative overflow-hidden">
                <img
                  src={selectedUniform.image}
                  onError={onImgError}
                  alt={selectedUniform.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs bg-crown-gold text-crown-blue-dark font-bold px-2.5 py-0.5 rounded-full">
                    {selectedUniform.price}
                  </span>
                  <h3 className="font-poppins font-bold text-lg mt-1">{selectedUniform.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-3 text-xs text-gray-700 dark:text-slate-300">
                <p className="leading-relaxed">{selectedUniform.desc}</p>
                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <p><strong>Wearing Days:</strong> {selectedUniform.schedule}</p>
                  <p><strong>Footwear:</strong> Black leather shoes or dark sandals with white socks.</p>
                  <p><strong>Where to Buy:</strong> Available exclusively at the school stores on campus.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedUniform(null)
                    handleSmoothScroll("#application-form")
                  }}
                  className="w-full mt-3 bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold py-2.5 rounded-full transition-colors text-sm"
                >
                  Apply & Reserve Uniform
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
