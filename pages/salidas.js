import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import CardSalida from '../components/Salidas/CardSalida';
import Loader from '../components/Loader';

const GET_SALIDAS = gql`
  query salidasByDate($date: String!) {
    salidasByDate(date: $date) {
      id
      codigo
      products {
        id
        codigo
        color
        sizeSale
        quantity
        image
      }
      totalProducts
      almacen
      retiradoPor
      retiradoHacia
      fechaSalida
      status
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

const Salidas = () => {
  const classes = useStyles();
  const [initialDate, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  //calendar
  const { loading, error, data } = useQuery(GET_SALIDAS, {
    variables: {
      date: initialDate,
    },
  });

  if (loading) return <Loader />;
  if (error) return `Error: ${error.message}`;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h2>Salidas</h2>
        <div>
          Fecha:
          <input
            type='date'
            value={initialDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Grid container spacing={1} wrap='wrap'>
          {data.salidasByDate?.length > 0 ? (
            data.salidasByDate.map((salida) => (
              <Grid key={salida.id} item xs={12} sm={6} md={3}>
                <CardSalida salida={salida} />
              </Grid>
            ))
          ) : (
            <p>No hay ninguna salida</p>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Salidas;
