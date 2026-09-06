export interface Project {
  title: string
  tag: string
  description: string
  stack: string[]
  images?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    title: 'Estoque Fácil',
    tag: 'Sistema SaaS de gestão de estoque',
    description:
      'Plataforma para gerenciamento de estoque, produtos, movimentações, fornecedores, relatórios e indicadores. Desenvolvida com arquitetura separando Front-End e Back-End, com suporte a múltiplos usuários e empresas.',
    stack: ['React', 'JavaScript', 'Python', 'Flask', 'PostgreSQL'],
    githubUrl: 'https://github.com/jardelmaciel/estoque-facil',
    featured: true,
  },
]

/** Placeholder slot rendered after the real projects — invites future work. */
export const comingSoonProject: Project = {
  title: 'Próximo projeto',
  tag: 'Em construção',
  description: 'Um novo produto está sendo desenhado. Em breve, mais detalhes por aqui.',
  stack: [],
  comingSoon: true,
}
