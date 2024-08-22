import { useState } from 'react';
import Pulsera from '../pulsera/pulsera'; // Importamos el componente Circulo
import PulseraCreadora from '../pulsera/pulseraCreadora';
import { useGetPulseras, useCreatePulsera } from '../../hooks/pulseras';
import { CircularProgress, Box, Stack } from '@mui/joy';
import { useGlobalToast } from '../../store/useGlobalStore'; 
import { Skeleton } from '@mui/material';

function Cuadro() {
  const getPulseras = useGetPulseras()
  const createPulseras = useCreatePulsera()
  const [pulseras, setPulseras] = useState([{ id: 1 }]); 
  const [isCreatingPulsera, setIsCreatingPulsera] = useState(false);
  const { openSnackbar } = useGlobalToast();

  if(getPulseras.isPending){
    return(
      <Box sx={{width:"100vh"}}>
        <Box>
        <Skeleton variant='circular'>
          <Pulsera/>
        </Skeleton>
        <Skeleton variant='circular'>
          <Pulsera/>
        </Skeleton>
      </Box>
        <Box>
        <Skeleton variant='circular'>
          <Pulsera/>
        </Skeleton>
        <Skeleton variant='circular'>
          <Pulsera/>
        </Skeleton>
      </Box>
      </Box>

    )
  }

  const pulseraData = getPulseras.data
  console.log("dataPulsera",pulseraData)

  const agregarCirculo = async () => {
  setIsCreatingPulsera(true);
  try {
    await createPulseras.mutateAsync();
    setIsCreatingPulsera(false);
    console.log("Pulsera Creada exitosamente");
    openSnackbar(
      "Pulsera Creada exitosamente",
      "success",
      "bottom",
      "right"
    );
  } catch (error) {
    openSnackbar(`${error.message}`, "error", "top", "center");
    console.error("Error al crear la pulsera:", error);
    setIsCreatingPulsera(false);
  }
};

  return (
    <div className="cuadro">
      {pulseraData.map((pulsera) => (
        <Pulsera key={pulsera.id} bracelet={pulsera.bracelet} />
        
      ))}
      <PulseraCreadora agregarCirculo={agregarCirculo}/>
    </div>
  );
}

export default Cuadro;