import React, { useContext, useEffect } from 'react';
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
import { Box, FormControl, Input, InputLabel } from '@material-ui/core';
import GiftCard from './Ventas/GiftCard';

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

const ReviewTable = ({ setActiveBtn }) => {
  const classes = useStyles();
  const {
    total,
    products,
    restQuantity,
    addQuantity,
    removeProduct,
    addPrecioPromocion,
    metodo,
    montoEfectivo,
    montoTarjeta,
    montoDeposito,
    addMontoDeposito,
    addMontoEfectivo,
    addMontoTarjeta,
    giftCard,
  } = useContext(VentasContext);

  useEffect(() => {
    if (metodo === 'EFECTIVO-TARJETA') {
      if (total == Number(montoTarjeta) + Number(montoEfectivo)) {
        setActiveBtn(false);
      } else {
        setActiveBtn(true);
      }
    } else {
      setActiveBtn(false);
    }
  }, [total, montoEfectivo, montoTarjeta]);
  return (
    <>
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
                    onClick={() => removeProduct(product)}>
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
                    step='.01'
                    value={
                      product.precioPromocion ? product.precioPromocion : '0'
                    }
                    style={{ width: '35%', padding: '5px' }}
                    onChange={(e) => {
                      product.precioPromocion =
                        e.target.value !== '' && e.target.value !== '0'
                          ? e.target.value
                          : '0';
                      addPrecioPromocion(product);
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  Bs.{' '}
                  {product.precioPromocion === 0 ||
                  product.precioPromocion === null
                    ? product.quantity * product.precioPublico
                    : product.quantity * product.precioPromocion}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={1} />
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell align='right'>
                {giftCard && `GC (-${giftCard.split('-')[2]}) `}
                {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {metodo === 'EFECTIVO-TARJETA' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <InputLabel>Efectivo</InputLabel>
              <Input
                id='efectivo'
                value={montoEfectivo}
                onChange={(e) => addMontoEfectivo(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel>Tarjeta</InputLabel>
              <Input
                id='tarjeta'
                value={montoTarjeta}
                onChange={(e) => addMontoTarjeta(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
      )}
      {metodo === 'DEPOSITO-EFECTIVO' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <InputLabel>Efectivo</InputLabel>
              <Input
                id='efectivo'
                value={montoEfectivo}
                onChange={(e) => addMontoEfectivo(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel>Deposito</InputLabel>
              <Input
                id='deposito'
                value={montoDeposito}
                onChange={(e) => addMontoDeposito(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
      )}
      {metodo === 'DEPOSITO-TARJETA' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <InputLabel>Tarjeta</InputLabel>
              <Input
                id='tarjeta'
                value={montoTarjeta}
                onChange={(e) => addMontoTarjeta(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel>Deposito</InputLabel>
              <Input
                id='deposito'
                value={montoDeposito}
                onChange={(e) => addMontoDeposito(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
      )}

      {metodo === 'GIFT-CARD' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <GiftCard />
            </FormControl>
          </Box>
        </Box>
      )}
      {metodo === 'GIFT-CARD-EFECTIVO' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <GiftCard />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel>Efectivo</InputLabel>
              <Input
                id='efectivo'
                value={montoEfectivo}
                onChange={(e) => addMontoEfectivo(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
      )}
      {metodo === 'GIFT-CARD-TARJETA' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <GiftCard />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel>Tarjeta</InputLabel>
              <Input
                id='tarjeta'
                value={montoTarjeta}
                onChange={(e) => addMontoTarjeta(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
      )}
      {metodo === 'GIFT-CARD-DEPOSITO' && (
        <Box display='flex' justifyContent='space-around' m={3}>
          <Box>
            <FormControl>
              <GiftCard />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel>Deposito</InputLabel>
              <Input
                id='deposito'
                value={montoDeposito}
                onChange={(e) => addMontoDeposito(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ReviewTable;
