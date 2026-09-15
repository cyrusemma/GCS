import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit3, Image as ImageIcon, Sparkles, X, Check, Eye } from "lucide-react"
import { useData } from "../../context/DataContext"
import { GALLERY_CATEGORIES } from "../../data/galleryData"
import { onImgError } from "../../data/images"

export default function AdminGalleryTab() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, spotlight, deleteSpotlightItem, addSpotlightItem } = useData()
  const [activeTab, setActiveTab] = useState("all") // "all" | "spotlight"
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    category: "Campus",
    src: "",
    year: new Date().getFullYear().toString(),
    isSpotlight: false,
  })

  const openAddModal = () => {
    setEditingItem(null)
    setFormData({
      title: "",
      caption: "",
      category: "Campus",
      src: "",
      year: new Date().getFullYear().toString(),
      isSpotlight: false,
    })
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title || "",
      caption: item.caption || item.description || "",
      category: item.category || "Campus",
      src: item.src || "",
      year: item.year || new Date().getFullYear().toString(),
      isSpotlight: false,
    })
    setIsModalOpen(true)
  }

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, src: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.src) {
      alert("Please provide an image URL or upload a file.")
      return
    }

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title: formData.title,
        caption: formData.caption,
        category: formData.category,
        src: formData.src,
        year: formData.year,
      })
    } else {
      addGalleryItem({
        title: formData.title || "School Activity",
        caption: formData.caption || "Golden Crown School student moment",
        category: formData.category,
        src: formData.src,
        year: formData.year,
      })

      if (formData.isSpotlight) {
        addSpotlightItem({
          title: formData.title,
          tagline: formData.category,
          category: formData.category,
          src: formData.src,
          description: formData.caption,
          year: formData.year,
        })
      }
    }

    setIsModalOpen(false)
  }

  const filteredGallery = gallery.filter((item) => {
    const query = searchQuery.toLowerCase()
    return (
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.caption && item.caption.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ImageIcon size={22} className="text-crown-gold" />
            Gallery & Media Manager
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Add, update, or remove photos displayed in the live 4-band kinetic ribbons and spotlight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crown-blue hover:bg-crown-blue-light text-white font-semibold text-sm shadow-md transition-all active:scale-95"
          >
            <Plus size={18} />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-1 sm:flex-none ${
              activeTab === "all"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            All Photos ({gallery.length})
          </button>
          <button
            onClick={() => setActiveTab("spotlight")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-1 sm:flex-none ${
              activeTab === "spotlight"
                ? "bg-white dark:bg-slate-700 text-crown-blue dark:text-crown-gold shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            Hero Spotlight ({spotlight.length})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title, caption, category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-crown-gold/50"
        />
      </div>

      {/* Grid of items */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.src}
                  alt={item.title}
                  onError={onImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-crown-gold border border-crown-gold/20">
                  {item.category}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/60 backdrop-blur-md text-white/80">
                  {item.year || "2024"}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-crown-blue hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit Photo"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                        deleteGalleryItem(item.id)
                      }
                    }}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Spotlight tab */}
      {activeTab === "spotlight" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlight.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col"
            >
              <div className="relative aspect-video w-full">
                <img
                  src={item.src}
                  alt={item.title}
                  onError={onImgError}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-crown-gold text-slate-900">
                  Spotlight Story
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-crown-blue dark:text-crown-gold font-medium mt-0.5">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-end mt-4 pt-3 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      if (confirm("Remove from spotlight stories?")) {
                        deleteSpotlightItem(item.id)
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} /> Remove Spotlight
                  </button>
                </div>
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
                  {editingItem ? "Edit Photo Details" : "Add New Gallery Photo"}
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
                    Photo Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Annual Sports Day 100m Sprint"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                    Caption / Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Pupils competing in the inter-house track event..."
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
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
                      {GALLERY_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                    Image Source
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or paste image link"
                    value={formData.src}
                    onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-crown-blue mb-2"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">or upload from device:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-crown-blue/10 file:text-crown-blue dark:file:bg-crown-gold/15 dark:file:text-crown-gold"
                    />
                  </div>
                </div>

                {formData.src && (
                  <div className="p-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase block mb-1">
                      Image Preview
                    </span>
                    <img
                      src={formData.src}
                      alt="Preview"
                      onError={onImgError}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                  </div>
                )}

                {!editingItem && (
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isSpotlight"
                      checked={formData.isSpotlight}
                      onChange={(e) => setFormData({ ...formData, isSpotlight: e.target.checked })}
                      className="h-4 w-4 rounded text-crown-blue border-gray-300 focus:ring-crown-gold"
                    />
                    <label htmlFor="isSpotlight" className="text-xs font-medium text-gray-700 dark:text-slate-300">
                      Also feature in top Spotlight Hero carousel
                    </label>
                  </div>
                )}

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
                    {editingItem ? "Save Changes" : "Publish Photo"}
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
