import { useEffect, useState } from 'react'
import { BOOT_LINES } from '../data/texts'

function Boot({ onDone }) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= BOOT_LINES.length) {
      const finish = setTimeout(onDone, 500)
      return () => clearTimeout(finish)
    }

    const next = setTimeout(() => setVisible(visible + 1), 420)
    return () => clearTimeout(next)
  }, [visible, onDone])

  return (
    <div className="boot" onClick={onDone}>
      <pre>
        {BOOT_LINES.slice(0, visible).map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <span className="cursor">█</span>
      </pre>
      <small>clic para saltar</small>
    </div>
  )
}

export default Boot
