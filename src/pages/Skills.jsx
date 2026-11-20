import { SKILLS } from '../data/skills'

function Skills() {
  return (
    <section>
      <h2>Habilidades</h2>
      <ul className="skills">
        {SKILLS.map(skill => (
          <li key={skill.name}>
            <span>
              {skill.name} <em>{skill.level}%</em>
            </span>
            <div className="bar">
              <b style={{ '--w': `${skill.level}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
