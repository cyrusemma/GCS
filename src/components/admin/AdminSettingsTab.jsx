import { useState } from "react"
import { Settings, Save, Download, Upload, RotateCcw, Check, Phone, Mail, MapPin, Award, Users } from "lucide-react"
import { useData } from "../../context/DataContext"

export default function AdminSettingsTab() {
  const { schoolInfo, updateSchoolInfo, resetToDefaults, exportData, importData } = useData()
  const [formData, setFormData] = useState(schoolInfo)
  const [saveNotice, setSaveNotice] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateSchoolInfo(formData)
    setSaveNotice(true)
    setTimeout(() => setSaveNotice(false), 3000)
  }

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = importData(event.target.result)
        if (result.success) {
          alert("CMS Data successfully restored from backup!")
          window.location.reload()
        } else {
          alert(`Failed to import backup: ${result.error}`)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Settings size={22} className="text-crown-gold" />
            School Information & Key Metrics
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Update phone numbers, contact email, address, and live website statistics.
          </p>
        </div>

        {saveNotice && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-600 border border-green-500/30">
            <Check size={14} /> Changes Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-crown-blue dark:text-crown-gold flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-3">
            <Phone size={16} /> Official Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                Primary Phone / WhatsApp
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                Alternate Phone Number
              </label>
              <input
                type="text"
                value={formData.altPhone || ""}
                onChange={(e) => handleChange("altPhone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                Official School Email
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                School Motto
              </label>
              <input
                type="text"
                value={formData.motto || ""}
                onChange={(e) => handleChange("motto", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
              Campus Physical Address
            </label>
            <input
              type="text"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
            />
          </div>
        </div>

        {/* Academic Key Statistics */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-crown-blue dark:text-crown-gold flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-3">
            <Award size={16} /> Public Website Statistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                BECE Pass Rate
              </label>
              <input
                type="text"
                placeholder="e.g. 94%"
                value={formData.becePassRate || ""}
                onChange={(e) => handleChange("becePassRate", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                Active Enrolled Students
              </label>
              <input
                type="text"
                placeholder="e.g. 450+"
                value={formData.studentsEnrolled || ""}
                onChange={(e) => handleChange("studentsEnrolled", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-slate-300 mb-1">
                Years of Excellence
              </label>
              <input
                type="text"
                placeholder="e.g. 21+"
                value={formData.yearsOfExcellence || ""}
                onChange={(e) => handleChange("yearsOfExcellence", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue font-bold"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-crown-blue hover:bg-crown-blue-light text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <Save size={18} />
            <span>Save School Information</span>
          </button>
        </div>
      </form>

      {/* Data Backup & System Maintenance */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 border-b border-gray-100 dark:border-slate-800 pb-3">
          Data Backup & Recovery
        </h3>
        <p className="text-xs text-gray-500 dark:text-slate-400">
          Export full school CMS data as a JSON file for safe offline backup, or restore data from a previous file.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-xs font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Download size={16} />
            <span>Export Backup (.JSON)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-xs font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            <Upload size={16} />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (confirm("Reset all school data to initial factory defaults? This will erase custom additions.")) {
                resetToDefaults()
                window.location.reload()
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors ml-auto"
          >
            <RotateCcw size={16} />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>
    </div>
  )
}
