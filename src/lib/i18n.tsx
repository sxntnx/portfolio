import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from '../data/content'

const STORAGE_KEY = 'ss-portfolio-lang'

function readStoredLang(): Lang {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'en' || v === 'es') return v
  } catch {
    /* storage blocked (private mode, etc.) */
  }
  return 'en'
}

interface LangCtx {
  lang: Lang
  t: Content
  toggle: () => void
}

const Ctx = createContext<LangCtx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'es' : 'en')), [])
  const value = useMemo(() => ({ lang, t: content[lang], toggle }), [lang, toggle])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
