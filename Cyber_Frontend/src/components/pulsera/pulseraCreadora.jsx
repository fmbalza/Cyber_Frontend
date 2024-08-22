import { Button } from '@mui/joy';
import './pulsera.css'

function PulseraCreadora({ agregarCirculo }) {
  return (
   
   
      <button className="pulseraC" onClick={agregarCirculo}>Crear Pulsera</button>
   
  );
}

export default PulseraCreadora;