import { IMAGES } from "./images"

export const schoolInfo = {
  name: "Golden Crown School",
  tagline: "Hardwork and Integrity",
  established: 2004,
  location: "Lashibi, Tema Metropolitan, Greater Accra Region, Ghana",
  address: "MXM6+VVC, Lashibi, Greater Accra, Ghana",
  phone: "+233 55 555 3729",
  email: "info@goldencrownschool.edu.gh",
  website: "www.goldencrownschool.edu.gh",
  students: 200,
  staff: 22,
  vision:
    "To raise confident, innovative, and morally upright learners who will become future leaders and agents of positive change.",
  mission:
    "To empower learners with knowledge, skills, and values through quality education, discipline, and teamwork, enabling them to excel academically and socially in a rapidly changing world.",
  facilities: ["Library", "Computing Laboratory", "State-of-the-art Classroom Facilities"],
  values: ["Hardwork", "Integrity", "Discipline", "Excellence", "Respect"],
}

export const divisions = [
  {
    id: "nursery",
    name: "Nursery",
    badge: "Nursery 1 & 2",
    ageRange: "3 to 4 years",
    classes: "2 classes (Nursery 1, Nursery 2)",
    image: IMAGES.academic_nursery,
    subjects: ["Early Literacy", "Numeracy Readiness", "Rhymes & Songs", "Creative Play", "Motor Skills", "Social Habits"],
    approach:
      "A warm, play-based environment where our youngest learners feel safe, loved, and curious. Trained caregivers focus on early language, motor development, and good habits through structured play and song.",
    teachers: ["Miss. Efua Boateng", "Miss. Adjoa Asante"],
  },
  {
    id: "kg",
    name: "Kindergarten",
    badge: "KG 1 & 2",
    ageRange: "4 to 5 years",
    classes: "2 classes (KG 1, KG 2)",
    image: IMAGES.academic_nursery,
    subjects: ["Language & Literacy", "Numeracy", "Our World Our People", "Creative Arts", "Physical Development", "Religious & Moral Education"],
    approach:
      "Following the GES Kindergarten curriculum, we build a strong foundation in reading, writing, and numbers through guided discovery, storytelling, and hands-on activities that make learning joyful.",
    teachers: ["Miss. Efua Boateng", "Mrs. Akosua Frimpong"],
  },
  {
    id: "primary",
    name: "Primary (Basic 1–6)",
    badge: "Basic 1–6",
    ageRange: "6 to 11 years",
    classes: "6 classes (Basic 1 to Basic 6)",
    image: IMAGES.academic_primary,
    subjects: ["English Language", "Mathematics", "Integrated Science", "Our World Our People", "Creative Arts", "Ghanaian Language", "French", "Computing / ICT", "Religious & Moral Education"],
    approach:
      "Our primary programme blends solid academics with character formation. Pupils develop critical thinking, reading fluency, and a love for learning, supported by continuous assessment and dedicated subject teachers.",
    teachers: ["Mrs. Akosua Frimpong", "Miss. Adjoa Asante", "Mr. Kofi Acheampong"],
  },
  {
    id: "jhs",
    name: "Junior High School (JHS 1–3)",
    badge: "JHS 1–3",
    ageRange: "12 to 15 years",
    classes: "3 classes (JHS 1, JHS 2, JHS 3)",
    image: IMAGES.academic_jhs,
    subjects: ["English Language", "Mathematics", "Integrated Science", "Social Studies", "Computing / ICT", "French", "Ghanaian Language", "Creative Arts & Design", "Religious & Moral Education", "Career Technology"],
    approach:
      "Our JHS prepares students thoroughly for the Basic Education Certificate Examination (BECE) and beyond. Intensive teaching, regular mock exams, and mentoring guide students toward top senior high schools.",
    teachers: ["Mr. Kwame Nkrumah", "Mr. Yaw Darko", "Mrs. Ama Sarpong", "Mrs. Abena Owusu"],
  },
]

export const coreSubjects = [
  "English Language",
  "Mathematics",
  "Integrated Science",
  "Social Studies",
  "ICT",
  "French",
  "Ghanaian Language",
  "Creative Arts",
  "Religious & Moral Education",
  "Physical Education",
]

export const gradingScale = [
  { grade: "A1", range: "80–100", remark: "Excellent" },
  { grade: "B2", range: "70–79", remark: "Very Good" },
  { grade: "B3", range: "60–69", remark: "Good" },
  { grade: "C4", range: "55–59", remark: "Credit" },
  { grade: "C5", range: "50–54", remark: "Credit" },
  { grade: "C6", range: "45–49", remark: "Credit" },
  { grade: "D7", range: "40–44", remark: "Pass" },
  { grade: "E8", range: "35–39", remark: "Pass" },
  { grade: "F9", range: "0–34", remark: "Fail" },
]
