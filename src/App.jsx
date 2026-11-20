import { useCallback, useState } from 'react'
import BreachGame from './components/BreachGame'
import Boot from './components/Boot'
import Portfolio from './components/Portfolio'
import SoundControl from './components/SoundControl'

function App() {
  const [stage, setStage] = useState('game')

  const goToBoot = useCallback(() => setStage('boot'), [])
  const goToSite = useCallback(() => setStage('site'), [])

  let screen = <Portfolio />

  if (stage === 'game') {
    screen = <BreachGame onComplete={goToBoot} onSkip={goToBoot} />
  }

  if (stage === 'boot') {
    screen = <Boot onDone={goToSite} />
  }

  return (
    <>
      {screen}
      <SoundControl />
    </>
  )
}

export default App
