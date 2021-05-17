import { useRouter } from 'next/router';
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TableCell,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { gql, useMutation, useQuery } from '@apollo/client';
import Loader from '../../components/Loader';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import AuthContext from '../../context/auth/AuthContext';
import SelectReact from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChangesModal from '../../components/Ventas/ChangesModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },

  table: {
    textTransform: 'uppercase',
  },
}));

const EMPLOYEES_STORE = gql`
  query employeeStore($store: String!) {
    employeeStore(store: $store) {
      id
      name
    }
  }
`;

const GET_VENTA = gql`
  query getVenta($id: ID) {
    getVenta(id: $id) {
      id
      total
      vendedor {
        id
        name
      }
      status
      metodo
      factura
      reciboNota
      montoEfectivo
      montoTarjeta
      montoDeposito
      productos {
        codigo
        color
        precioPublico
        precioPromocion
        sizeSale
        quantity
        estado
        image
      }
    }
  }
`;

const UPDATE_SALE = gql`
  mutation editVenta($id: ID, $input: VentasInput) {
    editVenta(id: $id, input: $input)
  }
`;
const ListSellers = ({ selectedSeller, setSelectedSeller }) => {
  const { user } = useContext(AuthContext);
  const aux = user === 'patrick' ? 'sopocachi' : user;
  const { data, loading, error } = useQuery(EMPLOYEES_STORE, {
    variables: {
      store: aux,
    },
  });
  if (loading) return 'Loading';
  if (error) return `${error.message}`;
  const { employeeStore } = data;
  return (
    <div>
      <SelectReact
        value={employeeStore.filter((op) => op.id === selectedSeller.id)}
        onChange={(op) => setSelectedSeller(op)}
        options={employeeStore}
        placeholder='Seleccione al vendedor'
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => `${op.name}`}
        noOptionsMessage={() => 'No hay resultados'}
      />
    </div>
  );
};

const Product = ({ product, i }) => {
  const [producto, setProducto] = useState(product);
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {i}
      </TableCell>
      <TableCell align='right'>{product.estado}</TableCell>
      <TableCell>{producto.codigo}</TableCell>
      <TableCell align='right'>{producto.color}</TableCell>
      <TableCell align='right'>{producto.sizeSale}</TableCell>
      <TableCell align='right'>{producto.precioPublico}</TableCell>
      <TableCell align='right'>
        {!producto?.precioPromocion || producto?.precioPromocion === 0
          ? producto.precioPublico
          : producto.precioPromocion}
      </TableCell>
      <TableCell align='right'>{producto.quantity}</TableCell>
      <TableCell align='right'>
        <ChangesModal product={product} />
      </TableCell>
    </TableRow>
  );
};

