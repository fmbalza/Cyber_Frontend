
import './pulsera.css'

function CirculoCreador({ agregarCirculo }) {
  return (
   
   
      <button className="circuloC" onClick={agregarCirculo}>Crear otro círculo</button>
   
  );
}

export default CirculoCreador;