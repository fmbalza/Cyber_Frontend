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
import { useDeleteClientMutation } from "../../hooks/useClients";

const DeleteUserModal = ({ open, setOpen, userID, username }) => {
  const deleteClient = useDeleteClientMutation(userID);

  const handleDeleteClient = () => {
    deleteClient.mutate();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon color="warning" />
          Eliminar cliente
        </DialogTitle>
        <Divider />
        <DialogContent>
          ¿Estás seguro que deseas eliminar a {username}?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={handleDeleteClient}>
            Eliminar
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
  userID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default DeleteUserModal;
