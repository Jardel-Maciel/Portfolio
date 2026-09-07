import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { heroTechs } from '@/data/skills'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen scroll-mt-16 items-center overflow-hidden px-6 pt-16 lg:px-8"
    >
      {/* Subtle grid backdrop — restrained, no gradients or noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-light)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] dark:bg-[linear-gradient(to_right,var(--color-border-dark)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-dark)_1px,transparent_1px)]"
      />

      <div className="mx-auto w-full max-w-6xl py-20">
        <p className="animate-fade-up font-mono text-sm text-accent-blue">Olá, eu sou Jardel Maciel.</p>

        <h1 className="animate-fade-up mt-5 text-4xl font-semibold tracking-tight text-ink-light [animation-delay:80ms] sm:text-6xl lg:text-7xl dark:text-ink-dark">
          Desenvolvedor
          <br />
          <span className="text-accent-blue">Full Stack</span>
          <span className="text-accent-red">.</span>
        </h1>

        <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-ink-light-muted [animation-delay:160ms] dark:text-ink-dark-muted">
          Transformo ideias em experiências digitais modernas, funcionais e intuitivas.
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 [animation-delay:240ms]">
          <a
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-light px-6 py-3 text-sm font-medium text-surface-light transition-transform hover:scale-[1.03] dark:bg-ink-dark dark:text-surface-dark"
          >
            Ver projetos
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-border-light px-6 py-3 text-sm font-medium text-ink-light transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark"
          >
            Entre em contato
            <FiArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="animate-fade-up mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-ink-light-muted [animation-delay:320ms] dark:text-ink-dark-muted">
          {heroTechs.map((tech, index) => (
            <span key={tech} className="flex items-center gap-3">
              {tech}
              {index < heroTechs.length - 1 && <span className="text-accent-red">•</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
