import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-16 px-6 py-24 lg:px-8 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl lg:mb-16">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-blue">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold tracking-tight text-ink-light sm:text-3xl dark:text-ink-dark">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-ink-light-muted dark:text-ink-dark-muted">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
