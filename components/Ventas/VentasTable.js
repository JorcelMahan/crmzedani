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
import CajaContext from '../../context/caja/CajaContext';
import CardActions from '@material-ui/core/CardActions';
import ModalCaja from './ModalCaja';
import ModalDeleteVenta from './ModalDeleteVenta';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
}));

const VentasTable = (props) => {
  const { className, ventas, ...rest } = props;
  const cajaContext = useContext(CajaContext);
  const { caja } = cajaContext;
  let totalAcumulate = caja;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
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
                  <TableCell>Cancelar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ventas.map((venta, i) => {
                  totalAcumulate += venta.total;
                  const formatDate = new Date(Number(venta.fechaDeCompra));
                  return (
                    <TableRow key={venta.id} className={classes.tableRow} hover>
                      <TableCell>{++i}</TableCell>
                      <TableCell>
                        {formatDate.toLocaleDateString('es-MX')}
                      </TableCell>
                      <TableCell>
                        {venta.promotora ? 'Promotora' : 'Cliente'}
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
                      <TableCell>
                        <ModalDeleteVenta id={venta.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions>
        <ModalCaja total={totalAcumulate} />
      </CardActions>
    </Card>
  );
};

export default VentasTable;
