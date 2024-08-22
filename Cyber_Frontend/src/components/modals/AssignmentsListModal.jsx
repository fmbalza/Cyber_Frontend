import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  //Stack,
  Typography,
} from "@mui/joy";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  //Skeleton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useAllAsignments } from "../../hooks/useClients";
import { useGlobalToast } from "../../store/useGlobalStore";

function convertirFecha(fechaString) {
  // Crear un objeto Date a partir del string
  const fecha = new Date(fechaString);

  // Obtener el día, mes y año
  const dia = String(fecha.getDate()).padStart(2, "0"); // Asegura que el día tenga dos dígitos
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const año = fecha.getFullYear();

  // Retornar la fecha en formato dd/mm/yyyy
  return `${dia}/${mes}/${año}`;
}

const headCells = [
  {
    label: "Nombre de usuario",
  },
  {
    label: "# de pulsera",
  },
  {
    label: "Tiempo",
  },
  {
    label: "Fecha",
  },
];

const AssignmentsListTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.label} align="center" padding="normal">
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const AssignmentsListModal = ({ open, setOpen }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, status, error } = useAllAsignments(rowsPerPage, page + 1);
  const { openSnackbar } = useGlobalToast();

  const rows = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* if (status === "pending") {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={"100%"} height={500} />
      </Stack>
    );
  } */

  if (status === "error") {
    openSnackbar(error.message, "error", "top", "center");
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <FormatListNumberedIcon color="action" />
          Listado de asignaciones
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TableContainer>
            <Table /* sx={{ minWidth: 650 }} */ size={"medium"}>
              <AssignmentsListTableHead />
              <TableBody>
                {rows?.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.bracelet}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">
                      {convertirFecha(row.date)}
                    </TableCell>
                  </TableRow>
                ))}
                {rows?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6" align="center">
                        No hay ningún brazalete asignado aún...
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            sx={{ mt: 2 }}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data?.items}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Asignaciones por página:"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="plain" color="danger" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

/* MATERIAL UI STYLED COMPONENT */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

AssignmentsListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AssignmentsListModal;
