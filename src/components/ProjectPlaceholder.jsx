function ProjectPlaceholder({ title }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="placeholder"
      role="img"
      aria-label={`Sin captura de ${title}`}
    >
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".15" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill="url(#grid)" />
      <path
        d="M0 150 L90 150 L110 130 L210 130 L230 150 L320 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text
        x="160"
        y="95"
        textAnchor="middle"
        fontSize="40"
        fontWeight="700"
        fill="currentColor"
      >
        {title.slice(0, 3).toUpperCase()}
      </text>
      <text
        x="160"
        y="118"
        textAnchor="middle"
        fontSize="11"
        fill="currentColor"
        opacity=".6"
      >
        [ captura pendiente ]
      </text>
    </svg>
  )
}

export default ProjectPlaceholder
