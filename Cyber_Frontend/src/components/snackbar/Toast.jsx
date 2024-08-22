import { Alert, Snackbar } from "@mui/material";
import { useGlobalToast } from "../../store/useGlobalStore";

const Toast = () => {
  const { snackbar, closeSnackbar } = useGlobalToast();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      anchorOrigin={{
        vertical: `${snackbar.verticalPosition}`,
        horizontal: `${snackbar.horizontalPosition}`,
      }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {`${snackbar.message}`}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
