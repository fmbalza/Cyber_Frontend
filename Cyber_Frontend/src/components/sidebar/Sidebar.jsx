import { Box, DialogTitle, Divider, IconButton, Typography } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useMemo, useState } from "react";
import EditUserModal from "../modals/EditUserModal";
import DeleteUserModal from "../modals/DeleteUserModal";
import { useGetClientes } from "../../hooks/useClients";
import { useGlobalToast } from "../../store/useGlobalStore";
import { Skeleton } from "@mui/material";

const Sidebar = () => {
  const [selectedUserID, setSelectedUserID] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedCardID, setSelectedCardID] = useState(null);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);

  const { data, status, error } = useGetClientes();

  const { openSnackbar } = useGlobalToast();

  const rows = useMemo(() => {
    return data || [];
  }, [data]);

  const handleOpenEditUserModal = (userID, username, cardID) => {
    setSelectedUserID(userID);
    setSelectedUsername(username);
    setSelectedCardID(cardID);
    setOpenEditUserModal(true);
  };

  const handleOpenDeleteUserModal = (userID, username) => {
    setSelectedUserID(userID);
    setSelectedUsername(username);
    setOpenDeleteUserModal(true);
  };

  if (status === "pending") {
    return (
      <Box
        width={"95%"}
        height={"auto"}
        sx={{
          backgroundColor: "#f4f7fb",
          mt: 2,
          p: 1,
          borderRadius: 10,
        }}
      >
        <Skeleton variant="text" width={"20%"} sx={{ fontSize: "1rem" }} />

        <Box display={"flex"} justifyContent={"space-between"} mt={1} mb={1}>
          <Skeleton variant="text" width={"30%"} sx={{ fontSize: "1rem" }} />
          <Box display={"flex"} justifyContent={"end"}>
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mb={1}>
          <Skeleton variant="text" width={"30%"} sx={{ fontSize: "1rem" }} />
          <Box display={"flex"} justifyContent={"end"}>
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mb={1}>
          <Skeleton variant="text" width={"30%"} sx={{ fontSize: "1rem" }} />
          <Box display={"flex"} justifyContent={"end"}>
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Skeleton variant="text" width={"30%"} sx={{ fontSize: "1rem" }} />
          <Box display={"flex"} justifyContent={"end"}>
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (status === "error") {
    openSnackbar(error.message, "error", "top", "center");
  }

  return (
    <>
      <Box
        width={"95%"}
        height={"auto"}
        sx={{
          backgroundColor: "#f4f7fb",
          mt: 2,
          p: 1,
          borderRadius: 10,
        }}
      >
        <DialogTitle sx={{ mb: 1 }}>Clientes</DialogTitle>
        <Divider />
        {rows?.map((client, id) => (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mt={1}
            key={id}
          >
            <Typography level="h4">{client.username}</Typography>
            <span>
              <IconButton
                title="Editar usuario"
                color="neutral"
                onClick={() =>
                  handleOpenEditUserModal(
                    client.user,
                    client.username,
                    client.id_card
                  )
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                title="Eliminar usuario"
                color="danger"
                onClick={() =>
                  handleOpenDeleteUserModal(client.user, client.username)
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </span>
          </Box>
        ))}
        {rows?.length === 0 && (
          <Typography variant="h6" align="center">
            Aún no hay ningún cliente guardado...
          </Typography>
        )}
      </Box>

      <EditUserModal
        open={openEditUserModal}
        setOpen={setOpenEditUserModal}
        userID={selectedUserID}
        username={selectedUsername}
        cardID={selectedCardID}
      />

      <DeleteUserModal
        open={openDeleteUserModal}
        setOpen={setOpenDeleteUserModal}
        userID={selectedUserID}
        username={selectedUsername}
      />
    </>
  );
};

export default Sidebar;
