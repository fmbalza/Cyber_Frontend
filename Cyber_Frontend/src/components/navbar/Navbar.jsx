import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddIcon from "@mui/icons-material/Add";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useState } from "react";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Stack
        direction="row"
        mb={3}
        sx={{
          backgroundColor: "#025099",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          minHeight: 64,
          justifyContent: "space-between",
          padding: "0 16px", // Espaciado horizontal
        }}
      >
        <div className="fontColor">Logo o Título</div>{" "}
        <Stack direction="row" spacing={1} sx={{ marginLeft: "auto", p: 2 }}>
          <Button
            className="fontColor"
            variant="solid"
            color="primary"
            endDecorator={<PersonAddAlt1Icon />}
            onClick={() => setOpenModal(true)}
          >
            Crear usuario
          </Button>
          <Button
            className="fontColor"
            variant="solid"
            color="primary"
            endDecorator={<AddIcon />}
          >
            Crear pulsera
          </Button>
          <Button
            className="fontColor"
            variant="solid"
            color="primary"
            endDecorator={<FormatListNumberedIcon />}
          >
            Ver listado de asignaciones
          </Button>
        </Stack>
      </Stack>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <DialogTitle>Crear nuevo usuario</DialogTitle>
          <DialogContent>
            Llena la información correspondiente del nuevo usuario.
          </DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenModal(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Número de cédula</FormLabel>
                <Input type="text" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input type="text" required />
              </FormControl>
              <Button type="submit">Crear</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Navbar;
