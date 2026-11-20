import { ME } from '../data/profile'

function Contact() {
  const terminal = [
    `> ping ${ME.handle}`,
    '  respuesta: conexión estable',
    '',
    `> correo   ${ME.email}`,
    `> github   github.com/${ME.handle}`,
  ].join('\n')

  return (
    <section>
      <h2>Contacto</h2>
      <pre className="term">{terminal}</pre>
      <div className="actions">
        <a className="btn primary" href={`mailto:${ME.email}`}>
          Enviar correo
        </a>
        <a className="btn" href={ME.github} target="_blank" rel="noreferrer">
          Ver GitHub
        </a>
      </div>
    </section>
  )
}

export default Contact
