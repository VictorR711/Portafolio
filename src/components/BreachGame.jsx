import { useEffect, useState } from 'react'
import BreachTutorial from './BreachTutorial'
import {
  BUFFER_SIZE,
  TIME_LIMIT,
  createPuzzle,
  getAvailableCells,
  getProgress,
} from '../utils/breach'
import { playSound } from '../utils/sound'

function BreachGame({ onComplete, onSkip }) {
  const [puzzle, setPuzzle] = useState(createPuzzle)
  const [picks, setPicks] = useState([])
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [status, setStatus] = useState('playing')
  const [showTutorial, setShowTutorial] = useState(false)

  const isRunning = status === 'playing' && !showTutorial

  const buffer = picks.map(index => puzzle.cells[index])
  const progress = getProgress(buffer, puzzle.sequence)
  const available = status === 'playing' ? getAvailableCells(picks) : []

  useEffect(() => {
    if (!isRunning) {
      return undefined
    }

    const timer = setInterval(() => {
      setTimeLeft(current => Math.max(0, current - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  useEffect(() => {
    if (status === 'playing' && timeLeft === 0) {
      setStatus('lost')
    }
  }, [status, timeLeft])

  useEffect(() => {
    if (status === 'won') {
      playSound('success')
    }

    if (status === 'lost') {
      playSound('fail')
    }
  }, [status])

  useEffect(() => {
    if (status !== 'won') {
      return undefined
    }

    const timer = setTimeout(onComplete, 1200)

    return () => clearTimeout(timer)
  }, [status, onComplete])

  const handlePick = index => {
    if (status !== 'playing' || !available.includes(index)) {
      return
    }

    const nextPicks = [...picks, index]
    const nextBuffer = nextPicks.map(position => puzzle.cells[position])
    const solved = getProgress(nextBuffer, puzzle.sequence) === puzzle.sequence.length

    setPicks(nextPicks)

    if (solved) {
      setStatus('won')
      return
    }

    const outOfSpace = nextPicks.length >= BUFFER_SIZE
    const deadEnd = getAvailableCells(nextPicks).length === 0

    if (outOfSpace || deadEnd) {
      setStatus('lost')
    }
  }

  const retry = () => {
    setPuzzle(createPuzzle())
    setPicks([])
    setTimeLeft(TIME_LIMIT)
    setStatus('playing')
  }

  const openTutorial = () => setShowTutorial(true)

  const closeTutorial = () => setShowTutorial(false)

  return (
    <section className="breach-game">
      <div className="breach-top">
        <div>
          <h1>Breach Protocol</h1>
          <p>Alterna fila y columna hasta completar la secuencia.</p>
        </div>
        <div className="breach-buttons">
          <button type="button" className="help-button" onClick={openTutorial}>
            Cómo jugar
          </button>
          <button type="button" className="skip-button" onClick={onSkip}>
            Omitir minijuego
          </button>
        </div>
      </div>

      <div className="breach-body">
        <div className="breach-panel">
          <h2>Matriz de códigos</h2>
          <div className="matrix">
            {puzzle.cells.map((code, index) => {
              const isAvailable = available.includes(index)
              const isPicked = picks.includes(index)
              const classes = ['cell']

              if (isAvailable) {
                classes.push('available')
              }

              if (isPicked) {
                classes.push('picked')
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={classes.join(' ')}
                  disabled={!isAvailable}
                  onClick={() => handlePick(index)}
                >
                  {code}
                </button>
              )
            })}
          </div>
        </div>

        <aside className="breach-side">
          <div className="breach-panel">
            <h2>Tiempo</h2>
            <div className="timer">
              <b style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }} />
            </div>
            <span className="timer-text">{timeLeft}s</span>
          </div>

          <div className="breach-panel">
            <h2>Búfer</h2>
            <div className="buffer-slots">
              {Array.from({ length: BUFFER_SIZE }, (_, slot) => (
                <span key={slot} className={buffer[slot] ? 'filled' : ''}>
                  {buffer[slot] || ''}
                </span>
              ))}
            </div>
          </div>

          <div className="breach-panel">
            <h2>Secuencia requerida</h2>
            <div className="sequence">
              {puzzle.sequence.map((code, position) => (
                <span key={position} className={position < progress ? 'done' : ''}>
                  {code}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <p className="skip-hint">¿No quieres jugar? Pulsa “Omitir minijuego” en cualquier momento.</p>

      {showTutorial && <BreachTutorial onStart={closeTutorial} onSkip={onSkip} />}

      {status !== 'playing' && (
        <div className="breach-result" role="status">
          <div className="breach-result-box">
            {status === 'won' ? (
              <h2 className="success">Acceso concedido</h2>
            ) : (
              <>
                <h2 className="failure">Conexión perdida</h2>
                <div className="actions">
                  <button type="button" className="btn primary" onClick={retry}>
                    Reintentar
                  </button>
                  <button type="button" className="btn" onClick={onSkip}>
                    Omitir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default BreachGame
