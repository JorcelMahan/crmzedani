import React, { useContext, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Box,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ModalDeleteVenta from './ModalDeleteVenta';
import AuthContext from '../../context/auth/AuthContext';
import ModalCancelarVenta from './ModalCancelarVenta';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  tableRow: {
    textDecoration: 'none',
  },
  tableRowCancelado: {
    textDecoration: 'line-through',
  },
}));

const VentasTable = ({ ventas, cancelarVenta, anularVenta }) => {
  const { user } = useContext(AuthContext);
  let totalEfectivo = 0;
  let totalTarjeta = 0;
  const caja =
    user === 'sopocachi'
      ? 250
      : user === 'miraflores' || user === 'san miguel'
      ? 500
      : 0;
  const classes = useStyles();
  useEffect(() => {
    if (localStorage.totalEfectivo && localStorage.totalTarjeta) {
      localStorage.totalEfectivo = totalEfectivo;
      localStorage.totalTarjeta = totalTarjeta;
    } else {
      localStorage.setItem('totalEfectivo', totalEfectivo.toString());
      localStorage.setItem('totalTarjeta', totalTarjeta.toString());
    }
  });
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box m={3}>Caja: {caja}</Box>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Factura o Nota</TableCell>
                  <TableCell>Cliente o promotora</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Efectivo</TableCell>
                  <TableCell>Tarjeta</TableCell>
                  <TableCell>Deposito</TableCell>
                  <TableCell>Total Efectivo</TableCell>
                  <TableCell>Total Tarjeta</TableCell>
                  <TableCell>Anular</TableCell>
                  {user === 'patrick' && <TableCell>Eliminar</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {ventas.length > 0 &&
                  ventas.map((venta, i) => {
                    if (venta.status === 'COMPLET0') {
                      if (venta.metodo === 'EFECTIVO') {
                        totalEfectivo += venta.total;
                      } else if (venta.metodo === 'EFECTIVO-TARJETA') {
                        totalEfectivo += venta.montoEfectivo;
                        totalTarjeta += venta.montoTarjeta;
                      } else if (venta.metodo === 'TARJETA') {
                        totalTarjeta += venta.total;
                      }
                    }
                    const formatDate = new Date(Number(venta.fechaDeCompra));
                    return (
                      <TableRow
                        key={venta.id}
                        className={clsx(
                          venta.status === 'COMPLET0'
                            ? classes.tableRow
                            : classes.tableRowCancelado
                        )}>
                        <TableCell>{++i}</TableCell>

                        <TableCell>
                          {venta.factura ? venta.factura : '-'}
                          {/* {formatDate.toLocaleDateString('es-MX')} */}
                        </TableCell>
                        <TableCell>
                          {venta.idPromotora !== null ? 'Promotora' : 'Cliente'}
                        </TableCell>
                        <TableCell>
                          {venta.productos.map((product, j) => (
                            <p key={`${product.codigo}-${j}`}>
                              {product.codigo} - {product.color} -
                              {product.sizeSale} - Bs{' '}
                              {!product.precioPromocion &&
                              product.precioPromocion === 0
                                ? product.precioPublico
                                : product.precioPromocion}
                              #<b>{product.quantity}</b>
                            </p>
                          ))}
                        </TableCell>
                        <TableCell>
                          {venta.metodo === 'EFECTIVO'
                            ? venta.total
                            : venta.metodo === 'EFECTIVO-TARJETA'
                            ? venta.montoEfectivo
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {venta.metodo === 'TARJETA'
                            ? venta.total
                            : venta.metodo === 'EFECTIVO-TARJETA'
                            ? venta.montoTarjeta
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {venta.metodo === 'DEPOSITO' ? venta.total : '-'}
                        </TableCell>
                        <TableCell>{totalEfectivo + caja}</TableCell>
                        <TableCell>{totalTarjeta}</TableCell>
                        {venta.status === 'COMPLET0' ? (
                          <TableCell>
                            <ModalCancelarVenta
                              id={venta.id}
                              anularVenta={anularVenta}
                            />
                          </TableCell>
                        ) : (
                          <TableCell>Anulado</TableCell>
                        )}

                        {user === 'patrick' && (
                          <TableCell>
                            <ModalDeleteVenta
                              id={venta.id}
                              cancelarVenta={cancelarVenta}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

export default VentasTable;
