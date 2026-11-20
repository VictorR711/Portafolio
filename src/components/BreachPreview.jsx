import { useEffect, useMemo, useState } from 'react'
import { HEX_CODES } from '../data/texts'

const PREVIEW_PATH = [2, 7, 12, 13, 18]
const PREVIEW_SIZE = 25
const STEP_DELAY = 700

const randomCode = () => HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)]

function BreachPreview() {
  const cells = useMemo(() => Array.from({ length: PREVIEW_SIZE }, randomCode), [])
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(current => (current + 1) % (PREVIEW_PATH.length + 3))
    }, STEP_DELAY)

    return () => clearInterval(timer)
  }, [])

  const hits = PREVIEW_PATH.slice(0, step)
  const bufferText = hits.map(index => cells[index]).join(' ') || '— — —'

  return (
    <aside className="breach" aria-hidden="true">
      <div className="breach-head">BREACH PROTOCOL</div>
      <div className="grid5">
        {cells.map((code, index) => (
          <span key={index} className={hits.includes(index) ? 'hit' : ''}>
            {code}
          </span>
        ))}
      </div>
      <div className="buffer">BUFFER: {bufferText}</div>
    </aside>
  )
}

export default BreachPreview
