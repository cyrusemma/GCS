import { useState } from "react"
import { useForm } from "react-hook-form"
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import PageBanner from "../components/ui/PageBanner"
import SectionTitle from "../components/ui/SectionTitle"
import SEO from "../components/ui/SEO"
import { sendEmail } from "../lib/email"
import { useToast } from "../context/ToastContext"

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-crown-blue/40 focus:border-crown-blue"

const infoCards = [
  { Icon: MapPin, title: "Visit Us", text: "MXM6+VVC, Lashibi, Greater Accra Region, Ghana" },
  { Icon: Phone, title: "Call Us", text: "+233 55 555 3729", href: "tel:+233555553729" },
  { Icon: Mail, title: "Email Us", text: "info@goldencrownschool.edu.gh", href: "mailto:info@goldencrownschool.edu.gh" },
]

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await sendEmail("contact", {
        form_type: "Contact Message",
        name: data.name,
        email: data.email,
        phone: data.phone || "—",
        subject: data.subject,
        message: data.message,
      })
      setStatus("success")
      reset()
      toast({ type: "success", title: "Message sent!", message: "We'll reply within 24 hours." })
      setTimeout(() => setStatus(null), 6000)
    } catch (err) {
      setStatus("error")
      toast({ type: "error", title: "Couldn't send", message: "Please try again or call the office." })
    } finally {
      setSubmitting(false)
    }
  }
  const onError = () => setStatus("error")

  return (
    <>
      <SEO
        title="Contact Us"
        path="/contact"
        description="Contact Golden Crown School, Lashibi — call +233 55 555 3729, email info@goldencrownschool.edu.gh, or send a message. Office hours Mon–Fri 7am–5pm."
      />
      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out any time."
        breadcrumb="Contact"
      />

      {/* Info cards */}
      <section className="py-16 lg:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {infoCards.map(({ Icon, title, text, href }) => (
              <div key={title} className="bg-crown-white dark:bg-slate-900 rounded-xl p-6 text-center border border-gray-100 dark:border-slate-700">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-crown-blue text-white flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h3 className="font-poppins font-semibold text-crown-blue dark:text-crown-gold-light mb-1">{title}</h3>
                {href ? (
                  <a href={href} className="text-sm text-gray-600 dark:text-slate-300 hover:text-crown-blue break-words">{text}</a>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-slate-300">{text}</p>
                )}
              </div>
            ))}
          </div>

          {/* Office hours */}
          <div className="mt-6 bg-crown-blue text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Clock className="text-crown-gold" size={28} />
            <div>
              <h3 className="font-poppins font-semibold">Office Hours</h3>
              <p className="text-white/85 text-sm">
                Monday – Friday: 7:00am – 5:00pm &nbsp;|&nbsp; Saturday: 8:00am – 12:00pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map + form */}
      <section className="py-16 lg:py-24 bg-crown-white dark:bg-slate-900 border-t-2 border-crown-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div>
            <SectionTitle title="Find Us" center={false} />
            <div className="rounded-2xl overflow-hidden border-4 border-crown-gold shadow-lg">
              <iframe
                title="Golden Crown School location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8!2d-0.0553!3d5.5850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLashibi%2C+Tema!5e0!3m2!1sen!2sgh!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <SectionTitle title="Send a Message" center={false} />

            {status === "success" && (
              <div className="mb-5 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 text-sm">
                <CheckCircle2 size={18} /> Message sent! We'll reply within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                <AlertCircle size={18} /> Please correct the errors below and try again.
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 space-y-4"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Name <span className="text-red-500">*</span></label>
                <input className={`mt-1 ${inputClass}`} {...register("name", { required: "Your name is required" })} />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    className={`mt-1 ${inputClass}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                    })}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Phone</label>
                  <input className={`mt-1 ${inputClass}`} {...register("phone")} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Subject</label>
                <select className={`mt-1 ${inputClass}`} defaultValue="General Inquiry" {...register("subject")}>
                  {["General Inquiry", "Admissions", "Fees", "Complaint", "Other"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Message <span className="text-red-500">*</span></label>
                <textarea
                  rows={5}
                  className={`mt-1 ${inputClass}`}
                  {...register("message", {
                    required: "Please enter a message",
                    minLength: { value: 20, message: "Message must be at least 20 characters" },
                  })}
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold py-3 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
