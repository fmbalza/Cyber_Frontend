import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import PropTypes from "prop-types";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const DeleteUserModal = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon color="warning" />
          Eliminar usuario
        </DialogTitle>
        <Divider />
        <DialogContent>
          ¿Estás seguro que deseas eliminar a Juan Romero?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
            Eliminar usuario
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DeleteUserModal;
