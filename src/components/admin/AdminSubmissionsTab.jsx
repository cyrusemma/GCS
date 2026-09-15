import { useState } from "react"
import { Inbox, Trash2, CheckCircle2, Clock, Mail, Phone, Calendar, User, BookOpen } from "lucide-react"
import { useData } from "../../context/DataContext"

export default function AdminSubmissionsTab() {
  const { submissions, updateSubmissionStatus, deleteSubmission } = useData()
  const [filterType, setFilterType] = useState("all") // "all" | "admission" | "contact"

  const filteredSubmissions = (submissions || []).filter((sub) => {
    if (filterType === "all") return true
    return sub.type === filterType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Inbox size={22} className="text-crown-gold" />
            Admissions & Inquiries Inbox
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Review parent applications, enrollment inquiries, and contact form messages.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === "all"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            All ({submissions?.length || 0})
          </button>
          <button
            onClick={() => setFilterType("admission")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === "admission"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Admissions
          </button>
          <button
            onClick={() => setFilterType("contact")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === "contact"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Inquiries
          </button>
        </div>
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-8">
          <Inbox size={48} className="mx-auto text-gray-300 dark:text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-gray-700 dark:text-slate-300">
            No Submissions Found
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            New admission forms and contact messages will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      sub.type === "admission"
                        ? "bg-crown-gold/20 text-crown-blue-dark dark:text-crown-gold border border-crown-gold/30"
                        : "bg-blue-50 dark:bg-blue-950/40 text-crown-blue dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                    }`}
                  >
                    {sub.type === "admission" ? "Admission Application" : "General Inquiry"}
                  </span>

                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                    <Calendar size={12} /> {sub.date}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                    <User size={16} className="text-crown-gold" />
                    {sub.studentName ? `${sub.studentName} (Parent: ${sub.parentName})` : sub.parentName || "Parent Contact"}
                  </h4>

                  {sub.grade && (
                    <span className="text-xs font-semibold text-crown-blue dark:text-crown-gold flex items-center gap-1 mt-0.5">
                      <BookOpen size={13} /> Applying for: {sub.grade}
                    </span>
                  )}
                </div>

                {sub.message && (
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-800/80 p-3 rounded-xl border border-gray-100 dark:border-slate-800 leading-relaxed">
                    "{sub.message}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-slate-400 pt-1">
                  {sub.phone && (
                    <a
                      href={`tel:${sub.phone}`}
                      className="hover:text-crown-blue dark:hover:text-crown-gold flex items-center gap-1"
                    >
                      <Phone size={13} /> {sub.phone}
                    </a>
                  )}
                  {sub.email && (
                    <a
                      href={`mailto:${sub.email}`}
                      className="hover:text-crown-blue dark:hover:text-crown-gold flex items-center gap-1"
                    >
                      <Mail size={13} /> {sub.email}
                    </a>
                  )}
                </div>
              </div>

              {/* Status / Action Controls */}
              <div className="flex items-center self-end md:self-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-slate-800 w-full md:w-auto justify-between md:justify-end">
                <select
                  value={sub.status || "Pending"}
                  onChange={(e) => updateSubmissionStatus(sub.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 focus:ring-2 focus:ring-crown-blue"
                >
                  <option value="New">New</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Enrolled">Enrolled / Approved</option>
                  <option value="Responded">Responded</option>
                </select>

                <button
                  onClick={() => {
                    if (confirm("Delete this submission record?")) {
                      deleteSubmission(sub.id)
                    }
                  }}
                  className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Delete submission"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