const EditVenta = () => {
  const classes = useStyles();
  const router = useRouter();
  const { pid } = router.query;
  const { loading, error, data } = useQuery(GET_VENTA, {
    variables: {
      id: pid,
    },
    fetchPolicy: 'no-cache',
  });
  const [editVenta, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_SALE
  );
  const [selectedSeller, setSelectedSeller] = useState('');
  const [factura, setFactura] = useState('');
  const [nota, setNota] = useState('');
  const [metodo, setMetodo] = useState('');
  const [total, setTotal] = useState('');
  const [montoEfectivo, setMontoEfectivo] = useState('');
  const [montoTarjeta, setMontoTarjeta] = useState('');
  const [montoDeposito, setMontoDeposito] = useState('');
  const [productos, setProductos] = useState([]);

  const handleClick = async (e) => {
    try {
      await editVenta({
        variables: {
          id,
          input: {
            vendedor: selectedSeller.id,
            total: Number(total),
            factura,
            reciboNota: nota,
            montoDeposito: Number(montoDeposito),
            montoTarjeta: Number(montoTarjeta),
            montoEfectivo: Number(montoEfectivo),
          },
        },
      });
      router.push('/ventas');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setSelectedSeller(getVenta.vendedor);
      setMetodo(getVenta.metodo);
      setTotal(getVenta.total);
      setMontoEfectivo(getVenta.montoEfectivo);
      setMontoTarjeta(getVenta.montoTarjeta);
      setMontoDeposito(getVenta.montoDeposito);
      setFactura(getVenta.factura);
      setNota(getVenta.reciboNota);
      setProductos(getVenta.productos);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return `Error, ${error.message}`;

  const { getVenta } = data;
  const handleMetodo = (e) => {
    setMetodo(e.target.value);
    setMontoDeposito(0);
    setMontoEfectivo(0);
    setMontoTarjeta(0);
    setTotal(getVenta.total);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Box>
          <Box my={2}>
            <Button variant='contained' onClick={() => router.back()}>
              <ArrowBackIcon /> Volver
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Factura o Nota</TableCell>
                  <TableCell>Vendedor</TableCell>
                  <TableCell>Metodo</TableCell>
                  <TableCell>Efectivo</TableCell>
                  <TableCell>Tarjeta</TableCell>
                  <TableCell>Deposito</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*Al cancelar como puedo hacer que se corriga el total*/}
                <TableRow>
                  <TableCell>
                    {/*// add state to factura o note*/}
                    {getVenta.factura ? (
                      <TextField
                        variant='filled'
                        value={factura}
                        onChange={(e) => setFactura(e.target.value)}
                      />
                    ) : (
                      <TextField
                        variant='filled'
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <ListSellers
                      selectedSeller={selectedSeller}
                      setSelectedSeller={setSelectedSeller}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <Select
                        labelId='metodo'
                        id='metodo'
                        value={metodo}
                        onChange={handleMetodo}>
                        <MenuItem value='EFECTIVO'>Efectivo</MenuItem>
                        <MenuItem value='TARJETA'>Tarjeta</MenuItem>
                        <MenuItem value='DEPOSITO'>Deposito</MenuItem>
                        <MenuItem value='EFECTIVO-TARJETA'>
                          Efectivo-Tarjeta
                        </MenuItem>
                        <MenuItem value='DEPOSITO-EFECTIVO'>
                          Deposito-Efectivo
                        </MenuItem>
                        <MenuItem value='DEPOSITO-TARJETA'>
                          Deposito-Tarjeta
                        </MenuItem>
                        {/* <MenuItem value='GIFT-CARD'>Gift-Card</MenuItem>
                        <MenuItem value='GIFT-CARD-EFECTIVO'>
                          Gift-Card-Efectivo
                        </MenuItem>
                        <MenuItem value='GIFT-CARD-TARJETA'>Gift-Card-Tarjeta</MenuItem>
                        <MenuItem value='GIFT-CARD-DEPOSITO'>
                          Gift-Card-Deposito
                        </MenuItem> */}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={montoEfectivo}
                      onChange={(e) => {
                        setMontoEfectivo(e.target.value);

                        setTotal(
                          Number(montoTarjeta) +
                            Number(e.target.value) +
                            Number(montoDeposito)
                        );
                      }}
                      disabled={
                        !(
                          metodo === 'EFECTIVO-TARJETA' ||
                          metodo === 'DEPOSITO-EFECTIVO'
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={montoTarjeta}
                      onChange={(e) => {
                        setMontoTarjeta(e.target.value);

                        setTotal(
                          Number(e.target.value) +
                            Number(montoEfectivo) +
                            Number(montoDeposito)
                        );
                      }}
                      disabled={
                        !(
                          metodo === 'EFECTIVO-TARJETA' ||
                          metodo === 'DEPOSITO-TARJETA'
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={montoDeposito}
                      onChange={(e) => {
                        setMontoDeposito(e.target.value);

                        setTotal(
                          Number(montoTarjeta) +
                            Number(montoEfectivo) +
                            Number(e.target.value)
                        );
                      }}
                      disabled={
                        !(
                          metodo === 'DEPOSITO-TARJETA' ||
                          metodo === 'DEPOSITO-EFECTIVO'
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField value={total} disabled={true} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={13}>
                    <Box m={5}>
                      <Typography variant='h6' gutterBottom component='div'>
                        Productos
                      </Typography>
                      <Table size='small' aria-label='purchases'>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align='right'>Estado</TableCell>
                            <TableCell align='right'>Codigo</TableCell>
                            <TableCell align='right'>Color</TableCell>
                            <TableCell align='right'>Talla</TableCell>
                            <TableCell align='right'>Precio</TableCell>
                            <TableCell align='right'>Precio de Venta</TableCell>
                            <TableCell align='right'>Cantidad</TableCell>
                            <TableCell align='right'>Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productos.map((product, i) => (
                            <Product
                              key={`${product.id}-${i}`}
                              product={product}
                              i={++i}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {loading2 && <CircularProgress />}
          {error2 && <div>{error2.message}</div>}
          <Box m={5}>
            <Button color='secondary' variant='contained' onClick={handleClick}>
              Guardar Cambios
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EditVenta;
