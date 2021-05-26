import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Box,
  Collapse,
  TableContainer,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ModalDeleteVenta from './ModalDeleteVenta';
import AuthContext from '../../context/auth/AuthContext';
import ModalCancelarVenta from './ModalCancelarVenta';
import IconButton from '@material-ui/core/IconButton';
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import ModalCancelarZapatoVenta from './ModalCancelarZapatoVenta';
import CierreContext from '../../context/cierre/CierreContext';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  table: {
    minWidth: 500,
  },
  tableRow: {
    textDecoration: 'none',
  },
  tableRowCancelado: {
    textDecoration: 'line-through',
  },
}));

const VentaRow = ({
  venta,
  i,
  cancelarVenta,
  anularVenta,
  anularZapatoVenta,
  totalEfectivo,
  totalTarjeta,
  store
}) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { addTotalTarjeta } = useContext(CierreContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [anulado, setAnulado] = useState(false);
  useEffect(() => {
    addTotalTarjeta(totalTarjeta);
  }, [totalTarjeta]);
  const formatDate = new Date(Number(venta.fechaDeCompra));
  const totalProductsSale = venta.productos.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <>
      <TableRow
        className={clsx(
          venta.status === 'COMPLET0'
            ? classes.tableRow
            : classes.tableRowCancelado
        )}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{++i}</TableCell>
        <TableCell>{formatDate.toLocaleDateString('es-MX')}</TableCell>
        <TableCell>{venta.factura ? venta.factura : '-'}</TableCell>
        <TableCell>{venta.vendedor ? venta.vendedor.name : '-'}</TableCell>
        <TableCell>
          {venta.idPromotora !== null
            ? venta.idPromotora.nombres.toUpperCase()
            : 'Cliente'}
        </TableCell>
        <TableCell>{totalProductsSale}</TableCell>
        <TableCell>
          {venta.metodo === 'EFECTIVO'
            ? venta.total
            : venta.metodo === 'EFECTIVO-TARJETA' ||
              venta.metodo === 'DEPOSITO-EFECTIVO'
              ? venta.montoEfectivo
              : '-'}
        </TableCell>
        <TableCell>
          {venta.metodo === 'TARJETA'
            ? venta.total
            : venta.metodo === 'EFECTIVO-TARJETA' ||
              venta.metodo === 'DEPOSITO-TARJETA'
              ? venta.montoTarjeta
              : '-'}
        </TableCell>
        <TableCell>
          {venta.metodo === 'DEPOSITO'
            ? venta.total
            : venta.metodo === 'DEPOSITO-TARJETA' ||
              venta.metodo === 'DEPOSITO-EFECTIVO'
              ? venta.montoDeposito
              : '-'}
        </TableCell>
        <TableCell>{totalEfectivo}</TableCell>
        <TableCell>{totalTarjeta}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
              router.push({
                pathname: '/ventas/[pid]',
                query: { pid: venta.id, store },
              });
            }}>
            <Edit />
          </Button>
        </TableCell>
        {venta.status === 'COMPLET0' &&
          !venta.productos.find((el) => el.estado === 'CANCELADO') ? (
          <TableCell>
            <ModalCancelarVenta id={venta.id} anularVenta={anularVenta} />
          </TableCell>
        ) : (
          <TableCell> - </TableCell>
        )}
        {/*{user === "johan" && (*/}
        {/*  <TableCell>*/}
        {/*    <ModalDeleteVenta id={venta.id} cancelarVenta={cancelarVenta} />*/}
        {/*  </TableCell>*/}
        {/*)}*/}
      </TableRow>
      <TableRow
        className={clsx(
          venta.status === 'COMPLET0'
            ? classes.tableRow
            : classes.tableRowCancelado
        )}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box m={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Productos
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Codigo</TableCell>
                    <TableCell align='right'>Color</TableCell>
                    <TableCell align='right'>Talla</TableCell>
                    <TableCell align='right'>Precio</TableCell>
                    <TableCell align='right'>Precio de Venta</TableCell>
                    <TableCell align='right'>Cantidad</TableCell>
                    <TableCell align='right'>Anular</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {venta.productos.map((product, i) => (
                    <TableRow
                      key={`${product.id}-${i}`}
                      className={clsx(
                        product.estado === 'COMPLETO'
                          ? classes.tableRow
                          : classes.tableRowCancelado
                      )}>
                      <TableCell component='th' scope='row'>
                        {product.estado}
                      </TableCell>
                      <TableCell>{product.codigo}</TableCell>
                      <TableCell align='right'>{product.color}</TableCell>
                      <TableCell align='right'>{product.sizeSale}</TableCell>
                      <TableCell align='right'>
                        {product.precioPublico}
                      </TableCell>
                      <TableCell align='right'>
                        {!product?.precioPromocion ||
                          product?.precioPromocion === 0
                          ? product.precioPublico
                          : product.precioPromocion}
                      </TableCell>
                      <TableCell align='right'>{product.quantity}</TableCell>
                      {venta.status === 'COMPLET0' &&
                        product.estado === 'COMPLETO' ? (
                        <TableCell align='right'>
                          <ModalCancelarZapatoVenta
                            arZapatoVenta
                            idVenta={venta.id}
                            idShoe={product.id}
                            color={product.color}
                            size={product.sizeSale}
                            anularZapatoVenta={anularZapatoVenta}
                          />
                        </TableCell>
                      ) : (
                        <TableCell align='right'>ANULADO</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const verifyProduct = (products) => {
  return products.some((el) => el.estado === 'CANCELADO');
};
const VentasTable = ({
  ventas,
  cancelarVenta,
  anularVenta,
  anularZapatoVenta,
  store
}) => {
  const { user } = useContext(AuthContext);

  let totalEfectivo = 0;
  let totalTarjeta = 0;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box m={3} />
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Factura o Nota</TableCell>
                  <TableCell>Vendedor</TableCell>
                  <TableCell>Cliente o promotora</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Efectivo</TableCell>
                  <TableCell>Tarjeta</TableCell>
                  <TableCell>Deposito</TableCell>
                  <TableCell>Total Efectivo</TableCell>
                  <TableCell>Total Tarjeta</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Anular</TableCell>
                  {user === 'johan' && <TableCell>Eliminar</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {ventas.map((venta, i) => {
                  if (
                    venta.status === 'COMPLET0' &&
                    !verifyProduct(venta.productos)
                  ) {
                    if (venta.metodo === 'EFECTIVO') {
                      totalEfectivo += venta.total;
                    } else if (venta.metodo === 'EFECTIVO-TARJETA') {
                      totalEfectivo += venta.montoEfectivo;
                      totalTarjeta += venta.montoTarjeta;
                    } else if (venta.metodo === 'TARJETA') {
                      totalTarjeta += venta.total;
                    } else if (venta.metodo === 'DEPOSITO-EFECTIVO') {
                      totalEfectivo += venta.montoEfectivo;
                    } else if (venta.metodo === 'DEPOSITO-TARJETA') {
                      totalTarjeta += venta.montoTarjeta;
                    }
                  }
                  return (
                    <VentaRow
                      key={venta.id}
                      venta={venta}
                      i={i}
                      cancelarVenta={cancelarVenta}
                      anularVenta={anularVenta}
                      anularZapatoVenta={anularZapatoVenta}
                      totalEfectivo={totalEfectivo}
                      totalTarjeta={totalTarjeta}
                      store={store}
                    // caja={caja}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </CardContent>
    </Card>
  );
};

export default VentasTable;
