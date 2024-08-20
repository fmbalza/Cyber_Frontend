import { Box, DialogTitle, IconButton, Typography } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import EditUserModal from "../modals/EditUserModal";
import DeleteUserModal from "../modals/DeleteUserModal";

const Sidebar = () => {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);

  const handleOpenEditUserModal = () => {
    setOpenEditUserModal(true);
  };

  const handleOpenDeleteUserModal = () => {
    setOpenDeleteUserModal(true);
  };

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
        <DialogTitle>Usuarios</DialogTitle>
        <Box display={"flex"} justifyContent={"space-between"} mt={1}>
          <Typography level="h4">Juan Romero</Typography>
          <span>
            <IconButton
              title="Editar usuario"
              color="neutral"
              onClick={handleOpenEditUserModal}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              title="Eliminar usuario"
              color="danger"
              onClick={handleOpenDeleteUserModal}
            >
              <DeleteForeverIcon />
            </IconButton>
          </span>
        </Box>
      </Box>

      <EditUserModal open={openEditUserModal} setOpen={setOpenEditUserModal} />

      <DeleteUserModal
        open={openDeleteUserModal}
        setOpen={setOpenDeleteUserModal}
      />
    </>
  );
};

export default Sidebar;
