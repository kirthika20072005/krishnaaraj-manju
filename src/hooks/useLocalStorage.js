import { useCallback, useEffect, useState } from 'react'

/**
 * A tiny localStorage-backed state hook that never crashes the app.
 * Falls back gracefully if storage is unavailable (private mode, etc.).
 */
export default function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      /* storage full or blocked — ignore, the app still works */
    }
  }, [key, storedValue])

  // Keep multiple tabs in sync (nice-to-have, harmless).
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch {
          /* ignore */
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [storedValue, setStoredValue]
}
