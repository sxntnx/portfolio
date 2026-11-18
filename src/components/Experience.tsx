import { m, useScroll, useSpring } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import type { Job } from '../data/content'
import { useLang } from '../lib/i18n'
import { EASE, fadeUp } from '../lib/motion'
import { Section, SectionHeading } from './ui'

function Item({ job }: { job: Job }) {
  return (
    <m.li variants={fadeUp} className="relative pb-12 pl-10 last:pb-0 sm:pl-12">
      {/* node */}
      <m.span
        aria-hidden
        className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-line bg-base"
        initial={{ borderColor: '#222B2F', boxShadow: '0 0 0 0 rgba(93,228,204,0)' }}
        whileInView={{ borderColor: '#5DE4CC', boxShadow: '0 0 0 5px rgba(93,228,204,0.12)' }}
        viewport={{ once: true, margin: '0px 0px -55% 0px' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span className="h-[5px] w-[5px] rounded-full bg-accent" />
      </m.span>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.3px]">
          {job.education && <GraduationCap aria-hidden className="mr-2 inline h-4 w-4 -translate-y-px text-accent" />}
          {job.role} <span className="font-normal text-fg-muted">— {job.org}</span>
        </h3>
        <p className="label shrink-0 normal-case tracking-[0.06em]">{job.period}</p>
      </div>
      {job.bullets.length > 0 && (
        <ul className="mt-3 space-y-2">
          {job.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-[15px] leading-[1.6] text-fg-muted">
              <span aria-hidden className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {job.stack && <p className="label mt-3 normal-case tracking-[0.06em]">{job.stack}</p>}
    </m.li>
  )
}

export function Experience() {
  const { t } = useLang()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <Section id="experience">
      <SectionHeading number={t.experience.number} title={t.experience.title} />
      <div className="relative max-w-3xl">
        <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
        <m.span aria-hidden style={{ scaleY }} className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent" />
        <ol ref={ref} className="relative">
          {t.experience.items.map((job) => (
            <Item key={job.role + job.org} job={job} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
