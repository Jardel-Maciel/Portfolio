import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Highlight } from '@/components/Highlight'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export function PortfolioPage() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-light focus:px-4 focus:py-2 focus:text-sm focus:text-surface-light dark:focus:bg-ink-dark dark:focus:text-surface-dark"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Highlight />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
