import confetti from "canvas-confetti"

// A celebratory burst in the school's blue & gold, used on successful form submits.
export function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const colors = ["#D4AF37", "#E8C84A", "#0D47A1", "#1565C0", "#F5F7FA"]
  const defaults = { origin: { y: 0.7 }, colors, zIndex: 200 }

  confetti({ ...defaults, particleCount: 60, spread: 70, startVelocity: 45 })
  setTimeout(() => confetti({ ...defaults, particleCount: 40, spread: 100, angle: 60 }), 150)
  setTimeout(() => confetti({ ...defaults, particleCount: 40, spread: 100, angle: 120 }), 300)
}
