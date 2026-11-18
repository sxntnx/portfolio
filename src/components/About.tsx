import { animate, m, useInView, useReducedMotion } from 'framer-motion'
import { Briefcase, GraduationCap, Languages, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Stat } from '../data/content'
import { useLang } from '../lib/i18n'
import { fadeUp } from '../lib/motion'
import { Section, SectionHeading } from './ui'

const FACT_ICONS = [MapPin, GraduationCap, Languages, Briefcase]

function Counter({ stat }: { stat: Stat }) {
  const { lang } = useLang()
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [animated, setV] = useState(0)

  useEffect(() => {
    if (!seen || reduce) return
    const controls = animate(0, stat.value, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: setV })
    return () => controls.stop()
  }, [seen, reduce, stat.value])

  // Reduced motion: show the final value, no count-up.
  const v = reduce ? stat.value : animated

  const fmt = new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US', {
    minimumFractionDigits: stat.decimals,
    maximumFractionDigits: stat.decimals,
    useGrouping: true,
  })
  // Keep "2,000"/"2.000" grouping even for 4-digit numbers in Spanish.
  const text = stat.value >= 1000 && lang === 'es' ? fmt.format(Math.round(v)).replace(/^(\d)(\d{3})$/, '$1.$2') : fmt.format(v)

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      {text}
      {stat.suffix}
    </span>
  )
}

export function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <Section id="about">
      <SectionHeading number={a.number} title={a.title} />
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <m.p variants={fadeUp} className="text-[16px] leading-[1.7] text-fg-muted sm:text-[17px]">
          {a.body}
        </m.p>
        <m.ul variants={fadeUp} className="flex flex-col divide-y divide-line border-y border-line">
          {a.facts.map((f, i) => {
            const Icon = FACT_ICONS[i]
            return (
              <li key={f.label} className="flex items-start gap-3.5 py-4">
                <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="label">{f.label}</p>
                  <p className="mt-1 text-[15px] text-fg">{f.value}</p>
                </div>
              </li>
            )
          })}
        </m.ul>
      </div>

      <m.dl variants={fadeUp} className="mt-12 grid gap-3 sm:grid-cols-3">
        {a.stats.map((s, i) => (
          // index key: keeps the counter mounted (no re-count from 0) when the language changes
          <div key={i} className="card px-5 py-6">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <p className="text-[34px] font-semibold leading-none tracking-[-1px] text-fg sm:text-[38px]">
                <Counter stat={s} />
              </p>
              <p className="mt-3 text-[14px] leading-snug text-fg-subtle" aria-hidden>
                {s.label}
              </p>
            </dd>
          </div>
        ))}
      </m.dl>
    </Section>
  )
}
