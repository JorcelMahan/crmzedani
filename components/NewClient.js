import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';

const GET_CLIENTES = gql`
  query getClientes {
    getClientes {
      id
      razonSocial
      nitoci
    }
  }
`;
const NEW_CLIENTE = gql`
  mutation newCliente($input: ClienteInput) {
    newCliente(input: $input)
  }
`;
function NewClient() {
  const [newCliente] = useMutation(NEW_CLIENTE, {
    update(cache, { data: { newCliente } }) {
      const { getClientes } = cache.readQuery({ query: GET_CLIENTES });
      cache.writeQuery({
        query: GET_CLIENTES,
        data: {
          getClientes: [...getClientes, newCliente],
        },
      });
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nombres: '',
      apellidos: '',
      nitoci: '',
      celular: '',
      razonSocial: '',
      observacion: '',
      email: '',
    },
    onSubmit: async (values) => {
      const {
        nombres,
        apellidos,
        nitoci,
        celular,
        razonSocial,
        observacion,
        email,
      } = values;
      try {
        await newCliente({
          variables: {
            input: {
              nombres,
              apellidos,
              nitoci,
              celular: celular !== '' ? Number(celular) : 0,
              razonSocial,
              observacion,
              email,
            },
          },
        });
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Button color='primary' onClick={handleClickOpen}>
        Nuevo Cliente
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Guardar Cliente</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='nombres'
              label='Nombres'
              type='text'
              fullWidth
              value={formik.values.nombres}
              onChange={formik.handleChange}
            />
            <TextField
              margin='dense'
              id='apellidos'
              label='Apellidos'
              type='text'
              fullWidth
              value={formik.values.apellidos}
              onChange={formik.handleChange}
            />
            <TextField
              margin='dense'
              id='email'
              label='Email'
              type='email'
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              margin='dense'
              id='celular'
              label='Celular'
              type='tel'
              fullWidth
              value={formik.values.celular}
              onChange={formik.handleChange}
            />
            <TextField
              margin='dense'
              id='nitoci'
              label='Nit o CI'
              type='text'
              fullWidth
              value={formik.values.nitoci}
              onChange={formik.handleChange}
            />
            <TextField
              margin='dense'
              id='razonSocial'
              label='Razon Social'
              type='text'
              fullWidth
              value={formik.values.razonSocial}
              onChange={formik.handleChange}
            />
            <TextField
              margin='dense'
              id='observacion'
              label='Observacion'
              type='text'
              fullWidth
              value={formik.values.observacion}
              onChange={formik.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button color='primary' type='submit'>
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default NewClient;
