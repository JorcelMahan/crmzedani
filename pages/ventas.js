import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import VentasTable from '../components/Ventas/VentasTable';
import CajaState from '../context/caja/CajaState';
// import BoxCaja from '../components/Ventas/BoxCaja';
import Loader from '../components/Loader';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import AuthContext from '../context/auth/AuthContext';

const CANCELAR_VENTA = gql`
  mutation cancelarVenta($id: ID!) {
    cancelarVenta(id: $id)
  }
`;

const ANULAR_VENTA = gql`
  mutation anularVenta($id: ID!) {
    anularVenta(id: $id)
  }
`;

const ANULAR_ZAPATO_VENTA = gql`
  mutation anularZapatoVenta(
    $idVenta: ID
    $idShoe: ID
    $color: String
    $size: String
  ) {
    anularZapatoVenta(
      idVenta: $idVenta
      idShoe: $idShoe
      color: $color
      size: $size
    )
  }
`;

const SALES_BY_DATE = gql`
  query salesStoreByDate($store: String!, $date: String!) {
    salesStoreByDate(store: $store, date: $date) {
      id
      total
      fechaDeCompra
      productos {
        id
        codigo
        color
        precioPublico
        precioPromocion
        image
        sizeSale
        quantity
        estado
      }
      cliente {
        nitoci
        razonSocial
      }
      idPromotora {
        nombres
        apellidos
      }
      vendedor {
        name
      }
      status
      user
      metodo
      factura
      reciboNota
      montoEfectivo
      montoTarjeta
      montoDeposito
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
  formControl: {
    margin: theme.spacing(1),
  },
  boxDateStore: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
  },
}));

const Ventas = () => {
  let { user } = useContext(AuthContext);
  user = user ? user : localStorage.getItem('user');
  const currentDate = new Date()
    .toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/');
  const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  const [initialDate, setDate] = useState(currDateStr);
  const [salesDate, setSalesDate] = useState([]);
  const [store, setStore] = useState(
    user === 'kathryn' || user === 'fabio' || user === 'laura'
      ? 'patrick'
      : user
  );
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    SALES_BY_DATE,
    {
      variables: {
        store: store,
        date: initialDate,
      },
    }
  );
  const [cancelarVenta, { loading: loading2, error: error2 }] = useMutation(
    CANCELAR_VENTA
  );
  const [anularVenta, { loading: loading3, error: error3 }] = useMutation(
    ANULAR_VENTA
  );
  const [anularZapatoVenta, { loading: loading4, error: error4 }] = useMutation(
    ANULAR_ZAPATO_VENTA
  );
  const classes = useStyles();
  // const [close, setCLose] = useState(false);
  useEffect(() => {
    if (data) {
      setSalesDate(data.salesStoreByDate);
    }
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [data, cancelarVenta, startPolling, stopPolling]);

  if (loading || loading2 || loading3 || loading4) return <Loader />;
  if (error || error2 || error3) return `Error, ${error.message}`;
  if (error4) return `Error, ${error4.message}`;
  // console.log(data.salesStoreByDate);
  return (
    <CajaState>
      <div className={classes.root}>
        <div className={classes.boxDateStore}>
          <div>
            Fecha:
            <input
              type='date'
              value={initialDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {(user === 'patrick' ||
            user === 'kathryn' ||
            user === 'fabio' ||
            user === 'laura') && (
            <div>
              <FormControl className={classes.formControl} variant='outlined'>
                <InputLabel id='store'>Tienda</InputLabel>
                <Select
                  id='store'
                  name='store'
                  labelId='store'
                  value={store}
                  onChange={(e) => {
                    setStore(e.target.value);
                  }}>
                  {[
                    'sopocachi',
                    'san-miguel',
                    'miraflores',
                    '6-de-marzo',
                    'patrick',
                  ].map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        </div>
        {/* <BoxCaja /> */}

        <VentasTable
          ventas={salesDate}
          cancelarVenta={cancelarVenta}
          anularVenta={anularVenta}
          anularZapatoVenta={anularZapatoVenta}
        />
      </div>
    </CajaState>
  );
};

export default Ventas;
