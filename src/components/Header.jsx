import { NAV_ITEMS } from '../data/texts'

function Header({ view, onNavigate }) {
  return (
    <header>
      <button className="logo" onClick={() => onNavigate('inicio')}>
        CYBER<span>//</span>DECK
      </button>
      <nav>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={item.id === view ? 'on' : ''}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
