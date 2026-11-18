import { LazyMotion, MotionConfig } from 'framer-motion'
import { About } from './components/About'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Navbar, ScrollProgress } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { LangProvider } from './lib/i18n'

// Animation features load in a separate chunk so they don't block first paint.
const loadFeatures = () => import('./lib/motion-features').then((r) => r.default)

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      {/* reducedMotion="user": with prefers-reduced-motion, transforms are skipped and only fades remain. */}
      <MotionConfig reducedMotion="user">
        <LangProvider>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </LangProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
