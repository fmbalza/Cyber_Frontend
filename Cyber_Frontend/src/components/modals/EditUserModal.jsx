import PropTypes from "prop-types";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";

const EditUserModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <DialogTitle>Editar usuario</DialogTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
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
            <Button type="submit">Editar</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

EditUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default EditUserModal;
