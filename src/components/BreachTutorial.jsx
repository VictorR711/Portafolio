import { BUFFER_SIZE, TIME_LIMIT } from '../utils/breach'
import { TUTORIAL_STEPS, TUTORIAL_TIP } from '../data/texts'

function BreachTutorial({ onStart, onSkip }) {
  return (
    <div className="tutorial" role="dialog" aria-label="Cómo jugar">
      <div className="tutorial-box">
        <h2>Cómo jugar</h2>

        <ol className="tutorial-steps">
          {TUTORIAL_STEPS.map(step => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <ul className="tutorial-legend">
          <li>
            <span className="legend-cell available">1C</span>
            Casilla disponible
          </li>
          <li>
            <span className="legend-cell picked">BD</span>
            Casilla ya usada
          </li>
          <li>
            <span className="legend-cell legend-sequence">55</span>
            Código de la secuencia
          </li>
        </ul>

        <p className="tutorial-data">
          Búfer: {BUFFER_SIZE} espacios · Tiempo: {TIME_LIMIT} segundos
        </p>
        <p className="tutorial-tip">{TUTORIAL_TIP}</p>

        <div className="actions">
          <button type="button" className="btn primary" onClick={onStart}>
            Entendido, jugar
          </button>
          <button type="button" className="btn" onClick={onSkip}>
            Omitir minijuego
          </button>
        </div>
      </div>
    </div>
  )
}

export default BreachTutorial
