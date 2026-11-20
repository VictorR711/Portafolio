import Clock from './Clock'
import { ME } from '../data/profile'

function Hud() {
  return (
    <div className="hud">
      <span>ICE: <b>EVADIDO</b></span>
      <span>RAM: <b>32/32</b></span>
      <span>MATRÍCULA: <b>{ME.matricula}</b></span>
      <span>NETWATCH: <b className="red">SIN RASTREO</b></span>
      <span className="right"><Clock /></span>
    </div>
  )
}

export default Hud
