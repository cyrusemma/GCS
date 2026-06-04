import Hero from "../components/home/Hero"
import WelcomeSection from "../components/home/WelcomeSection"
import WhyChooseUs from "../components/home/WhyChooseUs"
import AcademicLevels from "../components/home/AcademicLevels"
import StatsSection from "../components/home/StatsSection"
import NewsPreview from "../components/home/NewsPreview"
import EventsPreview from "../components/home/EventsPreview"
import Testimonials from "../components/home/Testimonials"
import AdmissionCTA from "../components/home/AdmissionCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <WhyChooseUs />
      <AcademicLevels />
      <StatsSection />
      <NewsPreview />
      <EventsPreview />
      <Testimonials />
      <AdmissionCTA />
    </>
  )
}
