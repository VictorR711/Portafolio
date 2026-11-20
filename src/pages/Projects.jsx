import ProjectCard from '../components/ProjectCard'
import ProjectRow from '../components/ProjectRow'
import { PROJECTS } from '../data/projects'

function Projects() {
  const featured = PROJECTS.filter(project => project.featured)
  const others = PROJECTS.filter(project => !project.featured)

  return (
    <section>
      <h2>Proyectos</h2>
      <div className="grid two">
        {featured.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <h3 className="sub">Otras actividades</h3>
      <div className="rows">
        {others.map(project => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
