import { FiArrowUpRight, FiGithub, FiPlus } from 'react-icons/fi'
import type { Project } from '@/data/projects'
import { ProjectMockup } from '@/components/ProjectMockup'
import { ProjectGallery } from '@/components/ProjectGallery'

export function ProjectCard({ project }: { project: Project }) {
  if (project.comingSoon) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-light p-8 text-center dark:border-border-dark">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-light text-ink-light-muted dark:border-border-dark dark:text-ink-dark-muted">
          <FiPlus className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-medium text-ink-light dark:text-ink-dark">{project.title}</h3>
        <p className="mt-1 max-w-xs text-sm text-ink-light-muted dark:text-ink-dark-muted">
          {project.description}
        </p>
      </div>
    )
  }

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-border-light bg-surface-light transition-colors hover:border-accent-blue/40 dark:border-border-dark dark:bg-surface-dark ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="border-b border-border-light p-4 dark:border-border-dark">
        <div className="aspect-video overflow-hidden rounded-lg">
          {project.images && project.images.length > 0 ? (
            <ProjectGallery images={project.images} title={project.title} />
          ) : (
            <ProjectMockup />
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-blue">{project.tag}</p>
        <h3 className="mt-2 text-xl font-semibold text-ink-light dark:text-ink-dark">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-light-muted dark:text-ink-dark-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-surface-light-raised px-3 py-1 font-mono text-xs text-ink-light-muted dark:bg-surface-dark-raised dark:text-ink-dark-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-light px-4 py-2 text-sm font-medium text-surface-light transition-transform hover:scale-[1.03] dark:bg-ink-dark dark:text-surface-dark"
            >
              Ver projeto
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-border-light px-4 py-2 text-sm font-medium text-ink-light transition-colors hover:border-accent-blue hover:text-accent-blue dark:border-border-dark dark:text-ink-dark"
            >
              <FiGithub className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
