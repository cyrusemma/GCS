import { createContext, useContext, useEffect, useState } from "react"
import { translations } from "../data/i18n"

const I18nContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k })

function getInitialLang() {
  if (typeof window === "undefined") return "en"
  const stored = localStorage.getItem("gcs-lang")
  return stored === "tw" ? "tw" : "en"
}

// Resolve a dotted key path like "nav.home" against the active language,
// falling back to English, then to the key itself.
function resolve(dict, path) {
  return path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), dict)
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    localStorage.setItem("gcs-lang", lang)
    document.documentElement.lang = lang === "tw" ? "tw" : "en"
  }, [lang])

  const t = (key) => {
    const value = resolve(translations[lang], key)
    if (value != null) return value
    return resolve(translations.en, key) ?? key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
