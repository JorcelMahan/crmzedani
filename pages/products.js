import { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import VentasContext from '../context/ventas/VentasContext';
import Alert from '@material-ui/lab/Alert';
import { useQuery, gql } from '@apollo/client';
import Loader from '../components/Loader';

const GIFT_CARDS = gql`
  query giftCards {
    giftCards {
      id
      codigo
      almacen
      precioPublico
      precioPromocion
      tipo
      status
      stock
      image
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const products = () => {
  const classes = useStyles();
  const { addProduct, calcTotal, products } = useContext(VentasContext);
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GIFT_CARDS
  );
  const handleClick = (product) => {
    const { status, stock, ...copyProduct } = product;
    copyProduct.estado = 'COMPLETO';
    addProduct(copyProduct);
    calcTotal();
  };
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return `${error.message}`;
  const { giftCards } = data;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell align='right'>Estado</TableCell>
                <TableCell align='right'>Tienda</TableCell>
                <TableCell align='right'>Precio</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {giftCards.map((product) => (
                <TableRow key={product.codigo}>
                  <TableCell component='th' scope='row'>
                    {product.codigo}
                  </TableCell>
                  <TableCell align='right'>
                    {product.status === 'DISPONIBLE' ? (
                      <Alert severity='info'>{product.status}</Alert>
                    ) : (
                      <Alert severity='success'>{product.status}</Alert>
                    )}
                  </TableCell>
                  <TableCell align='right'>{product.almacen}</TableCell>
                  <TableCell align='right'>{product.precioPublico}</TableCell>
                  <TableCell align='right'>
                    {product.status === 'DISPONIBLE' && (
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => handleClick(product)}
                        disabled={products.find(
                          (el) => el.codigo === product.codigo
                        )}>
                        Agregar al carrito
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default products;
