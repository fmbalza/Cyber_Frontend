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
  TableRow,
} from "@mui/material";

const headCells = [
  {
    label: "Usuario",
  },
  {
    label: "# de pulsera",
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
