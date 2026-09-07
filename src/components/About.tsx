import { FiCode, FiDatabase, FiLayout, FiLink } from 'react-icons/fi'
import { Section } from '@/components/Section'
import { useReveal } from '@/hooks/useReveal'

const highlights = [
  {
    icon: FiLayout,
    title: 'Interfaces responsivas',
    description: 'Layouts que se adaptam com precisão do desktop ao smartphone.',
  },
  {
    icon: FiLink,
    title: 'Front-End + Back-End',
    description: 'Integração completa entre interface, API e banco de dados.',
  },
  {
    icon: FiCode,
    title: 'APIs bem estruturadas',
    description: 'Endpoints organizados, previsíveis e fáceis de consumir.',
  },
  {
    icon: FiDatabase,
    title: 'Modelagem de dados',
    description: 'Bancos relacionais e não relacionais pensados para escalar.',
  },
]

export function About() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Section
      id="sobre"
      eyebrow="Sobre"
      title="Sobre mim"
      className="bg-surface-light-raised/50 dark:bg-surface-dark-raised/30"
    >
      <div ref={ref} className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="text-base leading-relaxed text-ink-light-muted dark:text-ink-dark-muted">
            Sou estudante de Ciência da Computação e desenvolvedor em formação, com foco em
            desenvolvimento <strong className="font-medium text-ink-light dark:text-ink-dark">Back-End</strong> e{' '}
            <strong className="font-medium text-ink-light dark:text-ink-dark">Full Stack</strong>. Gosto de
            entender o problema antes de escrever a primeira linha de código — e de construir
            produtos que as pessoas realmente usam.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-light-muted dark:text-ink-dark-muted">
            Tenho interesse particular em arquitetura, engenharia de software e no processo completo de
            construção de um produto digital: da interface ao banco de dados, passando pelas
            decisões que tornam um sistema fácil de manter e de crescer.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border-light bg-surface-light p-5 dark:border-border-dark dark:bg-surface-dark"
            >
              <Icon className="h-5 w-5 text-accent-blue" />
              <h3 className="mt-3 text-sm font-medium text-ink-light dark:text-ink-dark">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-light-muted dark:text-ink-dark-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
