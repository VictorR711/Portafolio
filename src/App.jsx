import { useCallback, useState } from 'react'
import BreachGame from './components/BreachGame'
import Boot from './components/Boot'
import Portfolio from './components/Portfolio'

function App() {
  const [stage, setStage] = useState('game')

  const goToBoot = useCallback(() => setStage('boot'), [])
  const goToSite = useCallback(() => setStage('site'), [])

  if (stage === 'game') {
    return <BreachGame onComplete={goToBoot} onSkip={goToBoot} />
  }

  if (stage === 'boot') {
    return <Boot onDone={goToSite} />
  }

  return <Portfolio />
}

export default App
