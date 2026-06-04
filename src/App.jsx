import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import PageWrapper from "./components/layout/PageWrapper"
import WhatsAppButton from "./components/ui/WhatsAppButton"

import Home from "./pages/Home"
import About from "./pages/About"
import Academics from "./pages/Academics"
import Admissions from "./pages/Admissions"
import StudentLife from "./pages/StudentLife"
import Gallery from "./pages/Gallery"
import News from "./pages/News"
import Parents from "./pages/Parents"
import Staff from "./pages/Staff"
import Contact from "./pages/Contact"
import Portal from "./pages/Portal"

// Scroll to top whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const page = (Component) => (
  <PageWrapper>
    <Component />
  </PageWrapper>
)

export default function App() {
  const location = useLocation()

  return (
    <div className="font-poppins flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={page(Home)} />
            <Route path="/about" element={page(About)} />
            <Route path="/academics" element={page(Academics)} />
            <Route path="/admissions" element={page(Admissions)} />
            <Route path="/student-life" element={page(StudentLife)} />
            <Route path="/gallery" element={page(Gallery)} />
            <Route path="/news" element={page(News)} />
            <Route path="/parents" element={page(Parents)} />
            <Route path="/staff" element={page(Staff)} />
            <Route path="/contact" element={page(Contact)} />
            <Route path="/portal" element={page(Portal)} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
