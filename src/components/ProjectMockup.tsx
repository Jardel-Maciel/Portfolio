/**
 * Abstract dashboard illustration used as a stand-in preview for projects
 * that don't have a live screenshot yet. Intentionally schematic rather
 * than a fake product screenshot.
 */
export function ProjectMockup() {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      role="img"
      aria-label="Ilustração esquemática de um painel de gestão de estoque"
      className="h-full w-full"
    >
      <rect x="0.5" y="0.5" width="399" height="239" rx="11.5" className="fill-surface-light-raised dark:fill-surface-dark-raised" />
      <rect x="0.5" y="0.5" width="399" height="239" rx="11.5" className="stroke-border-light dark:stroke-border-dark" />

      {/* window controls */}
      <circle cx="20" cy="20" r="4" className="fill-accent-red/70" />
      <circle cx="34" cy="20" r="4" className="fill-ink-light-muted/30 dark:fill-ink-dark-muted/30" />
      <circle cx="48" cy="20" r="4" className="fill-ink-light-muted/30 dark:fill-ink-dark-muted/30" />

      {/* sidebar */}
      <rect x="16" y="40" width="64" height="184" rx="8" className="fill-surface-light dark:fill-surface-dark" />
      <rect x="28" y="54" width="40" height="6" rx="3" className="fill-accent-blue" />
      <rect x="28" y="72" width="40" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />
      <rect x="28" y="88" width="32" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />
      <rect x="28" y="104" width="36" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />

      {/* KPI cards */}
      <rect x="96" y="40" width="88" height="48" rx="8" className="fill-surface-light dark:fill-surface-dark" />
      <rect x="108" y="52" width="36" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />
      <rect x="108" y="64" width="24" height="8" rx="2" className="fill-accent-blue" />

      <rect x="192" y="40" width="88" height="48" rx="8" className="fill-surface-light dark:fill-surface-dark" />
      <rect x="204" y="52" width="36" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />
      <rect x="204" y="64" width="24" height="8" rx="2" className="fill-accent-red" />

      <rect x="288" y="40" width="96" height="48" rx="8" className="fill-surface-light dark:fill-surface-dark" />
      <rect x="300" y="52" width="36" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />
      <rect x="300" y="64" width="24" height="8" rx="2" className="fill-ink-light-muted/60 dark:fill-ink-dark-muted/60" />

      {/* bar chart */}
      <rect x="96" y="100" width="184" height="124" rx="8" className="fill-surface-light dark:fill-surface-dark" />
      <g>
        <rect x="112" y="180" width="16" height="28" rx="3" className="fill-accent-blue/30" />
        <rect x="136" y="160" width="16" height="48" rx="3" className="fill-accent-blue/50" />
        <rect x="160" y="140" width="16" height="68" rx="3" className="fill-accent-blue" />
        <rect x="184" y="168" width="16" height="40" rx="3" className="fill-accent-blue/40" />
        <rect x="208" y="150" width="16" height="58" rx="3" className="fill-accent-blue/70" />
        <rect x="232" y="176" width="16" height="32" rx="3" className="fill-accent-blue/30" />
        <rect x="256" y="120" width="16" height="88" rx="3" className="fill-accent-red" />
      </g>
      <line x1="112" y1="208" x2="272" y2="208" className="stroke-border-light dark:stroke-border-dark" />

      {/* side list */}
      <rect x="288" y="100" width="96" height="124" rx="8" className="fill-surface-light dark:fill-surface-dark" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="304" cy={118 + i * 26} r="6" className="fill-accent-blue/20" />
          <rect x="316" y={115 + i * 26} width="52" height="5" rx="2.5" className="fill-ink-light-muted/25 dark:fill-ink-dark-muted/30" />
          <rect x="316" y={123 + i * 26} width="34" height="4" rx="2" className="fill-ink-light-muted/15 dark:fill-ink-dark-muted/20" />
        </g>
      ))}
    </svg>
  )
}
