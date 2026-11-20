function ProjectRow({ project }) {
  return (
    <a className="row" href={project.url} target="_blank" rel="noreferrer">
      <strong>{project.title}</strong>
      <span className="row-desc">{project.desc}</span>
      <span className="row-tags">{project.tags.join(' · ')}</span>
      <span className="go">↗</span>
    </a>
  )
}

export default ProjectRow
