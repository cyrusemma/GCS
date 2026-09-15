import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit3, UserCheck, Users, X, Award } from "lucide-react"
import { useData } from "../../context/DataContext"
import { onImgError } from "../../data/images"

export default function AdminStaffTab() {
  const { leadership, teachers, addTeacher, updateTeacher, deleteTeacher, addLeadershipMember, updateLeadershipMember, deleteLeadershipMember } = useData()
  const [activeTab, setActiveTab] = useState("teachers") // "teachers" | "leadership"
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    title: "", // for leadership
    subject: "", // for teachers
    level: "All Levels", // for teachers
    bio: "",
    image: "",
  })

  const openAddModal = () => {
    setEditingIndex(null)
    setFormData({
      name: "",
      title: "Teacher",
      subject: "General Subjects",
      level: "Primary",
      bio: "",
      image: "",
    })
    setIsModalOpen(true)
  }

  const openEditModal = (item, index, type) => {
    setEditingIndex(index)
    if (type === "leadership") {
      setFormData({
        name: item.name,
        title: item.title,
        bio: item.bio || "",
        image: item.image || "",
        subject: "",
        level: "",
      })
    } else {
      setFormData({
        name: item.name,
        subject: item.subject,
        level: item.level || "Primary",
        image: item.image || "",
        bio: item.bio || "",
        title: "",
      })
    }
    setIsModalOpen(true)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeTab === "teachers") {
      const teacherObj = {
        name: formData.name,
        subject: formData.subject,
        level: formData.level,
        image: formData.image || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80",
      }
      if (editingIndex !== null) {
        updateTeacher(editingIndex, teacherObj)
      } else {
        addTeacher(teacherObj)
      }
    } else {
      const leaderObj = {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        image: formData.image || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
      }
      if (editingIndex !== null) {
        updateLeadershipMember(editingIndex, leaderObj)
      } else {
        addLeadershipMember(leaderObj)
      }
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCheck size={22} className="text-crown-gold" />
            Staff & Faculty Directory
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Manage teachers, school leadership, qualifications, and department subjects.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crown-blue hover:bg-crown-blue-light text-white font-semibold text-sm shadow-md transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>Add {activeTab === "leadership" ? "Leadership Member" : "Teacher"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("teachers")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-1 sm:flex-none ${
              activeTab === "teachers"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Teaching Staff ({teachers.length})
          </button>
          <button
            onClick={() => setActiveTab("leadership")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-1 sm:flex-none ${
              activeTab === "leadership"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Leadership & Admins ({leadership.length})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search staff by name or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-crown-gold/50"
        />
      </div>

      {/* Teachers Tab */}
      {activeTab === "teachers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {teachers
            .filter((t) =>
              t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.subject.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((teacher, idx) => (
              <div
                key={`${teacher.name}-${idx}`}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    onError={onImgError}
                    className="h-16 w-16 rounded-2xl object-cover bg-slate-100 border border-gray-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {teacher.name}
                    </h4>
                    <span className="inline-block text-xs font-semibold text-crown-blue dark:text-crown-gold mt-0.5">
                      {teacher.subject}
                    </span>
                    <span className="block text-[11px] text-gray-400 font-mono mt-0.5">
                      {teacher.level || "Primary"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={() => openEditModal(teacher, idx, "teachers")}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-crown-blue hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${teacher.name} from teachers directory?`)) {
                        deleteTeacher(idx)
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Leadership Tab */}
      {activeTab === "leadership" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.map((leader, idx) => (
            <div
              key={`${leader.name}-${idx}`}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <img
                  src={leader.image}
                  alt={leader.name}
                  onError={onImgError}
                  className="h-20 w-20 rounded-2xl object-cover bg-slate-100 border border-gray-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-white">
                    {leader.name}
                  </h4>
                  <span className="text-xs font-semibold text-crown-gold bg-crown-blue px-2 py-0.5 rounded-md inline-block mt-1">
                    {leader.title}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-3 mt-2">
                    {leader.bio}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => openEditModal(leader, idx, "leadership")}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-crown-blue hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove ${leader.name} from leadership directory?`)) {
                      deleteLeadershipMember(idx)
                    }
                  }}
                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-slate-800 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingIndex !== null ? "Edit Staff Member" : `Add New ${activeTab === "leadership" ? "Leader" : "Teacher"}`}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                    Full Name & Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. Emmanuel Kponyo / Mrs. Grace Mensah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                  />
                </div>

                {activeTab === "teachers" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                        Teaching Subject
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mathematics, ICT, French"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                        Class Level
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                      >
                        <option value="Nursery & KG">Nursery & KG</option>
                        <option value="Primary">Primary (Class 1-6)</option>
                        <option value="JHS">Junior High School (JHS 1-3)</option>
                        <option value="All Levels">All Levels (Specialist)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                      Leadership Position / Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Headteacher / Deputy Headteacher"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                    />
                  </div>
                )}

                {activeTab === "leadership" && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                      Bio / Qualifications
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. MSc Educational Leadership, 18+ years experience..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                    Profile Photo URL / Upload
                  </label>
                  <input
                    type="url"
                    placeholder="https://... or paste image link"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue mb-2"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">or upload:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-crown-blue/10 file:text-crown-blue"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-crown-blue hover:bg-crown-blue-light text-white shadow-md transition-all active:scale-95"
                  >
                    {editingIndex !== null ? "Save Changes" : "Add Staff Member"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
