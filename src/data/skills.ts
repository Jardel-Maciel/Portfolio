import type { IconType } from 'react-icons'
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiVite,
  SiPython,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiGit,
  SiGithub,
  SiVercel,
  SiRender,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

export interface Skill {
  name: string
  icon: IconType
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Front-End',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    title: 'Back-End',
    skills: [
      { name: 'Python', icon: SiPython },
      { name: 'Flask', icon: SiFlask },
      { name: 'APIs REST', icon: TbApi },
    ],
  },
  {
    title: 'Banco de Dados',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'SQLite', icon: SiSqlite },
    ],
  },
  {
    title: 'Ferramentas',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Render', icon: SiRender },
    ],
  },
]

/** Short tech marquee shown under the hero heading. */
export const heroTechs = ['React', 'TypeScript', 'JavaScript', 'Python', 'Flask']
