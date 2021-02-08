import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
const ModalCancelarZapatoVenta = ({
  idVenta,
  idShoe,
  anularZapatoVenta,
  color,
  size,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <DeleteSweepIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Estas seguro que desea anular el zapato de la venta
          {/*{idShoe}*/}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta opcion no se puede revertir
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={async () => {
              try {
                await anularZapatoVenta({
                  variables: {
                    idVenta,
                    idShoe,
                    color,
                    size,
                  },
                });
              } catch (error) {
                console.log(error);
              }

              handleClose();
            }}
            color="secondary"
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalCancelarZapatoVenta;
