function Loader({ label, progress }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader-box">
        <p>{label}</p>
        <div className="bar big">
          <b style={{ width: `${progress}%`, animation: 'none' }} />
        </div>
        <span>{String(progress).padStart(3, '0')}%</span>
      </div>
    </div>
  )
}

export default Loader
