import { MessageCircle } from "lucide-react"

// Floating WhatsApp quick-contact button with an animated pulse ring.
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/233555553729?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Golden%20Crown%20School"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Golden Crown School on WhatsApp"
      className="fixed bottom-6 right-6 z-40"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] pulse-ring" aria-hidden="true" />
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform">
        <MessageCircle size={28} />
      </span>
    </a>
  )
}
