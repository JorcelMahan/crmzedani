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
import ModalCancelarVenta from './ModalCancelarVenta';
// import { useQuery, gql } from '@apollo/client';

// const GET_USER_BY_ID = gql`
//   query getUserById($id: String!) {
//     getUserById(id: $id) {
//       name
//     }
//   }
// `;

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
  let totalAcumulate = 0;
  const classes = useStyles();
  // const { loading, error, data } = useQuery(GET_USER_BY_ID, {
  //   variables: {
  //     id: ventas.user,
  //   },
  // });
  // if (loading) return 'Loading';
  // if (error) return `Error: ${error.message}`;
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  {user === 'patrick' && <TableCell>Tienda</TableCell>}
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
                {ventas.length > 0 &&
                  ventas.map((venta, i) => {
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
                        {user === 'patrick' && <TableCell>tienda</TableCell>}
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
                              {product.sizeSale} - Bs{' '}
                              {product.precioPromocion !== 0
                                ? product.precioPublico
                                : product.precioPromocion}{' '}
                              #<b>{product.quantity}</b>
                            </p>
                          ))}
                        </TableCell>
                        <TableCell>{venta.total}</TableCell>
                        <TableCell>{totalAcumulate}</TableCell>
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
