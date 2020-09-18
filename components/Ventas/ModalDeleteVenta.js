import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Delete from '@material-ui/icons/Delete';
import { gql, useMutation } from '@apollo/client';

const CANCELAR_VENTA = gql`
  mutation cancelarVenta($id: ID!) {
    cancelarVenta(id: $id)
  }
`;
const SALES_BY_DATE = gql`
  query salesByDate($date: String!) {
    salesByDate(date: $date) {
      id
      total
      fechaDeCompra
      productos {
        codigo
        color
        precioPublico
        image
        sizeSale
        quantity
      }
      cliente {
        nitoci
        razonSocial
      }
      idPromotora {
        nombres
        apellidos
      }
    }
  }
`;
// const GET_VENTAS = gql`
//     query ventas {
//         ventas {
//             id
//             total
//             fechaDeCompra
//             productos {
//                 codigo
//                 color
//                 precioPublico
//                 image
//                 sizeSale
//                 quantity
//             }
//             cliente {
//                 nitoci
//                 razonSocial
//             }
//             idPromotora {
//                 nombres
//                 apellidos
//             }
//         }
//     }
// `

function ModalDeleteVenta({ id }) {
  const [open, setOpen] = React.useState(false);
  const [cancelarVenta] = useMutation(CANCELAR_VENTA, {
    update(cache) {
      const { salesByDate } = cache.readQuery({ query: SALES_BY_DATE });
      cache.writeQuery({
        query: SALES_BY_DATE,
        data: {
          salesByDate: salesByDate.filter((venta) => venta.id !== id),
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
          {'Estas seguro que desea cancelar la venta?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Esta opcion no se puede revertir
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              cancelarVenta({
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

export default ModalDeleteVenta;
