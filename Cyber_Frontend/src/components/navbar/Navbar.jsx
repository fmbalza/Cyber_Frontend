import {
  Box,
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
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useState } from "react";
import AssignmentsListModal from "../modals/AssignmentsListModal";
import { useForm } from "react-hook-form";
import { createClient } from "../../api/clients";
import { useGlobalToast } from "../../store/useGlobalStore";
import LogoutModal from "../modals/LogoutModal";
import AttractionsIcon from "@mui/icons-material/Attractions";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [cardID, setCardID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAssignmentsListModal, setOpenAssignmentsListModal] =
    useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const { handleSubmit } = useForm();
  const { openSnackbar } = useGlobalToast();

  const handleOpenAssignmentsListModal = () => {
    setOpenAssignmentsListModal(true);
  };

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true);
  };

  const submitHandler = async (data) => {
    try {
      setIsLoading(true);
      data.username = username;
      data.id_card = parseInt(cardID);
      await createClient(data);
      setIsLoading(false);
      setOpenModal(false);
      openSnackbar(
        "Cliente creado correctamente",
        "success",
        "bottom",
        "right"
      );
    } catch (error) {
      setIsLoading(false);
      setOpenModal(true);
      openSnackbar(error.message, "error", "top", "center");
    }
  };

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
        <div className="fontColor">
          <Box display={"flex"} justifyContent={"start"} mt={2}>
            <AttractionsIcon fontSize="large" sx={{ mr: 1 }} />{" "}
            <span className="logo">Adventures Park</span>
          </Box>
        </div>{" "}
        <Stack direction="row" spacing={1} sx={{ marginLeft: "auto", p: 2 }}>
          <Button
            className="fontColor"
            variant="solid"
            color="primary"
            endDecorator={<PersonAddAlt1Icon />}
            onClick={() => setOpenModal(true)}
          >
            Nuevo cliente
          </Button>

          <Button
            className="fontColor"
            variant="solid"
            color="primary"
            endDecorator={<FormatListNumberedIcon />}
            onClick={handleOpenAssignmentsListModal}
          >
            Ver listado de asignaciones
          </Button>
          <Button
            className="fontColor"
            variant="solid"
            color="danger"
            endDecorator={<LogoutIcon />}
            onClick={handleOpenLogoutModal}
          >
            Cerrar sesión
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
          <DialogTitle>Nuevo cliente</DialogTitle>
          <DialogContent>
            Llena la información correspondiente del nuevo cliente.
          </DialogContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Número de cédula</FormLabel>
                <Input
                  autoFocus
                  required
                  type="text"
                  value={cardID}
                  onChange={(e) => setCardID(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nombre de usuario</FormLabel>
                <Input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <Button type="submit" loading={isLoading}>
                Crear
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <AssignmentsListModal
        open={openAssignmentsListModal}
        setOpen={setOpenAssignmentsListModal}
      />

      <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal} />
    </>
  );
};

export default Navbar;
