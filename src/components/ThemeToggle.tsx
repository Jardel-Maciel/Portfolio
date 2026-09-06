import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light-muted transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark-muted dark:hover:border-accent-blue dark:hover:text-accent-blue"
    >
      <FiSun className="h-[18px] w-[18px] scale-0 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100" />
      <FiMoon className="absolute h-[18px] w-[18px] scale-100 opacity-100 transition-all duration-300 dark:scale-0 dark:opacity-0" />
    </button>
  )
}
