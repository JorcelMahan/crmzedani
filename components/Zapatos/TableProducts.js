import { useContext } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import VentasContext from '../../context/ventas/VentasContext';

const TableProducts = ({ giftCards }) => {
  const { addProduct, calcTotal, products } = useContext(VentasContext);

  const handleClick = (product) => {
    const { status, stock, ...copyProduct } = product;
    copyProduct.estado = 'COMPLETO';
    addProduct(copyProduct);
    calcTotal();
  };
  return (
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
  );
};

export default TableProducts;
