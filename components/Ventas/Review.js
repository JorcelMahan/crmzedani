import React, { useContext, useEffect, useState } from 'react';
import VentasContext from '../../context/ventas/VentasContext';
import { makeStyles } from '@material-ui/core/styles';
import ReviewTable from '../ReviewTable';
import { Typography, Box, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  boxReview: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2em',
  },
  boxData: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
}));

const Review = ({ setActiveBtn }) => {
  const classes = useStyles();
  const ventasContext = useContext(VentasContext);
  const {
    products,
    promotora,
    cliente,
    calcTotal,
    fecha,
    addDateOfSales,
    metodo,
    factura,
    reciboNota,
  } = ventasContext;
  const formatDate = fecha
    .toLocaleString('es-MX', {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
    })
    .split('/');
  const currDateStr = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`;
  const [initialDate, setDate] = useState(currDateStr);
  useEffect(() => {
    calcTotal();
  }, [products]);
  return (
    <div className={classes.boxReview}>
      <Typography variant='h3' className={classes.title}>
        Confirma los datos
      </Typography>
      <Divider />
      <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        m={2}>
        <Box>
          NIT:
          <b style={{ paddingLeft: '1rem' }}>
            {promotora !== null && promotora !== '' && promotora !== undefined
              ? promotora.nit
              : cliente.nitoci}
          </b>
        </Box>
        <Box>
          RazonSocial:
          <b style={{ paddingLeft: '1rem' }}>
            {promotora !== null && promotora !== '' && promotora !== undefined
              ? promotora.razonSocial
              : cliente.razonSocial}
          </b>
        </Box>
        {factura !== '' ? (
          <Box>
            <Typography> Factura :{factura}</Typography>
          </Box>
        ) : (
          <Box>
            <Typography> Nota o Recibo : {reciboNota}</Typography>
          </Box>
        )}

        <Box>
          <Typography> Metodo: {metodo}</Typography>
        </Box>
      </Box>

      <div style={{ display: 'none' }}>
        <input
          type='date'
          value={initialDate}
          onChange={(e) => {
            setDate(e.target.value);
            addDateOfSales(e.target.value);
          }}
        />
      </div>
      <ReviewTable setActiveBtn={setActiveBtn} />
    </div>
  );
};

export default Review;
