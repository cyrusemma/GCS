import { createContext, useCallback, useContext, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"

const ToastContext = createContext({ toast: () => {} })

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const ACCENT = {
  success: "border-emerald-500",
  error: "border-red-500",
  info: "border-crown-blue",
}

const ICON_COLOR = {
  success: "text-emerald-500",
  error: "text-red-500",
  info: "text-crown-blue",
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ type = "info", title, message, duration = 5000 }) => {
      const id = ++idRef.current
      setToasts((list) => [...list, { id, type, title, message }])
      if (duration) setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-20 right-4 z-[60] flex flex-col gap-3 w-[min(92vw,360px)]">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type] || Info
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow-xl border-l-4 ${ACCENT[t.type]} p-4 flex gap-3`}
                role="status"
              >
                <Icon className={`shrink-0 ${ICON_COLOR[t.type]}`} size={22} />
                <div className="flex-1 min-w-0">
                  {t.title && (
                    <p className="font-poppins font-semibold text-crown-blue dark:text-white text-sm">
                      {t.title}
                    </p>
                  )}
                  {t.message && (
                    <p className="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{t.message}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
