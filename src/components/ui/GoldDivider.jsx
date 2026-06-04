// Thin gold horizontal rule with a centered diamond accent.
export default function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 sm:w-24 bg-crown-gold/60" />
      <span className="h-2.5 w-2.5 rotate-45 bg-crown-gold" />
      <span className="h-px w-16 sm:w-24 bg-crown-gold/60" />
    </div>
  )
}
