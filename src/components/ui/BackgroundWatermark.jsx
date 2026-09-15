import { ASSETS } from "../../data/images"

export default function BackgroundWatermark() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Scattered / Repeating tiny crest watermark pattern on a subtle diagonal slant */}
      <div
        className="absolute -inset-[50%] w-[200%] h-[200%] rotate-[-12deg] opacity-[0.032] dark:opacity-[0.048] transition-opacity duration-700"
        style={{
          backgroundImage: `url(${ASSETS.badge})`,
          backgroundSize: "75px 75px",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
      />
    </div>
  )
}
