import { useEffect, useState } from 'react'
import { isMuted, playSound, setMuted, unlockAudio } from '../utils/sound'

const INTERACTIVE = 'button, a'

function findTarget(event) {
  const target = event.target.closest(INTERACTIVE)

  if (!target || target.disabled) {
    return null
  }

  return target
}

function SoundControl() {
  const [muted, setMutedState] = useState(isMuted)

  useEffect(() => {
    const handleOver = event => {
      const target = findTarget(event)

      if (!target || event.pointerType !== 'mouse') {
        return
      }

      if (target.contains(event.relatedTarget)) {
        return
      }

      playSound('hover')
    }

    const handleDown = event => {
      unlockAudio()

      const target = findTarget(event)

      if (!target || target.classList.contains('sound-toggle')) {
        return
      }

      playSound(target.classList.contains('cell') ? 'pick' : 'click')
    }

    const handleKey = () => unlockAudio()

    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerdown', handleDown)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerdown', handleDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const toggle = () => {
    const next = !muted

    setMuted(next)
    setMutedState(next)

    if (!next) {
      playSound('click')
    }
  }

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
    >
      SONIDO: <b>{muted ? 'OFF' : 'ON'}</b>
    </button>
  )
}

export default SoundControl
