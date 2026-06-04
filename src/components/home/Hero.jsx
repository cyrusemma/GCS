import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"

const MOTTO = "Hardwork and Integrity"

export default function Hero() {
  const root = useRef(null)
  const [typed, setTyped] = useState("")

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.6 })
        .from(".hero-welcome", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-title", { scale: 0.8, opacity: 0, duration: 0.7 }, "-=0.1")
        .from(".hero-location", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.5 }, "+=0.6")
    }, root)
    return () => ctx.revert()
  }, [])

  // Typewriter effect for the motto, started after the title sequence.
  useEffect(() => {
    let i = 0
    let timer
    const startDelay = setTimeout(() => {
      timer = setInterval(() => {
        i += 1
        setTyped(MOTTO.slice(0, i))
        if (i >= MOTTO.length) clearInterval(timer)
      }, 70)
    }, 1700)
    return () => {
      clearTimeout(startDelay)
      clearInterval(timer)
    }
  }, [])

  return (
    <section ref={root} className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Building background */}
      <img
        src={ASSETS.building}
        onError={onImgError}
        alt="Golden Crown School building, Lashibi"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(13, 71, 161, 0.75)" }}
      />

      {/* Badge watermark */}
      <img
        src={ASSETS.badge}
        onError={onImgError}
        alt=""
        aria-hidden="true"
        className="absolute bottom-6 right-6 w-40 lg:w-64 opacity-15 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="hero-line block h-1 w-24 bg-crown-gold rounded-full mb-6" />
        <p className="hero-welcome text-white/90 tracking-[0.3em] uppercase text-sm sm:text-base mb-3">
          Welcome to
        </p>
        <h1 className="hero-title font-poppins font-bold text-white text-4xl sm:text-6xl lg:text-7xl leading-tight">
          Golden Crown School
        </h1>
        <p className="hero-location font-poppins text-crown-gold text-xl sm:text-2xl mt-3">
          Lashibi, Greater Accra
        </p>
        <p className="mt-4 text-white/90 text-lg sm:text-xl italic min-h-[1.75rem]">
          “{typed}
          <span className="animate-pulse">|</span>”
        </p>

        <div className="hero-ctas mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/admissions"
            className="bg-crown-gold hover:bg-crown-gold-light text-crown-blue-dark font-semibold px-8 py-3 rounded-full shadow-lg transition-colors"
          >
            Apply for Admission
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white hover:bg-white hover:text-crown-blue font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="text-white/80 animate-bounce-slow" size={32} aria-hidden="true" />
      </div>
    </section>
  )
}
