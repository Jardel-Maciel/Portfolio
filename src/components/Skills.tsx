import { Section } from '@/components/Section'
import { skillCategories } from '@/data/skills'
import { useReveal } from '@/hooks/useReveal'

export function Skills() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Section id="habilidades" eyebrow="Habilidades" title="Tecnologias & Habilidades">
      <div ref={ref} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light-muted dark:text-ink-dark-muted">
              {category.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex items-center gap-3 rounded-lg border border-border-light bg-surface-light px-3.5 py-2.5 text-sm text-ink-light transition-colors hover:border-accent-blue/50 dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark">
                    <skill.icon className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                    {skill.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
