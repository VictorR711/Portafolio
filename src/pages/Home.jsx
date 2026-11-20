import BreachPreview from '../components/BreachPreview'
import { ME } from '../data/profile'

function Home({ onNavigate }) {
  return (
    <section className="hero">
      <div>
        <p className="tag">// acceso concedido · usuario: {ME.handle}</p>
        <h1 className="glitch" data-text="Portafolio de proyectos">
          Portafolio de proyectos
        </h1>
        <p className="author">{ME.name}</p>
        <p className="lead">{ME.bio}</p>
        <div className="actions">
          <button className="btn primary" onClick={() => onNavigate('proyectos')}>
            Ver proyectos
          </button>
          <button className="btn" onClick={() => onNavigate('contacto')}>
            Contactar
          </button>
        </div>
      </div>
      <BreachPreview />
    </section>
  )
}

export default Home
