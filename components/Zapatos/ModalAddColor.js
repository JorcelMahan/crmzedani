import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import { Add } from '@material-ui/icons';
import Snack from '../Alerts/Snack';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useMutation, gql } from '@apollo/client';

const SAVE_COLOR = gql`
  mutation addColor($color: String!) {
    addColor(color: $color)
  }
`;

const GET_COLORS = gql`
  query colors {
    colors {
      id
      nombre
    }
  }
`;

const ModalAddColor = () => {
  const [addColor, { loading, error }] = useMutation(SAVE_COLOR, {
    update(cache, { data: { addColor } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { colors } = cache.readQuery({ query: GET_COLORS });

      // Reescribimos el cache ( el cache nunca se debe modificar )
      cache.writeQuery({
        query: GET_COLORS,
        data: {
          colors: [...colors, addColor],
        },
      });
    },
  });
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleColor = async () => {
    try {
      await addColor({
        variables: {
          color,
        },
      });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}

      <Fab
        size='small'
        color='primary'
        aria-label='add'
        onClick={handleClickOpen}>
        <Add />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>ADD color</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='nombre'
            name='nombre'
            label='Color'
            fullWidth
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleColor} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAddColor;
