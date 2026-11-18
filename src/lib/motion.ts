import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

// Reveal once the section enters the viewport (bottom 15% excluded). A fractional `amount`
// (e.g. 0.2) would keep tall sections like Projects on mobile (~3000px) invisible for too long.
export const inView = { once: true, amount: 0, margin: '0px 0px -15% 0px' } as const

/** Pointer-capable desktop (enables parallax, spotlight and tilt). */
export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`
