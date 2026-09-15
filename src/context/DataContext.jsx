import { createContext, useContext, useState, useEffect } from "react"
import { GALLERY_ITEMS, SPOTLIGHT_STORIES } from "../data/galleryData"
import { leadership as initialLeadership, teachers as initialTeachers } from "../data/staff"
import { news as initialNews } from "../data/news"

const STORAGE_KEY = "gcs_cms_data_v1"

const defaultSchoolInfo = {
  phone: "024 316 9383",
  altPhone: "020 812 3456",
  email: "info@goldencrownschool.edu.gh",
  address: "Lashibi Community 20, Greater Accra, Ghana",
  becePassRate: "94%",
  studentsEnrolled: "450+",
  yearsOfExcellence: "21+",
  motto: "Hardwork and Integrity",
}

const defaultData = {
  gallery: GALLERY_ITEMS,
  spotlight: SPOTLIGHT_STORIES,
  leadership: initialLeadership,
  teachers: initialTeachers,
  news: initialNews,
  schoolInfo: defaultSchoolInfo,
  submissions: [
    {
      id: "sub-1",
      type: "admission",
      studentName: "Kwame Mensah",
      parentName: "Mr. Kofi Mensah",
      email: "kofi.mensah@gmail.com",
      phone: "024 456 7890",
      grade: "Class 1 (Primary)",
      date: new Date().toLocaleDateString("en-GB"),
      status: "Pending Review",
    },
    {
      id: "sub-2",
      type: "contact",
      parentName: "Mrs. Sarah Osei",
      email: "sarah.osei@yahoo.com",
      phone: "020 123 4567",
      message: "Hello, I would like to inquire about bus transportation routes for Community 18.",
      date: new Date().toLocaleDateString("en-GB"),
      status: "Responded",
    },
  ],
}

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY)
      if (local) {
        return { ...defaultData, ...JSON.parse(local) }
      }
    } catch (err) {
      console.error("Failed to load CMS data from localStorage:", err)
    }
    return defaultData
  })

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
      console.error("Failed to save CMS data to localStorage:", err)
    }
  }, [data])

  // --- Gallery Actions ---
  const addGalleryItem = (item) => {
    const newItem = {
      id: Date.now(),
      year: item.year || new Date().getFullYear().toString(),
      ...item,
    }
    setData((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery],
    }))
    return newItem
  }

  const updateGalleryItem = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      ),
    }))
  }

  const deleteGalleryItem = (id) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item.id !== id),
    }))
  }

  const addSpotlightItem = (item) => {
    const newItem = {
      id: `spotlight-${Date.now()}`,
      year: item.year || new Date().getFullYear().toString(),
      ...item,
    }
    setData((prev) => ({
      ...prev,
      spotlight: [newItem, ...prev.spotlight],
    }))
  }

  const deleteSpotlightItem = (id) => {
    setData((prev) => ({
      ...prev,
      spotlight: prev.spotlight.filter((item) => item.id !== id),
    }))
  }

  // --- Staff Actions ---
  const addLeadershipMember = (member) => {
    setData((prev) => ({
      ...prev,
      leadership: [...prev.leadership, member],
    }))
  }

  const updateLeadershipMember = (index, updated) => {
    setData((prev) => ({
      ...prev,
      leadership: prev.leadership.map((m, i) => (i === index ? updated : m)),
    }))
  }

  const deleteLeadershipMember = (index) => {
    setData((prev) => ({
      ...prev,
      leadership: prev.leadership.filter((_, i) => i !== index),
    }))
  }

  const addTeacher = (teacher) => {
    setData((prev) => ({
      ...prev,
      teachers: [teacher, ...prev.teachers],
    }))
  }

  const updateTeacher = (index, updated) => {
    setData((prev) => ({
      ...prev,
      teachers: prev.teachers.map((t, i) => (i === index ? updated : t)),
    }))
  }

  const deleteTeacher = (index) => {
    setData((prev) => ({
      ...prev,
      teachers: prev.teachers.filter((_, i) => i !== index),
    }))
  }

  // --- News Actions ---
  const addNewsItem = (item) => {
    const newItem = {
      id: Date.now(),
      date: item.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      ...item,
    }
    setData((prev) => ({
      ...prev,
      news: [newItem, ...prev.news],
    }))
    return newItem
  }

  const updateNewsItem = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      news: prev.news.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)),
    }))
  }

  const deleteNewsItem = (id) => {
    setData((prev) => ({
      ...prev,
      news: prev.news.filter((item) => item.id !== id),
    }))
  }

  // --- School Info / Stats ---
  const updateSchoolInfo = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      schoolInfo: { ...prev.schoolInfo, ...updatedFields },
    }))
  }

  // --- Submissions Inbox ---
  const addSubmission = (sub) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB"),
      status: "New",
      ...sub,
    }
    setData((prev) => ({
      ...prev,
      submissions: [newSub, ...(prev.submissions || [])],
    }))
  }

  const updateSubmissionStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      submissions: prev.submissions.map((s) => (s.id === id ? { ...s, status } : s)),
    }))
  }

  const deleteSubmission = (id) => {
    setData((prev) => ({
      ...prev,
      submissions: prev.submissions.filter((s) => s.id !== id),
    }))
  }

  // --- System Reset & Export ---
  const resetToDefaults = () => {
    setData(defaultData)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", jsonString)
    downloadAnchor.setAttribute("download", `golden-crown-cms-backup-${new Date().toISOString().slice(0,10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importData = (importedJson) => {
    try {
      const parsed = typeof importedJson === "string" ? JSON.parse(importedJson) : importedJson
      setData(parsed)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return (
    <DataContext.Provider
      value={{
        ...data,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addSpotlightItem,
        deleteSpotlightItem,
        addLeadershipMember,
        updateLeadershipMember,
        deleteLeadershipMember,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        updateSchoolInfo,
        addSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
