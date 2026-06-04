import { useRef } from "react"

// Returns props to spread onto an element to give it a 3D hover-tilt effect.
// Disabled on touch / coarse-pointer devices.
export function useTilt({ max = 8, scale = 1.02 } = {}) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia("(pointer: coarse)").matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * max
    const rotateX = (0.5 - py) * 2 * max
    el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { transformStyle: "preserve-3d", transition: "transform 0.2s ease-out", willChange: "transform" },
  }
}
