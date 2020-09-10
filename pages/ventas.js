import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import VentasTable from '../components/Ventas/VentasTable';
import CajaState from '../context/caja/CajaState';
import BoxCaja from '../components/Ventas/BoxCaja';
import Loader from '../components/Loader';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const SALES_BY_DATE = gql`
  query salesByDate($date: String!) {
    salesByDate(date: $date) {
      id
      total
      fechaDeCompra
      productos {
        codigo
        color
        precioPublico
        image
        sizeSale
        quantity
      }
      cliente {
        nitoci
        razonSocial
      }
      idPromotora {
        nombres
        apellidos
      }
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
const Ventas = () => {
  const [initialDate, setDate] = useState(new Date().toISOString());
  const { loading, error, data } = useQuery(SALES_BY_DATE, {
    variables: {
      date: initialDate,
    },
  });

  const classes = useStyles();
  const [close, setCLose] = useState(false);

  if (loading) return <Loader />;
  if (error) return `Error, ${error}`;
  const { salesByDate } = data;
  return (
    <CajaState>
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='dd/MM/yyyy'
            margin='normal'
            label='Fecha'
            value={initialDate}
            onChange={(e) => {
              setDate(e);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <BoxCaja />
        <div className={classes.content}>
          {!close ? (
            <VentasTable ventas={salesByDate} />
          ) : (
            <p>La caja esta cerrada</p>
          )}
        </div>
      </div>
    </CajaState>
  );
};

export default Ventas;
