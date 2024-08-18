import { useState } from 'react';
import Pulsera from '../pulsera/pulsera'; // Importamos el componente Circulo
import PulseraCreadora from '../pulsera/pulseraCreadora';


function Cuadro() {
  const [pulseras, setPulseras] = useState([{ id: 1 }]); // Estado para manejar los círculos

  const agregarCirculo = () => {
    setPulseras([...pulseras, { id: pulseras.length + 1 }]);
  };

  return (
    <div className="cuadro">
      {pulseras.map((pulsera) => (
        <Pulsera key={pulsera.id}  />
        
      ))}
      <PulseraCreadora agregarCirculo={agregarCirculo}/>
    </div>
  );
}

export default Cuadro;