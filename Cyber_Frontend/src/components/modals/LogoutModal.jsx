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
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useGlobalToast } from "../../store/useGlobalStore";

const LogoutModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { onLogout } = useAuthStore();
  const { openSnackbar } = useGlobalToast();

  const handleLogout = () => {
    onLogout();
    navigate("/", { replace: true });
    openSnackbar("Haz cerrado sesión", "warning", "top", "center");
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon color="warning" />
          Cerrar sesión
        </DialogTitle>
        <Divider />
        <DialogContent>¿Estás seguro que deseas cerrar sesión?</DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={handleLogout}>
            Confirmar
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

LogoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default LogoutModal;
