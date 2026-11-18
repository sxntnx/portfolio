import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { PointerEvent } from 'react'
import { links, type Project } from '../data/content'
import { useLang } from '../lib/i18n'
import { fadeUp, isFinePointer } from '../lib/motion'
import { GitHubIcon } from './icons'
import { Thumb } from './Thumbs'
import { Button, Section, SectionHeading } from './ui'

const MAX_TILT = 4

function ProjectCard({ p, index, tilt }: { p: Project; index: number; tilt: boolean }) {
  const { t } = useLang()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ry.set(x * MAX_TILT * 2)
    rx.set(-y * MAX_TILT * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const hasCode = p.code !== 'TODO'
  const hasCase = p.caseUrl !== 'TODO'

  return (
    <m.article
      variants={fadeUp}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="card group flex flex-col overflow-hidden hover:border-accent/40"
    >
      <div className="aspect-[47/20] overflow-hidden border-b border-line">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Thumb kind={p.thumb} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label">
          {p.category} <span className="text-accent">· 0{index + 1}</span>
        </p>
        <h3 className="mt-2.5 text-[20px] font-semibold leading-snug tracking-[-0.4px]">{p.title}</h3>
        <p className="mt-2.5 text-[15px] leading-[1.6] text-fg-muted">{p.description}</p>

        <ul className="mt-4 space-y-2">
          {p.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-[14px] leading-[1.55] text-fg-muted">
              <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-[14px] font-medium">
          {hasCode ? (
            <a href={p.code} target="_blank" rel="noopener noreferrer" className="group/l inline-flex items-center gap-1.5 text-accent">
              {t.projects.viewCode}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover/l:translate-x-1" />
            </a>
          ) : (
            <span className="font-mono text-[11.5px] uppercase tracking-label text-fg-subtle">{t.projects.comingSoon}</span>
          )}
          {hasCase && (
            <a href={p.caseUrl} target="_blank" rel="noopener noreferrer" className="group/l inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              {t.projects.readCase}
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </m.article>
  )
}

export function Projects() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const tilt = !reduce && isFinePointer()

  return (
    <Section id="projects">
      <SectionHeading number={t.projects.number} title={t.projects.title} intro={t.projects.intro} />
      <div className="grid gap-5 md:grid-cols-2">
        {t.projects.items.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} tilt={tilt} />
        ))}
      </div>
      <m.div variants={fadeUp} className="mt-10 flex justify-center">
        <Button href={links.github} variant="ghost" external icon={<GitHubIcon />}>
          {t.projects.seeAll}
        </Button>
      </m.div>
    </Section>
  )
}
