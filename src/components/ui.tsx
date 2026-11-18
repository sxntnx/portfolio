import { m } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { fadeUp, inView, stagger } from '../lib/motion'

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <m.div
        className="container-x py-20 sm:py-28"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        {children}
      </m.div>
    </section>
  )
}

export function SectionHeading({ number, title, intro }: { number: string; title: string; intro?: string }) {
  return (
    <m.div variants={fadeUp} className="mb-10 sm:mb-12">
      <h2 className="flex items-baseline gap-3 text-[26px] font-semibold leading-tight tracking-h2 sm:text-[30px]">
        <span className="font-mono text-[15px] font-medium tracking-normal text-accent">{number}</span>
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-fg-muted">{intro}</p>}
    </m.div>
  )
}

type BtnProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  download?: boolean
  arrow?: 'right' | 'out' | 'none'
  icon?: ReactNode
  className?: string
}

export function Button({ href, children, variant = 'primary', external, download, arrow = 'right', icon, className = '' }: BtnProps) {
  const Arrow = arrow === 'out' ? ArrowUpRight : ArrowRight
  return (
    <a
      href={href}
      className={`btn group ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {icon}
      {children}
      {arrow !== 'none' && <Arrow aria-hidden className="btn-arrow h-4 w-4" />}
    </a>
  )
}
