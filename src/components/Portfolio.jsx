import { useEffect, useState } from 'react'
import Hud from './Hud'
import Header from './Header'
import Footer from './Footer'
import Loader from './Loader'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Profile from '../pages/Profile'
import Skills from '../pages/Skills'
import Contact from '../pages/Contact'
import { LOADER_MESSAGES } from '../data/texts'

const PAGES = {
  inicio: Home,
  proyectos: Projects,
  perfil: Profile,
  habilidades: Skills,
  contacto: Contact,
}

const randomMessage = () =>
  LOADER_MESSAGES[Math.floor(Math.random() * LOADER_MESSAGES.length)]

function Portfolio() {
  const [view, setView] = useState('inicio')
  const [loading, setLoading] = useState(null)

  const navigate = target => {
    if (target === view || loading) {
      return
    }

    setLoading({ target, label: randomMessage(), progress: 0 })
  }

  useEffect(() => {
    if (!loading) {
      return undefined
    }

    if (loading.progress >= 100) {
      setView(loading.target)
      setLoading(null)
      window.scrollTo(0, 0)
      return undefined
    }

    const timer = setTimeout(() => {
      setLoading(current => ({
        ...current,
        progress: Math.min(100, current.progress + 8 + Math.floor(Math.random() * 18)),
      }))
    }, 70)

    return () => clearTimeout(timer)
  }, [loading])

  const Page = PAGES[view]

  return (
    <div className="app">
      <div className="scan" aria-hidden="true" />
      {loading && <Loader label={loading.label} progress={loading.progress} />}
      <Hud />
      <Header view={view} onNavigate={navigate} />
      <main className="enter" key={view}>
        <Page onNavigate={navigate} />
      </main>
      <Footer />
    </div>
  )
}

export default Portfolio
