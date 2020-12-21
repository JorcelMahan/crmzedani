import React, { useContext, useEffect, useState } from 'react';
import VentasContext from '../../context/ventas/VentasContext';
import { makeStyles } from '@material-ui/core/styles';
import ReviewTable from '../ReviewTable';
import { Typography } from '@material-ui/core';

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

const Review = () => {
  const classes = useStyles();
  const ventasContext = useContext(VentasContext);
  const {
    products,
    promotora,
    cliente,
    calcTotal,
    fecha,
    addDateOfSales,
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
      <div className={classes.boxData}>
        <p>
          NIT:
          <b style={{ paddingLeft: '1rem' }}>
            {promotora !== null && promotora !== '' && promotora !== undefined
              ? promotora.nit
              : cliente.nitoci}
          </b>
        </p>
        <p>
          RazonSocial:
          <b style={{ paddingLeft: '1rem' }}>
            {promotora !== null && promotora !== '' && promotora !== undefined
              ? promotora.razonSocial
              : cliente.razonSocial}
          </b>
        </p>
      </div>
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
      <ReviewTable />
    </div>
  );
};

export default Review;
