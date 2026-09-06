import { Section } from '@/components/Section'
import { comingSoonProject } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { useReveal } from '@/hooks/useReveal'
import { useProjects } from '@/hooks/useProjects'

export function Projects() {
  const ref = useReveal<HTMLDivElement>()
  const projects = useProjects()

  return (
    <Section
      id="projetos"
      eyebrow="Projetos"
      title="Projetos em destaque"
      description="Produtos que venho construindo — do desenho da arquitetura à interface final."
    >
      <div ref={ref} className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
        <ProjectCard project={comingSoonProject} />
      </div>
    </Section>
  )
}
