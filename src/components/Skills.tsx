import { m } from 'framer-motion'
import { useLang } from '../lib/i18n'
import { fadeUp } from '../lib/motion'
import { Section, SectionHeading } from './ui'

export function Skills() {
  const { t } = useLang()
  return (
    <Section id="skills">
      <SectionHeading number={t.skills.number} title={t.skills.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.skills.groups.map((g) => (
          <m.div
            key={g.label}
            variants={fadeUp}
            className={`card p-5 hover:border-accent/40 ${g.learning ? 'border-dashed bg-transparent' : ''}`}
          >
            <h3 className="label flex items-center gap-2">
              {g.learning && <span aria-hidden className="h-1.5 w-1.5 rounded-full border border-accent" />}
              {g.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className={`chip normal-case ${g.learning ? 'border-dashed text-fg-subtle' : ''}`}>
                  {s}
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>
    </Section>
  )
}
