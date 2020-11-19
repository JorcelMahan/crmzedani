import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import VentasContext from '../context/ventas/VentasContext';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  boxActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& *': {
      marginLeft: '5px',
    },
  },
});

const ReviewTable = () => {
  const classes = useStyles();
  const {
    total,
    products,
    restQuantity,
    addQuantity,
    removeProduct,
    addPrecioPromocion,
  } = useContext(VentasContext);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={5}>
              Detalles
            </TableCell>
            <TableCell align='right'>Precio</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell align='right'>Cantidad</TableCell>
            <TableCell align='right'>Unidad</TableCell>
            <TableCell align='right'>P. Descuento</TableCell>
            <TableCell align='right'>Suma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={`${product.id}-${index}`}>
              <TableCell>
                <IconButton
                  fontSize='small'
                  onClick={() => removeProduct(product)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <Avatar
                  src={product.image}
                  alt={product.codigo}
                  variant='square'
                />
              </TableCell>
              <TableCell>
                {product.codigo} {product.color} {product.sizeSale}
              </TableCell>
              <TableCell align='right'>
                <div className={classes.boxActions}>
                  <Button onClick={() => restQuantity(product)}>
                    <Remove style={{ fontSize: '1em' }} />
                  </Button>
                  <b>{product.quantity} </b>
                  <Button onClick={() => addQuantity(product)}>
                    <Add style={{ fontSize: '1em' }} />
                  </Button>
                </div>
              </TableCell>
              <TableCell align='right'>Bs. {product.precioPublico}</TableCell>
              <TableCell align='right'>
                <input
                  type='number'
                  value={product.precioPromocion}
                  style={{ width: '30%', padding: '5px' }}
                  onChange={(e) => {
                    product.precioPromocion = Number(e.target.value);
                    addPrecioPromocion(product);
                  }}
                />
              </TableCell>
              <TableCell align='right'>
                Bs.{' '}
                {product.precioPromocion === 0
                  ? product.quantity * product.precioPublico
                  : product.quantity * product.precioPromocion}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={1} />
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell align='right'>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewTable;
