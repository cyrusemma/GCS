import { onImgError } from "../../data/images"
import { useTilt } from "../../hooks/useTilt"

export default function StaffCard({ person, large = false }) {
  const tilt = useTilt({ max: 6 })
  return (
    <div
      {...tilt}
      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 text-center"
    >
      <div className={`overflow-hidden ${large ? "h-60" : "h-44"}`}>
        <img
          src={person.image}
          onError={onImgError}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-poppins font-semibold text-crown-blue dark:text-white">{person.name}</h3>
        <p className="text-sm text-crown-gold font-medium">
          {person.title || person.subject}
        </p>
        {person.level && <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{person.level}</p>}
        {person.bio && <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">{person.bio}</p>}
      </div>
    </div>
  )
}
