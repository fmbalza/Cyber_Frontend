import { useState } from 'react';
import Circulo from '../pulsera/pulsera'; // Importamos el componente Circulo
import CirculoCreador from '../pulsera/pulseraCreadora';


function Cuadro() {
  const [circulos, setCirculos] = useState([{ id: 1 }]); // Estado para manejar los círculos

  const agregarCirculo = () => {
    setCirculos([...circulos, { id: circulos.length + 1 }]);
  };

  return (
    <div className="cuadro">
      {circulos.map((circulo) => (
        <Circulo key={circulo.id}  />
        
      ))}
      <CirculoCreador agregarCirculo={agregarCirculo}/>
    </div>
  );
}

export default Cuadro;