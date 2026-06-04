import { Quote } from "lucide-react"
import { onImgError } from "../../data/images"

export default function TestimonialCard({ item }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 h-full flex flex-col border border-white/10">
      <Quote className="text-crown-gold mb-3" size={32} />
      <p className="text-white/90 text-sm leading-relaxed flex-1">{item.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <img
          src={item.image}
          onError={onImgError}
          alt={item.name}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover border-2 border-crown-gold"
        />
        <div>
          <p className="font-poppins font-semibold text-white">{item.name}</p>
          <p className="text-crown-gold text-xs">{item.role}</p>
        </div>
      </div>
    </div>
  )
}
