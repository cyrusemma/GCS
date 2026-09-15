import StatCard from "../ui/StatCard"
import { useData } from "../../context/DataContext"

export default function StatsSection() {
  const { schoolInfo, teachers, leadership } = useData()

  // Extract numeric values from schoolInfo strings if possible
  const enrolledNum = parseInt(schoolInfo?.studentsEnrolled || "450", 10) || 450
  const yearsNum = parseInt(schoolInfo?.yearsOfExcellence || "21", 10) || 21
  const staffCount = (teachers?.length || 0) + (leadership?.length || 0) || 22

  const stats = [
    { value: enrolledNum, prefix: "", suffix: "+", label: "Students Enrolled" },
    { value: staffCount, prefix: "", suffix: "", label: "Staff Members" },
    { value: yearsNum, prefix: "", suffix: "+", label: "Years of Excellence" },
    { value: 5, prefix: "", suffix: "", label: "Academic Divisions" },
  ]

  return (
    <section className="py-16 lg:py-20 bg-crown-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
