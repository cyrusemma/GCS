import StatCard from "../ui/StatCard"

const stats = [
  { value: 200, prefix: "~", suffix: "", label: "Students Enrolled" },
  { value: 22, prefix: "", suffix: "", label: "Staff Members" },
  { value: 21, prefix: "", suffix: "", label: "Years of Excellence" },
  { value: 5, prefix: "", suffix: "", label: "Academic Divisions" },
]

export default function StatsSection() {
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
