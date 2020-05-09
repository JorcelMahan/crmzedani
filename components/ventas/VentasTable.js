import React from 'react';
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
  let totalAcumulate = 0;

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
                        {venta.cliente ? 'Cliente' : 'Promotora'}
                      </TableCell>
                      <TableCell>
                        {venta.productos.map((product) => (
                          <>
                            <p>
                              {product.codigo} - {product.color} -
                              {product.sizeSale}- Bs {product.precioPublico}
                            </p>
                          </>
                        ))}
                      </TableCell>
                      <TableCell>{venta.total}</TableCell>
                      <TableCell>{totalAcumulate}</TableCell>
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
