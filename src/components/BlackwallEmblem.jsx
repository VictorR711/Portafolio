function BlackwallEmblem() {
  return (
    <aside className="emblem" aria-hidden="true">
      <svg viewBox="0 0 320 320">
        <circle className="ring ring-outer" cx="160" cy="160" r="140" />
        <circle className="ring ring-inner" cx="160" cy="160" r="105" />
        <polygon className="eye-frame" points="160,70 245,215 75,215" />
        <circle className="eye-core" cx="160" cy="170" r="16" />
        <rect className="scan-line" x="40" y="60" width="240" height="3" />
        <text x="160" y="270" textAnchor="middle" className="emblem-text">
          BLACKWALL.SYS
        </text>
        <text x="160" y="288" textAnchor="middle" className="emblem-sub">
          perímetro comprometido
        </text>
      </svg>
    </aside>
  )
}

export default BlackwallEmblem
