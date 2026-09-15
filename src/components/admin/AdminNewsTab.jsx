import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit3, Newspaper, Calendar, X, Eye } from "lucide-react"
import { useData } from "../../context/DataContext"
import { onImgError } from "../../data/images"

export default function AdminNewsTab() {
  const { news, addNewsItem, updateNewsItem, deleteNewsItem } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    category: "School News",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    image: "",
    excerpt: "",
    body: "",
  })

  const openAddModal = () => {
    setEditingItem(null)
    setFormData({
      title: "",
      category: "School News",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
      excerpt: "",
      body: "",
    })
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      category: item.category || "School News",
      date: item.date || "",
      image: item.image || "",
      excerpt: item.excerpt || "",
      body: item.body || "",
    })
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
    if (editingItem) {
      updateNewsItem(editingItem.id, formData)
    } else {
      addNewsItem({
        ...formData,
        excerpt: formData.excerpt || formData.body.slice(0, 140) + "...",
      })
    }
    setIsModalOpen(false)
  }

  const filteredNews = news.filter((item) => {
    const query = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.body && item.body.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Newspaper size={22} className="text-crown-gold" />
            News & Announcements
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Publish school news, events, achievements, and circulars for parents and pupils.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crown-blue hover:bg-crown-blue-light text-white font-semibold text-sm shadow-md transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>Publish New Article</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search articles by title or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-crown-gold/50"
        />
      </div>

      {/* News list */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.image}
                alt={item.title}
                onError={onImgError}
                className="h-20 w-24 sm:w-28 rounded-xl object-cover bg-slate-100 flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-crown-gold/15 text-crown-blue dark:text-crown-gold border border-crown-gold/30">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                    <Calendar size={12} /> {item.date}
                  </span>
                </div>
                <h4 className="font-bold text-base text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {item.excerpt || item.body}
                </p>
              </div>
            </div>

            <div className="flex items-center self-end md:self-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-slate-800 w-full md:w-auto justify-end">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-xl text-gray-500 hover:text-crown-blue hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit Article"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete announcement "${item.title}"?`)) {
                    deleteNewsItem(item.id)
                  }
                }}
                className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Delete Article"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-slate-800 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingItem ? "Edit News Article" : "Publish New Article"}
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
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Term 2 Resumption Date & Parents Meeting"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                    >
                      <option value="School News">School News</option>
                      <option value="Academics">Academics</option>
                      <option value="Events">Events</option>
                      <option value="Facilities">Facilities</option>
                      <option value="Competitions">Competitions</option>
                      <option value="Announcements">Announcements</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                      Publish Date
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                    Featured Image URL / Upload
                  </label>
                  <input
                    type="url"
                    placeholder="https://... or paste image link"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-crown-blue/10 file:text-crown-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                    Full Article Content
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Write the full announcement or news update here..."
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue leading-relaxed"
                  />
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
                    {editingItem ? "Update Article" : "Publish Article"}
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
