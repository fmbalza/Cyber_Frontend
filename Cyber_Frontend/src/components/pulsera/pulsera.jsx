import React, { useState } from 'react';
import './pulsera.css';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

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

function Circulo() {

  const [usuarioAsignado, setUsuarioAsignado] = useState(false);
  const [open, setOpen] = React.useState(false);


  const openModal = () => {
    setOpen(true)
  };

  const asignarUsuario = () => {
    setUsuarioAsignado(true)
    setOpen(false)
  };

  const desasignarUsuario =() => {
    setUsuarioAsignado(false)
  }

  const eliminarCirculo = () => {
    const circuloElement = document.querySelector('.circulo');
    circuloElement.parentNode.removeChild(circuloElement);
    console.log('Círculo eliminado');
  };

  return (
    <div className="circulo">
      {usuarioAsignado ? (
        <div>
          <p>Usuario Asignado</p>
          <p>30:00</p>

          <button className='terminar' onClick={desasignarUsuario} >Terminar</button>
          <button className='aumentar'>Aumentar</button>
        </div>
      ) : (
        <>
          <button onClick={openModal}>Asignar Usuario</button>
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
          <button  onClick={eliminarCirculo}>X</button>
        </>
      )}
    </div>
  );
}

export default Circulo;