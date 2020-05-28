
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Delete from '@material-ui/icons/Delete';
import { useMutation, gql } from '@apollo/client';

const DELETE_PROMOTORA = gql`
  mutation DeletePromotora($id: ID!) {
    deletePromotora(id: $id)
  }
`;
const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
    }
  }
`;
function AlertDialog({ id }) {
  const [open, setOpen] = React.useState(false);
  const [deletePromotora] = useMutation(DELETE_PROMOTORA, {
    update(cache) {
      const { promotoras } = cache.readQuery({ query: GET_PROMOTORAS });
      cache.writeQuery({
        query: GET_PROMOTORAS,
        data: {
          promotoras: promotoras.filter((promotora) => promotora.id !== id),
        },
      });
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        <Delete />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Estas seguro que desea eliminar a la promotora?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Esta opcion no se puede revertir {id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              deletePromotora({
                variables: {
                  id,
                },
              });
              handleClose();
            }}
            color='secondary'
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;
