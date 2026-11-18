import { AnimatePresence, m } from 'framer-motion'
import { ArrowUp, Check, Copy, FileDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { links } from '../data/content'
import { useLang } from '../lib/i18n'
import { EASE, asset, fadeUp } from '../lib/motion'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Button, Section } from './ui'

function useCopyEmail() {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    const email = links.emailParts.join('@')
    let ok = false
    try {
      await navigator.clipboard.writeText(email)
      ok = true
    } catch {
      // Fallback for non-secure contexts / older browsers
      try {
        const ta = document.createElement('textarea')
        ta.value = email
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = document.execCommand('copy')
        ta.remove()
      } catch {
        ok = false
      }
    }
    setState(ok ? 'ok' : 'fail')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }
  return { state, copy }
}

export function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const { state, copy } = useCopyEmail()

  return (
    <Section id="contact" className="relative overflow-hidden">
      <m.p variants={fadeUp} className="font-mono text-[15px] text-accent">
        {c.number}
      </m.p>
      <m.h2 variants={fadeUp} className="mt-3 text-[44px] font-semibold leading-[1.05] tracking-h1 sm:text-[64px]">
        {c.title}
      </m.h2>
      <m.p variants={fadeUp} className="mt-5 max-w-xl text-[16px] leading-[1.6] text-fg-muted sm:text-[17px]">
        {c.body}
      </m.p>
      <m.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
        <Button href={links.linkedin} external arrow="out" icon={<LinkedInIcon />}>
          {c.linkedin}
        </Button>
        <Button href={asset(links.cv[lang])} variant="ghost" download arrow="none" icon={<FileDown aria-hidden className="h-4 w-4" />}>
          {c.cv}
        </Button>
        <Button href={links.github} variant="ghost" external arrow="out" icon={<GitHubIcon />}>
          {c.github}
        </Button>
        <button type="button" onClick={copy} className="btn btn-ghost group">
          {state === 'ok' ? <Check aria-hidden className="h-4 w-4 text-accent" /> : <Copy aria-hidden className="h-4 w-4" />}
          {c.copyEmail}
        </button>
      </m.div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <AnimatePresence>
          {state !== 'idle' && (
            <m.div
              key={state}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex items-center gap-2 rounded-full border border-accent/40 bg-tint px-4 py-2 text-[14px] font-medium text-fg shadow-lg shadow-black/40"
            >
              {state === 'ok' && <Check aria-hidden className="h-4 w-4 text-accent" />}
              {state === 'ok' ? c.copied : c.copyFailed}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-3 py-8 text-[13px] text-fg-subtle sm:flex-row sm:items-center">
        <p>© 2026 Santino Spelzini · {t.footer.built}</p>
        <a href="#home" className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent">
          {t.footer.top}
          <ArrowUp aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
