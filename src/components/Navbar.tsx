import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { navLinks } from '@/data/siteConfig'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ThemeToggle } from '@/components/ThemeToggle'

const sectionIds = navLinks.map((link) => link.id)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = () => setIsOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || isOpen
          ? 'border-b border-border-light bg-surface-light/85 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/85'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a
          href="#inicio"
          className="font-mono text-sm font-semibold tracking-tight text-ink-light dark:text-ink-dark"
        >
          Jardel<span className="text-accent-blue">.</span>Maciel
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeId === link.id ? 'page' : undefined}
                className={`relative py-1 text-sm transition-colors ${
                  activeId === link.id
                    ? 'text-ink-light dark:text-ink-dark'
                    : 'text-ink-light-muted hover:text-ink-light dark:text-ink-dark-muted dark:hover:text-ink-dark'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent-blue transition-all duration-300 ${
                    activeId === link.id ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <a
            href="#projetos"
            className="rounded-full bg-ink-light px-4 py-2 text-sm font-medium text-surface-light transition-transform hover:scale-[1.03] dark:bg-ink-dark dark:text-surface-dark"
          >
            Ver projetos
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light dark:border-border-dark dark:text-ink-dark"
          >
            {isOpen ? <FiX className="h-[18px] w-[18px]" /> : <FiMenu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border-light bg-surface-light px-6 pb-6 pt-2 dark:border-border-dark dark:bg-surface-dark md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={handleNavClick}
                  className={`block rounded-lg px-3 py-3 text-base ${
                    activeId === link.id
                      ? 'bg-surface-light-raised text-ink-light dark:bg-surface-dark-raised dark:text-ink-dark'
                      : 'text-ink-light-muted dark:text-ink-dark-muted'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#projetos"
            onClick={handleNavClick}
            className="mt-4 block rounded-full bg-ink-light px-4 py-3 text-center text-sm font-medium text-surface-light dark:bg-ink-dark dark:text-surface-dark"
          >
            Ver projetos
          </a>
        </div>
      )}
    </header>
  )
}
