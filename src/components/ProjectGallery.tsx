import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

/**
 * Small image carousel for a project's screenshots. Shows one image at a
 * time with prev/next controls and dot indicators — arrows only appear
 * (and only render at all) when there's more than one image.
 */
export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  return (
    <div className="group relative h-full w-full overflow-hidden">
      <img
        src={images[index]}
        alt={`Captura de tela ${index + 1} de ${title}`}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface-light/85 text-ink-light opacity-0 transition-opacity group-hover:opacity-100 dark:bg-surface-dark/85 dark:text-ink-dark"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface-light/85 text-ink-light opacity-0 transition-opacity group-hover:opacity-100 dark:bg-surface-dark/85 dark:text-ink-dark"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                aria-label={`Ver imagem ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? 'bg-accent-blue' : 'bg-surface-light/70 dark:bg-surface-dark/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
