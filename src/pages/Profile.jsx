import { ME } from '../data/profile'
import { DAEMONS } from '../data/skills'

function Profile() {
  return (
    <section>
      <h2>Perfil</h2>
      <p className="lead">{ME.bio}</p>
      <dl className="facts">
        <div>
          <dt>institución</dt>
          <dd>{ME.school}</dd>
        </div>
        <div>
          <dt>carrera</dt>
          <dd>{ME.career}</dd>
        </div>
        <div>
          <dt>idiomas</dt>
          <dd>Español · Inglés</dd>
        </div>
      </dl>
      <h2>Daemons instalados</h2>
      <div className="daemons">
        {DAEMONS.map(daemon => (
          <span key={daemon}>{daemon}</span>
        ))}
      </div>
    </section>
  )
}

export default Profile
