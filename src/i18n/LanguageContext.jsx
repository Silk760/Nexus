import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import en from './en'
import ar from './ar'

const translations = { en, ar }
const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('nexus-lang') || 'en')

  useEffect(() => {
    localStorage.setItem('nexus-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  const t = useCallback((key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      if (value == null) return key
      value = value[k]
    }
    return value ?? key
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
