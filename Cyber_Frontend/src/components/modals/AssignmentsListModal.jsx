import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
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
import { useState } from "react";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                {/* {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.description}</TableCell>
              </TableRow>
            ))} */}
                <TableRow key={1}>
                  <TableCell align="center">Juan Romero</TableCell>
                  <TableCell align="center">1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            sx={{ mt: 2 }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={28} //data?.items
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
