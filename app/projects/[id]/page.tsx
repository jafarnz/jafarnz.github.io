import { projects } from "./data"
import { ProjectClient } from "./project-client"

export function generateStaticParams() {
  return Object.keys(projects).map((id) => ({
    id,
  }))
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects[params.id as keyof typeof projects]
  
  if (!project) return null
  
  return <ProjectClient project={project} />
}

