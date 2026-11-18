import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { FileDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { links } from '../data/content'
import { useLang } from '../lib/i18n'
import { EASE, asset, fadeUp, isFinePointer, stagger } from '../lib/motion'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Button } from './ui'

function GridBackground({ interactive }: { interactive: boolean }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 20 })
  const py = useSpring(my, { stiffness: 60, damping: 20 })
  const sx = useMotionValue(-999)
  const sy = useMotionValue(-999)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(93,228,204,0.09), transparent 70%)`
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!interactive) return
    const el = ref.current?.parentElement
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      mx.set(nx * -16) // max ±8px
      my.set(ny * -16)
      sx.set(e.clientX - r.left)
      sy.set(e.clientY - r.top)
    }
    const onLeave = () => {
      sx.set(-999)
      sy.set(-999)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [interactive, mx, my, sx, sy])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <m.div
        style={{
          x: px,
          y: py,
          backgroundImage:
            'linear-gradient(to right, rgba(238,243,242,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(238,243,242,0.045) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, #000 30%, transparent 100%)',
        }}
        className="absolute -inset-4"
      />
      {interactive && <m.div style={{ background: spotlight }} className="absolute inset-0" />}
      <div className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]" />
    </div>
  )
}

function PipelineCard() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const rows = t.hero.pipeline
  return (
    <m.div
      variants={fadeUp}
      className="card relative w-full max-w-[440px] bg-surface/80 p-5 backdrop-blur-sm sm:p-6"
      aria-label={t.hero.pipelineTitle}
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="label">{t.hero.pipelineTitle}</p>
        <span className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-line" />
          ))}
        </span>
      </div>

      <div className="relative">
        {/* vertical connector */}
        <svg aria-hidden className="absolute left-[19px] top-6 h-[calc(100%-48px)] w-[2px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
          <line x1="1" y1="0" x2="1" y2="100" stroke="#222B2F" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <m.line
            x1="1" y1="0" x2="1" y2="100"
            stroke="#5DE4CC" strokeWidth="2" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1.1, ease: EASE }}
          />
        </svg>

        <ol className="relative flex flex-col gap-3">
          {rows.map((row, i) => {
            const last = i === rows.length - 1
            return (
              <m.li
                key={row.title}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.18, duration: 0.5, ease: EASE }}
                className={`relative flex items-center gap-4 rounded-xl border px-3 py-3.5 ${
                  last ? 'border-accent/35 bg-tint' : 'border-line bg-elevated'
                }`}
              >
                {last && !reduce && (
                  <m.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    animate={{ boxShadow: ['0 0 0px rgba(93,228,204,0)', '0 0 28px rgba(93,228,204,0.22)', '0 0 0px rgba(93,228,204,0)'] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                  />
                )}
                <span
                  className={`relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border font-mono text-[11px] ${
                    last ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface text-fg-muted'
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <p className={`text-[15px] font-semibold ${last ? 'text-accent' : 'text-fg'}`}>{row.title}</p>
                  <p className="mt-0.5 font-mono text-[11.5px] tracking-[0.04em] text-fg-subtle">{row.detail}</p>
                </div>
              </m.li>
            )
          })}
        </ol>
      </div>
    </m.div>
  )
}

export function Hero() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const interactive = !reduce && isFinePointer()

  const words = t.hero.name.split(' ')

  return (
    <section id="home" className="relative isolate overflow-hidden pt-16">
      <GridBackground interactive={interactive} />
      <div className="container-x relative grid min-h-[calc(100svh-64px)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-20">
        <m.div variants={stagger(0.08, 0.05)} initial="hidden" animate="show" key={lang}>
          <m.p
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-available/25 bg-available-bg/60 px-3 py-1.5 text-[13px] font-medium text-available"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-available" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-available" />
            </span>
            {t.hero.badge}
          </m.p>

          <h1 className="mt-6 text-[44px] font-semibold leading-[1.08] tracking-h1 sm:text-[56px] lg:text-[64px]">
            {words.map((w, i) => (
              <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-top last:mr-0">
                <m.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '105%' },
                    show: { y: '0%', transition: { duration: 0.7, ease: EASE, delay: 0.12 + i * 0.08 } },
                  }}
                >
                  {w}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p variants={fadeUp} className="mt-4 text-[19px] font-medium text-accent sm:text-[21px]">
            {t.hero.role}
          </m.p>

          <m.p variants={fadeUp} className="mt-5 max-w-[540px] text-[16px] leading-[1.6] text-fg-muted sm:text-[17px]">
            {t.hero.tagline}
          </m.p>

          <m.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">{t.hero.ctaProjects}</Button>
            <Button href="#contact" variant="ghost">
              {t.hero.ctaContact}
            </Button>
          </m.div>

          <m.ul variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-fg-muted">
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <GitHubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href={asset(links.cv[lang])} download className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <FileDown aria-hidden className="h-4 w-4" /> {t.hero.cv}
              </a>
            </li>
          </m.ul>

          <m.p variants={fadeUp} className="label mt-6 normal-case tracking-[0.06em]">
            <span aria-hidden>📍 </span>
            {t.hero.location}
          </m.p>
        </m.div>

        <div className="flex justify-center lg:justify-end">
          <m.div variants={stagger(0.1, 0.35)} initial="hidden" animate="show" className="w-full max-w-[440px]">
            <PipelineCard />
          </m.div>
        </div>
      </div>
    </section>
  )
}
