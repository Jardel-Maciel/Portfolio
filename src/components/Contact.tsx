import { useState, type FormEvent } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'
import { Section } from '@/components/Section'
import { siteConfig } from '@/data/siteConfig'
import { useReveal } from '@/hooks/useReveal'

const contactMethods = [
  { label: 'GitHub', href: siteConfig.github, icon: FiGithub },
  { label: 'LinkedIn', href: siteConfig.linkedin, icon: FiLinkedin },
  { label: 'E-mail', href: `mailto:${siteConfig.email}`, icon: FiMail },
]

export function Contact() {
  const ref = useReveal<HTMLDivElement>()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Contato via portfólio — ${form.name || 'sem nome'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section
      id="contato"
      eyebrow="Contato"
      title="Vamos trabalhar juntos?"
      description="Estou aberto a oportunidades, projetos e conexões na área de tecnologia."
    >
      <div ref={ref} className="grid gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <ul className="flex flex-col gap-3">
            {contactMethods.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="flex items-center gap-3 rounded-xl border border-border-light px-4 py-3.5 text-sm font-medium text-ink-light transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium text-ink-light-muted dark:text-ink-dark-muted">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-lg border border-border-light bg-surface-light px-3.5 py-2.5 text-sm text-ink-light outline-none transition-colors focus:border-accent-blue dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-ink-light-muted dark:text-ink-dark-muted">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="rounded-lg border border-border-light bg-surface-light px-3.5 py-2.5 text-sm text-ink-light outline-none transition-colors focus:border-accent-blue dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-medium text-ink-light-muted dark:text-ink-dark-muted">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="resize-none rounded-lg border border-border-light bg-surface-light px-3.5 py-2.5 text-sm text-ink-light outline-none transition-colors focus:border-accent-blue dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink-light px-6 py-3 text-sm font-medium text-surface-light transition-transform hover:scale-[1.03] dark:bg-ink-dark dark:text-surface-dark"
          >
            Enviar mensagem
            <FiSend className="h-4 w-4" />
          </button>
          <p className="text-xs text-ink-light-muted dark:text-ink-dark-muted">
            O botão abre seu aplicativo de e-mail com a mensagem pronta para envio.
          </p>
        </form>
      </div>
    </Section>
  )
}
