import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
import { ASSETS, onImgError } from "../../data/images"
import { useI18n } from "../../context/I18nContext"

const MOTTO = "Hardwork and Integrity"

// Optional looping campus video — drop a file at /public/assets/campus.mp4
// and it will be used automatically; otherwise the building photo shows.
const VIDEO_SRC = "/assets/campus.mp4"

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let raf
    let particles = []
    let w, h

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      const count = Math.min(70, Math.floor(w / 18))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.5 + 0.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function Hero() {
  const { t } = useI18n()
  const root = useRef(null)
  const [typed, setTyped] = useState("")
  const [hasVideo, setHasVideo] = useState(false)

  // Probe whether the campus video exists before showing the <video>.
  useEffect(() => {
    let active = true
    fetch(VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        if (active && res.ok && (res.headers.get("content-type") || "").includes("video")) {
          setHasVideo(true)
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.6 })
        .from(".hero-welcome", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        // Text mask reveal: each word rises out from behind a clip mask.
        .from(".hero-word", { yPercent: 120, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.1")
        .from(".hero-location", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.5 }, "+=0.6")
    }, root)
    return () => ctx.revert()
  }, [])

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
      {/* Background: campus video if available, else the building photo */}
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={ASSETS.building}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <img
          src={ASSETS.building}
          onError={onImgError}
          alt="Golden Crown School building, Lashibi"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(13, 71, 161, 0.75)" }} />

      <ParticleField />

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
          {t("hero.welcome")}
        </p>
        <h1 className="font-poppins font-bold text-white text-4xl sm:text-6xl lg:text-7xl leading-tight flex flex-wrap justify-center gap-x-4">
          {t("hero.school").split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1">
              <span className="hero-word inline-block">{word}</span>
            </span>
          ))}
        </h1>
        <p className="hero-location font-poppins text-crown-gold text-xl sm:text-2xl mt-3">
          {t("hero.location")}
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
            {t("hero.apply")}
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white hover:bg-white hover:text-crown-blue font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t("hero.learnMore")}
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
