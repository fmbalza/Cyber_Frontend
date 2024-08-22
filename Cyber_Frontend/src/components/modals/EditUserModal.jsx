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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateClientMutation } from "../../hooks/useClients";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalToast } from "../../store/useGlobalStore";

const EditUserModal = ({ open, setOpen, userID, username, cardID }) => {
  const [selectedUserName, setSelectedUserName] = useState(username);
  const [selectedCardID, setSelectedCardID] = useState(cardID);

  useEffect(() => {
    setSelectedUserName(username);
    setSelectedCardID(cardID);
  }, [username, cardID]);

  const { handleSubmit } = useForm();
  const editClient = useUpdateClientMutation();
  const queryClient = useQueryClient();
  const { openSnackbar } = useGlobalToast();

  const submitHandler = async (data) => {
    data.username = selectedUserName;
    data.id_card = parseInt(selectedCardID);
    editClient.mutate(
      { userID, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["clients"],
          });
          setOpen(false);
          openSnackbar(
            "Cliente editado correctamente",
            "success",
            "bottom",
            "right"
          );
        },
        onError: (error) => {
          setOpen(true);
          setSelectedUserName(username);
          setSelectedCardID(cardID);
          openSnackbar(error.message, "error", "top", "center");
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <DialogTitle>Editar usuario</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Número de cédula</FormLabel>
              <Input
                type="text"
                autoFocus
                required
                value={selectedCardID}
                onChange={(e) => setSelectedCardID(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input
                type="text"
                required
                value={selectedUserName}
                onChange={(e) => setSelectedUserName(e.target.value)}
              />
            </FormControl>
            <Button type="submit" loading={editClient.isPending}>
              Editar
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

EditUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  cardID: PropTypes.number.isRequired,
};

export default EditUserModal;
