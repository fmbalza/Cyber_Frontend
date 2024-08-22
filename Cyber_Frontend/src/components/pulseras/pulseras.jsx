import { useState } from 'react';
import Pulsera from '../pulsera/pulsera'; // Importamos el componente Circulo
import PulseraCreadora from '../pulsera/pulseraCreadora';
import { useGetPulseras, useCreatePulsera } from '../../hooks/pulseras';
import { CircularProgress, Box } from '@mui/joy';

function Cuadro() {
  const getPulseras = useGetPulseras()
  const createPulseras = useCreatePulsera()
  const [pulseras, setPulseras] = useState([{ id: 1 }]); 
  if(getPulseras.isPending){
    return(
      <Box>
        <CircularProgress/>
      </Box>
    )
  }

  const pulseraData = getPulseras.data

  const agregarCirculo = () => {
    createPulseras.mutate()
  };

  return (
    <div className="cuadro">
      {pulseraData.map((pulsera) => (
        <Pulsera key={pulsera.id}  />
        
      ))}
      <PulseraCreadora agregarCirculo={agregarCirculo}/>
    </div>
  );
}

export default Cuadro;