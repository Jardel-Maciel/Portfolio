import { useReveal } from '@/hooks/useReveal'

export function Highlight() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-y border-border-light bg-ink-light px-6 py-24 dark:border-border-dark dark:bg-black lg:px-8 lg:py-32">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-surface-light sm:text-4xl lg:text-5xl">
          Construindo soluções,
          <br />
          não apenas <span className="text-accent-blue">código</span>
          <span className="text-accent-red">.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
          Meu objetivo é desenvolver sistemas que resolvam problemas reais, combinando
          tecnologia, usabilidade e visão de produto.
        </p>
      </div>
    </section>
  )
}
