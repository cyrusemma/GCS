import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

// ─── SVG path data for uniform-themed particle shapes ────────────────────────
// Each shape is a small SVG path string centered around (0,0), scale ~24px
const UNIFORM_SHAPES = [
  // Necktie / bow-tie silhouette
  {
    type: "path",
    d: "M0,-12 L6,-4 L3,12 L0,9 L-3,12 L-6,-4 Z",
  },
  // 5-pointed star (badge)
  {
    type: "path",
    d: "M0,-11 L2.6,-4 L10,-4 L4,0 L6.5,8 L0,3.5 L-6.5,8 L-4,0 L-10,-4 L-2.6,-4 Z",
  },
  // Shirt collar shape
  {
    type: "path",
    d: "M-10,8 L-4,-8 L0,4 L4,-8 L10,8 L5,3 L0,12 L-5,3 Z",
  },
  // Diamond / crest gem
  {
    type: "path",
    d: "M0,-12 L8,0 L0,12 L-8,0 Z",
  },
  // Pentagon / shield
  {
    type: "path",
    d: "M0,-12 L11,-4 L7,10 L-7,10 L-11,-4 Z",
  },
  // Crown shape
  {
    type: "path",
    d: "M-12,8 L-12,-4 L-7,2 L0,-10 L7,2 L12,-4 L12,8 Z",
  },
  // Checkered square (school plaid tile)
  { type: "rect", w: 10, h: 10 },
  // Circle (button)
  { type: "circle", r: 6 },
]

const COLORS = [
  "#C9A227", // crown-gold
  "#1a3a6e", // crown-blue dark
  "#2554a0", // crown-blue
  "#e8c44f", // gold light
  "#0f2447", // deep navy
  "#f0d070", // pale gold
  "#3a6bd4", // bright blue
]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}
function easeInCubic(t) {
  return t * t * t
}

class Particle {
  constructor(canvasW, canvasH) {
    this.reset(canvasW, canvasH)
  }

  reset(canvasW, canvasH) {
    this.x = canvasW / 2 + randomBetween(-80, 80)
    this.y = canvasH / 2 + randomBetween(-80, 80)

    const angle = randomBetween(0, Math.PI * 2)
    const speed = randomBetween(4, 14)
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed

    this.rotation = randomBetween(0, Math.PI * 2)
    this.rotationSpeed = randomBetween(-0.18, 0.18)
    this.scale = randomBetween(0.6, 1.6)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.shape = UNIFORM_SHAPES[Math.floor(Math.random() * UNIFORM_SHAPES.length)]
    this.opacity = 1
    this.life = 0
    this.maxLife = randomBetween(55, 85)
    this.gravity = randomBetween(0.08, 0.22)
    this.drag = randomBetween(0.93, 0.97)
  }

  update() {
    this.life++
    const progress = this.life / this.maxLife
    this.vx *= this.drag
    this.vy *= this.drag
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy
    this.rotation += this.rotationSpeed

    if (progress < 0.1) {
      this.opacity = easeOutCubic(progress / 0.1)
    } else if (progress > 0.6) {
      this.opacity = 1 - easeInCubic((progress - 0.6) / 0.4)
    } else {
      this.opacity = 1
    }
  }

  isDead() {
    return this.life >= this.maxLife
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.scale(this.scale, this.scale)
    ctx.globalAlpha = Math.max(0, this.opacity)
    ctx.fillStyle = this.color
    ctx.strokeStyle = "rgba(255,255,255,0.25)"
    ctx.lineWidth = 0.5

    const s = this.shape
    if (s.type === "path") {
      const path = new Path2D(s.d)
      ctx.fill(path)
      ctx.stroke(path)
    } else if (s.type === "rect") {
      ctx.fillRect(-s.w / 2, -s.h / 2, s.w, s.h)
      ctx.strokeRect(-s.w / 2, -s.h / 2, s.w, s.h)
    } else if (s.type === "circle") {
      ctx.beginPath()
      ctx.arc(0, 0, s.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    ctx.restore()
  }
}

const PARTICLE_COUNT = 80
const BURST_FRAMES = 90

export default function UniformParticleTransition() {
  const { pathname } = useLocation()
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const firstRender = useRef(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + "px"
    canvas.style.height = window.innerHeight + "px"

    const ctx = canvas.getContext("2d")
    ctx.scale(dpr, dpr)

    const particles = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(window.innerWidth, window.innerHeight)
    )

    // Stagger spawn for wave effect
    particles.forEach((p) => {
      p.life = -Math.floor(randomBetween(0, 20))
    })

    setVisible(true)
    let frame = 0

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const p of particles) {
        if (p.life < 0) {
          p.life++
          continue
        }
        p.update()
        p.draw(ctx)
      }

      frame++

      const allDead = particles.every((p) => p.isDead())
      if (!allDead && frame < BURST_FRAMES + 30) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setVisible(false)
      }
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [pathname])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    />
  )
}
