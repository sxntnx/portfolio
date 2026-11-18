import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { NavId } from '../data/content'
import { useLang } from '../lib/i18n'
import { EASE } from '../lib/motion'

const IDS: NavId[] = ['about', 'projects', 'skills', 'experience', 'contact']

function useActiveSection() {
  const [active, setActive] = useState<NavId | null>(null)
  useEffect(() => {
    const els = IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as NavId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 200 && setActive(null)
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])
  return active
}

function LangBtn({ className = '' }: { className?: string }) {
  const { t, toggle } = useLang()
  return (
    <button
      type="button"
      onClick={toggle}
      title={t.meta.switchLabel}
      className={`rounded-md border border-line px-2.5 py-1 font-mono text-[11.5px] tracking-label text-fg-muted transition-colors hover:border-accent/60 hover:text-fg ${className}`}
    >
      {t.meta.switchTo}
      <span className="sr-only"> — {t.meta.switchLabel}</span>
    </button>
  )
}

export function Navbar() {
  const { t } = useLang()
  const active = useActiveSection()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 120 && !open)
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])


  return (
    <m.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-x-0 top-0 z-40 border-b border-line bg-base/75 backdrop-blur-md"
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#home" className="flex items-baseline text-[19px] font-bold tracking-[-0.04em]">
          SS<span aria-hidden className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="sr-only"> — Santino Spelzini, home</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`relative px-3 py-2 text-[14px] transition-colors ${active === id ? 'text-fg' : 'text-fg-muted hover:text-fg'}`}
            >
              {t.nav[id]}
              {active === id && (
                <m.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[1px] h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
          <LangBtn className="ml-3" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangBtn />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.meta.menuClose : t.meta.menuOpen}
            className="rounded-md p-2 text-fg"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-line bg-base/95 md:hidden"
          >
            <ul className="container-x flex flex-col py-3">
              {IDS.map((id, i) => (
                <m.li
                  key={id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3, ease: EASE }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3 text-[17px] ${active === id ? 'text-accent' : 'text-fg'}`}
                  >
                    {t.nav[id]}
                    <span className="font-mono text-[11px] text-fg-subtle">0{i + 1}</span>
                  </a>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <m.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
    />
  )
}
