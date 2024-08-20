import React, { useState, useEffect } from 'react';
import './pulsera.css';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import { Button, Stack } from '@mui/joy';

function createData(cedula, user) {
  return { cedula, user };
}

const rows = [
  createData(12341234, 'Jose'),
  createData(12341234, 'Pedro'),
  createData(12341234, 'Luis'),
  createData(12341234, 'Juan'),
  createData(12341234, 'Javier'),
];

function Pulsera() {

  const [usuarioAsignado, setUsuarioAsignado] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [remainingTime, setRemainingTime] = useState(30 * 60); // Initial time in seconds (30 minutes)
  const [isRunning, setIsRunning] = useState(false);

  const openModal = () => {
    setOpen(true)
  };

  const asignarUsuario = () => {
    setUsuarioAsignado(true);
    setOpen(false);
    setRemainingTime(30 * 60); 
    setIsRunning(true);
  };

  const desasignarUsuario =() => {
    setUsuarioAsignado(false);
    setIsRunning(false);
  }

  const eliminarpulsera = () => {
    const pulseraElement = document.querySelector('.pulsera');
    pulseraElement.parentNode.removeChild(pulseraElement);
    console.log('Círculo eliminado');
  };

  const increaseTime = () => {
    setRemainingTime(prevTime => prevTime + 30 * 60); // Increase by 1 minute, capped at 30 minutes
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning && remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1); // Decrement remaining time by 1 second
      } else if (isRunning && remainingTime === 0) {
        setIsRunning(false); // Stop the timer if it reaches 0
        // Handle timer completion (e.g., alert or notification)
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, [isRunning, remainingTime]);


  const formatTime = (seconds) => {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const secondss = seconds % 60;
  
    return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secondss.toString().padStart(2, '0')}`;
  };


  return (
    <div className="pulsera">
      {usuarioAsignado ? (
        <div>
          <Typography textAlign={"center"} sx={{ mb: 1 }}>Usuario Asignado</Typography>
          {isRunning && ( // Only show timer if running)
           
           <Typography textAlign={"center"} sx={{ mb: 1 }}>{formatTime(remainingTime)}</Typography>
          )}
        
          <Button className='terminar' size='sm' onClick={desasignarUsuario} sx={{ m: 1 }}>Terminar</Button>
          <Button className='aumentar' size='sm' onClick={increaseTime}>Aumentar</Button>

        </div>

        
      ) : (
        <>
          <button className='asignar' onClick={openModal}>Asignar Usuario</button>
          <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Seleccione Usuario:
          </Typography>
          {/* <Typography id="modal-desc" textColor="text.tertiary">
            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
            optional <code>aria-describedby</code> attribute.
          </Typography> */}
          <Table hoverRow aria-label="basic table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Usuarios</th>
                  
                 
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.cedula}>
                    <button className='row' onClick={asignarUsuario}>

                      <td>C.I: {row.cedula}</td>
                      <td >{row.user}</td>
                    </button>
                    
                 
                  </tr>
                ))}
              </tbody>
          </Table>

        </Sheet>
      </Modal>
          <button className='terminar'  onClick={eliminarpulsera}>X</button>
        </>
      )}
    </div>
  );
}

export default Pulsera;