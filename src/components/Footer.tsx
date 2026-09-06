import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { siteConfig } from '@/data/siteConfig'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-light px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold text-ink-light dark:text-ink-dark">{siteConfig.name}</p>
          <p className="text-xs text-ink-light-muted dark:text-ink-dark-muted">FullStack Developer</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light-muted transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark-muted"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light-muted transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark-muted"
          >
            <FiLinkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="E-mail"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light-muted transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark-muted"
          >
            <FiMail className="h-4 w-4" />
          </a>
        </div>

        <p className="text-center text-xs text-ink-light-muted sm:text-right dark:text-ink-dark-muted">
          © {year} {siteConfig.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
