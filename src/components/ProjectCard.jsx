import ProjectPlaceholder from './ProjectPlaceholder'

function ProjectCard({ project }) {
  return (
    <a className="card" href={project.url} target="_blank" rel="noreferrer">
      <i className="corner top-left" />
      <i className="corner bottom-right" />
      <div className="thumb">
        {project.image ? (
          <img
            className="logo-img"
            src={project.image}
            alt={`Logo de ${project.title}`}
          />
        ) : (
          <ProjectPlaceholder title={project.title} />
        )}
      </div>
      <div className="body">
        <span className="node">NODO PRINCIPAL</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="tags">
          {project.tags.map(tag => (
            <i key={tag}>{tag}</i>
          ))}
        </div>
        <span className="open">Abrir proyecto ↗</span>
      </div>
    </a>
  )
}

export default ProjectCard
