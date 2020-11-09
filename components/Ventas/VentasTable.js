import React, { useContext } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ModalDeleteVenta from './ModalDeleteVenta';
import AuthContext from '../../context/auth/AuthContext';

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

const VentasTable = (props) => {
  const { ventas, cancelarVenta, ...rest } = props;
  const { user } = useContext(AuthContext);
  let totalAcumulate = 0;
  const classes = useStyles();
  return (
    <Card {...rest} className={classes.root}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cliente o promotora</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Acumulado</TableCell>
                  <TableCell>Anular</TableCell>
                  {user === 'patrick' && <TableCell>Eliminar</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {ventas.map((venta, i) => {
                  if (venta.status === 'COMPLET0') {
                    totalAcumulate += venta.total;
                  }
                  const formatDate = new Date(Number(venta.fechaDeCompra));
                  return (
                    <TableRow
                      key={venta.id}
                      className={clsx(
                        venta.status === 'COMPLET0'
                          ? classes.tableRow
                          : classes.tableRowCancelado
                      )}
                    >
                      <TableCell>{++i}</TableCell>
                      <TableCell>
                        {formatDate.toLocaleDateString('es-MX')}
                      </TableCell>
                      <TableCell>
                        {venta.idPromotora !== null ? 'Promotora' : 'Cliente'}
                      </TableCell>
                      <TableCell>
                        {venta.productos.map((product, j) => (
                          <p key={`${product.codigo}-${j}`}>
                            {product.codigo} - {product.color} -
                            {product.sizeSale}- Bs {product.precioPublico} #
                            <b>{product.quantity}</b>
                          </p>
                        ))}
                      </TableCell>
                      <TableCell>{venta.total}</TableCell>
                      <TableCell>{totalAcumulate}</TableCell>
                      {venta.status === 'COMPLET0' ? (
                        <TableCell>Cancelar</TableCell>
                      ) : (
                        <TableCell>Cancelado</TableCell>
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
