import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import SectionTitle from "../ui/SectionTitle"
import NewsCard from "../ui/NewsCard"
import { news } from "../../data/news"

export default function NewsPreview() {
  const navigate = useNavigate()
  return (
    <section className="py-16 lg:py-24 bg-white border-t-2 border-crown-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Latest News"
          subtitle="Stay up to date with the latest happenings around Golden Crown School."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <NewsCard key={item.id} item={item} onOpen={() => navigate("/news")} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-crown-blue font-semibold hover:text-crown-gold transition-colors"
          >
            View All News <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
