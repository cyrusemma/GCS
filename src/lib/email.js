import emailjs from "@emailjs/browser"

// EmailJS configuration is read from Vite env vars (see .env.example).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const CONTACT_TEMPLATE = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE
const ADMISSION_TEMPLATE = import.meta.env.VITE_EMAILJS_ADMISSION_TEMPLATE

export const isEmailConfigured = Boolean(SERVICE_ID && PUBLIC_KEY)

// Sends an email via EmailJS. If the keys are not configured (e.g. in a demo),
// it resolves successfully after a short delay so the UI still behaves correctly.
export async function sendEmail(templateKind, params) {
  const templateId = templateKind === "admission" ? ADMISSION_TEMPLATE : CONTACT_TEMPLATE

  if (!isEmailConfigured || !templateId) {
    // Demo fallback — no real delivery.
    if (import.meta.env.DEV) {
      console.warn(
        "[EmailJS] Not configured — simulating success. Add VITE_EMAILJS_* keys in .env to send real emails."
      )
    }
    await new Promise((r) => setTimeout(r, 900))
    return { demo: true }
  }

  return emailjs.send(SERVICE_ID, templateId, params, { publicKey: PUBLIC_KEY })
}
